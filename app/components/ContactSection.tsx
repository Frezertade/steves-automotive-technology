'use client'

import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const services = [
    'Oil Change',
    'Hybrid Battery Repair',
    'Brake Service',
    'State Inspection',
    'A/C Repair',
    'Engine Diagnostics',
    'General Repair',
    'Other',
  ]

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Book Your <span className="text-teal-600">Appointment</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your service today. We typically respond within 30 minutes during business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    We received your request and will call you within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="(717) 330-0041"
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
                      Service Needed *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
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
                    className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Request Appointment
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
                href="tel:7173300041"
                className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors"
              >
                <Phone className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <p className="text-teal-600 font-medium">(717) 330-0041</p>
              </a>

              <a
                href="mailto:stevesautotech@gmail.com"
                className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors"
              >
                <Mail className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <p className="text-teal-600 font-medium text-sm">stevesautotech@gmail.com</p>
              </a>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Visit Our Shop</h3>
                  <p className="text-gray-600">
                    1027 Dillerville Rd #16<br />
                    Lancaster, PA 17603
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
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">8:30 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">8:30 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-red-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden h-64 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.0!2d-76.3234!3d40.0583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAzJzMwLjAiTiA3NsKwMTknMjQuMiJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Steve's Automotive Technology Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
