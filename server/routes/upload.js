import express from 'express'
import multer from 'multer'
import csv from 'csv-parser'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Use the same JWT secret as auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  }
})

// Helper function to validate and parse number
const parseNumber = (value, defaultValue = 0) => {
  const parsed = parseFloat(value)
  return isNaN(parsed) ? defaultValue : parsed
}

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

// CSV Upload Route
router.post('/csv', upload.single('csvFile'), authMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const userId = req.userId

    const results = []
    const filePath = req.file.path

    // Parse CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Clean up uploaded file
          fs.unlinkSync(filePath)

          if (results.length === 0) {
            return res.status(400).json({ message: 'CSV file is empty' })
          }

          // Process first row of data
          const csvData = results[0]

          // Validate required columns
          const requiredColumns = ['username']
          const missingColumns = requiredColumns.filter(col => !csvData[col])

          if (missingColumns.length > 0) {
            return res.status(400).json({
              message: `Missing required columns: ${missingColumns.join(', ')}`
            })
          }

          // Prepare update data
          const updateData = {
            activity: {
              steps: parseNumber(csvData.steps, 0),
              stepsGoal: parseNumber(csvData.stepsGoal, 10000),
              runningKm: parseNumber(csvData.runningKm, 0),
              runningGoal: parseNumber(csvData.runningGoal, 5),
              caloriesBurned: parseNumber(csvData.caloriesBurned, 0)
            },
            bodyMetrics: {
              chest: parseNumber(csvData.chest, 50),
              arms: parseNumber(csvData.arms, 50),
              core: parseNumber(csvData.core, 50),
              legs: parseNumber(csvData.legs, 50),
              overall: parseNumber(csvData.overall, 50)
            },
            healthMetrics: {
              bloodSugar: parseNumber(csvData.bloodSugar, 95),
              bloodPressure: {
                systolic: parseNumber(csvData.bloodPressureSystolic, 120),
                diastolic: parseNumber(csvData.bloodPressureDiastolic, 80)
              },
              heartRate: parseNumber(csvData.heartRate, 72),
              weight: parseNumber(csvData.weight, 70),
              bmi: parseNumber(csvData.bmi, 22),
              bodyFat: parseNumber(csvData.bodyFat, 20)
            }
          }

          // Update user data in database
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
          )

          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
          }

          res.json({
            message: 'Data uploaded successfully',
            data: updatedUser
          })

        } catch (error) {
          console.error('Error processing CSV:', error)
          res.status(500).json({ message: 'Error processing CSV data' })
        }
      })
      .on('error', (error) => {
        // Clean up uploaded file on error
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        console.error('CSV parsing error:', error)
        res.status(500).json({ message: 'Error parsing CSV file' })
      })

  } catch (error) {
    console.error('Upload error:', error)

    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({ message: 'Server error during upload' })
  }
})

// Photo Upload Route
router.post('/photos', upload.array('photos', 10), authMiddleware, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No photos uploaded' })
    }

    const userId = req.userId
    const uploadedPhotos = []

    for (const file of req.files) {
      // Move file to permanent location
      const fileName = `${userId}_${Date.now()}_${file.originalname}`
      const newPath = `uploads/photos/${fileName}`

      // Ensure photos directory exists
      if (!fs.existsSync('uploads/photos')) {
        fs.mkdirSync('uploads/photos', { recursive: true })
      }

      fs.renameSync(file.path, newPath)

      uploadedPhotos.push({
        id: Date.now() + Math.random(),
        url: `/uploads/photos/${fileName}`,
        date: new Date().toISOString(),
        originalName: file.originalname
      })
    }

    // Save photo metadata to user
    const user = await User.findById(userId)
    if (!user.progressPhotos) {
      user.progressPhotos = []
    }
    user.progressPhotos.push(...uploadedPhotos)
    await user.save()

    res.json({
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      photos: uploadedPhotos,
      user: user
    })

  } catch (error) {
    console.error('Photo upload error:', error)

    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
    }

    res.status(500).json({ message: 'Error uploading photos' })
  }
})

// Delete Photo Route
router.delete('/photos/:photoId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const photoId = req.params.photoId

    console.log('Delete request for photoId:', photoId, 'by user:', userId)

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.progressPhotos || user.progressPhotos.length === 0) {
      return res.status(404).json({ message: 'No photos found' })
    }

    // Find photo by ID - simple approach
    let photoToDelete = null
    let photoIndex = -1

    for (let i = 0; i < user.progressPhotos.length; i++) {
      const photo = user.progressPhotos[i]
      if (photo && photo.id && (photo.id.toString() === photoId.toString() || photo.id == photoId)) {
        photoToDelete = photo
        photoIndex = i
        break
      }
    }

    if (photoIndex === -1) {
      console.log('Photo not found. Available photo count:', user.progressPhotos.length)
      return res.status(404).json({ message: 'Photo not found' })
    }

    console.log('Found photo to delete:', photoToDelete)

    // Delete file from filesystem
    if (photoToDelete && photoToDelete.url) {
      const filePath = `.${photoToDelete.url}`
      console.log('Attempting to delete file:', filePath)

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
          console.log('File deleted successfully')
        } else {
          console.log('File not found at path:', filePath)
        }
      } catch (fileError) {
        console.log('Error deleting file:', fileError.message)
      }
    }

    // Remove from database
    user.progressPhotos.splice(photoIndex, 1)
    await user.save()

    res.json({
      message: 'Photo deleted successfully',
      user: user
    })

  } catch (error) {
    console.error('Photo deletion error:', error)
    res.status(500).json({ message: 'Error deleting photo', error: error.message })
  }
})

export default router
