import React, { useState } from 'react'
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaSearch,
  FaCode,
  FaMobile,
  FaRobot,
  FaGlobe,
  FaFilter,
  FaTimes,
  FaHeart,
  FaStar,
  FaEye
} from 'react-icons/fa'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      title: "Portfolio Website",
      category: "web",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Tailwind"],
      description: "Minimalist portfolio with smooth animations and responsive design.",
      longDescription: "A modern portfolio website showcasing creative work with smooth scroll animations, and fully responsive design that works beautifully on all devices.",
      image: "Screenshot (53).png",
      color: "from-purple-500 to-pink-500",
      github: "https://github.com/anshu-2108/Portfolio-Website",
      live: "#",
      featured: true,
      stats: { stars: 4, forks: 12, views: 150 }
    },
    {
      title: "TRENDS: E-Commerce Platform",
      category: "web",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Tailwind"],
      description: "Full-featured e-commerce platform with cart, payments, and admin dashboard.",
      longDescription: "A complete e-commerce solution with user authentication, product management, shopping cart, secure payments via Stripe, and an admin dashboard for managing orders and inventory.",
      image: "Screenshot (50).png",
      color: "from-blue-500 to-cyan-500",
      github: "https://github.com/anshu-2108/TRENDS-E-Commerce-Web-Application",
      live: "#",
      featured: true,
      stats: { stars: 4, forks: 8, views: 100 }
    },
    {
      title: "Educart: E-Learning Platform",
      category: "web",
      tech: ["React", "Tailwind", "Framer Motion", "Vite"],
      description: "Interactive e-learning platform with courses, authentication, and progress tracking.",
  longDescription: "Educart is a complete e-learning solution that allows students to enroll in courses, watch video lectures, track progress, and take quizzes. It includes secure user authentication using JWT, role-based access for students and admins, course management system, and a responsive dashboard for monitoring learning activity.",
  image: "Screenshot (51).png",
      color: "from-green-500 to-emerald-500",
      github: "#",
      live: "#",
      featured: false,
      stats: { stars: 3, forks: 5, views: 55 }
    },
    {
      title: "FoodyLove: Food Ordering Website",
      category: "web",
      tech: ["React", "Tailwind", "Framer Motion", "Vite"],
      description: "Online food ordering platform with cart, payments, and order tracking",
  longDescription: "FoodyLove is a modern food ordering web application where users can browse restaurants, add food items to cart, and place orders securely using Stripe payment integration. It features real-time order tracking, user authentication, admin panel for restaurant and order management, and a fully responsive UI for smooth user experience.",
  image: "Screenshot (52).png",
      color: "from-yellow-500 to-orange-500",
      github: "#",
      live: "#",
      featured: false,
      stats: { stars: 3, forks: 4, views: 30 }
    },
    // {
    //   title: "Fitness Tracker",
    //   category: "mobile",
    //   tech: ["React Native", "SQLite", "D3.js", "Health Kit"],
    //   description: "Track workouts, set goals, and visualize progress over time.",
    //   longDescription: "Comprehensive fitness tracking app that monitors workouts, calories, steps, and sleep patterns. Includes goal setting, progress photos, and social sharing features.",
    //   image: "💪",
    //   color: "from-red-500 to-pink-500",
    //   github: "#",
    //   live: "#",
    //   featured: true,
    //   stats: { stars: 41, forks: 10, views: 2100 }
    // },
    // {
    //   title: "AI Content Generator",
    //   category: "ai",
    //   tech: ["Python", "OpenAI", "FastAPI", "React", "PostgreSQL"],
    //   description: "Generate blog posts and social media content using AI.",
    //   longDescription: "Powered by GPT-4, this application helps content creators generate blog posts, social media captions, and marketing copy. Includes templates, editing tools, and export functionality.",
    //   image: "🤖",
    //   color: "from-indigo-500 to-purple-500",
    //   github: "#",
    //   live: "#",
    //   featured: true,
    //   stats: { stars: 67, forks: 18, views: 3400 }
    // },
    // {
    //   title: "Real-time Chat App",
    //   category: "web",
    //   tech: ["Socket.io", "React", "Node.js", "MongoDB"],
    //   description: "Instant messaging app with rooms, typing indicators, and file sharing.",
    //   longDescription: "Feature-rich chat application with real-time messaging, private rooms, typing indicators, read receipts, and file sharing capabilities.",
    //   image: "💬",
    //   color: "from-teal-500 to-cyan-500",
    //   github: "#",
    //   live: "#",
    //   featured: false,
    //   stats: { stars: 24, forks: 6, views: 1350 }
    // },
    // {
    //   title: "Finance Dashboard",
    //   category: "web",
    //   tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    //   description: "Personal finance tracker with budgets, insights, and reports.",
    //   longDescription: "Take control of your finances with this comprehensive dashboard. Track expenses, create budgets, visualize spending patterns, and get AI-powered financial insights.",
    //   image: "💰",
    //   color: "from-emerald-500 to-teal-500",
    //   github: "#",
    //   live: "#",
    //   featured: false,
    //   stats: { stars: 31, forks: 7, views: 1650 }
    // }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const categories = [
    { id: 'all', label: 'All Projects', icon: <FaGlobe className="w-3 h-3" /> },
    { id: 'web', label: 'Web Apps', icon: <FaCode className="w-3 h-3" /> },
    { id: 'mobile', label: 'Mobile Apps', icon: <FaMobile className="w-3 h-3" /> },
    { id: 'ai', label: 'AI/ML', icon: <FaRobot className="w-3 h-3" /> }
  ]

  const getCategoryColor = (category) => {
    switch(category) {
      case 'web': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
      case 'mobile': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'ai': return 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-purple-600 to-pink-600"></div>
            <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
              MY WORK
            </span>
            <div className="w-12 h-px bg-linear-to-r from-pink-600 to-purple-600"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Featured&nbsp;
            <span className="py-2 font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work and personal projects. Each project represents 
            countless hours of learning, problem-solving, and creative energy.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12 animate-fadeInUp animation-delay-200">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`group relative px-5 py-2.5 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-2 ${
                  filter === cat.id
                    ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.icon}
                {cat.label}
                {filter === cat.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>

          <div className="relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
            <input
              type="text"
              placeholder="Search projects by name, tech, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 dark:focus:ring-purple-400/20 text-sm text-gray-900 dark:text-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaTimes className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 animate-fadeInUp animation-delay-400">
          Showing {filteredProjects.length} of {projects.length} projects
          {filter !== 'all' && ` in ${filter} category`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative animate-fadeInUp"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-1 px-3 py-1 bg-linear-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                      <FaStar className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                </div>
              )}

              {/* Project Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Image/Icon Section */}
                <div className={`relative aspect-video bg-linear-to-br ${project.color} bg-opacity-10 flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                  <span className="text-7xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <img src={project.image} alt="" />
                  </span>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        title="View Code"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a
                        href={project.live}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FaStar className="w-3 h-3 text-yellow-500" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FaCode className="w-3 h-3 text-gray-400" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FaEye className="w-3 h-3 text-gray-400" />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute bottom-6 right-6 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 flex items-center justify-center"
                >
                  <FaEye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-fadeInUp">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setFilter('all')
                setSearchQuery('')
              }}
              className="mt-6 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
              >
                <FaTimes className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>

              <div className={`h-48 bg-linear-to-br ${selectedProject.color} flex items-center justify-center`}>
                <span className="text-8xl"><img src={selectedProject.image} alt="" /></span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.longDescription}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedProject.stats.stars} stars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCode className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedProject.stats.forks} forks</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    className="flex-1 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects