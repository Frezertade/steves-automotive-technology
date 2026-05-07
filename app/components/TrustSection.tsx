'use client'

import { Award, Wrench, Shield, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'ASE-Certified Expertise',
    description: 'Our technicians keep pace with modern vehicle systems, hybrid battery testing, and advanced diagnostic workflows.',
    cta: 'Meet the Team',
    href: '#about',
  },
  {
    icon: Wrench,
    title: 'Transparent Repair Process',
    description: 'Since 2007, Steve\'s Automotive Technology has built trust through clear estimates, honest communication, and quality workmanship.',
    cta: 'Make An Appointment',
    href: '#booking',
  },
  {
    icon: Shield,
    title: 'Hybrid Challenges Welcome',
    description: 'From failing cells to complex warning lights, we use specialized equipment to diagnose the problem before replacing expensive parts.',
    cta: 'Get In Touch',
    href: '#booking',
  },
]

export default function TrustSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-teal-500/20 bg-teal-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-teal-700">
            Trusted specialist care
          </div>
          <h2 className="text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl md:text-6xl">
            You Can Trust Us
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            We combine local-service honesty with advanced automotive technology, giving Lancaster and Millersville drivers a smarter alternative to dealership repair pricing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="premium-card h-full p-8">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-teal-300 transition-colors duration-300 group-hover:bg-teal-300 group-hover:text-slate-950">
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-black tracking-[-0.035em] text-slate-950">
                  {feature.title}
                </h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  {feature.description}
                </p>

                {/* CTA */}
                <a
                  href={feature.href}
                  className="inline-flex items-center gap-2 font-black text-teal-700 transition-colors hover:text-slate-950"
                >
                  {feature.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { number: '17+', label: 'Years Experience' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '50+', label: 'Vehicle Models' },
            { number: '100%', label: 'Satisfaction Focus' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/10">
              <div className="mb-2 text-4xl font-black tracking-[-0.05em] text-teal-300 sm:text-5xl">
                {stat.number}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
