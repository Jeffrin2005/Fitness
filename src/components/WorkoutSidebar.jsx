import { useState, useEffect } from 'react'

function WorkoutSidebar({ userData, onWorkoutUpdate }) {
  const [animateHeader, setAnimateHeader] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
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
    setAnimateHeader(true)
    const timer = setTimeout(() => setAnimateContent(true), 200)
    return () => clearTimeout(timer)
    
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
    <div className="w-80 bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff), linear-gradient(-45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}></div>
        </div>
      </div>
      
      <div className="relative z-10 p-6 h-fit">
        {/* Premium Header */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${
          animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daily Workout Tracker
            </h2>
          </div>
          <p className="text-sm text-gray-600">Track your exercises and watch your body grow! 🏋️</p>
        </div>

        {/* Quick Workout Buttons */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${
          animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Quick Add Workout</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickWorkout('pushups')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">💪</span>
                <span>+10 Pushups</span>
              </span>
            </button>
            <button
              onClick={() => handleQuickWorkout('arms')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">💪</span>
                <span>Arm Workout</span>
              </span>
            </button>
            <button
              onClick={() => handleQuickWorkout('chest')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">💪</span>
                <span>Chest Workout</span>
              </span>
            </button>
            <button
              onClick={() => handleQuickWorkout('legs')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">🦵</span>
                <span>Leg Workout</span>
              </span>
            </button>
            <button
              onClick={() => handleQuickWorkout('core')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">🧘</span>
                <span>Core Workout</span>
              </span>
            </button>
            <button
              onClick={() => handleQuickWorkout('pushups')}
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="group-hover:scale-110 transition-transform">🔥</span>
                <span>Full Body</span>
              </span>
            </button>
          </div>
        </div>

        {/* Detailed Workout Input */}
        <form onSubmit={handleSubmit} className={`space-y-4 transition-all duration-700 delay-300 ${
          animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Detailed Tracking</h3>
          
          <div className="space-y-3">
            <div className="group bg-white border border-red-200 p-3 hover:border-red-300 hover:shadow-sm transition-all duration-300">
              <label className="text-xs font-medium text-red-600 block mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white text-[10px]">💪</span>
                Push-ups
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={workoutData.pushups.count}
                  onChange={(e) => handleInputChange('pushups', 'count', e.target.value)}
                  className="w-full px-2 py-1 border border-red-300 text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Count"
                  min="0"
                />
                <input
                  type="number"
                  value={workoutData.pushups.frequency}
                  onChange={(e) => handleInputChange('pushups', 'frequency', e.target.value)}
                  className="w-full px-2 py-1 border border-red-300 text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Days/week"
                  min="0"
                />
              </div>
            </div>

            <div className="group bg-white border border-blue-200 p-3 hover:border-blue-300 hover:shadow-sm transition-all duration-300">
              <label className="text-xs font-medium text-blue-600 block mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px]">💪</span>
                Arm Exercises
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={workoutData.armExercises.count}
                  onChange={(e) => handleInputChange('armExercises', 'count', e.target.value)}
                  className="w-full px-2 py-1 border border-blue-300 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Count"
                  min="0"
                />
                <input
                  type="number"
                  value={workoutData.armExercises.frequency}
                  onChange={(e) => handleInputChange('armExercises', 'frequency', e.target.value)}
                  className="w-full px-2 py-1 border border-blue-300 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Days/week"
                  min="0"
                />
              </div>
            </div>

            <div className="group bg-white border border-teal-200 p-3 hover:border-teal-300 hover:shadow-sm transition-all duration-300">
              <label className="text-xs font-medium text-teal-600 block mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white text-[10px]">💪</span>
                Chest Exercises
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={workoutData.chestExercises.count}
                  onChange={(e) => handleInputChange('chestExercises', 'count', e.target.value)}
                  className="w-full px-2 py-1 border border-teal-300 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  placeholder="Count"
                  min="0"
                />
                <input
                  type="number"
                  value={workoutData.chestExercises.frequency}
                  onChange={(e) => handleInputChange('chestExercises', 'frequency', e.target.value)}
                  className="w-full px-2 py-1 border border-teal-300 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  placeholder="Days/week"
                  min="0"
                />
              </div>
            </div>

            <div className="group bg-white border border-indigo-200 p-3 hover:border-indigo-300 hover:shadow-sm transition-all duration-300">
              <label className="text-xs font-medium text-indigo-600 block mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-[10px]">🦵</span>
                Leg Exercises
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={workoutData.legExercises.count}
                  onChange={(e) => handleInputChange('legExercises', 'count', e.target.value)}
                  className="w-full px-2 py-1 border border-indigo-300 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Count"
                  min="0"
                />
                <input
                  type="number"
                  value={workoutData.legExercises.frequency}
                  onChange={(e) => handleInputChange('legExercises', 'frequency', e.target.value)}
                  className="w-full px-2 py-1 border border-indigo-300 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Days/week"
                  min="0"
                />
              </div>
            </div>

            <div className="group bg-white border border-amber-200 p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-300">
              <label className="text-xs font-medium text-amber-600 block mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white text-[10px]">🧘</span>
                Core Exercises
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={workoutData.coreExercises.count}
                  onChange={(e) => handleInputChange('coreExercises', 'count', e.target.value)}
                  className="w-full px-2 py-1 border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  placeholder="Count"
                  min="0"
                />
                <input
                  type="number"
                  value={workoutData.coreExercises.frequency}
                  onChange={(e) => handleInputChange('coreExercises', 'frequency', e.target.value)}
                  className="w-full px-2 py-1 border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  placeholder="Days/week"
                  min="0"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🔄</span>
                <span>Updating...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span>Update Body Growth</span>
              </span>
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <div className={`mt-4 p-3 text-xs font-medium text-center transition-all duration-300 ${
            message.includes('✅') 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Tips */}
        <div className={`mt-6 p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 transition-all duration-700 delay-400 ${
          animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h4 className="text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2 flex items-center gap-2">
            <span className="w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center text-white text-[10px]">💡</span>
            Pro Tips
          </h4>
          <ul className="text-xs text-orange-700 space-y-1">
            <li className="flex items-start gap-1">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>More exercises = bigger muscles!</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>Consistency is key - track daily</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>Watch your 3D body grow in real-time</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-orange-500 mt-0.5">•</span>
              <span>Mix different exercises for balanced growth</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WorkoutSidebar
