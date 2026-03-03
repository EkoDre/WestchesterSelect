import { useState } from 'react'

function AgentContactForm({ agentName, agentEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (submitStatus) {
      setSubmitStatus(null)
      setSubmitMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error')
      setSubmitMessage('Please fill in all required fields (Name, Email, and Message).')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          agentName,
          agentEmail,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setSubmitMessage(data.message || `Your message has been sent to ${agentName}!`)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setSubmitMessage('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3">
          <span className="text-3xl">✉️</span>
          <span>Send {agentName} a Message</span>
        </h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {submitStatus && (
            <div className={`p-4 rounded-xl ${
              submitStatus === 'success'
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
            }`}>
              {submitMessage}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">👤</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📧</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📞</div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number (optional)"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-6 text-gray-400 text-lg">💬</div>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-gold/50 transition-all duration-300 transform hover:scale-105 mt-6 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : `Send Message to ${agentName} →`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AgentContactForm
