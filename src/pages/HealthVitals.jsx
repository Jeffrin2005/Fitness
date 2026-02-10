import HealthMetrics from '../components/HealthMetrics'

function HealthVitals({ userData }) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Vitals Monitor</h1>
        <p className="text-gray-600">Real-time tracking of your vital health metrics and indicators</p>
      </div>

      {/* Health Metrics */}
      <HealthMetrics data={userData?.healthMetrics} />

      {/* Health Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Blood Sugar</h3>
          <p className="text-sm text-gray-600 mb-3">Your glucose levels are within normal range</p>
          <div className="text-xs text-gray-500">
            <p>• Maintain balanced diet</p>
            <p>• Regular exercise helps</p>
            <p>• Monitor after meals</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Blood Pressure</h3>
          <p className="text-sm text-gray-600 mb-3">Optimal cardiovascular health indicators</p>
          <div className="text-xs text-gray-500">
            <p>• Reduce sodium intake</p>
            <p>• Stay hydrated</p>
            <p>• Manage stress levels</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Heart Rate</h3>
          <p className="text-sm text-gray-600 mb-3">Resting heart rate is healthy and stable</p>
          <div className="text-xs text-gray-500">
            <p>• Cardio exercises help</p>
            <p>• Track during workouts</p>
            <p>• Aim for 60-100 bpm</p>
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Health Trends</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Avg Heart Rate</p>
            <p className="text-2xl font-bold text-gray-900">72 bpm</p>
            <p className="text-xs text-green-600 font-semibold mt-1">↓ 2 bpm</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Avg Blood Sugar</p>
            <p className="text-2xl font-bold text-gray-900">94 mg/dL</p>
            <p className="text-xs text-green-600 font-semibold mt-1">Stable</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Avg BP Systolic</p>
            <p className="text-2xl font-bold text-gray-900">118 mmHg</p>
            <p className="text-xs text-green-600 font-semibold mt-1">↓ 2 mmHg</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Health Score</p>
            <p className="text-2xl font-bold text-gray-900">95/100</p>
            <p className="text-xs text-green-600 font-semibold mt-1">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthVitals
