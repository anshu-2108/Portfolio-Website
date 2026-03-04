import React from 'react'
import { 
  FaArrowRight, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaFigma
} from 'react-icons/fa'
import { 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiNextdotjs,
  SiGraphql,
  SiMongodb 
} from 'react-icons/si'
import { Link } from 'react-router-dom'

const Home = () => {
  const skillIcons = {
    "React": <FaReact className="w-6 h-6" />,
    "JavaScript": <SiJavascript className="w-6 h-6" />,
    "TypeScript": <SiTypescript className="w-6 h-6" />,
    "Node.js": <FaNodeJs className="w-6 h-6" />,
    "Python": <FaPython className="w-6 h-6" />,
    "Figma": <FaFigma className="w-6 h-6" />,
    "Tailwind": <SiTailwindcss className="w-6 h-6" />,
    "Next.js": <SiNextdotjs className="w-6 h-6" />,
    "GraphQL": <SiGraphql className="w-6 h-6" />,
    "MongoDB": <SiMongodb className="w-6 h-6" />,
    "AWS": <FaAws className="w-6 h-6" />,
    "Docker": <FaDocker className="w-6 h-6" />
  }

  const skills = [
    "React", "JavaScript", "TypeScript", "Node.js", "Python", "Figma",
    "Tailwind", "Next.js", "GraphQL", "MongoDB", "AWS", "Docker"
  ]

  const projects = [
    {
      id: 1,
      name: "TRENDS: E-Commerce Website",
      description: "Full-featured e-commerce platform with cart, payments, and admin dashboard.",
      image: "Screenshot (50).png",
      technologies: ["React.js", "Next.js", "Express.js", "MongoDB", "Tailwind"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Educart: E-Learning Platform",
      description: "Interactive e-learning platform with courses, authentication, and progress tracking.",
      image: "Screenshot (51).png",
      technologies: ["React.js", "Next.js", "Express.js", "MongoDB"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "FoodyLove: Food Ordering Website",
      description: "Online food ordering platform with cart, payments, and order tracking",
      image: "Screenshot (52).png",
      technologies: ["React.js", "Next.js", "Express.js", "MongoDB"],
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="order-2 lg:order-1 animate-fadeInUp">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-linear-to-r from-purple-600 to-pink-600"></div>
                <span className="text-xs font-medium tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                  WELCOME TO MY PORTFOLIO
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Hi, I'm
                <span className="block py-2 font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Anshu Kumar Singh
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 animate-fadeInUp animation-delay-200">
                Full Stack Website Developer 
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed animate-fadeInUp animation-delay-400">
                I craft beautiful, functional, and user-centered digital experiences. 
                With practical experience in web development and design, I help in 
                bringing ideas to life.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 animate-fadeInUp animation-delay-600">
                <Link
                  to="/projects"
                  className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View My Work
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/contact"
                  className="group px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-medium rounded-full hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6 animate-fadeInUp animation-delay-800">
                {[
                  { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/anshu-2108", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
                  { icon: <FaLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/anshu-kumar-singh-271136261", label: "LinkedIn", color: "hover:text-blue-600" },
                  // { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter", color: "hover:text-blue-400" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Image/Illustration */}
            <div className="order-1 lg:order-2 animate-fadeIn">
              <div className="relative">
                <div className="relative z-10 animate-float">
                  <div className="w-64 h-64 lg:w-96 lg:h-96 mx-auto relative">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-linear-to-br from-purple-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                        <div className="text-8xl ">
                          <img src="/photo2.jpg" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-pink-500/30 rounded-full animate-spin-slow animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 animate-fadeInUp">
              <div className="w-8 h-px bg-linear-to-r from-purple-600 to-pink-600"></div>
              <span className="text-xs font-medium tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                EXPERTISE
              </span>
              <div className="w-8 h-px bg-linear-to-r from-pink-600 to-purple-600"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-4 animate-fadeInUp animation-delay-200">
              Skills &&nbsp;
              <span className=" font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-center group animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="text-3xl mb-3 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {skillIcons[skill]}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill}
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-2xl transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-4 animate-fadeInUp">
                Featured&nbsp; 
                <span className=" font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl animate-fadeInUp animation-delay-200">
                Some of my recent work that I'm particularly proud of.
              </p>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-400"
            >
              View All Projects
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative aspect-video bg-linear-to-br ${project.color} rounded-2xl mb-4 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1`}>
                  <div className="absolute inset-0 flex items-center justify-center text-8xl">
                     <img src={project.image} alt="" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium px-4 py-2 border-2 border-white rounded-full transform hover:scale-110 transition-transform">
                      View Project
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 animate-fadeInUp">
            Let's Work Together
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 text-sm font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fadeInUp animation-delay-400"
          >
            Start a Conversation
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home