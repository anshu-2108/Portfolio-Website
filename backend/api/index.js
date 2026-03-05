const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
// const dotenv = require('dotenv')

// dotenv.config()

const app = express()

// ================= MIDDLEWARE =================
app.use(cors({
  origin: true, // Allow all origins in production (or set your frontend URL)
  credentials: true
}))

app.use(express.json())

// ================= MONGODB CONNECTION =================
let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    })

    isConnected = db.connections[0].readyState === 1
    console.log('✅ MongoDB Connected')

  } catch (err) {
    console.error('❌ MongoDB Error Name:', err.name)
    console.error('❌ MongoDB Error Message:', err.message)
  }
}

connectDB()

// ================= SCHEMAS =================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

const newsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)
const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema)

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Only verify if credentials exist
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error) => {
    if (error) console.error('Email config error:', error)
    else console.log('✅ Email server ready')
  })
}

// ================= ROUTES =================

// Health Check
app.get('/api/health', async (req, res) => {
  await connectDB()

  res.status(200).json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    await connectDB()

    const { name, email, subject, message } = req.body

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    })

    // Send email (optional)
    if (process.env.EMAIL_USER) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact: ${subject}`,
        html: `<p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${message}</p>`
      })
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
})

// Newsletter Subscribe
app.post('/api/newsletter', async (req, res) => {
  try {
    await connectDB()

    const { email } = req.body

    const existing = await Newsletter.findOne({ email })

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already subscribed'
      })
    }

    await Newsletter.create({ email })

    res.status(200).json({
      success: true,
      message: 'Subscribed successfully'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Subscription failed'
    })
  }
})

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
    console.error(error)
    res.status(500).json({ success: false })
  }
})

// Get unread count
app.get('/api/messages/unread/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments({ status: 'unread' })
    res.status(200).json({ success: true, count })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})


// Mark as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    )

    res.status(200).json({ success: true, message })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})


// Mark as replied
app.patch('/api/messages/:id/replied', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'replied' },
      { new: true }
    )

    res.status(200).json({ success: true, message })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})


// Delete message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Export for Vercel
module.exports = app