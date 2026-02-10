import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user
    let user = await User.findOne({ username })

    // If user doesn't exist and credentials are admin/admin, create default admin user
    if (!user && username === 'admin' && password === 'admin') {
      const hashedPassword = await bcrypt.hash('admin', 10)
      user = new User({
        username: 'admin',
        password: hashedPassword,
        activity: {
          steps: 8547,
          stepsGoal: 10000,
          runningKm: 3.2,
          runningGoal: 5,
          caloriesBurned: 420
        },
        bodyMetrics: {
          chest: 85,
          arms: 78,
          core: 82,
          legs: 88,
          overall: 83
        },
        healthMetrics: {
          bloodSugar: 95,
          bloodPressure: { systolic: 120, diastolic: 80 },
          heartRate: 72,
          weight: 75,
          bmi: 23.5,
          bodyFat: 18
        },
        nutrition: {
          proteinTarget: 150,
          proteinConsumed: 85,
          recommendedFoods: [
            { name: 'Chicken Breast', protein: 31, serving: '100g', emoji: '🍗' },
            { name: 'Greek Yogurt', protein: 10, serving: '100g', emoji: '🥛' },
            { name: 'Eggs', protein: 13, serving: '2 eggs', emoji: '🥚' },
            { name: 'Salmon', protein: 25, serving: '100g', emoji: '🐟' },
            { name: 'Lentils', protein: 9, serving: '100g', emoji: '🫘' },
            { name: 'Almonds', protein: 21, serving: '100g', emoji: '🥜' }
          ]
        },
        exercises: {
          exercises: [
            { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, emoji: '💪' },
            { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, emoji: '🦵' },
            { id: 3, name: 'Plank', sets: 3, duration: '60s', completed: false, emoji: '🧘' },
            { id: 4, name: 'Lunges', sets: 3, reps: 12, completed: false, emoji: '🏃' },
            { id: 5, name: 'Burpees', sets: 3, reps: 10, completed: false, emoji: '🔥' },
            { id: 6, name: 'Mountain Climbers', sets: 3, reps: 20, completed: false, emoji: '⛰️' }
          ]
        }
      })
      await user.save()
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: {
        username: user.username,
        activity: user.activity,
        bodyMetrics: user.bodyMetrics,
        healthMetrics: user.healthMetrics,
        nutrition: user.nutrition,
        exercises: user.exercises
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
