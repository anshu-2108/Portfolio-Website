import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    const storedAdmin = localStorage.getItem('admin')
    
    if (token && storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const login = async (username, password) => {
    try {
      // In production, this would be an API call to your backend
      if (username === 'admin' && password === 'Admin@123') {
        const adminData = {
          id: 1,
          username: 'admin',
          name: 'Administrator',
          email: 'admin@portfolio.com',
          role: 'super_admin',
          lastLogin: new Date().toISOString()
        }
        
        const token = btoa(JSON.stringify({ 
          id: adminData.id, 
          exp: Date.now() + 24 * 60 * 60 * 1000 
        }))
        
        localStorage.setItem('adminToken', token)
        localStorage.setItem('admin', JSON.stringify(adminData))
        
        setAdmin(adminData)
        setIsAuthenticated(true)
        
        return { success: true }
      } else {
        return { success: false, message: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setAdmin(null)
    setIsAuthenticated(false)
    navigate('/login')
  }

  const value = {
    admin,
    loading,
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}