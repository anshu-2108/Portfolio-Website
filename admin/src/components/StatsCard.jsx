import React from 'react'

const StatsCard = ({ title, value, icon, color, loading }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 ${colors[color]} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-2xl font-light text-gray-900">{value}</span>
      </div>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

export default StatsCard