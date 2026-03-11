import express from 'express'
import jwt from 'jsonwebtoken'
import Group from '../models/Group.js'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

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

const generateCode = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

// List groups that the current user is a member of
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({ memberIds: req.userId })
      .select('name code ownerId memberIds createdAt')
      .sort({ createdAt: -1 })

    res.json({ groups })
  } catch (error) {
    console.error('List my groups error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create a new group and return its access code
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body

    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({ message: 'Group name is required' })
    }

    let code
    for (let i = 0; i < 10; i += 1) {
      const candidate = generateCode(6)
      const exists = await Group.findOne({ code: candidate }).select('_id')
      if (!exists) {
        code = candidate
        break
      }
    }

    if (!code) {
      return res.status(500).json({ message: 'Failed to generate group code' })
    }

    const group = new Group({
      name: String(name).trim(),
      code,
      ownerId: req.userId,
      memberIds: [req.userId]
    })

    await group.save()

    res.status(201).json({
      success: true,
      group: {
        _id: group._id,
        name: group.name,
        code: group.code,
        ownerId: group.ownerId,
        memberIds: group.memberIds,
        createdAt: group.createdAt
      }
    })
  } catch (error) {
    console.error('Create group error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Join a group using access code
router.post('/join', authMiddleware, async (req, res) => {
  try {
    const { code } = req.body

    if (!code || String(code).trim().length < 4) {
      return res.status(400).json({ message: 'Access code is required' })
    }

    const group = await Group.findOne({ code: String(code).trim().toUpperCase() })

    if (!group) {
      return res.status(404).json({ message: 'Invalid access code' })
    }

    const alreadyMember = group.memberIds.some((id) => String(id) === String(req.userId))
    if (!alreadyMember) {
      group.memberIds.push(req.userId)
      await group.save()
    }

    res.json({
      success: true,
      group: {
        _id: group._id,
        name: group.name,
        code: group.code,
        ownerId: group.ownerId,
        memberIds: group.memberIds,
        createdAt: group.createdAt
      }
    })
  } catch (error) {
    console.error('Join group error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// View a group's members and their progress
router.get('/:groupId', authMiddleware, async (req, res) => {
  try {
    const { groupId } = req.params

    const group = await Group.findById(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }

    const isMember = group.memberIds.some((id) => String(id) === String(req.userId))
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this group' })
    }

    const users = await User.find({ _id: { $in: group.memberIds } })
      .select('username bodyMetrics workoutData currentStreak lastWorkoutAt')

    res.json({
      group: {
        _id: group._id,
        name: group.name,
        code: group.code,
        ownerId: group.ownerId,
        memberIds: group.memberIds,
        createdAt: group.createdAt
      },
      members: users.map((u) => ({
        _id: u._id,
        username: u.username,
        bodyMetrics: u.bodyMetrics,
        workoutData: u.workoutData,
        currentStreak: u.currentStreak || 0,
        lastWorkoutAt: u.lastWorkoutAt || null
      }))
    })
  } catch (error) {
    console.error('Get group error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
