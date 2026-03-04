import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FaChartBar, FaEnvelope, FaCog, 
  FaSignOutAlt, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/messages', icon: <FaEnvelope />, label: 'Messages' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' }
  ]

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <span className="text-xl font-light text-gray-900">Admin Panel</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-3 rounded-lg mt-4 text-red-600 hover:bg-red-50 transition-colors"
        >
          <span className="text-xl"><FaSignOutAlt /></span>
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar