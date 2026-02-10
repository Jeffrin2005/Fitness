import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from '../server/routes/auth.js'
import userRoutes from '../server/routes/user.js'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err))
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Export for Vercel
export default app
