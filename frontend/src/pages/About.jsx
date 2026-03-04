import React from 'react'
import { 
  FaAward, 
  FaCode, 
  FaUsers, 
  FaHeart,
  FaLaptopCode,
  FaServer,
  FaPencilRuler,
  FaRocket,
  FaCoffee,
  FaMountain,
  FaBook,
  FaUtensils
} from 'react-icons/fa'

const About = () => {
  const stats = [
    { value: "1+", label: "Years Experience", icon: <FaAward className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { value: "5+", label: "Projects Completed", icon: <FaCode className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { value: "30+", label: "Happy Clients", icon: <FaUsers className="w-5 h-5" />, color: "from-green-500 to-emerald-500" }
  ]

  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive, performant interfaces with React, Vue, and modern CSS.",
      skills: ["React", "TypeScript", "Tailwind", "Next.js", "Vue", "Redux"],
      icon: <FaLaptopCode className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Backend Development",
      description: "Creating robust APIs and server-side applications with Node.js and Python.",
      skills: ["Node.js", "Python", "GraphQL", "MongoDB", "PostgreSQL", "AWS"],
      icon: <FaServer className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    // {
    //   title: "UI/UX Design",
    //   description: "Designing intuitive, accessible interfaces with Figma and Adobe XD.",
    //   skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Accessibility"],
    //   icon: <FaPencilRuler className="w-6 h-6" />,
    //   color: "from-green-500 to-emerald-500",
    //   bgColor: "bg-green-50 dark:bg-green-900/20"
    // }
  ]

  const hobbies = [
    { icon: <FaMountain />, label: "Travelling" },
    { icon: <FaBook />, label: "Reading" },
    { icon: <FaUtensils />, label: "Chilling" },
    { icon: <FaCoffee />, label: "Coffee" }
  ]

  const timeline = [
    {
      year: "Nov 2025 - Jan 2026",
      title: "PaulTech Software Services Pvt. Ltd. (MERN Developer Internship)",
      description: "Designed and developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js."
    },
    {
      year: "Aug 2025 - Oct 2025",
      title: "Chegg India Pvt. Ltd. (Subject Matter Expert)",
      description: "Solved and explained academic problems for students with clarity and accuracy."
    },
    {
      year: "May 2024 - Jul 2024",
      title: "Indian Institute of Technology, Madras (Internship Trainee)",
      description: "Gained hands-on knowledge of VLSI design flow, from specification to verification."
    }
  ]

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
              ABOUT ME
            </span>
            <div className="w-12 h-px bg-linear-to-r from-pink-600 to-purple-600"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Learn More
            <span className="block py-2 font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About My Journey
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know me better — my experience, skills, and what drives me to create amazing digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Bio */}
          <div className="animate-fadeInUp animation-delay-200">
            {/* Profile Card */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-r from-purple-600 to-pink-600 p-1">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <span className="text-4xl"><img src="/photo2.jpg" alt="Profile" className='rounded-full' /></span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Anshu Kumar Singh</h2>
                    <p className="text-gray-600 dark:text-gray-400">Full Stack Website Developer</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Hi, I'm Anshu Kumar Singh — a full stack website developer based in Jamshedpur, Jharkhand, India. 
                    I've spent time in building beautiful, functional and responsive websites to gain digital experiences.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    My journey in tech began when I started learning JAVA during my school days. Since then, 
                    I've never stopped learning and creating. I believe that great design 
                    isn't just about how things look — it's about how they work and how they 
                    make people feel.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    When I'm not coding, you can find me travelling, reading, or experimenting 
                    with new things. I'm passionate about creating things that make a 
                    difference, whether that's through code, design, or community.
                  </p>
                </div>

                {/* Hobbies */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaHeart className="w-4 h-4 text-red-400" />
                    When I'm not coding
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {hobbies.map((hobby, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105"
                      >
                        <span className="text-lg">{hobby.icon}</span>
                        {hobby.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-r ${stat.color} rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-300 group-hover:scale-105">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-linear-to-r ${stat.color} flex items-center justify-center text-white`}>
                      {stat.icon}
                    </div>
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - What I Do */}
          <div className="animate-fadeInUp animation-delay-400">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <FaRocket className="w-6 h-6 text-purple-600" />
              What I Do
            </h2>

            <div className="space-y-6 mb-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative animate-fadeInUp"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-linear-to-r ${service.color} rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${service.color} flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-fadeInUp animation-delay-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaAward className="w-5 h-5 text-purple-600" />
                Journey Timeline
              </h3>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 pb-4 last:pb-0 group hover:border-purple-500 transition-colors">
                    <div className="absolute -left-1.25 top-1 w-2 h-2 rounded-full bg-purple-600 group-hover:scale-150 transition-transform"></div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{item.year}</span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-1">{item.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="mt-8 p-6 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl text-white animate-fadeInUp animation-delay-1000">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                  💡
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Fun Fact</h4>
                  <p className="text-white/90 text-sm">
                    My favorite place to work is a cozy cafe with good coffee and ambient music.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About