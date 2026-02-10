import BodyVisualization from '../components/BodyVisualization'

function BodyAnalysis({ userData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Body Composition Analysis</h1>
        <p className="text-gray-600">Track your muscle development and body transformation progress</p>
      </div>
      <BodyVisualization data={userData?.bodyMetrics} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Strongest Area</span>
              <span className="text-sm font-bold text-blue-600">Legs (88%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Focus Area</span>
              <span className="text-sm font-bold text-orange-600">Arms (78%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Weekly Improvement</span>
              <span className="text-sm font-bold text-green-600">+3.2%</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Upper Body Focus</p>
              <p className="text-xs text-gray-600">Increase arm and chest exercises by 15%</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Maintain Core Strength</p>
              <p className="text-xs text-gray-600">Continue current core routine for balance</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Recovery Time</p>
              <p className="text-xs text-gray-600">Ensure 48 hours rest between muscle groups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyAnalysis
