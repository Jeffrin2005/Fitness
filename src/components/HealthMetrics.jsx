function HealthMetrics({ data }) {
  const metrics = data || {
    bloodSugar: 95,
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    weight: 75,
    bmi: 23.5,
    bodyFat: 18
  }

  const getHealthStatus = (type, value) => {
    if (type === 'bloodSugar') {
      if (value < 100) return { status: 'Normal', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' }
      if (value < 126) return { status: 'Pre-diabetic', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' }
      return { status: 'High', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-300' }
    }
    if (type === 'bloodPressure') {
      if (value.systolic < 120 && value.diastolic < 80) return { status: 'Normal', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' }
      if (value.systolic < 140 && value.diastolic < 90) return { status: 'Elevated', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' }
      return { status: 'High', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-300' }
    }
    return { status: 'Normal', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' }
  }

  const sugarStatus = getHealthStatus('bloodSugar', metrics.bloodSugar)
  const bpStatus = getHealthStatus('bloodPressure', metrics.bloodPressure)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Health Vitals</h2>
      
      <div className="space-y-4">
        {/* Blood Sugar */}
        <div className={`${sugarStatus.bg} rounded-xl p-4 border ${sugarStatus.border}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Blood Glucose</h3>
                <p className="text-2xl font-bold text-gray-900">{metrics.bloodSugar} <span className="text-sm font-normal text-gray-600">mg/dL</span></p>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${sugarStatus.color} bg-white shadow-sm`}>
              {sugarStatus.status}
            </span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className={`${bpStatus.bg} rounded-xl p-4 border ${bpStatus.border}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Blood Pressure</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.bloodPressure.systolic}/{metrics.bloodPressure.diastolic} 
                  <span className="text-sm font-normal text-gray-600 ml-1">mmHg</span>
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${bpStatus.color} bg-white shadow-sm`}>
              {bpStatus.status}
            </span>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="bg-rose-50 rounded-xl p-4 border border-rose-300">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Heart Rate</h3>
                <p className="text-2xl font-bold text-gray-900">{metrics.heartRate} <span className="text-sm font-normal text-gray-600">bpm</span></p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full text-rose-700 bg-white shadow-sm">
              Resting
            </span>
          </div>
        </div>

        {/* Body Composition */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold text-gray-600 mb-1">Weight</h3>
            <p className="text-xl font-bold text-gray-900">{metrics.weight} <span className="text-xs">kg</span></p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center border border-indigo-200">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold text-gray-600 mb-1">BMI</h3>
            <p className="text-xl font-bold text-gray-900">{metrics.bmi}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center border border-pink-200">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold text-gray-600 mb-1">Body Fat</h3>
            <p className="text-xl font-bold text-gray-900">{metrics.bodyFat}<span className="text-xs">%</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthMetrics
