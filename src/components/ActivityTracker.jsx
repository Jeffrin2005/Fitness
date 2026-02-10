function ActivityTracker({ data }) {
  const activities = data || {
    steps: 8547,
    stepsGoal: 10000,
    runningKm: 3.2,
    runningGoal: 5,
    caloriesBurned: 420
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
    </div>
  )
}

export default ActivityTracker
