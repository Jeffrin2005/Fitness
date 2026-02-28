import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import BodyAnalysis from './pages/BodyAnalysis'
import HealthVitals from './pages/HealthVitals'
import Nutrition from './pages/Nutrition'
import Workout from './pages/Workout'
import ExerciseDetail from './pages/ExerciseDetail'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const [showWorkoutReminder, setShowWorkoutReminder] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserData(token)
    } else {
      // If no token, user is not authenticated
      setIsAuthenticated(false)
      setUserData(null)
    }
  }, [])

  useEffect(() => {
    // Show reminder when user becomes authenticated
    if (isAuthenticated && userData) {
      const today = new Date().toDateString()
      const lastReminder = localStorage.getItem('lastWorkoutReminder')
      
      // Only show reminder if it hasn't been shown today
      if (lastReminder !== today) {
        setTimeout(() => {
          setShowWorkoutReminder(true)
        }, 1500) // Slightly longer delay for better UX
      }
    }
  }, [isAuthenticated, userData])

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/user/data', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUserData(null)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // If API fails, still set authenticated to allow app to work
      const mockUser = { username: 'User', email: 'user@example.com' }
      setUserData(mockUser)
      setIsAuthenticated(true)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        setUserData(data.user)
        setIsAuthenticated(true)
        
        // Show workout reminder after successful login
        setTimeout(() => {
          setShowWorkoutReminder(true)
        }, 1000)
        
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.message || 'Invalid credentials' }
      }
    } catch (error) {
      // If API fails, simulate successful login for demo
      const mockUser = { username: username, email: `${username}@example.com` }
      const mockToken = 'demo-token-' + Date.now()
      localStorage.setItem('token', mockToken)
      setUserData(mockUser)
      setIsAuthenticated(true)
      
      // Show workout reminder after successful login
      setTimeout(() => {
        setShowWorkoutReminder(true)
      }, 1000)
      
      return { success: true }
    }
  }

  const handleSignup = async (username, password) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        setUserData(data.user)
        setIsAuthenticated(true)
        
        // Show workout reminder after successful signup
        setTimeout(() => {
          setShowWorkoutReminder(true)
        }, 1000)
        
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.message || 'Signup failed' }
      }
    } catch (error) {
      // If API fails, simulate successful signup for demo
      const mockUser = { username: username, email: `${username}@example.com` }
      const mockToken = 'demo-token-' + Date.now()
      localStorage.setItem('token', mockToken)
      setUserData(mockUser)
      setIsAuthenticated(true)
      
      // Show workout reminder after successful signup
      setTimeout(() => {
        setShowWorkoutReminder(true)
      }, 1000)
      
      return { success: true }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('lastWorkoutReminder') // Reset workout reminder on logout
    setIsAuthenticated(false)
    setUserData(null)
    setShowWorkoutReminder(false)
  }

  const handleWorkoutReminderOk = () => {
    localStorage.setItem('lastWorkoutReminder', new Date().toDateString())
    setShowWorkoutReminder(false)
    navigate('/workouts')
  }

  const getTodayWorkoutInfo = () => {
    const dayIndex = new Date().getDay()
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayNames = {
      sunday: 'Sunday',
      monday: 'Monday', 
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday'
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
    
    const currentDay = days[dayIndex]
    return {
      dayName: dayNames[currentDay],
      focus: dayFocus[currentDay]
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} />
  }

  const todayWorkout = getTodayWorkoutInfo()
  
  // Get workout stats for display
  const getWorkoutStats = () => {
    const dayIndex = new Date().getDay()
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDay = days[dayIndex]
    
    // Default workout stats
    const workoutStats = {
      monday: { duration: 23, count: 4 },
      tuesday: { duration: 36, count: 4 },
      wednesday: { duration: 40, count: 4 },
      thursday: { duration: 32, count: 4 },
      friday: { duration: 39, count: 4 },
      saturday: { duration: 31, count: 4 },
      sunday: { duration: 65, count: 4 }
    }
    
    return workoutStats[currentDay] || { duration: 30, count: 4 }
  }
  
  const workoutStats = getWorkoutStats()
  const totalDuration = workoutStats.duration
  const totalCount = workoutStats.count

  return (
    <>
      {/* Workout Reminder Popup */}
      {showWorkoutReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg mx-4 transform transition-all duration-500 scale-100 animate-slide-up shadow-2xl">
            <div className="text-center">
              {/* Animated Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {/* Welcome Message */}
              <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Welcome Back! 💪
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Hi <span className="font-semibold text-orange-600">{userData?.username || 'Athlete'}</span>! 
                <br />Ready to crush today's workout?
              </p>
              
              {/* Today's Focus Card */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Today's Focus</p>
                    <p className="text-xl font-bold text-gray-900">{todayWorkout.focus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Day</p>
                    <p className="text-xl font-bold text-gray-900">{todayWorkout.dayName}</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600">{totalDuration || '30'}m</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalCount || '4'}</div>
                    <div className="text-xs text-gray-600">Exercises</div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowWorkoutReminder(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 border-2 border-gray-300"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleWorkoutReminderOk}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-transparent"
                >
                  Let's Go! 🚀
                </button>
              </div>
              
              {/* Motivational Quote */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 italic">
                  "The only bad workout is the one that didn't happen."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Layout userData={userData} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Overview userData={userData} />} />
          <Route path="/body-analysis" element={<BodyAnalysis userData={userData} />} />
          <Route path="/health-vitals" element={<HealthVitals userData={userData} />} />
          <Route path="/nutrition" element={<Nutrition userData={userData} />} />
          <Route path="/workouts" element={<Workout userData={userData} />} />
          <Route path="/exercise/:exerciseId" element={<ExerciseDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

/* Add custom animations */
const style = document.createElement('style')
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
`
document.head.appendChild(style)
