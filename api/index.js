import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from '../server/routes/auth.js'
import userRoutes from '../server/routes/user.js'
import workoutRoutes from '../server/routes/workout.js'
import groupRoutes from '../server/routes/groups.js'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return
  }
  
  try {
    console.log('⏳ Connecting to MongoDB...')
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    })
    isConnected = db.connections[0].readyState === 1
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
  }
}

// Apply DB connection middleware before routes
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/workout', workoutRoutes)
app.use('/api/groups', groupRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Export for Vercel
export default app
