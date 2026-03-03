import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dumbbell,
  Clock,
  Flame,
  CheckCircle2,
  Plus,
  RotateCcw,
  TrendingUp,
  Award,
  Calendar,
  ChevronRight,
  Target,
  Info,
  Activity,
  Zap,
  Star,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react'

// Professional daily workouts logic
const weeklyWorkouts = {
  Monday: [
    { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'chest', duration: '5 min' },
    { id: 2, name: 'Squats', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'legs', duration: '6 min' },
    { id: 3, name: 'Dumbbell Curls', sets: 3, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'biceps', duration: '8 min' },
    { id: 4, name: 'Plank', sets: 3, reps: '30 sec', completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'core', duration: '2 min' }
  ],
  Tuesday: [
    { id: 5, name: 'Bench Press', sets: 4, reps: 10, completed: false, equipment: 'barbell', difficulty: 'intermediate', muscleGroup: 'chest', duration: '12 min' },
    { id: 6, name: 'Rows', sets: 4, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'back', duration: '10 min' },
    { id: 7, name: 'Shoulder Press', sets: 3, reps: 10, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'shoulders', duration: '8 min' },
    { id: 8, name: 'Tricep Dips', sets: 3, reps: 15, completed: false, equipment: 'bodyweight', difficulty: 'intermediate', muscleGroup: 'triceps', duration: '6 min' }
  ],
  Wednesday: [
    { id: 9, name: 'Deadlifts', sets: 4, reps: 8, completed: false, equipment: 'barbell', difficulty: 'advanced', muscleGroup: 'legs', duration: '15 min' },
    { id: 10, name: 'Leg Press', sets: 4, reps: 15, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'legs', duration: '12 min' },
    { id: 11, name: 'Calf Raises', sets: 4, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'calves', duration: '5 min' },
    { id: 12, name: 'Crunches', sets: 3, reps: 25, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'core', duration: '8 min' }
  ],
  Thursday: [
    { id: 13, name: 'Pull-ups', sets: 3, reps: 8, completed: false, equipment: 'bodyweight', difficulty: 'advanced', muscleGroup: 'back', duration: '8 min' },
    { id: 14, name: 'Lat Pulldowns', sets: 4, reps: 12, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'back', duration: '10 min' },
    { id: 15, name: 'Bicep Curls', sets: 3, reps: 15, completed: false, equipment: 'dumbbells', difficulty: 'beginner', muscleGroup: 'biceps', duration: '8 min' },
    { id: 16, name: 'Face Pulls', sets: 3, reps: 15, completed: false, equipment: 'cable', difficulty: 'intermediate', muscleGroup: 'shoulders', duration: '6 min' }
  ],
  Friday: [
    { id: 17, name: 'Squats', sets: 4, reps: 12, completed: false, equipment: 'barbell', difficulty: 'intermediate', muscleGroup: 'legs', duration: '15 min' },
    { id: 18, name: 'Lunges', sets: 3, reps: 10, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'legs', duration: '8 min' },
    { id: 19, name: 'Leg Curls', sets: 3, reps: 15, completed: false, equipment: 'machine', difficulty: 'intermediate', muscleGroup: 'legs', duration: '10 min' },
    { id: 20, name: 'Glute Bridges', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'glutes', duration: '6 min' }
  ],
  Saturday: [
    { id: 21, name: 'Incline Press', sets: 4, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'chest', duration: '12 min' },
    { id: 22, name: 'Flyes', sets: 3, reps: 15, completed: false, equipment: 'dumbbells', difficulty: 'intermediate', muscleGroup: 'chest', duration: '8 min' },
    { id: 23, name: 'Side Raises', sets: 3, reps: 12, completed: false, equipment: 'dumbbells', difficulty: 'beginner', muscleGroup: 'shoulders', duration: '6 min' },
    { id: 24, name: 'Push-ups', sets: 3, reps: 20, completed: false, equipment: 'bodyweight', difficulty: 'beginner', muscleGroup: 'chest', duration: '5 min' }
  ],
  Sunday: [
    { id: 25, name: 'Light Cardio', sets: 1, reps: '30 min', completed: false, equipment: 'treadmill', difficulty: 'beginner', muscleGroup: 'cardio', duration: '30 min' },
    { id: 26, name: 'Stretching', sets: 1, reps: '15 min', completed: false, equipment: 'none', difficulty: 'beginner', muscleGroup: 'flexibility', duration: '15 min' },
    { id: 27, name: 'Core Work', sets: 3, reps: '20', completed: false, equipment: 'bodyweight', difficulty: 'intermediate', muscleGroup: 'core', duration: '10 min' },
    { id: 28, name: 'Foam Rolling', sets: 1, reps: '10 min', completed: false, equipment: 'foam roller', difficulty: 'beginner', muscleGroup: 'recovery', duration: '10 min' }
  ]
}

const dayFocus = {
  Monday: 'Push Strength',
  Tuesday: 'Alpha Conditioning',
  Wednesday: 'Lower Kinetic',
  Thursday: 'Back Precision',
  Friday: 'Power Foundation',
  Saturday: 'Hyper Performance',
  Sunday: 'Vital Reset'
}

function Workout() {
  const [animateContent, setAnimateContent] = useState(false)

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  const [activeDay, setActiveDay] = useState(getCurrentDay())
  const [workouts, setWorkouts] = useState(weeklyWorkouts[activeDay])

  useEffect(() => {
    setAnimateContent(true)
  }, [])

  useEffect(() => {
    setWorkouts(weeklyWorkouts[activeDay])
  }, [activeDay])

  const toggleWorkoutCompletion = (id) => {
    setWorkouts(prev => prev.map(w =>
      w.id === id ? { ...w, completed: !w.completed } : w
    ))
  }

  const resetDailyProgress = () => {
    setWorkouts(prev => prev.map(w => ({ ...w, completed: false })))
  }

  const sessionProgress = useMemo(() => {
    const completed = workouts.filter(w => w.completed).length
    return (completed / workouts.length) * 100
  }, [workouts])

  const stats = useMemo(() => {
    const totalVolume = workouts.reduce((acc, w) => acc + (parseInt(w.sets) * (parseInt(w.reps) || 12)), 0)
    const totalDuration = workouts.reduce((acc, w) => acc + (parseInt(w.duration) || 0), 0)
    const caloriesBurned = totalDuration * 8
    return { totalVolume, totalDuration, caloriesBurned }
  }, [workouts])

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Subtle Mesh Background (Slim Elite) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-2%] w-[400px] h-[400px] rounded-full blur-[80px] opacity-10" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)' }} />
        <div className="absolute bottom-[-5%] left-[-2%] w-[300px] h-[300px] rounded-full blur-[70px] opacity-10" style={{ background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)' }} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

        {/* SLIM SIDE NAVIGATION */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-5 flex flex-col sticky top-0 md:h-screen">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 transform -rotate-6 transition-transform hover:rotate-0">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black italic tracking-tighter text-slate-900">PROTO_WORK</h1>
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500">System v4.82</p>
            </div>
          </div>

          <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Scheduling</h2>
          <nav className="space-y-1.5 mb-auto">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center justify-between group ${activeDay === day
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1'
                  : 'hover:bg-slate-50 text-slate-600'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${activeDay === day ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-white'
                    }`}>
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-tight">{day}</span>
                    <span className={`text-[8px] font-medium uppercase tracking-widest ${activeDay === day ? 'text-white/40' : 'text-slate-400'}`}>
                      {dayFocus[day].split(' ')[0]}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* SLIM MAIN DASHBOARD */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* Slim Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-50/50">
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">
                    {activeDay} Sequence
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                      {dayFocus[activeDay]}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Active Output</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Yield</p>
                    <p className="text-lg font-black text-slate-900">{Math.round(sessionProgress)}%</p>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                    <p className="text-lg font-black text-emerald-500 uppercase">Norm</p>
                  </div>
                </div>
                <button
                  onClick={resetDailyProgress}
                  className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Intensity', value: dayFocus[activeDay].split(' ')[0], color: '#6366F1', icon: Zap },
                { label: 'Volume', value: stats.totalVolume, color: '#10B981', icon: TrendingUp },
                { label: 'Cycle', value: `${stats.totalDuration}m`, color: '#06B6D4', icon: Clock },
                { label: 'Thermal', value: stats.caloriesBurned, color: '#F43F5E', icon: Flame }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-5 -mr-8 -mt-8 rounded-full" style={{ background: stat.color }} />
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform" style={{ background: `${stat.color}11`, border: `1px solid ${stat.color}22` }}>
                      <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">{stat.label}</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 tracking-tighter mb-0.5 italic uppercase relative z-10">{stat.value}</div>
                  <div className="w-full h-1 bg-slate-50 rounded-full mt-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: '70%', background: stat.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Slim Module Cascade */}
            <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-xl shadow-indigo-100/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
                    <Activity className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Module Cascade</h3>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Logic
                </button>
              </div>

              <div className="space-y-3 relative z-10">
                <AnimatePresence mode='popLayout'>
                  {workouts.map((workout, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={workout.id}
                      onClick={() => toggleWorkoutCompletion(workout.id)}
                      className={`group p-4 rounded-3xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${workout.completed
                        ? 'bg-emerald-50 border-emerald-100 shadow-none opacity-80'
                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                    >
                      <div className="flex items-center gap-5">
                        {/* Slim Counter */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${workout.completed
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 scale-90'
                          : 'bg-slate-50 text-slate-300 border border-slate-100'
                          }`}>
                          {workout.completed ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-lg font-black">{index + 1}</span>}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className={`text-base font-black tracking-tight transition-all duration-500 ${workout.completed ? 'text-slate-300 line-through' : 'text-slate-900'
                              }`}>
                              {workout.name}
                            </h4>
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${workout.difficulty === 'advanced' ? 'border-rose-100 text-rose-500 bg-rose-50' :
                              workout.difficulty === 'intermediate' ? 'border-amber-100 text-amber-600 bg-amber-50' :
                                'border-emerald-100 text-emerald-500 bg-emerald-50'
                              }`}>
                              {workout.difficulty.slice(0, 3)}
                            </span>
                          </div>
                          <div className="flex items-center gap-5">
                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                              <Target className="w-3 h-3 text-indigo-400" />
                              {workout.muscleGroup}
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-900 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 whitespace-nowrap">
                              {workout.sets}S × {workout.reps}R
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">
                              <Clock className="w-3 h-3" />
                              {workout.duration}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Apparatus</p>
                          <p className="text-xs font-black text-slate-800 capitalize tracking-tight">{workout.equipment}</p>
                        </div>

                        <Link
                          to={`/exercise/${workout.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`flex items-center gap-2 group/link px-3 py-1.5 rounded-xl transition-all ${workout.completed
                              ? 'text-slate-200 pointer-events-none'
                              : 'text-indigo-600 hover:bg-indigo-50 active:scale-95'
                            }`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest">View Details</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Workout
