import { useState } from 'react'

function ExercisePlan({ data }) {
  const initialExercises = data?.exercises || [
    { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, category: 'Chest' },
    { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, category: 'Legs' },
    { id: 3, name: 'Plank', sets: 3, duration: '60s', completed: false, category: 'Core' },
    { id: 4, name: 'Lunges', sets: 3, reps: 12, completed: false, category: 'Legs' },
    { id: 5, name: 'Burpees', sets: 3, reps: 10, completed: false, category: 'Full Body' },
    { id: 6, name: 'Mountain Climbers', sets: 3, reps: 20, completed: false, category: 'Cardio' }
  ]

  const [exercises, setExercises] = useState(initialExercises)

  const toggleExercise = (id) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const totalCount = exercises.length
  const progress = (completedCount / totalCount) * 100

  const getCategoryColor = (category) => {
    const colors = {
      'Chest': 'bg-blue-100 text-blue-700 border-blue-200',
      'Legs': 'bg-purple-100 text-purple-700 border-purple-200',
      'Core': 'bg-orange-100 text-orange-700 border-orange-200',
      'Full Body': 'bg-red-100 text-red-700 border-red-200',
      'Cardio': 'bg-green-100 text-green-700 border-green-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Exercise Plan</h2>
      
      {/* Progress */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 mb-6 border border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700">Today's Progress</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">{completedCount}</span>
              <span className="text-gray-600">/ {totalCount} exercises</span>
              <span className="ml-auto text-sm font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Workout Schedule</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition cursor-pointer ${
                exercise.completed 
                  ? 'bg-emerald-50 border-emerald-300' 
                  : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
              onClick={() => toggleExercise(exercise.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition flex-shrink-0 ${
                  exercise.completed 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {exercise.completed && (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-semibold ${exercise.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {exercise.name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(exercise.category)}`}>
                      {exercise.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : exercise.duration}
                  </p>
                </div>
              </div>
              {!exercise.completed && (
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm ml-2">
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {completedCount === totalCount && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white text-center shadow-lg">
          <p className="text-lg font-bold">Excellent Work!</p>
          <p className="text-sm mt-1">All exercises completed for today</p>
        </div>
      )}
    </div>
  )
}

export default ExercisePlan
