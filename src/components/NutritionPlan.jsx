import { useState, useEffect } from 'react'

function NutritionPlan({ data }) {
  const [currentStats, setCurrentStats] = useState({
    proteinTarget: 150,
    proteinConsumed: 0,
    caloriesConsumed: 0,
    calorieTarget: 2000,
    completedMeals: 0
  })

  useEffect(() => {
    // Update stats when window function is available
    const updateStats = () => {
      if (window.getCurrentNutritionStats) {
        setCurrentStats(window.getCurrentNutritionStats())
      }
    }

    updateStats()
    // Set up interval to check for updates
    const interval = setInterval(updateStats, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const nutrition = {
    ...currentStats,
    recommendedFoods: [
      { name: '2 Eggs', protein: 12, serving: '2 boiled eggs', emoji: '🥚' },
      { name: '2 Fish', protein: 50, serving: '2 medium sardines', emoji: '🐟' },
      { name: 'Chicken', protein: 27, serving: '100g cooked', emoji: '🍗' },
      { name: 'Soya Chunks', protein: 52, serving: '100g cooked', emoji: '🫘' },
      { name: 'Handful Badam', protein: 10, serving: '15-20 almonds', emoji: '🥜' },
      { name: 'Handful Groundnuts', protein: 12, serving: '25-30 peanuts', emoji: '🥜' },
      { name: '1 Bowl Dal', protein: 9, serving: '1 bowl cooked', emoji: '🍛' },
      { name: '1 Glass Milk', protein: 8, serving: '250ml', emoji: '🥛' },
      { name: '1 Bowl Curd', protein: 11, serving: '1 bowl', emoji: '🥛' },
      { name: '2 Paneer Pieces', protein: 18, serving: '2 medium pieces', emoji: '🧀' }
    ]
  }

  const proteinRemaining = nutrition.proteinTarget - nutrition.proteinConsumed
  const proteinProgress = (nutrition.proteinConsumed / nutrition.proteinTarget) * 100

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Nutrition Plan</h2>
      
      {/* Protein Progress */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700">Daily Protein Intake</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">{nutrition.proteinConsumed}g</span>
              <span className="text-gray-600">/ {nutrition.proteinTarget}g</span>
              <span className="ml-auto text-sm font-bold text-emerald-700 bg-white px-3 py-1 rounded-full shadow-sm">
                {proteinProgress.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500"
            style={{ width: `${Math.min(proteinProgress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-700 mt-3 font-medium">
          {proteinRemaining > 0 ? `${proteinRemaining}g remaining to reach your goal` : 'Daily goal achieved!'}
        </p>
      </div>

      {/* Recommended Foods */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Recommended Protein Sources</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
          {nutrition.recommendedFoods.map((food, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm border border-gray-200">
                  {food.emoji}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{food.name}</p>
                  <p className="text-xs text-gray-500">{food.serving}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600 text-lg">{food.protein}g</p>
                <p className="text-xs text-gray-500">protein</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NutritionPlan
