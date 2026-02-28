import { useState } from 'react'

const WeeklyMealTracker = () => {
  const [weeklyMeals, setWeeklyMeals] = useState({
    monday: {
      breakfast: { completed: false, protein: 12, calories: 320, food: 'Kanji with 2 eggs' },
      lunch: { completed: false, protein: 35, calories: 550, food: 'Rice with chicken curry and buttermilk' },
      snack: { completed: false, protein: 8, calories: 180, food: '1 banana and handful peanuts' },
      dinner: { completed: false, protein: 25, calories: 500, food: 'Rice with 2 fish curry and vegetables' }
    },
    tuesday: {
      breakfast: { completed: false, protein: 18, calories: 300, food: 'Puttu with kadala curry and 1 banana' },
      lunch: { completed: false, protein: 32, calories: 520, food: 'Rice with sambar and 2 papad' },
      snack: { completed: false, protein: 10, calories: 200, food: 'Badam milk and 3 dates' },
      dinner: { completed: false, protein: 28, calories: 480, food: '2 chappathi with vegetable stew' }
    },
    wednesday: {
      breakfast: { completed: false, protein: 22, calories: 340, food: '2 dosa with chutney and sambar' },
      lunch: { completed: false, protein: 30, calories: 500, food: 'Rice with dal and ladies finger fry' },
      snack: { completed: false, protein: 12, calories: 220, food: 'Soya chunks and tea' },
      dinner: { completed: false, protein: 35, calories: 550, food: 'Rice with beef fry and curd' }
    },
    thursday: {
      breakfast: { completed: false, protein: 15, calories: 280, food: '3 idli with sambar and chutney' },
      lunch: { completed: false, protein: 33, calories: 530, food: 'Rice with 2 fish fry and moru' },
      snack: { completed: false, protein: 14, calories: 240, food: '2 boiled eggs and tea' },
      dinner: { completed: false, protein: 25, calories: 450, food: 'Rice with thoran and buttermilk' }
    },
    friday: {
      breakfast: { completed: false, protein: 20, calories: 320, food: '2 appam with egg curry' },
      lunch: { completed: false, protein: 31, calories: 510, food: 'Rice with chicken curry and rasam' },
      snack: { completed: false, protein: 11, calories: 190, food: 'Handful groundnuts and 1 banana' },
      dinner: { completed: false, protein: 32, calories: 520, food: 'Rice with avial and 2 pappad' }
    },
    saturday: {
      breakfast: { completed: false, protein: 18, calories: 300, food: 'Upma with 1 banana' },
      lunch: { completed: false, protein: 34, calories: 540, food: 'Rice with mutton curry' },
      snack: { completed: false, protein: 9, calories: 210, food: '1 milk and 2 biscuits' },
      dinner: { completed: false, protein: 30, calories: 500, food: 'Rice with meen curry' }
    },
    sunday: {
      breakfast: { completed: false, protein: 25, calories: 380, food: '2 egg roast with 2 bread' },
      lunch: { completed: false, protein: 35, calories: 580, food: 'Rice biriyani with raita' },
      snack: { completed: false, protein: 13, calories: 230, food: 'Badam milk and fruits' },
      dinner: { completed: false, protein: 28, calories: 480, food: 'Rice with sambar and pickle' }
    }
  })

  const [extraFoodItems, setExtraFoodItems] = useState([])
  const [waterIntake, setWaterIntake] = useState(0)
  const [newExtraFood, setNewExtraFood] = useState({ name: '', protein: 0, calories: 0 })

  const dailyProteinGoal = 150
  const dailyCalorieGoal = 2000

  // Get current day
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

  // Export data for other components
  const getCurrentDayStats = () => {
    const stats = calculateDailyStats(currentDay)
    
    // Add extra food items to totals
    const extraProtein = extraFoodItems.reduce((sum, item) => sum + item.protein, 0)
    const extraCalories = extraFoodItems.reduce((sum, item) => sum + item.calories, 0)
    
    return {
      proteinConsumed: stats.totalProtein + extraProtein,
      proteinTarget: dailyProteinGoal,
      caloriesConsumed: stats.totalCalories + extraCalories,
      calorieTarget: dailyCalorieGoal,
      completedMeals: stats.completedMeals,
      extraFoodItems: extraFoodItems,
      waterIntake: waterIntake
    }
  }

  // Make data available globally
  if (typeof window !== 'undefined') {
    window.getCurrentNutritionStats = getCurrentDayStats
  }

  const toggleMealCompletion = (day, mealType) => {
    setWeeklyMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          ...prev[day][mealType],
          completed: !prev[day][mealType].completed
        }
      }
    }))
  }

  const addExtraFood = () => {
    if (newExtraFood.name && newExtraFood.protein > 0 && newExtraFood.calories > 0) {
      setExtraFoodItems(prev => [...prev, { ...newExtraFood, id: Date.now() }])
      setNewExtraFood({ name: '', protein: 0, calories: 0 })
    }
  }

  const removeExtraFood = (id) => {
    setExtraFoodItems(prev => prev.filter(item => item.id !== id))
  }

  const addWater = () => {
    setWaterIntake(prev => prev + 1)
  }

  const removeWater = () => {
    setWaterIntake(prev => Math.max(0, prev - 1))
  }

  const calculateDailyStats = (day) => {
    const meals = weeklyMeals[day]
    const completedMeals = Object.values(meals).filter(meal => meal.completed)
    
    const totalProtein = completedMeals.reduce((sum, meal) => sum + meal.protein, 0)
    const totalCalories = completedMeals.reduce((sum, meal) => sum + meal.calories, 0)
    const proteinPercentage = Math.min((totalProtein / dailyProteinGoal) * 100, 100)
    const caloriePercentage = Math.min((totalCalories / dailyCalorieGoal) * 100, 100)
    
    return {
      totalProtein,
      totalCalories,
      proteinPercentage,
      caloriePercentage,
      remainingProtein: Math.max(dailyProteinGoal - totalProtein, 0),
      remainingCalories: Math.max(dailyCalorieGoal - totalCalories, 0),
      completedMeals: completedMeals.length
    }
  }

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: '🌅',
      lunch: '☀️',
      snack: '🍎',
      dinner: '🌙'
    }
    return icons[mealType] || '🍽️'
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const stats = calculateDailyStats(currentDay)

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Today's Meal Tracker</h2>
            <p className="text-gray-600">Track your daily meals, protein intake, and calories for {dayNames[currentDay]}</p>
          </div>
          
          {/* Daily Goals */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-900">Daily Protein Goal</span>
                    <div className="text-2xl font-bold text-red-600 mt-1">{dailyProteinGoal}g</div>
                  </div>
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-900">Daily Calorie Goal</span>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{dailyCalorieGoal} cal</div>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-500 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {dayNames[currentDay]} - Today's Progress
              <span className="text-sm bg-indigo-500 text-white px-3 py-1 rounded-full">Current Day</span>
            </h3>
          </div>
          
          <div className="p-6">
            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-lg">Protein Progress</span>
                  <span className={`font-bold text-lg ${stats.remainingProtein === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    {stats.totalProtein}g / {dailyProteinGoal}g
                    {stats.remainingProtein === 0 ? ' ✓ Goal Reached!' : ` (${stats.remainingProtein}g left)`}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-700 ${getProgressColor(stats.proteinPercentage)}`}
                    style={{ width: `${stats.proteinPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{Math.round(stats.proteinPercentage)}% Complete</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-lg">Calorie Progress</span>
                  <span className={`font-bold text-lg ${stats.remainingCalories === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                    {stats.totalCalories} / {dailyCalorieGoal}
                    {stats.remainingCalories === 0 ? ' ✓ Goal Reached!' : ` (${stats.remainingCalories} left)`}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-700 ${getProgressColor(stats.caloriePercentage)}`}
                    style={{ width: `${stats.caloriePercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{Math.round(stats.caloriePercentage)}% Complete</span>
                </div>
              </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(weeklyMeals[currentDay]).map(([mealType, meal]) => (
                <div
                  key={mealType}
                  onClick={() => toggleMealCompletion(currentDay, mealType)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    meal.completed 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-xl' 
                      : 'bg-white border-gray-200 hover:border-indigo-300 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                        meal.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {getMealIcon(mealType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-gray-900 capitalize">
                            {mealType}
                          </span>
                          {meal.completed && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{meal.food}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{meal.protein}g</div>
                        <div className="text-xs text-gray-600 font-medium">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{meal.calories}</div>
                        <div className="text-xs text-gray-600 font-medium">Calories</div>
                      </div>
                    </div>
                    
                    <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      meal.completed 
                        ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' 
                        : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg'
                    }`}>
                      {meal.completed ? 'Undo' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Food Items */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-900 mb-3">Extra Food Items</h4>
              <div className="space-y-2 mb-4">
                {extraFoodItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🍽️</span>
                      <div>
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({item.protein}g protein, {item.calories} cal)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeExtraFood(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Food name"
                  value={newExtraFood.name}
                  onChange={(e) => setNewExtraFood(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={newExtraFood.protein}
                  onChange={(e) => setNewExtraFood(prev => ({ ...prev, protein: parseInt(e.target.value) || 0 }))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={newExtraFood.calories}
                  onChange={(e) => setNewExtraFood(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={addExtraFood}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Water Intake */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3">Water Intake</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{waterIntake}</span>
                    <span className="text-gray-600 ml-1">glasses</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={removeWater}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                  >
                    -
                  </button>
                  <button
                    onClick={addWater}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Daily goal: 8 glasses ({waterIntake}/8)
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min((waterIntake / 8) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeeklyMealTracker
