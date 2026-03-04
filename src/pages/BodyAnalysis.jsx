import { useState, useEffect } from 'react'
import AIHealthAdvice from '../components/AIHealthAdvice'

function BodyAnalysis({ userData }) {
  const [healthMetrics, setHealthMetrics] = useState({})
  const [bodyMetrics, setBodyMetrics] = useState({
    chest: 0,
    arms: 0,
    core: 0,
    legs: 0,
    overall: 0
  })
  const [activityMetrics, setActivityMetrics] = useState({
    steps: 0,
    caloriesBurned: 0,
    runningKm: 0
  })

  // Load data from localStorage on mount
  useEffect(() => {
    // Load health metrics
    const savedHealthData = localStorage.getItem('healthMetricsData')
    if (savedHealthData) {
      try {
        setHealthMetrics(JSON.parse(savedHealthData))
      } catch (error) {
        console.error('Failed to parse health metrics:', error)
      }
    }

    // Load body metrics
    const savedBodyData = localStorage.getItem('workoutData')
    if (savedBodyData) {
      try {
        const workoutData = JSON.parse(savedBodyData)
        setBodyMetrics({
          chest: workoutData.chestExercises?.count || 0,
          arms: workoutData.armExercises?.count || 0,
          core: workoutData.coreExercises?.count || 0,
          legs: workoutData.legExercises?.count || 0,
          overall: workoutData.pushups?.count || 0
        })
      } catch (error) {
        console.error('Failed to parse body metrics:', error)
      }
    }

    // Load activity metrics
    const savedActivityData = localStorage.getItem('activityData')
    if (savedActivityData) {
      try {
        setActivityMetrics(JSON.parse(savedActivityData))
      } catch (error) {
        console.error('Failed to parse activity metrics:', error)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Body & Health Analysis</h1>
            <p className="text-gray-600 mt-1">Dashboard view of your vitals, activity, and training signals</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3">
              <div className="text-[11px] font-semibold text-gray-500">Profile</div>
              <div className="text-sm font-bold text-gray-900">{userData?.username || 'User'}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3">
              <div className="text-[11px] font-semibold text-gray-500">Last check-in</div>
              <div className="text-sm font-bold text-gray-900">Today</div>
            </div>
          </div>
        </div>
      </div>

      <AIHealthAdvice
        healthMetrics={healthMetrics}
        bodyMetrics={bodyMetrics}
        activityMetrics={activityMetrics}
      />
    </div>
  )
}

export default BodyAnalysis
