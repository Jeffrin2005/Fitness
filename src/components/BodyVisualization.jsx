function BodyVisualization({ data }) {
  const bodyMetrics = data || {
    chest: 85,
    arms: 78,
    core: 82,
    legs: 88,
    overall: 83
  }

  const getProgressColor = (value) => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getProgressColorHex = (value) => {
    if (value >= 80) return '#10b981'
    if (value >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getProgressLabel = (value) => {
    if (value >= 80) return 'Excellent'
    if (value >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-300/40 p-6 transition-all duration-300 hover:shadow-lg hover:border-orange-200/60">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Body Composition Analysis</h2>
        <div className="text-right">
          <div className="text-3xl font-bold text-orange-500">{bodyMetrics.overall}%</div>
          <div className="text-xs text-gray-500 font-medium">Overall Score</div>
        </div>
      </div>
      
      {/* Body Image with subtle 3D rotation */}
      <div className="flex justify-center" style={{ perspective: '1200px' }}>
        <div className="relative w-fit h-fit bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50 overflow-hidden shadow-md p-4 body-rotation">
          <img 
            src="/dbt2.png" 
            alt="Human Body Diagram" 
            className="w-auto h-[500px] object-contain"
          />

          {/* Muscle Group Labels */}
          <div className="absolute top-20 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
            Arms: {bodyMetrics.arms}%
          </div>
          <div className="absolute top-28 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
            Chest: {bodyMetrics.chest}%
          </div>
          <div className="absolute top-44 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
            Core: {bodyMetrics.core}%
          </div>
          <div className="absolute bottom-32 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
            Legs: {bodyMetrics.legs}%
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Excellent (80%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-gray-600">Good (60-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-gray-600">Needs Work (&lt;60%)</span>
        </div>
      </div>
    </div>
  )
}

export default BodyVisualization
