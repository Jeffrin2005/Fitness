import { useState, useEffect } from 'react'

function AIHealthAdvice({ healthMetrics, bodyMetrics, activityMetrics }) {
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateHealthAdvice = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Create comprehensive health profile for AI
      const healthProfile = {
        vitals: {
          bloodSugar: healthMetrics?.bloodSugar || 0,
          bloodPressure: {
            systolic: healthMetrics?.bloodPressure?.systolic || 0,
            diastolic: healthMetrics?.bloodPressure?.diastolic || 0
          },
          heartRate: healthMetrics?.heartRate || 0,
          weight: healthMetrics?.weight || 0,
          bmi: healthMetrics?.bmi || 0,
          bodyFat: healthMetrics?.bodyFat || 0
        },
        fitness: {
          chest: bodyMetrics?.chest || 0,
          arms: bodyMetrics?.arms || 0,
          core: bodyMetrics?.core || 0,
          legs: bodyMetrics?.legs || 0,
          overall: bodyMetrics?.overall || 0
        },
        activity: {
          steps: activityMetrics?.steps || 0,
          caloriesBurned: activityMetrics?.caloriesBurned || 0,
          runningKm: activityMetrics?.runningKm || 0
        }
      }

      const aiAdvice = await generateOfflineAdvice(healthProfile)
      setAdvice(aiAdvice)
    } catch (err) {
      setError('Failed to generate health advice. Please try again.')
      console.error('AI Advice Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateOfflineAdvice = async (profile) => {
    await new Promise(resolve => setTimeout(resolve, 400))

    const vitals = profile.vitals
    const activity = profile.activity

    const sections = []

    // Blood glucose (general adult guidance)
    if (vitals.bloodSugar > 0) {
      if (vitals.bloodSugar < 100) {
        sections.push(
          `Blood Glucose\n\nCurrent Status: ${vitals.bloodSugar} mg/dL (within typical fasting reference range)\nHealth Value: Stable glucose control is associated with lower long-term risk of insulin resistance and cardiometabolic disease.\nRecommended Action: Maintain a balanced plate (lean protein + vegetables + whole grains) and continue regular activity.`
        )
      } else if (vitals.bloodSugar < 126) {
        sections.push(
          `Blood Glucose\n\nCurrent Status: ${vitals.bloodSugar} mg/dL (elevated)\nHealth Value: Persistently elevated fasting glucose can be an early marker of insulin resistance.\nRecommended Action: Reduce refined carbs/sugary drinks, increase fiber (vegetables/legumes/whole grains), and aim for ≥150 minutes/week of moderate cardio.`
        )
      } else {
        sections.push(
          `Blood Glucose\n\nCurrent Status: ${vitals.bloodSugar} mg/dL (high)\nHealth Value: High readings may increase risk of complications over time if persistent.\nRecommended Action: Schedule a clinician review (confirm with repeat testing). Prioritize low-glycemic meals, portion control, and consistent daily movement.`
        )
      }
    }

    // Blood pressure
    const sys = vitals.bloodPressure?.systolic || 0
    const dia = vitals.bloodPressure?.diastolic || 0
    if (sys > 0 && dia > 0) {
      if (sys < 120 && dia < 80) {
        sections.push(
          `Blood Pressure\n\nCurrent Status: ${sys}/${dia} mmHg (optimal)\nHealth Value: Optimal blood pressure reduces risk of stroke, heart disease, and kidney disease.\nRecommended Action: Maintain activity, limit ultra-processed foods, and keep sodium intake moderate.`
        )
      } else if (sys < 140 && dia < 90) {
        sections.push(
          `Blood Pressure\n\nCurrent Status: ${sys}/${dia} mmHg (elevated)\nHealth Value: Elevated BP increases cardiovascular risk over time.\nRecommended Action: Aim for 150 minutes/week cardio, reduce sodium, increase potassium-rich foods (fruits/vegetables), and monitor BP regularly.`
        )
      } else {
        sections.push(
          `Blood Pressure\n\nCurrent Status: ${sys}/${dia} mmHg (high)\nHealth Value: Higher BP may significantly increase risk of heart attack and stroke if persistent.\nRecommended Action: Book a medical review. Avoid overexertion until cleared, manage stress/sleep, and track readings at consistent times.`
        )
      }
    }

    // Resting heart rate
    if (vitals.heartRate > 0) {
      if (vitals.heartRate < 60) {
        sections.push(
          `Resting Heart Rate\n\nCurrent Status: ${vitals.heartRate} bpm (low)\nHealth Value: A lower resting HR can reflect good cardiovascular conditioning (especially in trained individuals).\nRecommended Action: If you feel dizzy/faint or it is unusually low for you, consult a clinician; otherwise maintain aerobic + strength training balance.`
        )
      } else if (vitals.heartRate <= 100) {
        sections.push(
          `Resting Heart Rate\n\nCurrent Status: ${vitals.heartRate} bpm (within typical adult range)\nHealth Value: A normal resting HR supports better recovery and exercise tolerance.\nRecommended Action: Build aerobic base (brisk walking/cycling) and improve sleep quality to further optimize recovery.`
        )
      } else {
        sections.push(
          `Resting Heart Rate\n\nCurrent Status: ${vitals.heartRate} bpm (elevated)\nHealth Value: Elevated resting HR can be related to stress, poor sleep, dehydration, illness, or low fitness.\nRecommended Action: Prioritize hydration, sleep, and gradual cardio. If persistent or with symptoms (chest pain, breathlessness), seek medical care.`
        )
      }
    }

    // BMI
    if (vitals.bmi > 0) {
      if (vitals.bmi < 18.5) {
        sections.push(
          `BMI\n\nCurrent Status: ${vitals.bmi} (underweight range)\nHealth Value: Low BMI can be associated with low muscle mass or nutritional gaps.\nRecommended Action: Increase protein intake and start structured strength training 2–3x/week; consider nutrition review if weight loss is unintentional.`
        )
      } else if (vitals.bmi < 25) {
        sections.push(
          `BMI\n\nCurrent Status: ${vitals.bmi} (healthy range)\nHealth Value: Healthy BMI is associated with lower cardiometabolic risk.\nRecommended Action: Maintain consistent training and a balanced diet; monitor waist circumference and strength performance over time.`
        )
      } else if (vitals.bmi < 30) {
        sections.push(
          `BMI\n\nCurrent Status: ${vitals.bmi} (overweight range)\nHealth Value: Extra body weight can increase BP and insulin resistance risk.\nRecommended Action: Aim for a small calorie deficit, increase daily steps, and prioritize protein + high-fiber foods.`
        )
      } else {
        sections.push(
          `BMI\n\nCurrent Status: ${vitals.bmi} (obesity range)\nHealth Value: Higher BMI may increase risk of diabetes, sleep apnea, and cardiovascular disease.\nRecommended Action: Consider clinician-guided weight management. Start with low-impact cardio + strength training, improve sleep, and track weekly trends.`
        )
      }
    }

    // Activity (steps)
    if (activity.steps > 0) {
      if (activity.steps < 5000) {
        sections.push(
          `Daily Activity\n\nCurrent Status: ${activity.steps.toLocaleString()} steps/day (low)\nHealth Value: Increasing daily movement improves glucose control, mood, and cardiovascular health.\nRecommended Action: Add 1–2 short walks/day and increase steps by ~500–1,000 per week until you reach 8,000–10,000.`
        )
      } else if (activity.steps < 10000) {
        sections.push(
          `Daily Activity\n\nCurrent Status: ${activity.steps.toLocaleString()} steps/day (moderate)\nHealth Value: This level supports heart health and weight maintenance.\nRecommended Action: Try to reach 8,000–10,000 steps consistently and include 2–3 strength sessions/week.`
        )
      } else {
        sections.push(
          `Daily Activity\n\nCurrent Status: ${activity.steps.toLocaleString()} steps/day (high)\nHealth Value: High daily movement is associated with improved cardiometabolic outcomes.\nRecommended Action: Maintain this habit and add mobility + strength work to reduce injury risk.`
        )
      }
    }

    if (sections.length > 0) {
      sections.push(
        `General Guidance\n\nCurrent Status: Summary\nHealth Value: Sustainable habits drive long-term outcomes more than short bursts of intensity.\nRecommended Action: Focus on sleep (7–9h), hydration, protein with each meal, and consistent weekly training. If any value is concerning or you have symptoms, consult a healthcare professional.`
      )
    }

    return sections.join('\n\n---\n\n')
  }

  useEffect(() => {
    // Auto-generate advice when component mounts or data changes
    if (healthMetrics || bodyMetrics || activityMetrics) {
      generateHealthAdvice()
    }
  }, [healthMetrics, bodyMetrics, activityMetrics])

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Health Advisor</h2>
          <p className="text-gray-600 text-sm mt-1">Offline Health Advisor • Personalized guideline-based insights</p>
        </div>
        <button
          onClick={generateHealthAdvice}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Advice
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-medium">API Configuration Required</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-xs mt-2">No API key is required for offline advice.</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">AI is analyzing your health data...</p>
          <p className="text-xs text-gray-500 mt-2">Generating offline recommendations…</p>
        </div>
      ) : advice ? (
        <div className="prose prose-sm max-w-none">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(() => {
                const accent = [
                  { ring: 'ring-blue-200', badge: 'bg-blue-50 text-blue-700', title: 'text-blue-700' },
                  { ring: 'ring-emerald-200', badge: 'bg-emerald-50 text-emerald-700', title: 'text-emerald-700' },
                  { ring: 'ring-violet-200', badge: 'bg-violet-50 text-violet-700', title: 'text-violet-700' },
                  { ring: 'ring-amber-200', badge: 'bg-amber-50 text-amber-800', title: 'text-amber-800' },
                  { ring: 'ring-rose-200', badge: 'bg-rose-50 text-rose-700', title: 'text-rose-700' }
                ]

                const sections = advice.split('\n\n---\n\n')
                  .map((raw) => {
                    const lines = raw.split('\n')
                    const title = lines[0]?.replace(/#/g, '').trim()
                    const contentLines = lines.slice(1).filter(l => l.trim())
                    if (!title) return null

                    const current = contentLines.find(l => l.startsWith('Current Status:'))
                    const value = contentLines.find(l => l.startsWith('Health Value:'))
                    const action = contentLines.find(l => l.startsWith('Recommended Action:'))
                    const extra = contentLines.filter(l => ![current, value, action].includes(l))

                    return {
                      title,
                      current: current?.replace('Current Status:', '').trim() || '',
                      value: value?.replace('Health Value:', '').trim() || '',
                      action: action?.replace('Recommended Action:', '').trim() || '',
                      extra
                    }
                  })
                  .filter(Boolean)

                return sections.map((s, index) => {
                  const a = accent[index % accent.length]
                  return (
                    <div
                      key={`${s.title}-${index}`}
                      className={`opacity-0 translate-y-4 rounded-xl border border-gray-200 bg-white p-5 ring-2 ring-inset ${a.ring}`}
                      style={{
                        animation: `fadeInUp 0.7s ease-out ${index * 0.12}s forwards`,
                        animationDelay: `${index * 0.12}s`
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <h3 className={`text-base font-bold ${a.title} leading-snug`}>{s.title}</h3>
                        <span className={`shrink-0 px-2 py-1 rounded-md text-[11px] font-semibold ${a.badge}`}>
                          Insight
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                          <div className="text-[11px] font-semibold text-slate-600 mb-1">Current Status</div>
                          <div className="text-sm font-medium text-slate-900">{s.current || 'Not provided'}</div>
                        </div>

                        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                          <div className="text-[11px] font-semibold text-slate-600 mb-1">Health Value</div>
                          <div className="text-sm text-slate-700 leading-relaxed">{s.value || '—'}</div>
                        </div>

                        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                          <div className="text-[11px] font-semibold text-slate-600 mb-1">Recommended Action</div>
                          <div className="text-sm text-slate-700 leading-relaxed">{s.action || '—'}</div>
                        </div>

                        {s.extra?.length > 0 && (
                          <div className="rounded-lg bg-white border border-gray-200 p-3">
                            <div className="text-[11px] font-semibold text-slate-600 mb-2">Notes</div>
                            <div className="space-y-2">
                              {s.extra.map((line, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400" />
                                  <p className="m-0 text-sm text-slate-700 leading-relaxed">{line}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Medical Disclaimer:</strong> This AI-generated health advice is for informational purposes only and should not replace professional medical diagnosis or treatment. Always consult with qualified healthcare providers for medical decisions, especially if you have existing health conditions or concerns about your health data.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p>No health data available</p>
          <p className="text-sm mt-2">Upload your health data to get personalized AI advice</p>
        </div>
      )}
    </div>
  )
}

export default AIHealthAdvice
