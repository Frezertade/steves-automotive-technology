'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Wrench, ChevronRight, MessageCircle } from 'lucide-react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m Steve\'s AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', service: '' })
  const [step, setStep] = useState(0)

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { type: 'user', text: input }]
    setMessages(newMessages)
    setInput('')

    // Simple lead capture flow
    setTimeout(() => {
      let botResponse = ''
      
      if (step === 0) {
        botResponse = 'Great! What type of service do you need? (e.g., oil change, hybrid battery, inspection, brakes)'
        setStep(1)
        setLeadInfo({ ...leadInfo, service: input })
      } else if (step === 1) {
        botResponse = 'Thanks! What\'s your name so we can personalize your experience?'
        setStep(2)
        setLeadInfo({ ...leadInfo, service: input })
      } else if (step === 2) {
        botResponse = 'Perfect! What\'s the best phone number to reach you? We\'ll call you within 30 minutes during business hours.'
        setStep(3)
        setLeadInfo({ ...leadInfo, name: input })
      } else if (step === 3) {
        botResponse = `Excellent! We\'ve captured your info:\n\nService: ${leadInfo.service}\nName: ${leadInfo.name}\nPhone: ${input}\n\nOur team will contact you shortly. Need immediate help? Call us at (717) 330-0041.`
        setStep(4)
        setLeadInfo({ ...leadInfo, phone: input })
        
        // Here you would typically send the lead to your CRM or email
        console.log('Lead captured:', { ...leadInfo, phone: input })
      } else {
        botResponse = 'Is there anything else I can help you with? Feel free to ask about our services, hours, or location!'
      }

      setMessages([...newMessages, { type: 'bot', text: botResponse }])
    }, 1000)
  }

  const quickReplies = [
    'Oil Change',
    'Hybrid Battery',
    'Brake Repair',
    'Inspection',
    'A/C Repair',
    'Get a Quote'
  ]

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-colors cursor-pointer"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          style={{ position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 50, width: '24rem', maxWidth: 'calc(100vw - 3rem)', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', overflow: 'hidden' }}
        >
          {/* Header */}
          <div className="bg-teal-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Wrench className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold">Steve's AI Assistant</h3>
                <p className="text-sm text-teal-100">Typically replies in minutes</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Replies */}
          {step === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    setInput(reply)
                    handleSend()
                  }}
                  className="text-xs bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleSend}
                className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
