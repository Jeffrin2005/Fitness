import { useState, useEffect } from 'react'

function ActivityTracker({ data }) {
  const [activities, setActivities] = useState(data || {
    steps: 0,
    stepsGoal: 10000,
    runningKm: 0,
    runningGoal: 5,
    caloriesBurned: 0
  })

  useEffect(() => {
    // Load initial data from localStorage first, then override with prop if provided
    const csvActivityData = localStorage.getItem('activityData')
    let initialData = {
      steps: 0,
      stepsGoal: 10000,
      runningKm: 0,
      runningGoal: 5,
      caloriesBurned: 0
    }
    
    // Load from localStorage if available
    if (csvActivityData) {
      try {
        const savedData = JSON.parse(csvActivityData)
        initialData = savedData
      } catch (error) {
        console.error('Failed to parse activity data from CSV:', error)
      }
    }
    
    // Override with prop data if provided (prop takes precedence)
    if (data) {
      setActivities(data)
    } else {
      setActivities(initialData)
    }
  }, [data])

  // Listen for CSV data updates
  useEffect(() => {
    const handleCSVDataUpload = (event) => {
      const csvData = event.detail
      if (csvData) {
        const newActivityData = {
          steps: parseInt(csvData.steps) || 0,
          stepsGoal: parseInt(csvData.stepsGoal) || 10000,
          runningKm: parseFloat(csvData.runningKm) || 0,
          runningGoal: parseFloat(csvData.runningGoal) || 5,
          caloriesBurned: parseInt(csvData.caloriesBurned) || 0
        }
        setActivities(newActivityData)
      }
    }

    window.addEventListener('csvDataUploaded', handleCSVDataUpload)
    return () => window.removeEventListener('csvDataUploaded', handleCSVDataUpload)
  }, [])

  const hashString = (s) => {
    let h = 0
    for (let i = 0; i < s.length; i += 1) {
      h = (h * 31 + s.charCodeAt(i)) >>> 0
    }
    return h
  }

  const createRng = (seed) => {
    let x = seed >>> 0
    return () => {
      x ^= x << 13
      x ^= x >>> 17
      x ^= x << 5
      return (x >>> 0) / 4294967296
    }
  }

  const generateActivityMap = (weeksCount = 14) => {
    const seed = hashString('overview-activity-tracker')
    const rnd = createRng(seed)
    const probability = 0.65

    const weeks = []
    for (let w = 0; w < weeksCount; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        const daysAgo = (weeksCount - 1 - w) * 7 + (6 - d)
        const date = new Date()
        date.setDate(date.getDate() - daysAgo)
        const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

        let level = 0
        if (rnd() < probability) {
          level = Math.floor(rnd() * 4) + 1
        }
        
        // Make today reflect current progress
        if (daysAgo === 0) {
          const progress = (activities.steps / activities.stepsGoal)
          if (progress === 0) level = 0
          else if (progress < 0.3) level = 1
          else if (progress < 0.6) level = 2
          else if (progress < 0.9) level = 3
          else level = 4
        }

        week.push({ level, dateStr })
      }
      weeks.push(week)
    }
    return weeks
  }

  const stepsProgress = (activities.steps / activities.stepsGoal) * 100
  const runningProgress = (activities.runningKm / activities.runningGoal) * 100

  return (
    <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-300/40 p-6 mb-6 transition-all duration-300 hover:shadow-lg hover:border-orange-200/60">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Activity Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Steps */}
        <div className="bg-blue-50/60 backdrop-blur-sm rounded-xl p-5 border border-blue-200/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-blue-50/80">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>
            <span className="text-sm font-bold text-blue-700 bg-white px-3 py-1 rounded-full">
              {stepsProgress.toFixed(0)}%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Steps Walked</h3>
          <p className="text-3xl font-bold text-gray-900">{activities.steps.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">Goal: {activities.stepsGoal.toLocaleString()} steps</p>
          <div className="mt-3 bg-white rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
              style={{ width: `${Math.min(stepsProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Running */}
        <div className="bg-emerald-50/60 backdrop-blur-sm rounded-xl p-5 border border-emerald-200/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-emerald-50/80">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-sm font-bold text-emerald-700 bg-white px-3 py-1 rounded-full">
              {runningProgress.toFixed(0)}%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Distance Run</h3>
          <p className="text-3xl font-bold text-gray-900">{activities.runningKm} <span className="text-lg">km</span></p>
          <p className="text-xs text-gray-600 mt-1">Goal: {activities.runningGoal} km</p>
          <div className="mt-3 bg-white rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500"
              style={{ width: `${Math.min(runningProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Calories */}
        <div className="bg-orange-50/60 backdrop-blur-sm rounded-xl p-5 border border-orange-200/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-orange-50/80">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-orange-700 bg-white px-3 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Calories Burned</h3>
          <p className="text-3xl font-bold text-gray-900">{activities.caloriesBurned} <span className="text-lg">kcal</span></p>
          <p className="text-xs text-gray-600 mt-1">Keep up the great work!</p>
          <div className="mt-3 bg-white rounded-full h-2 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-full w-3/4 transition-all duration-500" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200/60">
        <div className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-500">⚡</span> Activity Streak
        </div>
        <div className="flex gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-hide py-1">
          {generateActivityMap(16).map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5 shrink-0">
              {week.map((item, dIdx) => (
                <div
                  key={dIdx}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] cursor-pointer hover:ring-2 hover:ring-offset-1 ring-green-400 transition-all ${
                    item.level === 0 ? 'bg-gray-100' :
                    item.level === 1 ? 'bg-green-200' :
                    item.level === 2 ? 'bg-green-400' :
                    item.level === 3 ? 'bg-green-500' :
                    'bg-green-700'
                  }`}
                  title={`${item.dateStr}: Activity level ${item.level}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 font-medium">
          <div>16 Weeks</div>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] bg-gray-100" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] bg-green-200" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] bg-green-400" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] bg-green-500" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] bg-green-700" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityTracker
