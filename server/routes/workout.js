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

// Update workout data
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update workout data
    if (req.body.workoutData) {
      user.workoutData = {
        ...user.workoutData,
        ...req.body.workoutData
      }
    }

    // Recalculate body metrics based on workout data
    const workoutData = user.workoutData
    
    // Calculate new body metrics based on workout progress
    const newBodyMetrics = { ...user.bodyMetrics }
    
    // Arms calculation (pushups + arm exercises)
    const armScore = (workoutData.pushups?.count || 0) * 0.3 + (workoutData.armExercises?.count || 0) * 0.7
    newBodyMetrics.arms = Math.min(100, 50 + (armScore * 0.5))
    
    // Chest calculation (pushups + chest exercises)
    const chestScore = (workoutData.pushups?.count || 0) * 0.4 + (workoutData.chestExercises?.count || 0) * 0.6
    newBodyMetrics.chest = Math.min(100, 50 + (chestScore * 0.4))
    
    // Legs calculation
    const legScore = (workoutData.legExercises?.count || 0) * 0.8
    newBodyMetrics.legs = Math.min(100, 50 + (legScore * 0.3))
    
    // Core calculation
    const coreScore = (workoutData.coreExercises?.count || 0) * 0.6
    newBodyMetrics.core = Math.min(100, 50 + (coreScore * 0.8))
    
    // Calculate overall score
    newBodyMetrics.overall = Math.round(
      (newBodyMetrics.arms + newBodyMetrics.chest + newBodyMetrics.legs + newBodyMetrics.core) / 4
    )

    user.bodyMetrics = newBodyMetrics
    await user.save()

    res.json({
      success: true,
      workoutData: user.workoutData,
      bodyMetrics: user.bodyMetrics,
      message: 'Workout data updated successfully'
    })
  } catch (error) {
    console.error('Update workout data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get workout data
router.get('/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('workoutData bodyMetrics')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      workoutData: user.workoutData,
      bodyMetrics: user.bodyMetrics
    })
  } catch (error) {
    console.error('Get workout data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add workout session
router.post('/session', authMiddleware, async (req, res) => {
  try {
    const { exerciseType, count, duration } = req.body
    
    if (!exerciseType || (!count && !duration)) {
      return res.status(400).json({ message: 'Exercise type and count or duration required' })
    }

    const user = await User.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update workout data based on exercise type
    const workoutData = user.workoutData
    
    switch (exerciseType) {
      case 'pushups':
        workoutData.pushups.count += count || 0
        workoutData.pushups.frequency += 1
        break
      case 'arms':
        workoutData.armExercises.count += count || 0
        workoutData.armExercises.frequency += 1
        break
      case 'chest':
        workoutData.chestExercises.count += count || 0
        workoutData.chestExercises.frequency += 1
        break
      case 'legs':
        workoutData.legExercises.count += count || 0
        workoutData.legExercises.frequency += 1
        break
      case 'core':
        workoutData.coreExercises.count += count || 0
        workoutData.coreExercises.frequency += 1
        break
      default:
        return res.status(400).json({ message: 'Invalid exercise type' })
    }

    user.workoutData = workoutData
    
    // Recalculate body metrics
    const newBodyMetrics = { ...user.bodyMetrics }
    
    const armScore = (workoutData.pushups?.count || 0) * 0.3 + (workoutData.armExercises?.count || 0) * 0.7
    newBodyMetrics.arms = Math.min(100, 50 + (armScore * 0.5))
    
    const chestScore = (workoutData.pushups?.count || 0) * 0.4 + (workoutData.chestExercises?.count || 0) * 0.6
    newBodyMetrics.chest = Math.min(100, 50 + (chestScore * 0.4))
    
    const legScore = (workoutData.legExercises?.count || 0) * 0.8
    newBodyMetrics.legs = Math.min(100, 50 + (legScore * 0.3))
    
    const coreScore = (workoutData.coreExercises?.count || 0) * 0.6
    newBodyMetrics.core = Math.min(100, 50 + (coreScore * 0.8))
    
    newBodyMetrics.overall = Math.round(
      (newBodyMetrics.arms + newBodyMetrics.chest + newBodyMetrics.legs + newBodyMetrics.core) / 4
    )

    user.bodyMetrics = newBodyMetrics
    await user.save()

    res.json({
      success: true,
      workoutData: user.workoutData,
      bodyMetrics: user.bodyMetrics,
      message: 'Workout session recorded successfully'
    })
  } catch (error) {
    console.error('Add workout session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
