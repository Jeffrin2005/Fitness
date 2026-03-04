import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/health-advice', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || process.env.GPT_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing API key',
        message: 'Set OPENAI_API_KEY, GROQ_API_KEY or GPT_API_KEY in your server environment.'
      })
    }

    const { profile } = req.body || {}

    if (!profile) {
      return res.status(400).json({ error: 'Missing profile data' })
    }

    const systemPrompt = `
You are a professional health and fitness coach. 
You are given a structured JSON profile with:
- vitals (bloodSugar, bloodPressure.systolic/diastolic, heartRate, weight, bmi, bodyFat)
- fitness (chest, arms, core, legs, overall workout counts)
- activity (steps, caloriesBurned, runningKm)

Return clear, human‑readable sections in the following text format (no JSON):
Each section must look like:

<Section Title>

Current Status: one‑sentence summary including the numeric values.
Health Value: one‑sentence explanation of why this matters.
Recommended Action: one‑sentence, practical behavior change suggestion.

Separate sections using the exact divider:

---

Keep language simple and motivational, and stay within general wellness guidance. 
Never give medical diagnoses or medication advice. Always add a short caution in the final section recommending consultation with a healthcare professional for concerns.
    `.trim()

    const userPrompt = `Here is the user's latest health profile:\n\n${JSON.stringify(profile, null, 2)}\n\nGenerate concise, personalized guidance following the required format.`

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.6
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('AI API error:', response.status, errorText)
      return res.status(502).json({ error: 'AI API request failed' })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return res.status(502).json({ error: 'Empty response from AI provider' })
    }

    res.json({ advice: content })
  } catch (err) {
    console.error('AI route error:', err)
    res.status(500).json({ error: 'Failed to generate AI health advice' })
  }
})

export default router

