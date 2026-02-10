function BodyPartMetrics({ data }) {
  const bodyMetrics = data || {
    chest: 85,
    arms: 78,
    core: 82,
    legs: 88,
    overall: 83
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
      <h2 className="text-xl font-bold text-gray-900 mb-6">Body Part Development</h2>
      
      {/* Metrics Details */}
      <div className="space-y-4">
        {/* Arms */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Arms & Biceps</span>
            <span className="text-sm font-bold" style={{ color: getProgressColorHex(bodyMetrics.arms) }}>
              {bodyMetrics.arms}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${bodyMetrics.arms}%`,
                backgroundColor: getProgressColorHex(bodyMetrics.arms)
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{getProgressLabel(bodyMetrics.arms)}</p>
        </div>

        {/* Core */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Core & Abs</span>
            <span className="text-sm font-bold" style={{ color: getProgressColorHex(bodyMetrics.core) }}>
              {bodyMetrics.core}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${bodyMetrics.core}%`,
                backgroundColor: getProgressColorHex(bodyMetrics.core)
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{getProgressLabel(bodyMetrics.core)}</p>
        </div>

        {/* Legs */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Legs & Glutes</span>
            <span className="text-sm font-bold" style={{ color: getProgressColorHex(bodyMetrics.legs) }}>
              {bodyMetrics.legs}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${bodyMetrics.legs}%`,
                backgroundColor: getProgressColorHex(bodyMetrics.legs)
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{getProgressLabel(bodyMetrics.legs)}</p>
        </div>

        {/* Chest */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Chest Development</span>
            <span className="text-sm font-bold" style={{ color: getProgressColorHex(bodyMetrics.chest) }}>
              {bodyMetrics.chest}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${bodyMetrics.chest}%`,
                backgroundColor: getProgressColorHex(bodyMetrics.chest)
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{getProgressLabel(bodyMetrics.chest)}</p>
        </div>
      </div>
    </div>
  )
}

export default BodyPartMetrics
