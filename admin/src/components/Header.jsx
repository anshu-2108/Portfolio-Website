import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'

const Header = ({ title, admin }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <h1 className="text-xl font-light text-gray-900">{title}</h1>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
            <p className="text-xs text-gray-500">{admin?.role}</p>
          </div>
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <FaUserCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header