import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    sparse: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  picture: {
    type: String
  },
  activity: {
    steps: { type: Number, default: 0 },
    stepsGoal: { type: Number, default: 10000 },
    runningKm: { type: Number, default: 0 },
    runningGoal: { type: Number, default: 5 },
    caloriesBurned: { type: Number, default: 0 }
  },
  bodyMetrics: {
    chest: { type: Number, default: 50 },
    arms: { type: Number, default: 50 },
    core: { type: Number, default: 50 },
    legs: { type: Number, default: 50 },
    overall: { type: Number, default: 50 }
  },
  healthMetrics: {
    bloodSugar: { type: Number, default: 95 },
    bloodPressure: {
      systolic: { type: Number, default: 120 },
      diastolic: { type: Number, default: 80 }
    },
    heartRate: { type: Number, default: 72 },
    weight: { type: Number, default: 70 },
    bmi: { type: Number, default: 22 },
    bodyFat: { type: Number, default: 20 }
  },
  nutrition: {
    proteinTarget: { type: Number, default: 150 },
    proteinConsumed: { type: Number, default: 0 },
    recommendedFoods: [{
      name: String,
      protein: Number,
      serving: String,
      emoji: String
    }]
  },
  exercises: {
    exercises: [{
      id: Number,
      name: String,
      sets: Number,
      reps: Number,
      duration: String,
      completed: Boolean,
      category: String,
      emoji: String
    }]
  },
  workoutData: {
    pushups: {
      count: { type: Number, default: 0 },
      frequency: { type: Number, default: 0 }
    },
    armExercises: {
      count: { type: Number, default: 0 },
      frequency: { type: Number, default: 0 }
    },
    chestExercises: {
      count: { type: Number, default: 0 },
      frequency: { type: Number, default: 0 }
    },
    legExercises: {
      count: { type: Number, default: 0 },
      frequency: { type: Number, default: 0 }
    },
    coreExercises: {
      count: { type: Number, default: 0 },
      frequency: { type: Number, default: 0 }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', userSchema)
