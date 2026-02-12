import ExercisePlan from '../components/ExercisePlan'

function Workouts({ userData, onWorkoutUpdate }) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Programs</h1>
        <p className="text-gray-600">Your personalized exercise routines and training schedule</p>
      </div>

      {/* Exercise Plan */}
      <ExercisePlan data={userData?.exercises} onWorkoutUpdate={onWorkoutUpdate} />

      {/* Workout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-1">Workout Time</p>
          <p className="text-3xl font-bold text-gray-900">45 min</p>
          <p className="text-xs text-purple-600 font-semibold mt-2">Today's session</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Sets</p>
          <p className="text-3xl font-bold text-gray-900">18</p>
          <p className="text-xs text-blue-600 font-semibold mt-2">Across all exercises</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-1">Weekly Streak</p>
          <p className="text-3xl font-bold text-gray-900">5 days</p>
          <p className="text-xs text-green-600 font-semibold mt-2">Keep it up!</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-1">Calories/Session</p>
          <p className="text-3xl font-bold text-gray-900">420</p>
          <p className="text-xs text-orange-600 font-semibold mt-2">Average burn</p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Training Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">MON</p>
            <div className="w-10 h-10 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-bold text-gray-900">Upper Body</p>
          </div>

          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">TUE</p>
            <div className="w-10 h-10 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-bold text-gray-900">Cardio</p>
          </div>

          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">WED</p>
            <div className="w-10 h-10 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-bold text-gray-900">Lower Body</p>
          </div>

          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">THU</p>
            <div className="w-10 h-10 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-bold text-gray-900">Core</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">FRI</p>
            <div className="w-10 h-10 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </div>
            <p className="text-xs font-bold text-gray-900">Full Body</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">SAT</p>
            <div className="w-10 h-10 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-600 font-bold">-</span>
            </div>
            <p className="text-xs font-bold text-gray-900">Rest Day</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2">SUN</p>
            <div className="w-10 h-10 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-600 font-bold">-</span>
            </div>
            <p className="text-xs font-bold text-gray-900">Rest Day</p>
          </div>
        </div>
      </div>

      {/* Workout Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pro Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-sm text-gray-700">Warm up for 5-10 minutes before starting your workout</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-sm text-gray-700">Focus on proper form over heavy weights</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-sm text-gray-700">Stay hydrated throughout your session</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <p className="text-sm text-gray-700">Cool down and stretch after completing exercises</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recovery Guidelines</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Get 7-9 hours of quality sleep each night</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Allow 48 hours rest between training same muscle groups</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Consume protein within 30 minutes post-workout</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Listen to your body and rest when needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workouts
