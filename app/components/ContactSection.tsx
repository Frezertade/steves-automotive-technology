'use client'

import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { shop, shopMailtoHref, shopMapsUrl, shopTelHref } from '../../lib/shop'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service || 'Question / callback',
          notes: formData.message,
          source: 'contact',
        }),
      })

      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload?.ok) {
        setError(payload?.error || `Could not send the request. Call ${shop.phone}.`)
        return
      }

      setDelivered(Boolean(payload.delivered))
      setSubmitted(true)
    } catch {
      setError(`Could not send the request. Call ${shop.phone}.`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ask a Question / Request a <span className="text-teal-600">Callback</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Questions about hybrid battery repair or general service? Send a message and we will call you back, or call {shop.phone} for the fastest answer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {delivered ? 'Message Sent' : 'Request Recorded'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {delivered
                      ? `Steve's team has been emailed your details. For fastest confirmation, call ${shop.phone}.`
                      : `Your request was recorded. Call ${shop.phone} to confirm.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setDelivered(false)
                    }}
                    className="text-sm font-semibold text-teal-700 hover:text-teal-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={shop.phone}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {shop.contactServices.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Tell us about your vehicle and any issues you're experiencing..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-70"
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? 'Sending…' : 'Request a Callback'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href={shopTelHref}
                className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors"
              >
                <Phone className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <p className="text-teal-600 font-medium">{shop.phone}</p>
              </a>

              <a
                href={shopMailtoHref}
                className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors"
              >
                <Mail className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <p className="text-teal-600 font-medium text-sm">{shop.email}</p>
              </a>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Visit Our Shop</h3>
                  <p className="text-gray-600">
                    {shop.street}<br />
                    {shop.city}, {shop.region} {shop.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{shop.hours.weekday.label}</span>
                      <span className="font-medium">{shop.hours.weekday.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{shop.hours.saturday.label}</span>
                      <span className="font-medium">{shop.hours.saturday.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{shop.hours.sunday.label}</span>
                      <span className="font-medium text-red-500">{shop.hours.sunday.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
              <a
                href={shopMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-64 overflow-hidden rounded-xl border border-teal-200 bg-slate-950 p-6 text-white shadow-xl"
              >
                <div className="absolute inset-0 opacity-35" style={{
                  backgroundImage: 'linear-gradient(rgba(16,245,212,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(16,245,212,.18) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }} />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-300 bg-teal-300/20 shadow-[0_0_45px_rgba(16,245,212,.45)]" />
                <MapPin className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-teal-200" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-200">Shop Location</p>
                    <h3 className="mt-3 text-2xl font-black">{shop.street}</h3>
                    <p className="text-slate-300">{shop.city}, {shop.region} {shop.postalCode}</p>
                  </div>
                  <div className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition-colors group-hover:bg-teal-200">
                    Open in Google Maps
                  </div>
                </div>
              </a>
          </div>
        </div>
      </div>
    </section>
  )
}
