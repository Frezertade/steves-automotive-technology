'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Car, User, Phone, Mail, Wrench, ChevronRight, CheckCircle, X } from 'lucide-react'

const SERVICES = [
  'Oil Change',
  'Inspection',
  'Brake Repair', 
  'A/C Repair',
  'Engine Diagnostics',
  'Transmission',
  'Hybrid Battery',
  'General Service',
]

export default function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    notes: '',
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [error, setError] = useState('')

  // Get today's date and 30 days forward
  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots()
    }
  }, [formData.date])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/appointments?date=${formData.date}`)
      const data = await response.json()
      setAvailableSlots(data.slots || [])
    } catch (err) {
      setError('Failed to load available slots')
    }
    setLoading(false)
  }

  const handleBooking = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setBookingSuccess(true)
      } else {
        setError(data.error || 'Failed to book appointment')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
    
    setLoading(false)
  }

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  if (bookingSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
        <p className="text-gray-600 mb-4">
          Thank you {formData.name}! Your appointment for {formData.service} is confirmed.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p><strong>Date:</strong> {formData.date}</p>
          <p><strong>Time:</strong> {formData.time}</p>
          <p><strong>Service:</strong> {formData.service}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
        </div>
        <p className="text-sm text-gray-500">
          We'll send a confirmation shortly. Need to reschedule? Call us at (717) 397-3497
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-teal-600 text-white p-4">
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-white text-teal-600' : 'bg-teal-500 text-teal-200'
              }`}>
                {s < step ? '✓' : s}
              </div>
              <span className="text-sm hidden sm:block">
                {s === 1 ? 'Service' : s === 2 ? 'Date/Time' : 'Details'}
              </span>
              {s < 3 && <ChevronRight className="w-4 h-4 text-teal-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select a Service</h3>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service}
                  onClick={() => {
                    updateForm('service', service)
                    setStep(2)
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.service === service
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <Wrench className="w-5 h-5 mb-2" />
                  <span className="font-medium">{service}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Date & Time</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Select Date
              </label>
              <input
                type="date"
                min={today}
                max={maxDate}
                value={formData.date}
                onChange={(e) => updateForm('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Available Time Slots
                </label>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading available slots...</p>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No available slots for this date.</p>
                    <p className="text-sm">Please select another date or call (717) 397-3497</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => {
                          updateForm('time', slot.time)
                          setStep(3)
                        }}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          formData.time === slot.time
                            ? 'border-teal-600 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setStep(1)}
              className="mt-4 text-teal-600 hover:text-teal-700 text-sm"
            >
              ← Back to services
            </button>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  placeholder="(717) 555-0123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Car className="w-4 h-4 inline mr-1" />
                  Vehicle Info (optional)
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => updateForm('vehicle', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  placeholder="2019 Toyota Camry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateForm('notes', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Any specific issues or requests..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                disabled={!formData.name || !formData.phone || loading}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}