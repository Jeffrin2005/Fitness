import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import BodyAnalysis from './pages/BodyAnalysis'
import HealthVitals from './pages/HealthVitals'
import Nutrition from './pages/Nutrition'
import Workouts from './pages/Workouts'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserData(token)
    }
  }, [])

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
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const refreshUserData = () => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserData(token)
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
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.message || 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, message: 'Connection error' }
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
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.message || 'Signup failed' }
      }
    } catch (error) {
      return { success: false, message: 'Connection error' }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUserData(null)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} />
  }

  return (
    <Router>
      <Layout userData={userData} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Overview userData={userData} />} />
          <Route path="/body-analysis" element={<BodyAnalysis userData={userData} />} />
          <Route path="/health-vitals" element={<HealthVitals userData={userData} />} />
          <Route path="/nutrition" element={<Nutrition userData={userData} />} />
          <Route path="/workouts" element={<Workouts userData={userData} onWorkoutUpdate={refreshUserData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
