'use client'

import { useState } from 'react'
import { Phone, Clock, Wrench, ChevronRight, MessageCircle } from 'lucide-react'
import { shop, shopTelHref } from '../../lib/shop'

const FALLBACK = `I could not load an answer just now. Call ${shop.phone} and the shop will help.`

const quickReplies = [
  'Hybrid Battery',
  'Warning Light',
  'Brake Repair',
  'Inspection',
  'A/C Repair',
  'Get a Quote',
]

type ChatMessage = { type: 'user' | 'bot'; text: string }

async function askShop(message: string) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const data = (await res.json().catch(() => null)) as { text?: unknown } | null
  if (typeof data?.text === 'string' && data.text.trim()) return data.text.trim()
  throw new Error('empty')
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: `Hi! I'm Steve's virtual assistant. Ask me about hybrid battery repair, diagnostics, hours, or booking service.` },
  ])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)

  const handleSend = async (preset?: string) => {
    const userMessage = (preset || input).trim()
    if (!userMessage || pending) return

    setInput('')
    setPending(true)
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }])

    try {
      const text = await askShop(userMessage)
      setMessages((prev) => [...prev, { type: 'bot', text }])
    } catch {
      setMessages((prev) => [...prev, { type: 'bot', text: FALLBACK }])
    } finally {
      setPending(false)
    }
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

          <div className="h-80 space-y-4 overflow-y-auto p-4" aria-busy={pending}>
            {messages.map((msg, idx) => (
              <div key={`${msg.type}-${idx}`} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] rounded-2xl p-3 ${msg.type === 'user' ? 'rounded-br-none bg-teal-500 text-slate-950' : 'rounded-bl-none bg-slate-100 text-slate-800'}`}>
                  <p className="whitespace-pre-line text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {pending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none bg-slate-100 px-3 py-2 text-sm text-slate-500">
                  Checking with the shop…
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickReplies.map((reply) => (
              <button
                type="button"
                key={reply}
                disabled={pending}
                onClick={() => void handleSend(reply)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 disabled:opacity-50"
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
                disabled={pending}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="Type your question..."
                className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-60"
              />
              <button
                type="button"
                disabled={pending}
                onClick={() => void handleSend()}
                className="rounded-xl bg-slate-950 p-2 text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="border-t bg-slate-50 p-3 text-center text-xs text-slate-600">
            <div className="flex items-center justify-center gap-4">
              <a href={shopTelHref} className="flex items-center gap-1 font-bold hover:text-teal-700">
                <Phone className="h-3 w-3" />
                {shop.phone}
              </a>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {shop.hours.chat}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
