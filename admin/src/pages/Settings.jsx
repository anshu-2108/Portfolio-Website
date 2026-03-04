import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { 
  FaUser, FaLock, FaBell, FaShieldAlt, 
  FaGlobe, FaPalette, FaLanguage, FaSave,
  FaKey, FaEnvelope, FaMobile, FaDesktop,
  FaMoon, FaSun, FaCheck, FaTimes,
  FaEye, FaEyeSlash, FaTrash, FaExclamationTriangle
} from 'react-icons/fa'

const Settings = () => {
  const { admin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Profile settings
  const [profile, setProfile] = useState({
    name: admin?.name || 'Administrator',
    email: admin?.email || 'admin@portfolio.com',
    username: admin?.username || 'admin',
    bio: 'Full-stack developer and system administrator',
    avatar: null,
    timezone: 'America/New_York',
    language: 'en'
  })

  // Security settings
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    browserNotifications: true,
    newMessageAlert: true,
    dailyDigest: false,
    weeklyReport: true,
    mentionAlerts: true,
    soundEnabled: true
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactMode: false,
    animationsEnabled: true,
    fontSize: 'medium'
  })

  // API settings
  const [api, setApi] = useState({
    apiKey: 'sk_live_' + Math.random().toString(36).substring(2, 15),
    webhookUrl: 'https://api.example.com/webhook',
    rateLimit: 100,
    ipWhitelist: ['192.168.1.1', '10.0.0.1']
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target
    setSecurity(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
  }

  const handleAppearanceChange = (name, value) => {
    setAppearance(prev => ({ ...prev, [name]: value }))
  }

  const handleApiChange = (e) => {
    const { name, value } = e.target
    setApi(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async (section) => {
    setIsLoading(true)
    setSaveError('')
    
    // Validate security settings
    if (section === 'security') {
      if (security.newPassword && security.newPassword.length < 8) {
        setSaveError('Password must be at least 8 characters')
        setIsLoading(false)
        return
      }
      if (security.newPassword !== security.confirmPassword) {
        setSaveError('Passwords do not match')
        setIsLoading(false)
        return
      }
    }

    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true)
      setIsLoading(false)
      setTimeout(() => setSaveSuccess(false), 3000)
      
      // Clear password fields
      if (section === 'security') {
        setSecurity({
          ...security,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    }, 1500)
  }

  const generateNewApiKey = () => {
    setApi({
      ...api,
      apiKey: 'sk_live_' + Math.random().toString(36).substring(2, 15)
    })
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'api', label: 'API Settings', icon: <FaKey /> }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header title="Settings" admin={admin} />
        
        <div className="p-8">
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <FaCheck className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-700">Settings saved successfully!</p>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <FaTimes className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-700">{saveError}</p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Profile Information</h3>
                  
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-white font-light">
                          {profile.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                          Change Avatar
                        </button>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleProfileChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={profile.timezone}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        name="language"
                        value={profile.language}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleSaveSettings('profile')}
                      disabled={isLoading}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Security Settings</h3>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={security.currentPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          />
                          <button
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                          >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>

                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={security.newPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>

                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={security.confirmPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          />
                          <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>

                        <p className="text-xs text-gray-500">
                          Password must be at least 8 characters and include a number and special character.
                        </p>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactorEnabled"
                            checked={security.twoFactorEnabled}
                            onChange={handleSecurityChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                        </label>
                      </div>
                    </div>

                    {/* Session Timeout */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        name="sessionTimeout"
                        value={security.sessionTimeout}
                        onChange={handleSecurityChange}
                        min="5"
                        max="120"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* Login Notifications */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Login Notifications</h4>
                        <p className="text-xs text-gray-500 mt-1">Get notified of new login attempts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="loginNotifications"
                          checked={security.loginNotifications}
                          onChange={handleSecurityChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>

                    <button
                      onClick={() => handleSaveSettings('security')}
                      disabled={isLoading}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Update Security
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Enable email notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              checked={notifications.emailNotifications}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </label>
                        </div>

                        {notifications.emailNotifications && (
                          <>
                            <div className="flex items-center justify-between pl-4">
                              <span className="text-sm text-gray-600">New message alerts</span>
                              <input
                                type="checkbox"
                                name="newMessageAlert"
                                checked={notifications.newMessageAlert}
                                onChange={handleNotificationChange}
                                className="w-4 h-4"
                              />
                            </div>
                            <div className="flex items-center justify-between pl-4">
                              <span className="text-sm text-gray-600">Daily digest</span>
                              <input
                                type="checkbox"
                                name="dailyDigest"
                                checked={notifications.dailyDigest}
                                onChange={handleNotificationChange}
                                className="w-4 h-4"
                              />
                            </div>
                            <div className="flex items-center justify-between pl-4">
                              <span className="text-sm text-gray-600">Weekly report</span>
                              <input
                                type="checkbox"
                                name="weeklyReport"
                                checked={notifications.weeklyReport}
                                onChange={handleNotificationChange}
                                className="w-4 h-4"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Browser Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Enable browser notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="browserNotifications"
                              checked={notifications.browserNotifications}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </label>
                        </div>

                        {notifications.browserNotifications && (
                          <>
                            <div className="flex items-center justify-between pl-4">
                              <span className="text-sm text-gray-600">Mention alerts</span>
                              <input
                                type="checkbox"
                                name="mentionAlerts"
                                checked={notifications.mentionAlerts}
                                onChange={handleNotificationChange}
                                className="w-4 h-4"
                              />
                            </div>
                            <div className="flex items-center justify-between pl-4">
                              <span className="text-sm text-gray-600">Sound enabled</span>
                              <input
                                type="checkbox"
                                name="soundEnabled"
                                checked={notifications.soundEnabled}
                                onChange={handleNotificationChange}
                                className="w-4 h-4"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSettings('notifications')}
                      disabled={isLoading}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Save Preferences
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Appearance Settings</h3>
                  
                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleAppearanceChange('theme', 'light')}
                          className={`p-4 border rounded-lg text-center ${
                            appearance.theme === 'light'
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <FaSun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                          <span className="text-sm">Light</span>
                        </button>
                        <button
                          onClick={() => handleAppearanceChange('theme', 'dark')}
                          className={`p-4 border rounded-lg text-center ${
                            appearance.theme === 'dark'
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <FaMoon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                          <span className="text-sm">Dark</span>
                        </button>
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Font Size
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['small', 'medium', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleAppearanceChange('fontSize', size)}
                            className={`py-2 px-4 border rounded-lg text-center ${
                              appearance.fontSize === size
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <span className={`text-sm capitalize ${
                              size === 'small' ? 'text-xs' :
                              size === 'medium' ? 'text-sm' : 'text-base'
                            }`}>
                              {size}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compact Mode */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                        <p className="text-xs text-gray-500 mt-1">Show more items per page</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={appearance.compactMode}
                          onChange={(e) => handleAppearanceChange('compactMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>

                    {/* Animations */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable Animations</h4>
                        <p className="text-xs text-gray-500 mt-1">Smooth transitions and effects</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={appearance.animationsEnabled}
                          onChange={(e) => handleAppearanceChange('animationsEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>

                    <button
                      onClick={() => handleSaveSettings('appearance')}
                      disabled={isLoading}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Update Appearance
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* API Settings */}
              {activeTab === 'api' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-light text-gray-900 mb-6">API Configuration</h3>
                  
                  <div className="space-y-6">
                    {/* API Key */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="apiKey"
                          value={api.apiKey}
                          readOnly
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                        />
                        <button
                          onClick={generateNewApiKey}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                        >
                          Regenerate
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Keep this key secure. Regenerate if compromised.</p>
                    </div>

                    {/* Webhook URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        name="webhookUrl"
                        value={api.webhookUrl}
                        onChange={handleApiChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">Send notifications to this URL</p>
                    </div>

                    {/* Rate Limit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate Limit (requests per minute)
                      </label>
                      <input
                        type="number"
                        name="rateLimit"
                        value={api.rateLimit}
                        onChange={handleApiChange}
                        min="10"
                        max="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    {/* IP Whitelist */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IP Whitelist
                      </label>
                      <textarea
                        name="ipWhitelist"
                        value={api.ipWhitelist.join('\n')}
                        onChange={(e) => setApi({
                          ...api,
                          ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
                        })}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none font-mono text-sm"
                        placeholder="One IP per line"
                      />
                      <p className="text-xs text-gray-500 mt-2">Restrict API access to these IPs. Leave empty for no restrictions.</p>
                    </div>

                    <button
                      onClick={() => handleSaveSettings('api')}
                      disabled={isLoading}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Update API Settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-white border border-red-200 rounded-2xl overflow-hidden">
            <div className="p-4 bg-red-50 border-b border-red-200">
              <h3 className="text-lg font-light text-red-900 flex items-center gap-2">
                <FaExclamationTriangle className="w-5 h-5" />
                Danger Zone
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash className="w-3 h-3" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
              <div className="relative bg-white rounded-xl max-w-md w-full p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaExclamationTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you absolutely sure? This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        logout()
                        setShowDeleteConfirm(false)
                      }}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings