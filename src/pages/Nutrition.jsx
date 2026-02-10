import NutritionPlan from '../components/NutritionPlan'

function Nutrition({ userData }) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition & Diet Plan</h1>
        <p className="text-gray-600">Personalized meal recommendations and macro tracking</p>
      </div>

      {/* Nutrition Plan */}
      <NutritionPlan data={userData?.nutrition} />

      {/* Macro Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Macronutrient Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Protein */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Protein</h4>
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Target</span>
                <span className="font-bold text-gray-900">150g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Consumed</span>
                <span className="font-bold text-red-600">85g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining</span>
                <span className="font-bold text-orange-600">65g</span>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
              <div className="bg-red-600 h-full w-[57%]"></div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Carbs</h4>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Target</span>
                <span className="font-bold text-gray-900">250g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Consumed</span>
                <span className="font-bold text-blue-600">180g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining</span>
                <span className="font-bold text-cyan-600">70g</span>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full w-[72%]"></div>
            </div>
          </div>

          {/* Fats */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Fats</h4>
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Target</span>
                <span className="font-bold text-gray-900">70g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Consumed</span>
                <span className="font-bold text-yellow-600">52g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining</span>
                <span className="font-bold text-amber-600">18g</span>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
              <div className="bg-yellow-600 h-full w-[74%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Schedule */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Meal Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Breakfast - Completed</h4>
              <p className="text-sm text-gray-600">Oatmeal with berries, eggs, and protein shake</p>
            </div>
            <span className="text-sm font-semibold text-green-600">7:30 AM</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Lunch - Completed</h4>
              <p className="text-sm text-gray-600">Grilled chicken, brown rice, and vegetables</p>
            </div>
            <span className="text-sm font-semibold text-green-600">12:30 PM</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <span className="text-lg">🍽️</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Snack - Upcoming</h4>
              <p className="text-sm text-gray-600">Greek yogurt with almonds</p>
            </div>
            <span className="text-sm font-semibold text-blue-600">3:30 PM</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <span className="text-lg">🍽️</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Dinner - Planned</h4>
              <p className="text-sm text-gray-600">Salmon, quinoa, and steamed broccoli</p>
            </div>
            <span className="text-sm font-semibold text-gray-600">7:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
