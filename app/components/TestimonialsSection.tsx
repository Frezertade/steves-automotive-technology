'use client'

import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    text: "I took my 2005 Toyota Prius to Steve after my traction battery failed. He repaired the battery at an incredibly fair price, and he saved me thousands of dollars compared to replacing the battery at a dealership. I will continue to take my car to Steve's for any repair or inspection.",
    author: 'Jeremy Metze',
    date: 'July 17, 2017',
    rating: 5,
    service: 'Hybrid Battery Repair',
  },
  {
    text: "Steve's Automotive is the only shop I trust with my vehicles. They're honest, fast, and fairly priced. The team explained everything clearly and didn't try to upsell me on services I didn't need. Highly recommend!",
    author: 'Sarah M.',
    date: 'March 2024',
    rating: 5,
    service: 'General Repair',
  },
  {
    text: "Best mechanic in Lancaster! I've been bringing my cars here for years. They diagnosed an issue that two other shops couldn't figure out. Fair pricing, great communication, and quality work every time.",
    author: 'Michael R.',
    date: 'January 2024',
    rating: 5,
    service: 'Diagnostics',
  },
  {
    text: "Quick oil change and they caught a brake issue before it became dangerous. The digital inspection report with photos was really helpful. Transparent, professional, and friendly service.",
    author: 'Lisa K.',
    date: 'February 2024',
    rating: 5,
    service: 'Oil Change & Inspection',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80')`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-teal-400">Customers Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real reviews from real customers in Lancaster County
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div
            key={current}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 transition-all duration-300"
          >
              <Quote className="w-10 h-10 text-teal-400 mb-6" />
              
              <p className="text-lg md:text-xl text-white leading-relaxed mb-8">
                "{testimonials[current].text}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-lg">
                    {testimonials[current].author}
                  </p>
                  <p className="text-teal-400 text-sm">
                    {testimonials[current].service} • {testimonials[current].date}
                  </p>
                </div>

                <div className="flex gap-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === current ? 'bg-teal-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
