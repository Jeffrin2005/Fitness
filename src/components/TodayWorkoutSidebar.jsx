import { useState } from 'react'

const TodayWorkoutSidebar = () => {
  const [workouts, setWorkouts] = useState({
    monday: [
      { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, equipment: 'bodyweight' },
      { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, equipment: 'bodyweight' },
      { id: 3, name: 'Dumbbell Curls', sets: 3, reps: 12, completed: false, equipment: 'dumbbells' },
      { id: 4, name: 'Plank', sets: 3, reps: '30 sec', completed: false, equipment: 'bodyweight' }
    ],
    tuesday: [
      { id: 1, name: 'Bench Press', sets: 4, reps: 10, completed: false, equipment: 'barbell' },
      { id: 2, name: 'Rows', sets: 4, reps: 12, completed: false, equipment: 'dumbbells' },
      { id: 3, name: 'Shoulder Press', sets: 3, reps: 10, completed: false, equipment: 'dumbbells' },
      { id: 4, name: 'Tricep Dips', sets: 3, reps: 15, completed: false, equipment: 'bodyweight' }
    ],
    wednesday: [
      { id: 1, name: 'Deadlifts', sets: 4, reps: 8, completed: false, equipment: 'barbell' },
      { id: 2, name: 'Leg Press', sets: 4, reps: 15, completed: false, equipment: 'machine' },
      { id: 3, name: 'Calf Raises', sets: 4, reps: 20, completed: false, equipment: 'bodyweight' },
      { id: 4, name: 'Crunches', sets: 3, reps: 25, completed: false, equipment: 'bodyweight' }
    ],
    thursday: [
      { id: 1, name: 'Pull-ups', sets: 3, reps: 8, completed: false, equipment: 'bodyweight' },
      { id: 2, name: 'Lat Pulldowns', sets: 4, reps: 12, completed: false, equipment: 'machine' },
      { id: 3, name: 'Bicep Curls', sets: 3, reps: 15, completed: false, equipment: 'dumbbells' },
      { id: 4, name: 'Face Pulls', sets: 3, reps: 15, completed: false, equipment: 'cable' }
    ],
    friday: [
      { id: 1, name: 'Squats', sets: 4, reps: 12, completed: false, equipment: 'barbell' },
      { id: 2, name: 'Lunges', sets: 3, reps: 10, completed: false, equipment: 'bodyweight' },
      { id: 3, name: 'Leg Curls', sets: 3, reps: 15, completed: false, equipment: 'machine' },
      { id: 4, name: 'Glute Bridges', sets: 3, reps: 20, completed: false, equipment: 'bodyweight' }
    ],
    saturday: [
      { id: 1, name: 'Incline Press', sets: 4, reps: 12, completed: false, equipment: 'dumbbells' },
      { id: 2, name: 'Flyes', sets: 3, reps: 15, completed: false, equipment: 'dumbbells' },
      { id: 3, name: 'Side Raises', sets: 3, reps: 12, completed: false, equipment: 'dumbbells' },
      { id: 4, name: 'Push-ups', sets: 3, reps: 20, completed: false, equipment: 'bodyweight' }
    ],
    sunday: [
      { id: 1, name: 'Light Cardio', sets: 1, reps: '30 min', completed: false, equipment: 'treadmill' },
      { id: 2, name: 'Stretching', sets: 1, reps: '15 min', completed: false, equipment: 'none' },
      { id: 3, name: 'Core Work', sets: 3, reps: '20', completed: false, equipment: 'bodyweight' },
      { id: 4, name: 'Foam Rolling', sets: 1, reps: '10 min', completed: false, equipment: 'foam roller' }
    ]
  })

  const getCurrentDay = () => {
    const dayIndex = new Date().getDay()
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[dayIndex]
  }

  const currentDay = getCurrentDay()
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }

  const todayWorkouts = workouts[currentDay] || []

  const toggleWorkoutCompletion = (id) => {
    setWorkouts(prev => ({
      ...prev,
      [currentDay]: prev[currentDay].map(workout => 
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    }))
  }

  const getEquipmentIcon = (equipment) => {
    const icons = {
      'bodyweight': '🏃',
      'dumbbells': '🏋️',
      'barbell': '🏋️‍♂️',
      'machine': '🏗️',
      'cable': '🔗',
      'treadmill': '🏃‍♂️',
      'none': '✨',
      'foam roller': '🔵'
    }
    return icons[equipment] || '💪'
  }

  const completedCount = todayWorkouts.filter(w => w.completed).length
  const totalCount = todayWorkouts.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">💪</span>
          Today's Workout - {dayNames[currentDay]}
        </h2>
      </div>
      
      <div className="p-6">
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Today's Progress</span>
            <span className="text-sm font-bold text-orange-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              {Math.round(completionPercentage)}% Complete
            </span>
          </div>
        </div>

        {/* Workout List */}
        <div className="space-y-3">
          {todayWorkouts.map(workout => (
            <div
              key={workout.id}
              onClick={() => toggleWorkoutCompletion(workout.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                workout.completed 
                  ? 'bg-green-50 border-green-400 shadow-lg' 
                  : 'bg-gray-50 border-gray-200 hover:border-orange-300 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    workout.completed ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    {getEquipmentIcon(workout.equipment)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{workout.name}</span>
                      {workout.completed && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {workout.sets} sets × {workout.reps} reps
                    </div>
                    <div className="text-xs text-gray-500">
                      Equipment: {workout.equipment}
                    </div>
                  </div>
                </div>
                
                <button className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  workout.completed 
                    ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}>
                  {workout.completed ? 'Undo' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Equipment Needed Today</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(todayWorkouts.map(w => w.equipment))).map(equipment => (
              <div key={equipment} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{getEquipmentIcon(equipment)}</span>
                <span className="text-xs text-gray-700 capitalize">{equipment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">
              {completedCount === totalCount 
                ? "🎉 Great job! You've completed all today's workouts!" 
                : `💪 Keep going! ${totalCount - completedCount} more to go!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayWorkoutSidebar
