import { useState, useEffect } from 'react'

function WorkoutSidebar({ userData, onWorkoutUpdate }) {
  const [workoutData, setWorkoutData] = useState({
    pushups: { count: 0, frequency: 0 },
    armExercises: { count: 0, frequency: 0 },
    chestExercises: { count: 0, frequency: 0 },
    legExercises: { count: 0, frequency: 0 },
    coreExercises: { count: 0, frequency: 0 }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (userData?.workoutData) {
      setWorkoutData(userData.workoutData)
    }
  }, [userData])

  const handleInputChange = (exercise, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: field === 'count' ? parseInt(value) || 0 : parseInt(value) || 0
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/workout/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ workoutData })
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ Workout updated! Body growing stronger! 💪')
        if (onWorkoutUpdate) {
          onWorkoutUpdate(result)
        }
      } else {
        const error = await response.json()
        setMessage(`❌ ${error.message || 'Failed to update workout'}`)
      }
    } catch (error) {
      setMessage('❌ Connection error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleQuickWorkout = async (exerciseType) => {
    setIsSubmitting(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/workout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          exerciseType,
          count: 10,
          duration: '15min'
        })
      })

      if (response.ok) {
        const result = await response.json()
        setWorkoutData(result.workoutData)
        setMessage('✅ Quick workout completed! 🎉')
        if (onWorkoutUpdate) {
          onWorkoutUpdate(result)
        }
      } else {
        setMessage('❌ Failed to record workout')
      }
    } catch (error) {
      setMessage('❌ Connection error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Daily Workout Tracker</h2>
        <p className="text-sm text-gray-600">Track your exercises and watch your body grow! 🏋️</p>
      </div>

      {/* Quick Workout Buttons */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Add Workout</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleQuickWorkout('pushups')}
            disabled={isSubmitting}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            💪 +10 Pushups
          </button>
          <button
            onClick={() => handleQuickWorkout('arms')}
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            💪 Arm Workout
          </button>
          <button
            onClick={() => handleQuickWorkout('chest')}
            disabled={isSubmitting}
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            💪 Chest Workout
          </button>
          <button
            onClick={() => handleQuickWorkout('legs')}
            disabled={isSubmitting}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            🦵 Leg Workout
          </button>
          <button
            onClick={() => handleQuickWorkout('core')}
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            🧘 Core Workout
          </button>
          <button
            onClick={() => handleQuickWorkout('pushups')}
            disabled={isSubmitting}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            🔥 Full Body
          </button>
        </div>
      </div>

      {/* Detailed Workout Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Detailed Tracking</h3>
        
        <div className="space-y-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <label className="text-xs font-semibold text-red-700 block mb-1">💪 Push-ups</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={workoutData.pushups.count}
                onChange={(e) => handleInputChange('pushups', 'count', e.target.value)}
                className="w-full px-2 py-1 border border-red-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Count"
                min="0"
              />
              <input
                type="number"
                value={workoutData.pushups.frequency}
                onChange={(e) => handleInputChange('pushups', 'frequency', e.target.value)}
                className="w-full px-2 py-1 border border-red-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Days/week"
                min="0"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <label className="text-xs font-semibold text-blue-700 block mb-1">💪 Arm Exercises</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={workoutData.armExercises.count}
                onChange={(e) => handleInputChange('armExercises', 'count', e.target.value)}
                className="w-full px-2 py-1 border border-blue-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Count"
                min="0"
              />
              <input
                type="number"
                value={workoutData.armExercises.frequency}
                onChange={(e) => handleInputChange('armExercises', 'frequency', e.target.value)}
                className="w-full px-2 py-1 border border-blue-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Days/week"
                min="0"
              />
            </div>
          </div>

          <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
            <label className="text-xs font-semibold text-teal-700 block mb-1">💪 Chest Exercises</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={workoutData.chestExercises.count}
                onChange={(e) => handleInputChange('chestExercises', 'count', e.target.value)}
                className="w-full px-2 py-1 border border-teal-300 rounded text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Count"
                min="0"
              />
              <input
                type="number"
                value={workoutData.chestExercises.frequency}
                onChange={(e) => handleInputChange('chestExercises', 'frequency', e.target.value)}
                className="w-full px-2 py-1 border border-teal-300 rounded text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Days/week"
                min="0"
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
            <label className="text-xs font-semibold text-indigo-700 block mb-1">🦵 Leg Exercises</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={workoutData.legExercises.count}
                onChange={(e) => handleInputChange('legExercises', 'count', e.target.value)}
                className="w-full px-2 py-1 border border-indigo-300 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Count"
                min="0"
              />
              <input
                type="number"
                value={workoutData.legExercises.frequency}
                onChange={(e) => handleInputChange('legExercises', 'frequency', e.target.value)}
                className="w-full px-2 py-1 border border-indigo-300 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Days/week"
                min="0"
              />
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <label className="text-xs font-semibold text-yellow-700 block mb-1">🧘 Core Exercises</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={workoutData.coreExercises.count}
                onChange={(e) => handleInputChange('coreExercises', 'count', e.target.value)}
                className="w-full px-2 py-1 border border-yellow-300 rounded text-xs focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Count"
                min="0"
              />
              <input
                type="number"
                value={workoutData.coreExercises.frequency}
                onChange={(e) => handleInputChange('coreExercises', 'frequency', e.target.value)}
                className="w-full px-2 py-1 border border-yellow-300 rounded text-xs focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Days/week"
                min="0"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '🔄 Updating...' : '🚀 Update Body Growth'}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-xs font-medium text-center ${
          message.includes('✅') ? 'bg-green-100 text-green-700 border border-green-200' : 
          'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
        <h4 className="text-xs font-bold text-orange-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-xs text-orange-700 space-y-1">
          <li>• More exercises = bigger muscles!</li>
          <li>• Consistency is key - track daily</li>
          <li>• Watch your 3D body grow in real-time</li>
          <li>• Mix different exercises for balanced growth</li>
        </ul>
      </div>
    </div>
  )
}

export default WorkoutSidebar
