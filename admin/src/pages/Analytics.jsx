import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { analyticsApi } from '../services/api'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { 
  FaChartBar, FaChartLine, FaChartPie, 
  FaDownload, FaCalendar, FaSync,
  FaEnvelope, FaEye, FaReply,
  FaArrowUp, FaArrowDown, FaMinus,
  FaSpinner
} from 'react-icons/fa'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'

const Analytics = () => {
  const { admin } = useAuth()
  const [timeRange, setTimeRange] = useState('30')
  const [data, setData] = useState({
    messagesOverTime: [],
    statusDistribution: [],
    dailyStats: [],
    topSenders: [],
    responseTime: [],
    engagement: []
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [metrics, setMetrics] = useState({
    totalMessages: 0,
    avgResponseTime: 0,
    responseRate: 0,
    engagementRate: 0,
    today: 0,
    week: 0,
    month: 0,
    unread: 0,
    read: 0,
    replied: 0,
    trends: {
      messages: { direction: 'stable', value: 0 },
      response: { direction: 'stable', value: 0 },
      engagement: { direction: 'stable', value: 0 }
    }
  })

  const COLORS = ['#3B82F6', '#6B7280', '#10B981']

  const fetchAnalytics = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      const stats = await analyticsApi.getStats()
      
      setData({
        messagesOverTime: stats.messagesOverTime || [],
        statusDistribution: stats.statusDistribution || [],
        dailyStats: stats.dailyStats || [],
        topSenders: stats.topSenders || [],
        responseTime: stats.responseTime || [],
        engagement: stats.engagement || []
      })

      setMetrics({
        totalMessages: stats.total || 0,
        avgResponseTime: stats.avgResponseTime || 0,
        responseRate: stats.responseRate || 0,
        engagementRate: stats.engagementRate || 0,
        today: stats.today || 0,
        week: stats.week || 0,
        month: stats.month || 0,
        unread: stats.unread || 0,
        read: stats.read || 0,
        replied: stats.replied || 0,
        trends: {
          messages: generateTrend(stats.messagesOverTime),
          response: generateTrend(stats.responseTime),
          engagement: generateTrend(stats.engagement)
        }
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const generateTrend = (data) => {
    if (!data || data.length < 2) {
      return { direction: 'stable', value: 0 }
    }
    
    const first = data[0]?.count || data[0]?.value || data[0]?.rate || 0
    const last = data[data.length - 1]?.count || data[data.length - 1]?.value || data[data.length - 1]?.rate || 0
    
    const percentChange = first > 0 ? Math.round(((last - first) / first) * 100) : 0
    
    if (percentChange > 5) return { direction: 'up', value: percentChange }
    if (percentChange < -5) return { direction: 'down', value: Math.abs(percentChange) }
    return { direction: 'stable', value: 0 }
  }

  const TrendIndicator = ({ trend }) => {
    if (trend.direction === 'up') {
      return <span className="text-green-600 flex items-center"><FaArrowUp className="w-3 h-3 mr-1" />{trend.value}%</span>
    } else if (trend.direction === 'down') {
      return <span className="text-red-600 flex items-center"><FaArrowDown className="w-3 h-3 mr-1" />{trend.value}%</span>
    }
    return <span className="text-gray-600 flex items-center"><FaMinus className="w-3 h-3 mr-1" />0%</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-gray-900 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header title="Analytics" admin={admin} />
        
        <div className="p-8">
          {/* Header with Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-sm text-gray-600">Real-time message performance metrics</p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              
              <button 
                onClick={() => fetchAnalytics(true)}
                disabled={refreshing}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
              >
                <FaSync className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                <FaDownload className="w-3 h-3" />
                Export Report
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="w-5 h-5 text-blue-600" />
                </div>
                <TrendIndicator trend={metrics.trends.messages} />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">{metrics.totalMessages}</p>
              <p className="text-sm text-gray-600">Total Messages</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="mr-3">📊 {metrics.today} today</span>
                <span>📈 {metrics.week} this week</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaReply className="w-5 h-5 text-purple-600" />
                </div>
                <TrendIndicator trend={metrics.trends.response} />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">{metrics.avgResponseTime}m</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="mr-3">✓ {metrics.replied} replied</span>
                <span>⚡ {metrics.responseRate}% rate</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaEye className="w-5 h-5 text-green-600" />
                </div>
                <TrendIndicator trend={metrics.trends.engagement} />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">{metrics.engagementRate}%</p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="mr-3">👁️ {metrics.unread} unread</span>
                <span>📖 {metrics.read} read</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaChartBar className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">{metrics.month}</p>
              <p className="text-sm text-gray-600">This Month</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="mr-3">📊 Daily avg: {Math.round(metrics.month / 30)}</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Messages Over Time */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-light text-gray-900">Messages Over Time</h3>
                  <p className="text-xs text-gray-500 mt-1">Daily message volume</p>
                </div>
                <FaChartLine className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.messagesOverTime}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-light text-gray-900">Status Distribution</h3>
                  <p className="text-xs text-gray-500 mt-1">Message status breakdown</p>
                </div>
                <FaChartPie className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Pattern */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-light text-gray-900">Daily Pattern</h3>
                  <p className="text-xs text-gray-500 mt-1">Messages by day of week</p>
                </div>
                <FaChartBar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incoming" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Response Time Trend */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-light text-gray-900">Response Time Trend</h3>
                  <p className="text-xs text-gray-500 mt-1">Average response time in minutes</p>
                </div>
                <FaChartLine className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.responseTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Senders */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-light text-gray-900">Top Senders</h3>
                <p className="text-xs text-gray-500 mt-1">Most active contacts</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {data.topSenders.length > 0 ? (
                data.topSenders.map((sender, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {sender.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{sender.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{sender.email || 'No email'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-light text-gray-900">{sender.count}</p>
                      <p className="text-xs text-gray-500">messages</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Last: {sender.lastActive ? new Date(sender.lastActive).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No sender data available</p>
              )}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Engagement Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.engagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Quick Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">Peak message time</p>
                  <p className="text-lg font-light text-blue-900 mt-1">
                    {data.messagesOverTime.length > 0 
                      ? new Date(data.messagesOverTime.reduce((max, item) => 
                          item.count > max.count ? item : max
                        ).date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">Best response day</p>
                  <p className="text-lg font-light text-green-900 mt-1">
                    {data.dailyStats.length > 0
                      ? data.dailyStats.reduce((max, item) => 
                          item.incoming > max.incoming ? item : max
                        ).day
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">Response rate</p>
                  <p className="text-lg font-light text-purple-900 mt-1">{metrics.responseRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics