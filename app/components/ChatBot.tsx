'use client'

import { useState } from 'react'
import { Phone, Clock, Wrench, ChevronRight, MessageCircle } from 'lucide-react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m Steve\'s AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', service: '' })
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    const newMessages = [...messages, { type: 'user', text: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful AI assistant for Steve\'s Automotive Technology, an auto repair shop in Lancaster, PA. Be friendly, answer automotive questions, and capture lead info when appropriate. Services: Diagnostics, A/C & Heating, Electrical, Brakes, Oil Changes, Engine Repair, Transmission. Hours: Mon-Fri 8AM-5PM, Sat 8AM-12PM. Phone: (717) 397-3497. Address: 1027 Dillerville Rd #16, Lancaster, PA 17603.' },
            ...messages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text })),
            { role: 'user', content: userMessage }
          ]
        })
      })

      if (response.ok) {
        const data = await response.json()
        setMessages([...newMessages, { type: 'bot', text: data.text || 'I\'d be happy to help! Please call us at (717) 397-3497 for immediate assistance.' }])
      } else {
        // Fallback to lead capture flow
        handleFallbackResponse(newMessages, userMessage)
      }
    } catch (error) {
      handleFallbackResponse(newMessages, userMessage)
    }

    setIsLoading(false)
  }

  const handleFallbackResponse = (newMessages, userMessage) => {
    let botResponse = ''
    
    if (step === 0) {
      botResponse = 'Great! What type of service do you need? (e.g., oil change, hybrid battery, inspection, brakes)'
      setStep(1)
      setLeadInfo({ ...leadInfo, service: userMessage })
    } else if (step === 1) {
      botResponse = 'Thanks! What\'s your name so we can personalize your experience?'
      setStep(2)
      setLeadInfo({ ...leadInfo, service: userMessage })
    } else if (step === 2) {
      botResponse = 'Perfect! What\'s the best phone number to reach you? We\'ll call you within 30 minutes during business hours.'
      setStep(3)
      setLeadInfo({ ...leadInfo, name: userMessage })
    } else if (step === 3) {
      botResponse = `Excellent! We\'ve captured your info:\n\nService: ${leadInfo.service}\nName: ${leadInfo.name}\nPhone: ${userMessage}\n\nOur team will contact you shortly. Need immediate help? Call us at (717) 397-3497.`
      setStep(4)
      setLeadInfo({ ...leadInfo, phone: userMessage })
      console.log('Lead captured:', { ...leadInfo, phone: userMessage })
    } else {
      botResponse = 'Is there anything else I can help you with? Feel free to ask about our services, hours, or location!'
    }

    setMessages([...newMessages, { type: 'bot', text: botResponse }])
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
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
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
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
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
                disabled={isLoading}
                className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-3 text-center text-xs text-gray-600 border-t">
            <div className="flex items-center justify-center gap-4">
              <a href="tel:7173973497" className="flex items-center gap-1 hover:text-teal-600">
                <Phone className="w-3 h-3" />
                (717) 397-3497
              </a>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Mon-Fri 8AM-5PM
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}