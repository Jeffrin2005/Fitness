import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Utensils,
  Plus,
  Coffee,
  Sun,
  Sunset,
  Apple,
  CheckCircle2,
  Award,
  RotateCcw,
  Droplets,
  Pill,
  LayoutDashboard,
  GlassWater,
  Zap,
  TrendingUp,
  Flame,
  Activity
} from 'lucide-react'


// Weekly meal plans
const weeklyMeals = {
  Monday: [
    { id: 1, type: 'Breakfast', name: 'Oatmeal with Banana & Almonds', calories: 350, time: '08:00 AM', protein: 12, carbs: 58, fats: 10, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Turkey Sandwich & Veggies', calories: 420, time: '01:00 PM', protein: 35, carbs: 42, fats: 12, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Apple & Peanut Butter', calories: 200, time: '04:00 PM', protein: 8, carbs: 24, fats: 8, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Grilled Chicken & Brown Rice', calories: 550, time: '07:30 PM', protein: 45, carbs: 52, fats: 15, completed: false, icon: Sunset }
  ],
  Tuesday: [
    { id: 1, type: 'Breakfast', name: 'Greek Yogurt & Berries', calories: 320, time: '08:00 AM', protein: 24, carbs: 32, fats: 8, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, time: '01:15 PM', protein: 42, carbs: 18, fats: 22, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Protein Shake & Almonds', calories: 250, time: '04:30 PM', protein: 28, carbs: 12, fats: 10, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Salmon with Quinoa', calories: 520, time: '07:45 PM', protein: 38, carbs: 45, fats: 24, completed: false, icon: Sunset }
  ],
  Wednesday: [
    { id: 1, type: 'Breakfast', name: 'Scrambled Eggs & Toast', calories: 380, time: '08:00 AM', protein: 22, carbs: 35, fats: 18, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Beef Stir-Fry with Veggies', calories: 480, time: '01:00 PM', protein: 38, carbs: 35, fats: 20, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Cottage Cheese & Fruit', calories: 220, time: '04:00 PM', protein: 18, carbs: 22, fats: 6, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Baked Cod & Sweet Potato', calories: 490, time: '07:30 PM', protein: 40, carbs: 48, fats: 12, completed: false, icon: Sunset }
  ],
  Thursday: [
    { id: 1, type: 'Breakfast', name: 'Protein Pancakes & Syrup', calories: 400, time: '08:00 AM', protein: 28, carbs: 48, fats: 10, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Tuna Wrap with Avocado', calories: 440, time: '01:00 PM', protein: 36, carbs: 38, fats: 18, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Trail Mix & Banana', calories: 280, time: '04:00 PM', protein: 10, carbs: 35, fats: 12, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Lean Beef & Broccoli', calories: 530, time: '07:30 PM', protein: 42, carbs: 38, fats: 22, completed: false, icon: Sunset }
  ],
  Friday: [
    { id: 1, type: 'Breakfast', name: 'Smoothie Bowl with Granola', calories: 360, time: '08:00 AM', protein: 18, carbs: 52, fats: 12, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Chicken Burrito Bowl', calories: 520, time: '01:00 PM', protein: 40, carbs: 55, fats: 18, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Protein Bar & Orange', calories: 240, time: '04:00 PM', protein: 20, carbs: 28, fats: 8, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Shrimp Pasta Primavera', calories: 510, time: '07:30 PM', protein: 35, carbs: 58, fats: 16, completed: false, icon: Sunset }
  ],
  Saturday: [
    { id: 1, type: 'Breakfast', name: 'French Toast & Berries', calories: 420, time: '09:00 AM', protein: 16, carbs: 62, fats: 14, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'BBQ Chicken Pizza (2 slices)', calories: 580, time: '01:30 PM', protein: 38, carbs: 65, fats: 22, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Greek Yogurt & Honey', calories: 200, time: '04:30 PM', protein: 18, carbs: 24, fats: 6, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Steak & Roasted Vegetables', calories: 620, time: '08:00 PM', protein: 48, carbs: 35, fats: 32, completed: false, icon: Sunset }
  ],
  Sunday: [
    { id: 1, type: 'Breakfast', name: 'Veggie Omelet & Toast', calories: 390, time: '09:00 AM', protein: 26, carbs: 32, fats: 20, completed: false, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Sushi Platter (12 pieces)', calories: 480, time: '01:00 PM', protein: 32, carbs: 68, fats: 10, completed: false, icon: Sun },
    { id: 3, type: 'Snack', name: 'Hummus & Veggie Sticks', calories: 180, time: '04:00 PM', protein: 8, carbs: 20, fats: 8, completed: false, icon: Apple },
    { id: 4, type: 'Dinner', name: 'Roast Chicken & Mashed Potatoes', calories: 560, time: '07:30 PM', protein: 44, carbs: 48, fats: 20, completed: false, icon: Sunset }
  ]
}

function Nutrition() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [waterIntake, setWaterIntake] = useState(0)
  const [animateContent, setAnimateContent] = useState(false)
  const waterGoal = 3000

  // Get current day
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  const [currentDay] = useState(getCurrentDay())
  const [meals, setMeals] = useState(weeklyMeals[currentDay])

  useEffect(() => {
    setAnimateContent(true)
  }, [])

  const resetDailyProgress = () => {
    setMeals(prev => prev.map(m => ({ ...m, completed: false })))
    setWaterIntake(0)
  }

  const toggleMealCompletion = (id) => {
    setMeals(prev => prev.map(meal =>
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ))
  }

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 250, 5000))
  }

  const mealProgress = useMemo(() => {
    const completed = meals.filter(m => m.completed).length
    return (completed / meals.length) * 100
  }, [meals])

  const waterProgress = (waterIntake / waterGoal) * 100

  const stats = useMemo(() => {
    const activeMeals = meals.filter(m => m.completed)
    const calories = activeMeals.reduce((acc, m) => acc + m.calories, 0)
    const protein = activeMeals.reduce((acc, m) => acc + m.protein, 0)
    const carbs = activeMeals.reduce((acc, m) => acc + m.carbs, 0)
    const fats = activeMeals.reduce((acc, m) => acc + m.fats, 0)
    return { calories, protein, carbs, fats }
  }, [meals])

  const dailyGoal = 2200
  const caloriesRemaining = Math.max(0, dailyGoal - stats.calories)
  const caloriePercent = (stats.calories / dailyGoal) * 100

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
    { id: 'hydration', name: 'Hydration', icon: Droplets, color: 'from-cyan-500 to-cyan-600' },
    { id: 'supplements', name: 'Supplements', icon: Pill, color: 'from-purple-500 to-purple-600' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Today's Nutrition - {currentDay}
                </h1>
                <p className="text-gray-500 text-sm mt-1">Track your meals, calories, and macros for today</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={resetDailyProgress}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-slate-200 text-slate-400 hover:text-rose-500 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Calories Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Calories</span>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{stats.calories}</div>
                <div className="text-sm text-blue-600 font-medium">of {dailyGoal} kcal</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-3 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${caloriePercent}%` }} 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
              </div>

              {/* Protein Card */}
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Protein</span>
                </div>
                <div className="text-3xl font-bold text-rose-700 mb-1">{stats.protein}g</div>
                <div className="text-sm text-rose-600 font-medium">of 160g goal</div>
                <div className="w-full bg-rose-200 rounded-full h-2 mt-3 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${(stats.protein / 160) * 100}%` }} 
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-600"
                  />
                </div>
              </div>

              {/* Carbs Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Carbs</span>
                </div>
                <div className="text-3xl font-bold text-amber-700 mb-1">{stats.carbs}g</div>
                <div className="text-sm text-amber-600 font-medium">of 250g goal</div>
                <div className="w-full bg-amber-200 rounded-full h-2 mt-3 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${(stats.carbs / 250) * 100}%` }} 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  />
                </div>
              </div>

              {/* Water Card */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Hydration</span>
                </div>
                <div className="text-3xl font-bold text-cyan-700 mb-1">{waterIntake}ml</div>
                <div className="text-sm text-cyan-600 font-medium">of {waterGoal}ml goal</div>
                <div className="w-full bg-cyan-200 rounded-full h-2 mt-3 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${waterProgress}%` }} 
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600"
                  />
                </div>
                <button
                  onClick={addWater}
                  className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold hover:scale-105 transition-all"
                >
                  + Add 250ml
                </button>
              </div>
            </div>

            {/* Meals Section */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Utensils className="w-6 h-6 text-blue-600" />
                Today's Meals
              </h2>
              <div className="space-y-4">
                {meals.map((meal) => (
                  <motion.div
                    key={meal.id}
                    whileHover={{ x: 10 }}
                    onClick={() => toggleMealCompletion(meal.id)}
                    className={`group p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${meal.completed ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${meal.completed ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'
                        }`}>
                        {meal.completed ? <CheckCircle2 className="w-7 h-7" /> : <meal.icon className="w-7 h-7" />}
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${meal.completed ? 'text-emerald-600' : 'text-gray-500'}`}>{meal.type} • {meal.time}</p>
                        <h4 className="text-lg font-bold text-gray-900">{meal.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-600">P: {meal.protein}g</span>
                          <span className="text-xs text-gray-600">C: {meal.carbs}g</span>
                          <span className="text-xs text-gray-600">F: {meal.fats}g</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{meal.calories}</div>
                        <div className="text-xs font-bold text-gray-500">kcal</div>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${meal.completed ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
                        }`}>
                        {meal.completed ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'hydration':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Hydration Tracker
                </h1>
                <p className="text-gray-500 text-sm mt-1">Monitor your daily water intake and stay hydrated</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-cyan-200 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
                  <GlassWater className="w-5 h-5" />
                  Daily Water Intake
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      {waterIntake}ml
                    </div>
                    <div className="text-sm text-gray-500 mt-2">of {waterGoal}ml daily goal</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                    <motion.div 
                      animate={{ width: `${waterProgress}%` }} 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-end pr-2"
                    >
                      <span className="text-white text-xs font-bold">{Math.round(waterProgress)}%</span>
                    </motion.div>
                  </div>
                  <button
                    onClick={addWater}
                    className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 active:scale-95"
                  >
                    + Add 250ml
                  </button>
                </div>
              </div>

              <div className="bg-white border border-cyan-200 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-cyan-700 mb-6">Hydration Schedule</h3>
                <div className="space-y-3">
                  {['8:00 AM - Morning', '10:00 AM - Mid-Morning', '12:00 PM - Lunch', '2:00 PM - Afternoon', '4:00 PM - Pre-Workout', '6:00 PM - Evening', '8:00 PM - Dinner'].map((time) => (
                    <div key={time} className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 hover:shadow-md transition-all">
                      <span className="text-sm font-semibold text-cyan-700">{time}</span>
                      <div className="flex items-center gap-2">
                        <GlassWater className="w-5 h-5 text-cyan-500" />
                        <span className="text-xs font-bold text-cyan-600">250ml</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Benefits of Staying Hydrated</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Better Performance', desc: 'Improves physical performance and endurance', icon: Zap },
                  { title: 'Mental Clarity', desc: 'Enhances focus and cognitive function', icon: Award },
                  { title: 'Healthy Skin', desc: 'Promotes skin health and natural glow', icon: Sun }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-cyan-700 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'supplements':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Supplements
                </h1>
                <p className="text-gray-500 text-sm mt-1">Track your daily supplement intake and optimize nutrition</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Whey Protein', dosage: '25g', time: 'Post-Workout', icon: Zap, color: 'from-blue-500 to-blue-600', benefit: 'Muscle recovery & growth' },
                { name: 'Vitamin D3', dosage: '2000 IU', time: 'Morning', icon: Sun, color: 'from-amber-500 to-orange-600', benefit: 'Bone health & immunity' },
                { name: 'Omega-3 Fish Oil', dosage: '1000mg', time: 'With Meals', icon: Droplets, color: 'from-cyan-500 to-blue-600', benefit: 'Heart & brain health' },
                { name: 'BCAA', dosage: '5g', time: 'During Workout', icon: Zap, color: 'from-green-500 to-emerald-600', benefit: 'Endurance & recovery' },
                { name: 'Creatine Monohydrate', dosage: '5g', time: 'Pre-Workout', icon: Award, color: 'from-red-500 to-rose-600', benefit: 'Strength & power output' },
                { name: 'Multivitamin', dosage: '1 tablet', time: 'Breakfast', icon: Plus, color: 'from-purple-500 to-pink-600', benefit: 'Overall health support' }
              ].map((supplement, index) => (
                <div key={index} className="bg-white border border-purple-200 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${supplement.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <supplement.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-purple-700">{supplement.name}</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                      <span className="text-sm text-gray-600 font-medium">Dosage:</span>
                      <span className="text-sm font-bold text-purple-600">{supplement.dosage}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                      <span className="text-sm text-gray-600 font-medium">When:</span>
                      <span className="text-sm font-bold text-purple-600">{supplement.time}</span>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <p className="text-xs text-gray-600 font-medium">{supplement.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Supplement Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Take supplements with food for better absorption',
                  'Stay consistent with your supplement schedule',
                  'Consult with a healthcare professional before starting',
                  'Store supplements in a cool, dry place'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-purple-100">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff), linear-gradient(-45deg, #e0e7ff 25%, transparent 25%, transparent 75%, #e0e7ff 75%, #e0e7ff)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <header className={`bg-white border-b border-blue-200 shadow-md sticky top-0 z-40 transition-all duration-700 ${animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="w-full px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <div className={`transition-all duration-700 delay-100 ${animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Nutrition Center
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">Complete nutrition management system</p>
                  </div>
                </div>
              </div>
              <div className={`text-right transition-all duration-700 delay-200 ${animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status</div>
                <div className="text-2xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Active
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <div className="w-64 bg-white border-r border-blue-200 min-h-screen">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Navigation</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                      activeSection === item.id
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeSection === item.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h3 className="text-sm font-bold text-blue-700 mb-3">Today's Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-bold text-blue-600">{stats.calories}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Water</span>
                    <span className="font-bold text-blue-600">{waterIntake}ml</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Meals</span>
                    <span className="font-bold text-blue-600">{meals.filter(m => m.completed).length}/{meals.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
