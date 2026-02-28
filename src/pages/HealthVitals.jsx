import { useState, useEffect } from 'react'
import HealthMetrics from '../components/HealthMetrics'

function HealthVitals({ userData }) {
  const [animateHeader, setAnimateHeader] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    setAnimateHeader(true)
    const timer1 = setTimeout(() => setAnimateStats(true), 200)
    const timer2 = setTimeout(() => setAnimateContent(true), 400)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Premium Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff), linear-gradient(-45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}></div>
        </div>
      </div>
      
      {/* Premium Header */}
      <header className={`bg-white border-b border-blue-200 shadow-md sticky top-0 z-40 transition-all duration-700 ${animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="w-full px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-700 delay-100 ${animateHeader ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Health Vitals Monitor
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">Real-time tracking of your vital health metrics</p>
                </div>
              </div>
            </div>
            <div className={`text-right transition-all duration-700 delay-200 ${animateHeader ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status</div>
              <div className="text-2xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Healthy
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 sm:px-8 lg:px-12 py-8">
        {/* Health Metrics */}
        <div className={`mb-8 transition-all duration-700 ${animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <HealthMetrics data={userData?.healthMetrics} />
        </div>

        {/* Premium Health Tips */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-700 ${animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group bg-white border border-green-200 p-5 hover:shadow-md transition-all duration-300 hover:border-green-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs font-medium text-green-500 uppercase tracking-wider">Optimal</div>
            </div>
            <h3 className="text-lg font-medium text-green-700 mb-2">Blood Sugar</h3>
            <p className="text-sm text-gray-600 mb-3">Your glucose levels are within normal range</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Maintain balanced diet</p>
              <p>• Regular exercise helps</p>
              <p>• Monitor after meals</p>
            </div>
          </div>

          <div className="group bg-white border border-blue-200 p-5 hover:shadow-md transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-xs font-medium text-blue-500 uppercase tracking-wider">Healthy</div>
            </div>
            <h3 className="text-lg font-medium text-blue-700 mb-2">Blood Pressure</h3>
            <p className="text-sm text-gray-600 mb-3">Optimal cardiovascular health indicators</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Reduce sodium intake</p>
              <p>• Stay hydrated</p>
              <p>• Manage stress levels</p>
            </div>
          </div>

          <div className="group bg-white border border-pink-200 p-5 hover:shadow-md transition-all duration-300 hover:border-pink-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="text-xs font-medium text-pink-500 uppercase tracking-wider">Normal</div>
            </div>
            <h3 className="text-lg font-medium text-pink-700 mb-2">Heart Rate</h3>
            <p className="text-sm text-gray-600 mb-3">Resting heart rate is healthy and stable</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Cardio exercises help</p>
              <p>• Track during workouts</p>
              <p>• Aim for 60-100 bpm</p>
            </div>
          </div>
        </div>

        {/* Premium Weekly Trends */}
        <div className={`bg-white border border-indigo-200 overflow-hidden hover:shadow-md transition-all duration-500 ${animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4">
            <h3 className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Weekly Health Trends</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <p className="text-sm font-medium text-green-600 mb-1">Avg Heart Rate</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">72 bpm</p>
                <p className="text-xs text-green-500 font-semibold mt-1">↓ 2 bpm</p>
              </div>
              <div className="group text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <p className="text-sm font-medium text-blue-600 mb-1">Avg Blood Sugar</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">94 mg/dL</p>
                <p className="text-xs text-blue-500 font-semibold mt-1">Stable</p>
              </div>
              <div className="group text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <p className="text-sm font-medium text-purple-600 mb-1">Avg BP Systolic</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">118 mmHg</p>
                <p className="text-xs text-purple-500 font-semibold mt-1">↓ 2 mmHg</p>
              </div>
              <div className="group text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <p className="text-sm font-medium text-amber-600 mb-1">Health Score</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">95/100</p>
                <p className="text-xs text-amber-500 font-semibold mt-1">Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HealthVitals
