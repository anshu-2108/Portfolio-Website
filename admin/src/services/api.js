import axios from 'axios'

const API_BASE_URL = 'https://portfolio-website-tubm.vercel.app/api' // Your main backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('admin')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Messages API
export const messagesApi = {
  // Get all messages with pagination
  getAll: (page = 1, limit = 10) => 
    api.get(`/messages?page=${page}&limit=${limit}`),
  
  // Get unread count
  getUnreadCount: () => 
    api.get('/messages/unread/count'),
  
  // Mark message as read
  markAsRead: (id) => 
    api.patch(`/messages/${id}/read`),
  
  // Mark message as replied
  markAsReplied: (id) => 
    api.patch(`/messages/${id}/replied`),
  
  // Delete message
  delete: (id) => 
    api.delete(`/messages/${id}`),
  
  // Get single message
  getById: (id) => 
    api.get(`/messages/${id}`)
}

// Analytics API
export const analyticsApi = {
  // Get message statistics
  getStats: async () => {
    try {
      const messagesResponse = await messagesApi.getAll(1, 1000)
      const messages = messagesResponse.data.messages || []
      
      // Calculate stats
      const total = messagesResponse.data.pagination?.total || messages.length
      const unread = messages.filter(m => m.status === 'unread').length
      const read = messages.filter(m => m.status === 'read').length
      const replied = messages.filter(m => m.status === 'replied').length
      
      // Calculate today's messages
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayCount = messages.filter(m => new Date(m.createdAt) >= today).length
      
      // Calculate this week's messages
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const weekCount = messages.filter(m => new Date(m.createdAt) >= weekAgo).length
      
      // Calculate this month's messages
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const monthCount = messages.filter(m => new Date(m.createdAt) >= monthAgo).length
      
      // Calculate response rate
      const responseRate = total > 0 ? Math.round((replied / total) * 100) : 0
      
      // Generate messages over time data
      const last30Days = [...Array(30)].map((_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()
      
      const messagesOverTime = last30Days.map(date => ({
        date,
        count: messages.filter(m => m.createdAt.startsWith(date)).length
      }))
      
      // Status distribution
      const statusDistribution = [
        { name: 'Unread', value: unread },
        { name: 'Read', value: read },
        { name: 'Replied', value: replied }
      ]
      
      // Top senders
      const senderMap = new Map()
      messages.forEach(m => {
        const key = `${m.name}|${m.email}`
        if (senderMap.has(key)) {
          senderMap.set(key, {
            ...senderMap.get(key),
            count: senderMap.get(key).count + 1,
            lastActive: m.createdAt
          })
        } else {
          senderMap.set(key, {
            name: m.name,
            email: m.email,
            count: 1,
            lastActive: m.createdAt
          })
        }
      })
      
      const topSenders = Array.from(senderMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
      
      // Daily pattern
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const dailyStats = days.map(day => ({
        day,
        incoming: messages.filter(m => days[new Date(m.createdAt).getDay()] === day).length,
        outgoing: 0 // You can calculate this if you have sent messages
      }))
      
      // Response time data (mock for now, you'd need real data)
      const responseTime = last30Days.map(date => ({
        date,
        time: Math.floor(Math.random() * 120) + 30 // Random between 30-150 minutes
      }))
      
      // Engagement data
      const engagement = last30Days.map(date => ({
        date,
        rate: Math.floor(Math.random() * 30) + 50 // Random between 50-80%
      }))
      
      return {
        total,
        unread,
        read,
        replied,
        today: todayCount,
        week: weekCount,
        month: monthCount,
        responseRate,
        avgResponseTime: 45, // Mock value
        engagementRate: 65, // Mock value
        messagesOverTime,
        statusDistribution,
        dailyStats,
        topSenders,
        responseTime,
        engagement
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      throw error
    }
  },
  
  // Get messages over time
  getMessagesOverTime: async (days = 30) => {
    try {
      const response = await messagesApi.getAll(1, 1000)
      const messages = response.data.messages || []
      
      const dateRange = [...Array(days)].map((_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()
      
      return dateRange.map(date => ({
        date,
        count: messages.filter(m => m.createdAt.startsWith(date)).length
      }))
    } catch (error) {
      console.error('Error fetching time series:', error)
      throw error
    }
  }
}

// Settings API
export const settingsApi = {
  // Update admin profile
  updateProfile: (data) => 
    api.put('/admin/profile', data),
  
  // Change password
  changePassword: (data) => 
    api.post('/admin/change-password', data),
  
  // Update notification settings
  updateNotifications: (data) => 
    api.put('/admin/notifications', data),
  
  // Update appearance settings
  updateAppearance: (data) => 
    api.put('/admin/appearance', data),
  
  // Regenerate API key
  regenerateApiKey: () => 
    api.post('/admin/regenerate-api-key'),
  
  // Get current settings
  getSettings: () => 
    api.get('/admin/settings')
}

export default api