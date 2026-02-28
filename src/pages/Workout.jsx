import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Workout() {
  const [workouts, setWorkouts] = useState({
    monday: [
      { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'chest', duration: '5 min' },
      { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'legs', duration: '6 min' },
      { id: 3, name: 'Dumbbell Curls', sets: 3, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'biceps', duration: '8 min' },
      { id: 4, name: 'Plank', sets: 3, reps: '30 sec', completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'core', duration: '2 min' }
    ],
    tuesday: [
      { id: 5, name: 'Bench Press', sets: 4, reps: 10, completed: false, equipment: 'barbell', difficulty: 'intermediate', muscleGroup: 'chest', duration: '12 min' },
      { id: 6, name: 'Rows', sets: 4, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'back', duration: '10 min' },
      { id: 7, name: 'Shoulder Press', sets: 3, reps: 10, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'shoulders', duration: '8 min' },
      { id: 8, name: 'Tricep Dips', sets: 3, reps: 15, completed: false, equipment: 'bodyweight', difficulty: 'intermediate', muscleGroup: 'triceps', duration: '6 min' }
    ],
    wednesday: [
      { id: 9, name: 'Deadlifts', sets: 4, reps: 8, completed: false, equipment: 'barbell', difficulty: 'advanced', muscleGroup: 'legs', duration: '15 min' },
      { id: 10, name: 'Leg Press', sets: 4, reps: 15, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'legs', duration: '12 min' },
      { id: 11, name: 'Calf Raises', sets: 4, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'calves', duration: '5 min' },
      { id: 12, name: 'Crunches', sets: 3, reps: 25, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'core', duration: '8 min' }
    ],
    thursday: [
      { id: 13, name: 'Pull-ups', sets: 3, reps: 8, completed: false, equipment: 'bodyweight', difficulty: 'advanced', muscleGroup: 'back', duration: '8 min' },
      { id: 14, name: 'Lat Pulldowns', sets: 4, reps: 12, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'back', duration: '10 min' },
      { id: 15, name: 'Bicep Curls', sets: 3, reps: 15, completed: false, equipment: 'dumbbells', difficulty: 'beginner', muscleGroup: 'biceps', duration: '8 min' },
      { id: 16, name: 'Face Pulls', sets: 3, reps: 15, completed: false, equipment: 'cable', difficulty: 'intermediate', muscleGroup: 'shoulders', duration: '6 min' }
    ],
    friday: [
      { id: 17, name: 'Squats', sets: 4, reps: 12, completed: false, equipment: 'barbell', difficulty: 'intermediate', muscleGroup: 'legs', duration: '15 min' },
      { id: 18, name: 'Lunges', sets: 3, reps: 10, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'legs', duration: '8 min' },
      { id: 19, name: 'Leg Curls', sets: 3, reps: 15, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'legs', duration: '10 min' },
      { id: 20, name: 'Glute Bridges', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'glutes', duration: '6 min' }
    ],
    saturday: [
      { id: 21, name: 'Incline Press', sets: 4, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'chest', duration: '12 min' },
      { id: 22, name: 'Flyes', sets: 3, reps: 15, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'chest', duration: '8 min' },
      { id: 23, name: 'Side Raises', sets: 3, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'beginner', muscleGroup: 'shoulders', duration: '6 min' },
      { id: 24, name: 'Push-ups', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'chest', duration: '5 min' }
    ],
    sunday: [
      { id: 25, name: 'Light Cardio', sets: 1, reps: '30 min', completed: false, equipment: 'treadmill', difficulty: 'beginner', muscleGroup: 'cardio', duration: '30 min' },
      { id: 26, name: 'Stretching', sets: 1, reps: '15 min', completed: false, equipment: 'none', difficulty: 'beginner', muscleGroup: 'flexibility', duration: '15 min' },
      { id: 27, name: 'Core Work', sets: 3, reps: '20', completed: false, equipment: 'bodyweight', difficulty: 'intermediate', muscleGroup: 'core', duration: '10 min' },
      { id: 28, name: 'Foam Rolling', sets: 1, reps: '10 min', completed: false, equipment: 'foam roller', difficulty: 'beginner', muscleGroup: 'recovery', duration: '10 min' }
    ]
  })

  const [animateStats, setAnimateStats] = useState(false)
  const [animateHeader, setAnimateHeader] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)

  useEffect(() => {
    // Stagger animations for better visual appeal
    setTimeout(() => setAnimateHeader(true), 200)
    setTimeout(() => setAnimateStats(true), 400)
    setTimeout(() => setAnimateContent(true), 600)
  }, [])

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

  const dayFocus = {
    monday: 'Full Body Strength',
    tuesday: 'Chest & Triceps',
    wednesday: 'Legs & Core',
    thursday: 'Back & Biceps',
    friday: 'Lower Body Power',
    saturday: 'Upper Body Hypertrophy',
    sunday: 'Active Recovery'
  }

  const dayDescriptions = {
    monday: 'Build foundational strength with compound movements',
    tuesday: 'Focus on pushing movements and arm development',
    wednesday: 'Develop lower body power and core stability',
    thursday: 'Strengthen pulling muscles and biceps',
    friday: 'Maximize leg strength and glute development',
    saturday: 'Increase upper body muscle mass',
    sunday: 'Promote recovery and maintain cardiovascular health'
  }

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
      'bodyweight': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'dumbbells': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7M4 18h7" />
        </svg>
      ),
      'barbell': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      ),
      'machine': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      'cable': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l4-4a4 4 0 000-5.656z" />
        </svg>
      ),
      'treadmill': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'none': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'foam roller': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
    return icons[equipment] || (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'beginner': 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
      'intermediate': 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm',
      'advanced': 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
    }
    return colors[difficulty] || 'bg-gray-50 text-gray-700 border-gray-200 shadow-sm'
  }

  const getMuscleGroupColor = (muscleGroup) => {
    const colors = {
      'chest': 'bg-blue-50 text-blue-700 shadow-sm',
      'back': 'bg-purple-50 text-purple-700 shadow-sm',
      'legs': 'bg-orange-50 text-orange-700 shadow-sm',
      'shoulders': 'bg-pink-50 text-pink-700 shadow-sm',
      'biceps': 'bg-indigo-50 text-indigo-700 shadow-sm',
      'triceps': 'bg-red-50 text-red-700 shadow-sm',
      'core': 'bg-teal-50 text-teal-700 shadow-sm',
      'calves': 'bg-cyan-50 text-cyan-700 shadow-sm',
      'glutes': 'bg-yellow-50 text-yellow-700 shadow-sm',
      'cardio': 'bg-green-50 text-green-700 shadow-sm',
      'flexibility': 'bg-violet-50 text-violet-700 shadow-sm',
      'recovery': 'bg-slate-50 text-slate-700 shadow-sm'
    }
    return colors[muscleGroup] || 'bg-gray-50 text-gray-700 shadow-sm'
  }

  const todayWorkouts = workouts[currentDay] || []
  const completedCount = todayWorkouts.filter(w => w.completed).length
  const totalCount = todayWorkouts.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const totalDuration = todayWorkouts.reduce((sum, w) => {
    const duration = parseInt(w.duration) || 0
    return sum + duration
  }, 0)
  const completedDuration = todayWorkouts.filter(w => w.completed).reduce((sum, w) => {
    const duration = parseInt(w.duration) || 0
    return sum + duration
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Premium Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23e0e7ff%22%20stroke-width%3D%220.5%22%20opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M30%2030v30M60%2030v30M90%2030v30M120%2030v30M150%2030v30M180%2030v30M210%2030v30M240%2030v30M270%2030v30M300%2030v30M330%2030v30M360%2030v30M390%2030v30M420%2030v30M450%2030v30M480%2030v30M510%2030v30M540%2030v30M570%2030v30M600%2030v30M630%2030v30M660%2030v30M690%2030v30M720%2030v30M750%2030v30M780%2030v30M810%2030v30M840%2030v30M870%2030v30M900%2030v30M930%2030v30M960%2030v30M990%2030v30M1020%2030v30M1050%2030v30M1080%2030v30M1110%2030v30M1140%2030v30M1170%2030v30M1200%2030v30M1230%2030v30M1260%2030v30M1290%2030v30M1320%2030v30M1350%2030v30M1380%2030v30M1410%2030v30M1440%2030v30M1470%2030v30M1500%2030v30M1530%2030v30M1560%2030v30M1590%2030v30M1620%2030v30M1650%2030v30M1680%2030v30M1710%2030v30M1740%2030v30M1770%2030v30M1800%2030v30M1830%2030v30M1860%2030v30M1890%2030v30M1920%2030v30M1950%2030v30M1980%2030v30M2010%2030v30M2040%2030v30M2070%2030v30M2100%2030v30M2130%2030v30M2160%2030v30M2190%2030v30M2220%2030v30M2250%2030v30M2280%2030v30M2310%2030v30M2340%2030v30M2370%2030v30M2400%2030v30M2430%2030v30M2460%2030v30M2490%2030v30M2520%2030v30M2550%2030v30M2580%2030v30M2610%2030v30M2640%2030v30M2670%2030v30M2700%2030v30M2730%2030v30M2760%2030v30M2790%2030v30M2820%2030v30M2850%2030v30M2880%2030v30M2910%2030v30M2940%2030v30M2970%2030v30M3000%2030v30M3030%2030v30M3060%2030v30M3090%2030v30M3120%2030v30M3150%2030v30M3180%2030v30M3210%2030v30M3240%2030v30M3270%2030v30M3300%2030v30M3330%2030v30M3360%2030v30M3390%2030v30M3420%2030v30M3450%2030v30M3480%2030v30M3510%2030v30M3540%2030v30M3570%2030v30M3600%2030v30M3630%2030v30M3660%2030v30M3690%2030v30M3720%2030v30M3750%2030v30M3780%2030v30M3810%2030v30M3840%2030v30M3870%2030v30M3900%2030v30M3930%2030v30M3960%2030v30M3990%2030v30M4020%2030v30M4050%2030v30M4080%2030v30M4110%2030v30M4140%2030v30M4170%2030v30M4200%2030v30M4230%2030v30M4260%2030v30M4290%2030v30M4320%2030v30M4350%2030v30M4380%2030v30M4410%2030v30M4440%2030v30M4470%2030v30M4500%2030v30M4530%2030v30M4560%2030v30M4590%2030v30M4620%2030v30M4650%2030v30M4680%2030v30M4710%2030v30M4740%2030v30M4770%2030v30M4800%2030v30M4830%2030v30M4860%2030v30M4890%2030v30M4920%2030v30M4950%2030v30M4980%2030v30M5010%2030v30M5040%2030v30M5070%2030v30M5100%2030v30M5130%2030v30M5160%2030v30M5190%2030v30M5220%2030v30M5250%2030v30M5280%2030v30M5310%2030v30M5340%2030v30M5370%2030v30M5400%2030v30M5430%2030v30M5460%2030v30M5490%2030v30M5520%2030v30M5550%2030v30M5580%2030v30M5610%2030v30M5640%2030v30M5670%2030v30M5700%2030v30M5730%2030v30M5760%2030v30M5790%2030v30M5820%2030v30M5850%2030v30M5880%2030v30M5910%2030v30M5940%2030v30M5970%2030v30%22%3E%3C/path%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>
      
      {/* Premium Header */}
      <header className={`bg-white border-b border-blue-200 shadow-md sticky top-0 z-40 transition-all duration-700 ${
        animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="w-full px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-700 delay-100 ${
              animateHeader ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Elite Fitness
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">Professional Training Program</p>
                </div>
              </div>
            </div>
            <div className={`text-right transition-all duration-700 delay-200 ${
              animateHeader ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Week</div>
              <div className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 sm:px-8 lg:px-12 py-8">
        {/* Premium Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 ${
          animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="group bg-white border border-blue-200 p-5 hover:shadow-md transition-all duration-300 hover:border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wider">Today's Focus</p>
                <p className="text-lg font-medium text-blue-700">{dayFocus[currentDay]}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="group bg-white border border-green-200 p-5 hover:shadow-md transition-all duration-300 hover:border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-500 uppercase tracking-wider">Progress</p>
                <p className="text-lg font-medium text-green-700">{completedCount}/{totalCount}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="group bg-white border border-purple-200 p-5 hover:shadow-md transition-all duration-300 hover:border-purple-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-500 uppercase tracking-wider">Duration</p>
                <p className="text-lg font-medium text-purple-700">{totalDuration} min</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="group bg-white border border-pink-200 p-5 hover:shadow-md transition-all duration-300 hover:border-pink-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-pink-500 uppercase tracking-wider">Intensity</p>
                <p className="text-lg font-medium text-pink-700">Elite</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Today's Workout */}
        <section id="todays-workout" className="mb-8">
          <div className={`bg-white border border-indigo-200 overflow-hidden hover:shadow-md transition-all duration-500 ${
            animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {dayNames[currentDay]} Training
                  </h2>
                  <p className="text-gray-600 text-sm">{dayDescriptions[currentDay]}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white px-4 py-2 border border-indigo-200">
                    <div className="text-2xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{Math.round(completionPercentage)}%</div>
                    <div className="text-gray-600 text-xs">Complete</div>
                  </div>
                  <div className="text-center bg-white px-4 py-2 border border-indigo-200">
                    <div className="text-2xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{completedDuration}m</div>
                    <div className="text-gray-600 text-xs">Done</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Premium Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-indigo-500">Session Progress</span>
                  <span className="text-xs font-medium text-indigo-600">
                    {completedCount}/{totalCount} exercises
                  </span>
                </div>
                <div className="w-full bg-indigo-100 h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Premium Exercise List */}
              <div className="space-y-3">
                {todayWorkouts.map((workout, index) => (
                  <div
                    key={workout.id}
                    className={`group relative border p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      workout.completed 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-white hover:bg-indigo-50 border-indigo-200'
                    }`}
                  >
                    {/* Completion Badge */}
                    {workout.completed && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs font-medium">
                          ✓ Complete
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Exercise Number */}
                        <div className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                          workout.completed 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        
                        {/* Exercise Info */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Link 
                              to={`/exercise/${workout.id}`}
                              className="text-base font-medium text-indigo-900 hover:text-indigo-700 transition-colors duration-200"
                            >
                              {workout.name}
                            </Link>
                            <span className={`px-2 py-1 text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                              {workout.difficulty}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium ${getMuscleGroupColor(workout.muscleGroup)}`}>
                              {workout.muscleGroup}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                            <div className="flex items-center gap-1">
                              <div className="text-indigo-400">
                                {getEquipmentIcon(workout.equipment)}
                              </div>
                              <span className="capitalize">{workout.sets} × {workout.reps}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="text-indigo-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <span className="capitalize">{workout.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="text-indigo-400">
                                {getEquipmentIcon(workout.equipment)}
                              </div>
                              <span className="capitalize">{workout.equipment}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/exercise/${workout.id}`}
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-all duration-200"
                        >
                          View Details
                        </Link>
                        <button 
                          onClick={() => toggleWorkoutCompletion(workout.id)}
                          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            workout.completed 
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                          }`}
                        >
                          {workout.completed ? 'Undo' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Quick Actions */}
              <div className="flex gap-3 mt-6">
                <button className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-all duration-200 border border-indigo-200">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Weekly Overview */}
        <section>
          <div className={`bg-white border border-teal-200 overflow-hidden hover:shadow-md transition-all duration-500 ${
            animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-teal-100 to-cyan-100 px-6 py-4">
              <h3 className="text-lg font-medium bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Weekly Schedule</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {Object.entries(dayNames).map(([dayKey, dayName]) => {
                  const dayWorkouts = workouts[dayKey] || []
                  const dayCompleted = dayWorkouts.filter(w => w.completed).length
                  const isToday = dayKey === currentDay
                  const dayDuration = dayWorkouts.reduce((sum, w) => {
                    const duration = parseInt(w.duration) || 0
                    return sum + duration
                  }, 0)
                  
                  return (
                    <div
                      key={dayKey}
                      className={`group relative border p-4 transition-all duration-300 hover:shadow-md ${
                        isToday 
                          ? 'border-teal-400 bg-teal-50' 
                          : 'bg-white hover:bg-teal-50 border-teal-200'
                      }`}
                    >
                      {isToday && (
                        <div className="absolute -top-2 -right-2">
                          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-2 py-1 text-xs font-medium">
                            TODAY
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-teal-900">{dayName}</h4>
                        <p className="text-teal-600 text-xs">{dayFocus[dayKey]}</p>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-teal-700">
                            {dayCompleted}/{dayWorkouts.length}
                          </span>
                          <span className="text-xs text-teal-500">
                            {Math.round((dayCompleted / dayWorkouts.length) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-teal-200 h-1 overflow-hidden">
                          <div 
                            className={`h-1 transition-all duration-700 ease-out ${
                              isToday ? 'bg-gradient-to-r from-teal-600 to-cyan-600' : 'bg-teal-400'
                            }`}
                            style={{ width: `${dayWorkouts.length > 0 ? (dayCompleted / dayWorkouts.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-teal-500">
                        <span className="font-medium">{dayDuration} min</span>
                        <div className="flex gap-1">
                          {Array.from(new Set(dayWorkouts.map(w => w.equipment))).slice(0, 3).map(equipment => (
                            <div key={equipment} className="text-teal-400">
                              {getEquipmentIcon(equipment)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Workout
