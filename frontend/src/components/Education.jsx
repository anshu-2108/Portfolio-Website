import React from 'react'
import { 
  FaGraduationCap, 
  FaCertificate, 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaAward, 
  FaBook, 
  FaLaptopCode,
  FaStar,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaTrophy,
  FaMedal,
  FaUniversity,FaSchool,
  FaCode,
  FaBrain,
  FaUsers
} from 'react-icons/fa'

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Mrs. KMPM Vocational College",
      location: "Jamshedpur, Jharkhand, India",
      period: "2022 - 2026",
      gpa: "7.2/10",
      description: "Comprehensive foundation in computer science principles, software engineering, and web technologies.",
      achievements: [
        "Most Enthusiastic Candidate",
        "Published 2 Research Papers",
        "Best Intern @ PaulTech Software Services Pvt. Ltd."
      ],
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      courses: ["Data Structures", "Web Development", "Database Systems", "Software Engineering"],
      highlights: ["Most Enthusiastic Award", "Leadership Excellence"]
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      institution: "Ramakrishna Mission English School, Sidhgora",
      location: "Jamshedpur, Jharkhand, India",
      period: "2020 - 2022",
      gpa: "8.6/10",
      description: "Focused on Science stream with strong fundamentals in Mathematics and Computer Science.",
      achievements: [
        "School Topper in Computer Science",
        "Active Member of Science Club",
        "Inter-School Quiz Competition Winner"
      ],
      icon: <FaLaptopCode className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      courses: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
      highlights: ["Academic Excellence", "Science Stream"]
    },
    {
      degree: "Secondary Education (10th Grade)",
      institution: "Ramakrishna Mission English School, Sidhgora",
      location: "Jamshedpur, Jharkhand, India",
      period: "2019 - 2020",
      gpa: "7.5/10",
      description: "Completed secondary education with distinction and strong academic performance across all core subjects.",
      achievements: [
        "Top 5 Rank in School",
        "Best Discipline Award",
        "Participant of District Level Science Exhibition"
      ],
      icon: <FaSchool className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      courses: ["Mathematics", "Science", "Social Science", "English"],
      highlights: ["Merit Certificate", "All-Rounder Performance"]
    }
  ]

  const certifications = [
    {
      name: "AWSome Day Online Conference",
      issuer: "Amazon Web Services",
      date: "June 2024",
      // credentialId: "AWS-12345",
      icon: "☁️",
      color: "from-orange-500 to-yellow-500",
      skills: ["Cloud Architecture", "AWS Services", "Infrastructure"]
    },
    {
      name: "Introduction to Information Security",
      issuer: "Great Learning Academy",
      date: "August 2025",
      // credentialId: "GOOG-67890",
      icon: "🎨",
      color: "from-blue-500 to-purple-500",
      skills: ["Confidentiality", "Integrity", "Availability"]
    },
    {
      name: "VLSI System Design",
      issuer: "NIT Jamshedpur",
      date: "May 2024",
      // credentialId: "META-54321",
      icon: "⚛️",
      color: "from-blue-600 to-indigo-600",
      skills: ["RISC-V", "RTL", "System Design"]
    },
    {
      name: "LLM Master",
      issuer: "Coursera",
      date: "October 2025",
      // credentialId: "SMC-98765",
      icon: "🏆",
      color: "from-green-500 to-emerald-500",
      skills: ["Neural Network", "Deep Learning", "Machine Learning"]
    }
  ]

  const skills = {
    technical: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Python", level: 88, icon: "🐍" },
      { name: "TypeScript", level: 92, icon: "🔷" },
      { name: "GraphQL", level: 85, icon: "📊" },
      { name: "MongoDB", level: 87, icon: "🍃" },
      { name: "AWS", level: 82, icon: "☁️" },
      { name: "Docker", level: 80, icon: "🐳" }
    ],
    soft: [
      { name: "Team Leadership", level: 94, icon: "👥" },
      { name: "Project Management", level: 90, icon: "📋" },
      { name: "Methodology", level: 92, icon: "🔄" },
      { name: "Technical Writing", level: 88, icon: "✍️" },
      { name: "Public Speaking", level: 85, icon: "🎤" }
    ]
  }

  const achievements = [
    { icon: <FaTrophy />, count: "2x", label: "Research Publications", color: "from-yellow-500 to-orange-500" },
    { icon: <FaMedal />, count: "5x", label: "Academic Awards", color: "from-purple-500 to-pink-500" },
    { icon: <FaCode />, count: "5+", label: "Projects Completed", color: "from-blue-500 to-cyan-500" },
    { icon: <FaUsers />, count: "300+", label: "LinkedIn Followers", color: "from-green-500 to-emerald-500" }
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
              EDUCATION & QUALIFICATIONS
            </span>
            <div className="w-12 h-px bg-linear-to-r from-pink-600 to-purple-600"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Academic&nbsp;
            <span className=" font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Background
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A journey of continuous learning and professional development through formal education 
            and industry certifications.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-fadeInUp animation-delay-200">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-linear-to-r ${item.color} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity`}></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:border-transparent transition-all duration-300 group-hover:scale-105">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-r ${item.color} bg-opacity-10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  <span className={`text-transparent bg-clip-text bg-linear-to-r ${item.color} text-white`}>
                    {item.icon}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.count}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Timeline */}
        <div className="relative mb-20">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-purple-600 via-pink-600 to-purple-600 opacity-30"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="relative animate-fadeInUp" style={{ animationDelay: `${300 + index * 200}ms` }}>
                <div className={`flex flex-col lg:flex-row gap-8 items-start ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-6 h-6">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-20"></div>
                    <div className="relative w-6 h-6 bg-linear-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}>
                    <div className="relative group">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-linear-to-r ${edu.color} rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                      
                      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-transparent transition-all duration-300 hover:shadow-2xl">
                        {/* Header with Icon */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${edu.color} bg-opacity-10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                            <span className={`text-transparent bg-clip-text bg-linear-to-r ${edu.color} text-white`}>
                              {edu.icon}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                              <FaUniversity className="w-4 h-4 text-gray-400" />
                              {edu.institution}
                            </p>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <FaCalendar className="w-3 h-3 text-purple-600" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <FaMapMarkerAlt className="w-3 h-3 text-pink-600" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <FaAward className="w-3 h-3 text-yellow-600" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">GPA: {edu.gpa}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                          {edu.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <FaStar className="w-4 h-4 text-yellow-500" />
                            Key Highlights
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full border border-yellow-200 dark:border-yellow-800"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                          <ul className="space-y-3">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 group/item">
                                <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Coursework */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Relevant Coursework</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-105 cursor-default"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20 animate-fadeInUp animation-delay-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-4">
              Professional&nbsp;
              <span className=" font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise and commitment to continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative animate-fadeInUp"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-linear-to-r ${cert.color} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                    {cert.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-pink-600">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{cert.issuer}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{cert.credentialId}</span>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 animate-fadeInUp animation-delay-1000">
          {/* Technical Skills */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 bg-opacity-10 flex items-center justify-center">
                  <FaCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
              </div>
              
              <div className="space-y-5">
                {skills.technical.map((skill, index) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000 group-hover/skill:shadow-lg"
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `slideIn 0.8s ease-out ${index * 0.1}s both`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 bg-opacity-10 flex items-center justify-center">
                  <FaBrain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Soft Skills</h3>
              </div>
              
              <div className="space-y-5">
                {skills.soft.map((skill, index) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-1000 group-hover/skill:shadow-lg"
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `slideIn 0.8s ease-out ${index * 0.1 + 0.4}s both`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Honors */}
        <div className="relative animate-fadeInUp animation-delay-1200">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20"></div>
          <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaGraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">8.4</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cumulative GPA</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaCertificate className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Professional Certifications</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-green-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaBook className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Research Publications</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-yellow-600 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaTrophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Academic Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education