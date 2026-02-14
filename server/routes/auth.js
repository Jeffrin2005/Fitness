import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Helper function to create default user data
const createDefaultUserData = (username) => ({
  username,
  activity: {
    steps: 0,
    stepsGoal: 10000,
    runningKm: 0,
    runningGoal: 5,
    caloriesBurned: 0
  },
  bodyMetrics: {
    chest: 50,
    arms: 50,
    core: 50,
    legs: 50,
    overall: 50
  },
  healthMetrics: {
    bloodSugar: 95,
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    weight: 70,
    bmi: 22,
    bodyFat: 20
  },
  nutrition: {
    proteinTarget: 150,
    proteinConsumed: 0,
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
      { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, category: 'Chest', emoji: '💪' },
      { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, category: 'Legs', emoji: '🦵' },
      { id: 3, name: 'Plank', sets: 3, duration: '60s', completed: false, category: 'Core', emoji: '🧘' },
      { id: 4, name: 'Lunges', sets: 3, reps: 12, completed: false, category: 'Legs', emoji: '🏃' },
      { id: 5, name: 'Burpees', sets: 3, reps: 10, completed: false, category: 'Full Body', emoji: '🔥' },
      { id: 6, name: 'Mountain Climbers', sets: 3, reps: 20, completed: false, category: 'Cardio', emoji: '⛰️' }
    ]
  },
  workoutData: {
    pushups: { count: 50, frequency: 3 },
    armExercises: { count: 30, frequency: 2 },
    chestExercises: { count: 40, frequency: 3 },
    legExercises: { count: 60, frequency: 4 },
    coreExercises: { count: 25, frequency: 3 }
  }
})

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user with default data
    const userData = createDefaultUserData(username)
    const user = new User({
      ...userData,
      password: hashedPassword
    })

    await user.save()

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      token,
      user: {
        username: user.username,
        activity: user.activity,
        bodyMetrics: user.bodyMetrics,
        healthMetrics: user.healthMetrics,
        nutrition: user.nutrition,
        exercises: user.exercises,
        workoutData: user.workoutData
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error during signup' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    console.log('Login attempt for username:', username)

    // Find user
    let user = await User.findOne({ username })
    console.log('User found:', user ? 'Yes' : 'No')

    // If user doesn't exist and credentials are admin/admin, create default admin user
    if (!user && username === 'admin' && password === 'admin') {
      console.log('Creating admin user...')
      const hashedPassword = await bcrypt.hash('admin', 10)
      const adminData = createDefaultUserData('admin')
      user = new User({
        ...adminData,
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
        }
      })
      await user.save()
      console.log('Admin user created successfully')
    }

    if (!user) {
      console.log('User not found, returning 401')
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    console.log('Login successful for user:', username)
    res.json({
      token,
      user: {
        username: user.username,
        activity: user.activity,
        bodyMetrics: user.bodyMetrics,
        healthMetrics: user.healthMetrics,
        nutrition: user.nutrition,
        exercises: user.exercises,
        workoutData: user.workoutData
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ message: 'Server error: ' + error.message })
  }
})

export default router
