import BodyVisualization from './BodyVisualization'
import HealthMetrics from './HealthMetrics'
import ActivityTracker from './ActivityTracker'
import NutritionPlan from './NutritionPlan'
import ExercisePlan from './ExercisePlan'

function Dashboard({ userData, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FitTrack Pro</h1>
                <p className="text-gray-600 text-xs sm:text-sm">Welcome back, {userData?.username || 'User'}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm sm:text-base font-medium shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Activity Summary */}
        <ActivityTracker data={userData?.activity} />

        {/* Body Visualization and Health Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BodyVisualization data={userData?.bodyMetrics} />
          <HealthMetrics data={userData?.healthMetrics} />
        </div>

        {/* Nutrition and Exercise Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NutritionPlan data={userData?.nutrition} />
          <ExercisePlan data={userData?.exercises} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
