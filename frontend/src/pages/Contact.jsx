import React, { useState } from 'react'
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaPaperPlane, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaCheckCircle, 
  FaExclamationCircle,
  FaUser,
  FaComment,
  FaClock,
  FaRegSmile,
  FaRocket,
  FaHeart,
  FaInstagram,
  FaDiscord,
  FaArrowRight
} from 'react-icons/fa'
import axios from 'axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [touchedFields, setTouchedFields] = useState({})

  // Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(value)) return 'Please enter a valid email'
        return ''
      case 'subject':
        if (!value.trim()) return 'Subject is required'
        if (value.trim().length < 3) return 'Subject must be at least 3 characters'
        if (value.trim().length > 100) return 'Subject must be less than 100 characters'
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Clear server error when user makes any change
    if (serverError) {
      setServerError('')
    }
  }

  const handleBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
    const error = validateField(fieldName, formData[fieldName])
    setErrors(prev => ({ ...prev, [fieldName]: error }))
    setFocusedField(null)
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouchedFields({
      name: true,
      email: true,
      subject: true,
      message: true
    })
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setServerError('')
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('https://portfolio-website-tubm.vercel.app/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      })
      
      if (response.data.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
        setTouchedFields({})
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      
      if (error.code === 'ECONNABORTED') {
        setServerError('Request timed out. Please try again.')
      } else if (error.response) {
        // Server responded with error
        const serverErrors = error.response.data.errors
        if (serverErrors && Array.isArray(serverErrors)) {
          // Handle array of errors from server
          const newErrors = {}
          serverErrors.forEach(err => {
            if (err.toLowerCase().includes('name')) newErrors.name = err
            else if (err.toLowerCase().includes('email')) newErrors.email = err
            else if (err.toLowerCase().includes('subject')) newErrors.subject = err
            else if (err.toLowerCase().includes('message')) newErrors.message = err
          })
          setErrors(newErrors)
        } else {
          // General server error message
          setServerError(error.response.data.message || 'Server error. Please try again.')
        }
      } else if (error.request) {
        // Request made but no response
        setServerError('No response from server. Please check your connection.')
      } else {
        // Something else happened
        setServerError('An error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://portfolio-website-tubm.vercel.app/api/newsletter', { email: newsletterEmail })
      setNewsletterSubmitted(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSubmitted(false), 5000)
    } catch (error) {
      alert('Error subscribing. Please try again.')
    }
  }

  // Get field className based on validation state
  const getFieldClassName = (fieldName) => {
    const baseClass = "w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none text-sm transition-all duration-300"
    if (errors[fieldName] && touchedFields[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 bg-red-50 text-white dark:bg-red-900/10 dark:border-red-600`
    }
    if (focusedField === fieldName) {
      return `${baseClass} border-purple-600 ring-2 ring-purple-600/20 text-white dark:border-purple-400`
    }
    return `${baseClass} border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-white focus:border-purple-600 dark:focus:border-purple-400`
  }

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      label: 'Email',
      value: 'anshu.bgn@gmail.com',
      href: 'mailto:anshu.bgn@gmail.com',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 1234567890',
      href: 'tel:+911234567890',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      label: 'Location',
      value: 'Jamshedpur, Jharkhand, India',
      href: null,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ]

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/anshu-2108", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/anshu-kumar-singh-271136261", label: "LinkedIn", color: "hover:text-blue-600" },
    // { icon: <FaTwitter className="w-5 h-5" />, href: "https://twitter.com/yourusername", label: "Twitter", color: "hover:text-blue-400" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "https://www.instagram.com/_anshu_singh_official", label: "Instagram", color: "hover:text-pink-600" },
    // { icon: <FaDiscord className="w-5 h-5" />, href: "https://discord.com", label: "Discord", color: "hover:text-indigo-500" }
  ]

  const faqs = [
    {
      question: "What's your typical response time?",
      answer: "I usually respond within 24 hours during weekdays."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! I love working with clients from all around the world."
    },
    {
      question: "What's your preferred communication method?",
      answer: "Email is best for initial contact, then we can move to video calls."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, I offer a 30-minute free consultation for new projects."
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
              GET IN TOUCH
            </span>
            <div className="w-12 h-px bg-linear-to-r from-pink-600 to-purple-600"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Let's Work&nbsp;
            <span className=" font-bold mt-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Fill out the form below 
            and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="animate-fadeInUp animation-delay-200">
            <div className="relative group">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl animate-slideDown">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <FaCheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                          Message sent successfully!
                        </p>
                        <p className="text-green-600 dark:text-green-500 text-xs mt-1">
                          I'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Server Error Message */}
                {serverError && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl animate-slideDown">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                        <FaExclamationCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                          Error
                        </p>
                        <p className="text-red-600 dark:text-red-500 text-xs mt-1">{serverError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'name' ? 'text-purple-600' : errors.name && touchedFields.name ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => handleBlur('name')}
                        className={getFieldClassName('name')}
                        placeholder="Full Name"
                        maxLength="50"
                      />
                    </div>
                    {errors.name && touchedFields.name && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400 text-right">
                      {formData.name.length}/50
                    </p>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'email' ? 'text-purple-600' : errors.email && touchedFields.email ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => handleBlur('email')}
                        className={getFieldClassName('email')}
                        placeholder="abc@example.com"
                      />
                    </div>
                    {errors.email && touchedFields.email && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaComment className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'subject' ? 'text-purple-600' : errors.subject && touchedFields.subject ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => handleBlur('subject')}
                        className={getFieldClassName('subject')}
                        placeholder="Project Inquiry"
                        maxLength="100"
                      />
                    </div>
                    {errors.subject && touchedFields.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400 text-right">
                      {formData.subject.length}/100
                    </p>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => handleBlur('message')}
                      rows="5"
                      className={getFieldClassName('message')}
                      placeholder="Tell me about your opinion..."
                      maxLength="1000"
                    />
                    {errors.message && touchedFields.message && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">
                        Minimum 10 characters
                      </p>
                      <p className="text-xs text-gray-400">
                        {formData.message.length}/1000
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative w-full py-4 rounded-xl text-sm font-medium overflow-hidden group ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-lg transform hover:scale-[1.02] transition-all'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fadeInUp animation-delay-400">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group relative animate-fadeInUp"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-r ${item.color} rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-transparent transition-all duration-300 hover:shadow-lg">
                    <div className={`w-10 h-10 rounded-lg bg-linear-to-r ${item.color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <div className={`text-transparent bg-clip-text bg-linear-to-r ${item.color} text-white`}>
                        {item.icon}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 transition-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaHeart className="w-4 h-4 text-red-400" />
                Connect With Me
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`relative group flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            {/* <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <FaRegSmile className="w-5 h-5 text-purple-600" />
                Stay Updated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to my newsletter for updates on new projects and articles.
              </p>
              
              {newsletterSubmitted ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl">
                  <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4" />
                    Thanks for subscribing! Check your inbox for confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 dark:focus:ring-purple-400/20 text-sm text-gray-900 dark:text-white transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div> */}

            {/* FAQ Section */}
            {/* <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {faq.question}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Availability Status */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Currently Available
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available for work</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  I'm currently accepting new projects and freelance opportunities. 
                  Let's create something amazing together!
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <FaRocket className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Quick response guaranteed within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Contact