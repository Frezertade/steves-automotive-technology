'use client'

import { Award, Wrench, Shield, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Highly Skilled Technicians',
    description: 'Our ASE-certified technicians undergo continuous training to stay ahead of the latest automotive technology and repair techniques.',
    cta: 'Meet the Team',
    href: '#about',
  },
  {
    icon: Wrench,
    title: 'Experts of Our Craft',
    description: 'Since 2007, we\'ve built our reputation on quality workmanship, honest pricing, and exceptional customer service in Lancaster County.',
    cta: 'Make An Appointment',
    href: '#contact',
  },
  {
    icon: Shield,
    title: 'We Take On Challenges',
    description: 'From routine maintenance to complex hybrid battery repairs, we have the expertise and equipment to handle any automotive challenge.',
    cta: 'Get In Touch',
    href: '#contact',
  },
]

export default function TrustSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            You Can <span className="text-teal-600">Trust Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to specialize in Auto Repair. As the premier auto repair shop in Lancaster and Millersville, 
            we deliver dependable, trustworthy service every time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* CTA */}
                <a
                  href={feature.href}
                  className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  {feature.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '17+', label: 'Years Experience' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '50+', label: 'Vehicle Models' },
            { number: '100%', label: 'Satisfaction Guarantee' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
