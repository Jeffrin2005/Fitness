import Simple3DModel from '../components/Simple3DModel'

function BodyAnalysis({ userData }) {
  const bodyMetrics = userData?.bodyMetrics || {
    chest: 85,
    arms: 78,
    core: 82,
    legs: 88,
    overall: 83
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">3D Body Analysis</h1>
        <p className="text-gray-600">Interactive 3D visualization of your body composition</p>
      </div>
      
      {/* Large 3D Model Viewer */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="relative w-full h-[700px] rounded-2xl overflow-hidden">
          <Simple3DModel modelPath="/models/human.glb" />
          
          {/* Muscle Group Labels Overlay */}
          <div className="absolute top-24 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
            Arms: <span className="text-blue-600">{bodyMetrics.arms}%</span>
          </div>
          <div className="absolute top-24 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
            Chest: <span className="text-green-600">{bodyMetrics.chest}%</span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
            Core: <span className="text-orange-600">{bodyMetrics.core}%</span>
          </div>
          <div className="absolute bottom-32 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
            Legs: <span className="text-purple-600">{bodyMetrics.legs}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Strongest Area</span>
              <span className="text-sm font-bold text-blue-600">Legs ({bodyMetrics.legs}%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Focus Area</span>
              <span className="text-sm font-bold text-orange-600">Arms ({bodyMetrics.arms}%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Overall Score</span>
              <span className="text-sm font-bold text-green-600">{bodyMetrics.overall}%</span>
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
