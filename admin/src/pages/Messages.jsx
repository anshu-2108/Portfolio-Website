import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { messagesApi } from '../services/api'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { 
  FaEnvelope, FaUser, FaCalendar, FaCheck, FaEye, 
  FaReply, FaTrash, FaSearch, FaDownload, FaSync,
  FaExclamationCircle, FaChevronLeft, FaChevronRight,
  FaInbox, FaPaperPlane, FaTimes, FaUserCircle,
  FaSpinner
} from 'react-icons/fa'

const Messages = () => {
  const { admin } = useAuth()
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [messagesPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMessages, setTotalMessages] = useState(0)
  const [replyText, setReplyText] = useState('')
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState(null)
  const [bulkSelect, setBulkSelect] = useState([])
  const [exportFormat, setExportFormat] = useState('csv')
  const [showExportModal, setShowExportModal] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0
  })
  const [actionLoading, setActionLoading] = useState(false)

  // Fetch messages
  const fetchMessages = async (page = currentPage, showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      const response = await messagesApi.getAll(page, messagesPerPage)
      
      if (response.data.success) {
        const fetchedMessages = response.data.messages || []
        setMessages(fetchedMessages)
        setFilteredMessages(fetchedMessages)
        setTotalPages(response.data.pagination?.pages || 1)
        setTotalMessages(response.data.pagination?.total || 0)
        
        // Update stats
        const unreadCount = fetchedMessages.filter(m => m.status === 'unread').length
        const readCount = fetchedMessages.filter(m => m.status === 'read').length
        const repliedCount = fetchedMessages.filter(m => m.status === 'replied').length
        
        setStats({
          total: response.data.pagination?.total || 0,
          unread: unreadCount,
          read: readCount,
          replied: repliedCount
        })
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchMessages(currentPage)
  }, [currentPage])

  // Filter and search
  useEffect(() => {
    let filtered = [...messages]

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(m => m.status === statusFilter)
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(m => 
        m.name?.toLowerCase().includes(query) ||
        m.email?.toLowerCase().includes(query) ||
        m.subject?.toLowerCase().includes(query) ||
        m.message?.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      case 'email':
        filtered.sort((a, b) => (a.email || '').localeCompare(b.email || ''))
        break
      default:
        break
    }

    setFilteredMessages(filtered)
  }, [messages, statusFilter, searchQuery, sortBy])

  // Mark as read
  const markAsRead = async (id) => {
    try {
      setActionLoading(true)
      const response = await messagesApi.markAsRead(id)
      if (response.data.success) {
        setMessages(messages.map(m => 
          m._id === id ? { ...m, status: 'read' } : m
        ))
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status: 'read' })
        }
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    } finally {
      setActionLoading(false)
    }
  }

  // Mark as replied
  const markAsReplied = async (id) => {
    try {
      setActionLoading(true)
      const response = await messagesApi.markAsReplied(id)
      if (response.data.success) {
        setMessages(messages.map(m => 
          m._id === id ? { ...m, status: 'replied' } : m
        ))
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status: 'replied' })
        }
      }
    } catch (error) {
      console.error('Error marking as replied:', error)
    } finally {
      setActionLoading(false)
    }
  }

  // Delete message
  const deleteMessage = async () => {
    if (!messageToDelete) return
    
    try {
      setActionLoading(true)
      const response = await messagesApi.delete(messageToDelete)
      if (response.data.success) {
        setMessages(messages.filter(m => m._id !== messageToDelete))
        if (selectedMessage?._id === messageToDelete) {
          setSelectedMessage(null)
        }
        setShowDeleteModal(false)
        setMessageToDelete(null)
        
        // Refresh to update stats
        fetchMessages(currentPage)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    } finally {
      setActionLoading(false)
    }
  }

  // Bulk delete
  const bulkDelete = async () => {
    try {
      setActionLoading(true)
      await Promise.all(bulkSelect.map(id => messagesApi.delete(id)))
      setMessages(messages.filter(m => !bulkSelect.includes(m._id)))
      setBulkSelect([])
      
      // Refresh to update stats
      fetchMessages(currentPage)
    } catch (error) {
      console.error('Error bulk deleting:', error)
    } finally {
      setActionLoading(false)
    }
  }

  // Handle reply
  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return
    
    // Here you would integrate with your email service
    console.log('Sending reply to:', selectedMessage.email)
    console.log('Reply:', replyText)
    
    await markAsReplied(selectedMessage._id)
    setShowReplyModal(false)
    setReplyText('')
  }

  // Export messages
  const exportMessages = () => {
    const dataToExport = filteredMessages
    
    if (exportFormat === 'csv') {
      const headers = ['Date', 'Name', 'Email', 'Subject', 'Message', 'Status', 'IP']
      const csvData = dataToExport.map(m => [
        new Date(m.createdAt).toLocaleString(),
        m.name || '',
        m.email || '',
        m.subject || '',
        (m.message || '').replace(/,/g, ';').replace(/\n/g, ' '),
        m.status || '',
        m.ip || 'N/A'
      ])

      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `messages-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } else {
      const jsonStr = JSON.stringify(dataToExport, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `messages-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      window.URL.revokeObjectURL(url)
    }
    
    setShowExportModal(false)
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center gap-1">
          <FaEye className="w-3 h-3" /> Unread
        </span>
      case 'read':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium flex items-center gap-1">
          <FaCheck className="w-3 h-3" /> Read
        </span>
      case 'replied':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
          <FaReply className="w-3 h-3" /> Replied
        </span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
          {status}
        </span>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-gray-900 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header title="Messages" admin={admin} />
        
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FaInbox className="w-5 h-5 text-gray-400" />
                <span className="text-2xl font-light text-gray-900">{stats.total}</span>
              </div>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FaEye className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-light text-blue-900">{stats.unread}</span>
              </div>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FaCheck className="w-5 h-5 text-gray-400" />
                <span className="text-2xl font-light text-gray-900">{stats.read}</span>
              </div>
              <p className="text-sm text-gray-600">Read</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FaReply className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-light text-green-900">{stats.replied}</span>
              </div>
              <p className="text-sm text-gray-600">Replied</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                </select>

                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                >
                  <FaDownload className="w-3 h-3" />
                  Export
                </button>

                <button
                  onClick={() => fetchMessages(currentPage, true)}
                  disabled={refreshing}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  <FaSync className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {bulkSelect.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {bulkSelect.length} message{bulkSelect.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      bulkSelect.forEach(id => markAsRead(id))
                      setBulkSelect([])
                    }}
                    disabled={actionLoading}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={bulkDelete}
                    disabled={actionLoading}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setBulkSelect([])}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Messages ({filteredMessages.length})</h3>
                  <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-150 overflow-y-auto">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div
                        key={message._id}
                        onClick={() => {
                          setSelectedMessage(message)
                          if (message.status === 'unread') {
                            markAsRead(message._id)
                          }
                        }}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedMessage?._id === message._id
                            ? 'bg-gray-100'
                            : message.status === 'unread'
                            ? 'bg-blue-50 hover:bg-blue-100'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={bulkSelect.includes(message._id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              if (e.target.checked) {
                                setBulkSelect([...bulkSelect, message._id])
                              } else {
                                setBulkSelect(bulkSelect.filter(id => id !== message._id))
                              }
                            }}
                            className="mt-1"
                            onClick={(e) => e.stopPropagation()}
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaUser className="w-3 h-3 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-900">
                                    {message.name || 'Unknown'}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">{message.email || 'No email'}</p>
                              </div>
                              {getStatusBadge(message.status)}
                            </div>
                            
                            <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                              {message.subject || 'No subject'}
                            </h4>
                            
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                              {message.message || 'No message'}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{formatDate(message.createdAt)}</span>
                              {message.status === 'unread' && (
                                <FaExclamationCircle className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No messages found
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 text-sm rounded-full ${
                            currentPage === i + 1
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-light text-gray-900">Message Details</h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowReplyModal(true)}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                        >
                          <FaReply className="w-3 h-3" />
                          Reply
                        </button>
                        <button
                          onClick={() => {
                            setMessageToDelete(selectedMessage._id)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                          title="Delete Message"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">From</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedMessage.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-600">{selectedMessage.email || 'No email'}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Received</p>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedMessage.createdAt).toLocaleString()}
                        </p>
                        {selectedMessage.ip && (
                          <p className="text-xs text-gray-500 mt-1">IP: {selectedMessage.ip}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Subject</p>
                    <p className="text-base font-medium text-gray-900">{selectedMessage.subject || 'No subject'}</p>
                  </div>

                  {/* Message */}
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">Message</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message || 'No message content'}
                    </p>
                  </div>

                  {/* User Agent */}
                  {selectedMessage.userAgent && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-xs text-gray-500">User Agent</p>
                      <p className="text-xs text-gray-600 break-all">{selectedMessage.userAgent}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                  <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-light text-gray-900 mb-2">No message selected</h3>
                  <p className="text-sm text-gray-500">
                    Click on a message from the list to view its contents
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowReplyModal(false)} />
          <div className="relative bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-light text-gray-900">Reply to {selectedMessage.name}</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Original Message:</p>
                <p className="text-sm text-gray-700">{selectedMessage.message}</p>
              </div>
              
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm resize-none"
              />
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim() || actionLoading}
                  className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
                    replyText.trim() && !actionLoading
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="w-3 h-3 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-3 h-3" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Delete Message</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteMessage}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="w-3 h-3 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowExportModal(false)} />
          <div className="relative bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-light text-gray-900 mb-4">Export Messages</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                >
                  <option value="csv">CSV (Excel)</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                <p>You are about to export:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>{filteredMessages.length} messages</li>
                  <li>Current filters applied</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={exportMessages}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  <FaDownload className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages