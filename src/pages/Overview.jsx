import ActivityTracker from '../components/ActivityTracker'
import BodyVisualization from '../components/BodyVisualization'
import BodyPartMetrics from '../components/BodyPartMetrics'
import EnhancedCSVUpload from '../components/EnhancedCSVUpload'
import DataExport from '../components/DataExport'

function Overview({ userData, onUserDataUpdate }) {
  const activities = userData?.activity || {
    steps: 8547,
    stepsGoal: 10000,
    runningKm: 3.2,
    runningGoal: 5,
    caloriesBurned: 420
  }

  const bodyMetrics = userData?.bodyMetrics || {
    overall: 83
  }

  const completedExercises = userData?.exercises?.exercises?.filter(ex => ex.completed).length || 0
  const totalExercises = userData?.exercises?.exercises?.length || 6

  const handleUploadSuccess = (updatedData) => {
    onUserDataUpdate && onUserDataUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      {/* Hero / Welcome Banner (Strava-style transparent) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/40 to-white rounded-2xl px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8 shadow-md border border-orange-200/30 transition-all duration-300 hover:shadow-lg hover:border-orange-300/50">
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-2">
              Daily performance dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-[1.9rem] font-bold mb-2 leading-snug text-gray-900">
              Welcome back, <span className="text-orange-500">{userData?.username || 'User'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Snapshot of your training, activity and recovery for today.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <EnhancedCSVUpload onUploadSuccess={handleUploadSuccess} buttonText="Upload Activity Data" />
            <DataExport userData={userData} />
            {/* Key metrics summary (Strava-style transparent cards) */}
            <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="rounded-xl bg-gradient-to-br from-white to-orange-50/50 backdrop-blur-sm border border-orange-200/40 px-3 py-2.5 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 hover:border-orange-300/60">
                <p className="text-[11px] text-gray-500 mb-1">Overall</p>
                <p className="text-lg font-semibold text-gray-900">{bodyMetrics.overall}%</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-white to-orange-50/50 backdrop-blur-sm border border-orange-200/40 px-3 py-2.5 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 hover:border-orange-300/60">
                <p className="text-[11px] text-gray-500 mb-1">Steps</p>
                <p className="text-lg font-semibold text-gray-900">{activities.steps.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-white to-orange-50/50 backdrop-blur-sm border border-orange-200/40 px-3 py-2.5 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 hover:border-orange-300/60">
                <p className="text-[11px] text-gray-500 mb-1">Calories</p>
                <p className="text-lg font-semibold text-gray-900">{activities.caloriesBurned}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:border-orange-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Overall Score</p>
          <p className="text-4xl font-bold text-gray-900">{bodyMetrics.overall}%</p>
          <p className="text-xs text-green-600 font-semibold mt-2">Excellent Progress</p>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:border-orange-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Steps Today</p>
          <p className="text-4xl font-bold text-gray-900">{activities.steps.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">{((activities.steps / activities.stepsGoal) * 100).toFixed(0)}% of goal</p>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:border-orange-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Calories Burned</p>
          <p className="text-4xl font-bold text-gray-900">{activities.caloriesBurned}</p>
          <p className="text-xs text-gray-500 mt-2">kcal today</p>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:border-orange-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Workouts Done</p>
          <p className="text-4xl font-bold text-gray-900">{completedExercises}/{totalExercises}</p>
          <p className="text-xs text-gray-500 mt-2">{((completedExercises / totalExercises) * 100).toFixed(0)}% complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTracker data={userData?.activity} />
        <BodyVisualization data={userData?.bodyMetrics} workoutData={userData?.workoutData} />
      </div>

      {/* Body Part Metrics - moved below Activity Overview */}
      <BodyPartMetrics data={userData?.bodyMetrics} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/body-analysis" className="bg-gradient-to-br from-white to-gray-50/60 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:shadow-lg hover:border-orange-200/60 transition-all duration-300 hover:scale-[1.02] group">
          <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Body Analysis</h3>
          <p className="text-sm text-gray-600">View detailed muscle development and body composition</p>
        </a>

        <a href="/health-vitals" className="bg-gradient-to-br from-white to-red-50/40 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:shadow-lg hover:border-red-300/60 transition-all duration-300 hover:scale-[1.02] group">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Health Vitals</h3>
          <p className="text-sm text-gray-600">Monitor blood pressure, heart rate, and more</p>
        </a>

        <a href="/nutrition" className="bg-gradient-to-br from-white to-emerald-50/40 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-gray-300/40 hover:shadow-lg hover:border-emerald-300/60 transition-all duration-300 hover:scale-[1.02] group">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nutrition Plan</h3>
          <p className="text-sm text-gray-600">Track protein intake and meal recommendations</p>
        </a>
      </div>
    </div>
  )
}

export default Overview
