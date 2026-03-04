import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaCode, 
  FaEnvelope, 
  FaHome,
  FaMoon,
  FaSun,
  FaGithub,FaGraduationCap,
  FaLinkedin
} from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Toggle dark mode (you can connect this to a global state if needed)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    { to: '/about', label: 'About', icon: <FaUser className="w-4 h-4" /> },
    { to: '/education', label: 'Education', icon: <FaGraduationCap className="w-4 h-4" /> },
    { to: '/projects', label: 'Projects', icon: <FaCode className="w-4 h-4" /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope className="w-4 h-4" /> }
  ]

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: 'https://github.com/anshu-2108', label: 'GitHub' },
    { icon: <FaLinkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/anshu-kumar-singh-271136261', label: 'LinkedIn' }
  ]

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with animation */}
            <Link 
              to="/" 
              className="group relative text-2xl font-bold tracking-tighter"
            >
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                A K&nbsp;
              </span>
              <span className="text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Singh
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-2">
                        <span className={`transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? 'scale-110' : ''
                        }`}>
                          {link.icon}
                        </span>
                        {link.label}
                      </span>
                      <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                        isActive ? 'w-1/2' : 'group-hover:w-1/2'
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Links */}
              <div className="flex items-center space-x-2 border-r border-gray-200 dark:border-gray-700 pr-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              {/* <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:rotate-12"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`}>
                  <FaBars className="w-5 h-5" />
                </span>
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}>
                  <FaTimes className="w-5 h-5" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="relative h-full overflow-y-auto">
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600"></div>
            
            <div className="p-8">
              {/* Profile Section */}
              <div className="text-center mb-10">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-r from-purple-600 to-pink-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      <img src="/photo2.jpg" className='rounded-full' alt="Profile" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Anshu Kumar Singh
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full Stack Website Developer
                </p>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 mb-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                        isActive
                          ? 'bg-linear-to-r from-purple-600/10 to-pink-600/10 text-purple-600 dark:text-purple-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                      ({ isActive }) => isActive ? 'scale-110' : ''
                    }`}>
                      {link.icon}
                    </span>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Social Links */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Connect with me
                </p>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle for Mobile */}
              <div className="mt-6 flex justify-center">
                {/* <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {isDarkMode ? (
                    <>
                      <FaSun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FaMoon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar