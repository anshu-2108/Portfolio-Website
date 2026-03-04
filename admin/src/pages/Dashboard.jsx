import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { messagesApi } from '../services/api'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatsCard from '../components/StatsCard'
import { 
  FaEnvelope, FaEye, FaCheck, FaReply, 
  FaCalendar, FaChartLine, FaUsers, FaClock 
} from 'react-icons/fa'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { admin } = useAuth()
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    today: 0,
    week: 0,
    month: 0
  })
  const [recentMessages, setRecentMessages] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const messagesResponse = await messagesApi.getAll(1, 5)
      
      if (messagesResponse.data.success) {
        const messages = messagesResponse.data.messages
        setRecentMessages(messages)
        
        // Calculate stats
        const today = new Date().setHours(0, 0, 0, 0)
        const weekAgo = new Date().setDate(new Date().getDate() - 7)
        const monthAgo = new Date().setMonth(new Date().getMonth() - 1)

        setStats({
          total: messagesResponse.data.pagination.total,
          unread: messages.filter(m => m.status === 'unread').length,
          read: messages.filter(m => m.status === 'read').length,
          replied: messages.filter(m => m.status === 'replied').length,
          today: messages.filter(m => new Date(m.createdAt) >= today).length,
          week: messages.filter(m => new Date(m.createdAt) >= weekAgo).length,
          month: messages.filter(m => new Date(m.createdAt) >= monthAgo).length
        })

        // Generate chart data
        const last7Days = [...Array(7)].map((_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return date.toISOString().split('T')[0]
        }).reverse()

        const chartData = last7Days.map(date => ({
          date,
          messages: messages.filter(m => m.createdAt.startsWith(date)).length
        }))

        setChartData(chartData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    { title: 'Total Messages', value: stats.total, icon: <FaEnvelope />, color: 'blue' },
    { title: 'Unread', value: stats.unread, icon: <FaEye />, color: 'yellow' },
    { title: 'Read', value: stats.read, icon: <FaCheck />, color: 'green' },
    { title: 'Replied', value: stats.replied, icon: <FaReply />, color: 'purple' },
    { title: 'Today', value: stats.today, icon: <FaCalendar />, color: 'orange' },
    { title: 'This Week', value: stats.week, icon: <FaClock />, color: 'indigo' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header title="Dashboard" admin={admin} />
        
        <div className="p-8">
          {/* Welcome Section */}
          <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-light mb-2">
              Welcome back, {admin?.name}!
            </h2>
            <p className="text-gray-300">
              You have {stats.unread} unread messages. Last login: {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'N/A'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <StatsCard key={index} {...stat} loading={loading} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Messages Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="messages" stroke="#111827" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Unread', value: stats.unread },
                    { name: 'Read', value: stats.read },
                    { name: 'Replied', value: stats.replied }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#111827" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-light text-gray-900">Recent Messages</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentMessages.map((message) => (
                <div key={message._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaUsers className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{message.name}</h4>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      message.status === 'unread' ? 'bg-blue-100 text-blue-700' :
                      message.status === 'read' ? 'bg-gray-100 text-gray-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{message.subject}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard