'use client'

import { useMemo, useState } from 'react'
import { Calendar, Clock, Car, User, Phone, Mail, Wrench, ChevronRight, CheckCircle } from 'lucide-react'

const SERVICES = [
  'Hybrid Battery Diagnostic',
  'Hybrid Battery Repair',
  'Oil Change',
  'PA State Inspection',
  'Brake Repair',
  'A/C Repair',
  'Engine Diagnostics',
  'General Service',
]

const SHOP_PHONE = '(717) 330-0041'
const SHOP_PHONE_LINK = '7173300041'

function getSlotsForDate(dateValue: string) {
  if (!dateValue) return []

  const date = new Date(`${dateValue}T12:00:00`)
  const day = date.getDay()

  if (day === 0) return []

  const closeHour = day === 6 ? 12 : 17
  const slots = []

  for (let hour = 8; hour < closeHour; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === 8 && minute === 0) continue
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }

  return slots
}

export default function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: 'Hybrid Battery Diagnostic',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    notes: '',
  })
  const [requestSent, setRequestSent] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const availableSlots = useMemo(() => getSlotsForDate(formData.date), [formData.date])

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleRequest = async () => {
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError('Please complete the required fields before submitting your request.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'booking',
        }),
      })

      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload?.ok) {
        setError(payload?.error || `Could not send the request. Call ${SHOP_PHONE} to book.`)
        return
      }

      setDelivered(Boolean(payload.delivered))
      setRequestSent(true)
    } catch {
      setError(`Could not send the request. Call ${SHOP_PHONE} to book.`)
    } finally {
      setSubmitting(false)
    }
  }

  if (requestSent) {
    return (
      <div className="rounded-[2rem] border border-teal-200/40 bg-white p-8 text-center shadow-2xl shadow-slate-200/80">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
          <CheckCircle className="h-8 w-8 text-teal-700" />
        </div>
        <h3 className="mb-2 text-2xl font-black text-slate-950">
          {delivered ? 'Appointment Request Sent' : 'Appointment Request Recorded'}
        </h3>
        <p className="mx-auto mb-6 max-w-xl text-slate-600">
          {delivered
            ? `Steve's team has been emailed your details. For fastest confirmation, call ${SHOP_PHONE}.`
            : `Your request was recorded. Call ${SHOP_PHONE} to confirm.`}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`tel:${SHOP_PHONE_LINK}`} className="rounded-2xl bg-teal-400 px-6 py-3 font-extrabold text-slate-950 hover:bg-teal-300">
            Call {SHOP_PHONE}
          </a>
          <button
            onClick={() => {
              setRequestSent(false)
              setDelivered(false)
            }}
            className="rounded-2xl border border-slate-200 px-6 py-3 font-bold text-slate-700 hover:border-teal-300"
          >
            Edit Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
      <div className="bg-slate-950 p-4 text-white">
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${s <= step ? 'bg-teal-300 text-slate-950' : 'bg-white/10 text-white/50'}`}>
                {s < step ? '✓' : s}
              </div>
              <span className="hidden text-sm font-semibold sm:block">
                {s === 1 ? 'Service' : s === 2 ? 'Date/Time' : 'Details'}
              </span>
              {s < 3 && <ChevronRight className="h-4 w-4 text-teal-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="mb-4 text-xl font-black text-slate-950">What can Steve's team help with?</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <button
                  key={service}
                  onClick={() => {
                    updateForm('service', service)
                    setStep(2)
                  }}
                  className={`rounded-2xl border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${
                    formData.service === service
                      ? 'border-teal-400 bg-teal-50 text-teal-800 shadow-lg shadow-teal-100'
                      : 'border-slate-200 text-slate-700 hover:border-teal-300'
                  }`}
                >
                  <Wrench className="mb-2 h-5 w-5" />
                  <span className="font-bold">{service}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4 text-xl font-black text-slate-950">Choose a preferred date and time</h3>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              <Calendar className="mr-1 inline h-4 w-4" /> Preferred date
            </label>
            <input
              type="date"
              min={today}
              max={maxDate}
              value={formData.date}
              onChange={(event) => updateForm('date', event.target.value)}
              className="mb-5 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100"
            />

            {formData.date && (
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  <Clock className="mr-1 inline h-4 w-4" /> Preferred time
                </label>
                {availableSlots.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-5 text-center text-slate-600">
                    The shop is closed on Sundays. Please choose another date or call {SHOP_PHONE}.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          updateForm('time', slot)
                          setStep(3)
                        }}
                        className={`rounded-xl border-2 p-3 text-center font-bold transition-all ${
                          formData.time === slot
                            ? 'border-teal-400 bg-teal-50 text-teal-800'
                            : 'border-slate-200 text-slate-700 hover:border-teal-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setStep(1)} className="mt-5 text-sm font-bold text-teal-700 hover:text-teal-900">
              ← Back to services
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-4 text-xl font-black text-slate-950">Your contact details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                <User className="mr-1 inline h-4 w-4" /> Full name *
                <input type="text" value={formData.name} onChange={(event) => updateForm('name', event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                <Phone className="mr-1 inline h-4 w-4" /> Phone *
                <input type="tel" value={formData.phone} onChange={(event) => updateForm('phone', event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                <Mail className="mr-1 inline h-4 w-4" /> Email
                <input type="email" value={formData.email} onChange={(event) => updateForm('email', event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                <Car className="mr-1 inline h-4 w-4" /> Vehicle
                <input type="text" value={formData.vehicle} onChange={(event) => updateForm('vehicle', event.target.value)} placeholder="Year, make, model" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-slate-700">
              Notes
              <textarea value={formData.notes} onChange={(event) => updateForm('notes', event.target.value)} rows={4} placeholder="Symptoms, warning lights, mileage, or questions" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setStep(2)} className="rounded-2xl border border-slate-200 px-6 py-3 font-bold text-slate-700 hover:border-teal-300">
                ← Back
              </button>
              <button
                onClick={handleRequest}
                disabled={submitting}
                className="flex-1 rounded-2xl bg-slate-950 px-6 py-3 font-extrabold text-white shadow-xl shadow-slate-200 transition-all hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? 'Sending request…' : 'Send Appointment Request'}
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              For same-day service or urgent hybrid battery help, call <a href={`tel:${SHOP_PHONE_LINK}`} className="font-bold text-teal-700">{SHOP_PHONE}</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
