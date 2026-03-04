import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaHeart,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCode,
  FaRocket,
  FaInstagram,
  FaDribbble,
  FaArrowRight
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/about', label: 'About', icon: '👤' },
    { to: '/projects', label: 'Projects', icon: '💻' },
    { to: '/contact', label: 'Contact', icon: '📧' }
  ]

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/yourusername", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn", color: "hover:text-blue-600" },
    // { icon: <FaTwitter className="w-5 h-5" />, href: "https://twitter.com/yourusername", label: "Twitter", color: "hover:text-blue-400" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "https://instagram.com/yourusername", label: "Instagram", color: "hover:text-pink-600" },
    // { icon: <FaDribbble className="w-5 h-5" />, href: "https://dribbble.com/yourusername", label: "Dribbble", color: "hover:text-pink-500" }
  ]

  const contactInfo = [
    { icon: <FaEnvelope className="w-4 h-4" />, text: "anshu.bgn@gmail.com", href: "mailto:anshu.bgn@gmail.com" },
    { icon: <FaPhone className="w-4 h-4" />, text: "+91 1234567890", href: "tel:+911234567890" },
    { icon: <FaMapMarkerAlt className="w-4 h-4" />, text: "Jamshedpur, Jharkhand, India", href: "#" }
  ]

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand Section - 4 columns */}
          <div className="lg:col-span-4 animate-fadeInUp">
            <Link 
              to="/" 
              className="group relative inline-block text-2xl font-bold tracking-tighter mb-4"
            >
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                A K&nbsp;
              </span>
              <span className="text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Singh
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
              Creating meaningful digital experiences through code and design. 
              Specialized in building modern web applications with modern libraries and frameworks.
            </p>

            {/* Tech Stack Pills */}
            {/* <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'Node.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div> */}

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 group hover:translate-x-1"
                >
                  <span className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.icon}
                  </span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 3 columns */}
          <div className="lg:col-span-3 animate-fadeInUp animation-delay-200">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-purple-600 to-pink-600"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social - 5 columns */}
          <div className="lg:col-span-5 animate-fadeInUp animation-delay-400">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 relative inline-block">
              Connect With Me
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-purple-600 to-pink-600"></span>
            </h3>
            
            {/* Social Links Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-110 hover:-translate-y-1`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* GitHub Stats Preview */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">GitHub Stats</span>
                <FaCode className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex items-center gap-4">
                <div className="group cursor-pointer">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">5+</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Repositories</span>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="group cursor-pointer">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">100</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Contributions</span>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="group cursor-pointer">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">10+</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 animate-fadeInUp animation-delay-600">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              © Anshu Kumar Singh. All rights reserved.
            </p>

            {/* Legal Links */}
            {/* <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link
                to="/terms"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link
                to="/sitemap"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
              >
                Sitemap
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer