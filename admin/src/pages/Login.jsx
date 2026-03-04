import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash, 
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    let interval
    if (lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(prev => {
          if (prev <= 1) {
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [lockTimer])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLocked) {
      setError(`Too many attempts. Try again in ${lockTimer}s`)
      return
    }

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await login(credentials.username, credentials.password)
      
      if (result.success) {
        setLoginAttempts(0)
        if (rememberMe) {
          localStorage.setItem('rememberedUser', credentials.username)
        }
      } else {
        const attempts = loginAttempts + 1
        setLoginAttempts(attempts)
        
        if (attempts >= 5) {
          setIsLocked(true)
          setLockTimer(300) // 5 minutes
          setError('Account locked. Try again in 5 minutes.')
        } else {
          setError(`${result.message}. ${5 - attempts} attempts left`)
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl mb-4">
            <FaShieldAlt className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Secure access to message management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {isLocked && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-400 text-center">
                Locked for {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, '0')}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none 
                           text-white placeholder-gray-500"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none 
                           text-white placeholder-gray-500"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Contact system administrator')}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || isLocked}
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                       flex items-center justify-center gap-2
                       ${loading || isLocked
                         ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                         : 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                       }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FaShieldAlt className="w-4 h-4" />
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Demo Access:</p>
            <div className="flex justify-between text-xs">
              <div>
                <span className="text-gray-500">Username:</span>
                <span className="text-gray-300 ml-2">admin</span>
              </div>
              <div>
                <span className="text-gray-500">Password:</span>
                <span className="text-gray-300 ml-2">Admin@123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <p className="text-center mt-8 text-xs text-gray-600">
          Admin Panel v1.0 • Secure Connection • 256-bit Encryption
        </p>
      </div>
    </div>
  )
}

export default Login