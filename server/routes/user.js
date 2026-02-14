import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// Get user data
router.get('/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      username: user.username,
      activity: user.activity,
      bodyMetrics: user.bodyMetrics,
      healthMetrics: user.healthMetrics,
      nutrition: user.nutrition,
      exercises: user.exercises,
      workoutData: user.workoutData
    })
  } catch (error) {
    console.error('Get user data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user data
router.put('/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update fields if provided
    if (req.body.activity) user.activity = { ...user.activity, ...req.body.activity }
    if (req.body.bodyMetrics) user.bodyMetrics = { ...user.bodyMetrics, ...req.body.bodyMetrics }
    if (req.body.healthMetrics) user.healthMetrics = { ...user.healthMetrics, ...req.body.healthMetrics }
    if (req.body.nutrition) user.nutrition = { ...user.nutrition, ...req.body.nutrition }
    if (req.body.exercises) user.exercises = { ...user.exercises, ...req.body.exercises }
    if (req.body.workoutData) user.workoutData = { ...user.workoutData, ...req.body.workoutData }

    await user.save()

    res.json({
      username: user.username,
      activity: user.activity,
      bodyMetrics: user.bodyMetrics,
      healthMetrics: user.healthMetrics,
      nutrition: user.nutrition,
      exercises: user.exercises,
      workoutData: user.workoutData
    })
  } catch (error) {
    console.error('Update user data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update exercises
router.put('/exercises', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update exercises
    if (req.body.exercises) {
      user.exercises = {
        ...user.exercises,
        exercises: req.body.exercises
      }
    }

    await user.save()

    res.json({
      success: true,
      exercises: user.exercises
    })
  } catch (error) {
    console.error('Update exercises error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
