const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Both frontend ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// MongoDB Connection - Updated for latest driver
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('✅ MongoDB connected successfully')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  }
}

connectDB()

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: { 
    type: String, 
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [3, 'Subject must be at least 3 characters'],
    maxlength: [100, 'Subject cannot exceed 100 characters']
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'replied'],
    default: 'unread' 
  },
  ip: String,
  userAgent: String
})

const Contact = mongoose.model('Contact', contactSchema)

// Newsletter Subscription Schema
const newsletterSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['active', 'unsubscribed'],
    default: 'active'
  }
})

const Newsletter = mongoose.model('Newsletter', newsletterSchema)

// Email configuration
const createTransporter = () => {
  // For development/testing, use ethereal.email
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_EMAIL || 'your-ethereal-email',
        pass: process.env.ETHEREAL_PASS || 'your-ethereal-password'
      }
    })
  }

  // For production, use Gmail or other service
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

const transporter = createTransporter()

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error)
  } else {
    console.log('✅ Email server is ready')
  }
})

// Validation middleware
const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body
  const errors = []

  if (!name || name.length < 2) errors.push('Name must be at least 2 characters')
  if (!email || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) 
    errors.push('Please enter a valid email')
  if (!subject || subject.length < 3) errors.push('Subject must be at least 3 characters')
  if (!message || message.length < 10) errors.push('Message must be at least 10 characters')

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors })
  }
  next()
}

// ============ API ROUTES ============

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Submit contact form
app.post('/api/contact', validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Get client IP and user agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers['user-agent']

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      ip,
      userAgent
    })
    
    await newContact.save()
    console.log('✅ Contact form saved to database')

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || '"Portfolio Contact" <noreply@portfolio.com>',
        to: process.env.EMAIL_USER || 'your-email@gmail.com',
        subject: `New Contact Form: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #111; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message}</div>
                </div>
                <div class="field">
                  <div class="label">Submitted:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from your portfolio website.</p>
              </div>
            </div>
          </body>
          </html>
        `
      }

      const info = await transporter.sendMail(mailOptions)
      console.log('✅ Email sent:', info.messageId)

      // If using ethereal, show preview URL
      if (process.env.NODE_ENV === 'development' && info.previewUrl) {
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info))
      }

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError)
      // Continue even if email fails - we still saved to DB
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    })

  } catch (error) {
    console.error('❌ Contact form error:', error)
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'This email has already been used' 
      })
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error sending message. Please try again.' 
    })
  }
})

// Get all messages (with pagination)
app.get('/api/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Contact.countDocuments()

    res.status(200).json({ 
      success: true, 
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ success: false, message: 'Error fetching messages' })
  }
})

// Get unread count
app.get('/api/messages/unread/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments({ status: 'unread' })
    res.status(200).json({ success: true, count })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching count' })
  }
})

// Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status: 'read' },
      { new: true }
    )
    
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' })
    }

    res.status(200).json({ success: true, message })
  } catch (error) {
    console.error('Error updating message:', error)
    res.status(500).json({ success: false, message: 'Error updating message' })
  }
})

// Mark message as replied
app.patch('/api/messages/:id/replied', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status: 'replied' },
      { new: true }
    )
    
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' })
    }

    res.status(200).json({ success: true, message })
  } catch (error) {
    console.error('Error updating message:', error)
    res.status(500).json({ success: false, message: 'Error updating message' })
  }
})

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id)
    
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' })
    }

    res.status(200).json({ success: true, message: 'Message deleted' })
  } catch (error) {
    console.error('Error deleting message:', error)
    res.status(500).json({ success: false, message: 'Error deleting message' })
  }
})

// Subscribe to newsletter
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body

    if (!email || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email' 
      })
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email })
    if (existing) {
      if (existing.status === 'active') {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already subscribed' 
        })
      } else {
        // Reactivate subscription
        existing.status = 'active'
        await existing.save()
      }
    } else {
      // New subscription
      const newsletter = new Newsletter({ email })
      await newsletter.save()
    }

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || '"Portfolio" <noreply@portfolio.com>',
        to: email,
        subject: 'Newsletter Subscription Confirmation',
        html: `
          <h2>Thank you for subscribing!</h2>
          <p>You'll receive updates about new projects and articles.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p><small>To unsubscribe, click <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${email}">here</a></small></p>
        `
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('Newsletter confirmation email failed:', emailError)
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    })

  } catch (error) {
    console.error('Newsletter error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error subscribing. Please try again.' 
    })
  }
})

// Unsubscribe from newsletter
app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body

    const subscription = await Newsletter.findOne({ email })
    if (subscription) {
      subscription.status = 'unsubscribed'
      await subscription.save()
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully unsubscribed' 
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error unsubscribing' })
  }
})

// Get all newsletter subscribers (admin only)
app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ status: 'active' })
      .sort({ subscribedAt: -1 })
    res.status(200).json({ success: true, subscribers })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching subscribers' })
  }
})

// ✅ FIXED: 404 handler - using middleware instead of wildcard route
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 API URL: http://localhost:${PORT}`)
  console.log(`💾 Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'}\n`)
})