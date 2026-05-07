'use client'

import { useState } from 'react'
import { Phone, Clock, Wrench, ChevronRight, MessageCircle } from 'lucide-react'

const SHOP_PHONE = '(717) 330-0041'
const SHOP_PHONE_LINK = '7173300041'

const quickReplies = [
  'Hybrid Battery',
  'Warning Light',
  'Brake Repair',
  'Inspection',
  'A/C Repair',
  'Get a Quote',
]

function buildResponse(message: string) {
  const text = message.toLowerCase()

  if (text.includes('hybrid') || text.includes('battery') || text.includes('prius')) {
    return `Yes — Steve's Automotive Technology specializes in hybrid battery diagnostics, reconditioning guidance, and replacement options. The fastest next step is to book a hybrid diagnostic or call ${SHOP_PHONE} so the shop can understand the symptoms, mileage, and warning lights.`
  }

  if (text.includes('price') || text.includes('quote') || text.includes('cost')) {
    return `For accurate pricing, Steve's team will want the vehicle year/make/model and symptoms. Hybrid battery work can often save thousands versus dealership replacement quotes. Call ${SHOP_PHONE} or send an appointment request with your vehicle details.`
  }

  if (text.includes('hour') || text.includes('open') || text.includes('time')) {
    return `Shop hours are Monday-Friday 8:30 AM-5:00 PM and Saturday 8:30 AM-1:00 PM. For fastest service, call ${SHOP_PHONE}.`
  }

  if (text.includes('where') || text.includes('address') || text.includes('location')) {
    return `Steve's Automotive Technology is at 1027 Dillerville Rd #16, Lancaster, PA 17603, serving Lancaster and Millersville drivers.`
  }

  return `I can help with hybrid battery diagnostics, warning lights, inspections, brakes, A/C, oil changes, and general auto repair. For the quickest answer, call ${SHOP_PHONE} or use the appointment form on this page.`
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: `Hi! I'm Steve's virtual assistant. Ask me about hybrid battery repair, diagnostics, hours, or booking service.` },
  ])
  const [input, setInput] = useState('')

  const handleSend = (preset?: string) => {
    const userMessage = (preset || input).trim()
    if (!userMessage) return

    const newMessages = [...messages, { type: 'user', text: userMessage }]
    setMessages([...newMessages, { type: 'bot', text: buildResponse(userMessage) }])
    setInput('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-teal-400 p-4 text-slate-950 shadow-2xl shadow-teal-950/30 transition-colors hover:bg-white"
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-300">
                <Wrench className="h-5 w-5 text-slate-950" />
              </div>
              <div>
                <h3 className="font-black">Steve's Service Assistant</h3>
                <p className="text-sm text-teal-100">Fast answers + direct booking</p>
              </div>
            </div>
          </div>

          <div className="h-80 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, idx) => (
              <div key={`${msg.type}-${idx}`} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] rounded-2xl p-3 ${msg.type === 'user' ? 'rounded-br-none bg-teal-500 text-slate-950' : 'rounded-bl-none bg-slate-100 text-slate-800'}`}>
                  <p className="whitespace-pre-line text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickReplies.map((reply) => (
              <button
                type="button"
                key={reply}
                onClick={() => handleSend(reply)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="rounded-xl bg-slate-950 p-2 text-white transition-colors hover:bg-teal-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="border-t bg-slate-50 p-3 text-center text-xs text-slate-600">
            <div className="flex items-center justify-center gap-4">
              <a href={`tel:${SHOP_PHONE_LINK}`} className="flex items-center gap-1 font-bold hover:text-teal-700">
                <Phone className="h-3 w-3" />
                {SHOP_PHONE}
              </a>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Mon-Fri 8:30-5
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
