import { useState } from 'react'
import Simple3DModel from '../components/Simple3DModel'
import WorkoutSidebar from '../components/WorkoutSidebar'

function BodyAnalysis({ userData }) {
  const bodyMetrics = userData?.bodyMetrics || {
    chest: 85,
    arms: 78,
    core: 82,
    legs: 88,
    overall: 83
  }

  const [updatedUserData, setUpdatedUserData] = useState(userData)

  const handleWorkoutUpdate = (result) => {
    setUpdatedUserData(prev => ({
      ...prev,
      workoutData: result.workoutData,
      bodyMetrics: result.bodyMetrics
    }))
  }

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Body Metrics Analysis</h1>
          <p className="text-gray-600">Interactive 3D visualization of your body composition</p>
        </div>

        {/* Large 3D Model Viewer */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="relative w-full h-[700px] rounded-2xl overflow-hidden bg-slate-50">
            <Simple3DModel modelPath="/models/human.glb" workoutData={updatedUserData?.workoutData} />

            {/* Muscle Group Labels Overlay */}
            <div className="absolute top-24 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
              Arms: <span className="text-blue-600">{updatedUserData?.bodyMetrics?.arms || bodyMetrics.arms}%</span>
            </div>
            <div className="absolute top-24 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
              Chest: <span className="text-green-600">{updatedUserData?.bodyMetrics?.chest || bodyMetrics.chest}%</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
              Core: <span className="text-orange-600">{updatedUserData?.bodyMetrics?.core || bodyMetrics.core}%</span>
            </div>
            <div className="absolute bottom-32 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-gray-200">
              Legs: <span className="text-purple-600">{updatedUserData?.bodyMetrics?.legs || bodyMetrics.legs}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <WorkoutSidebar userData={updatedUserData} onWorkoutUpdate={handleWorkoutUpdate} />
      </div>
    </div>
  )
}

export default BodyAnalysis
