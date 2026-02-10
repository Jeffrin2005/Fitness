import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-tracker'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
