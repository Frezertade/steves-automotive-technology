'use client'

import Link from 'next/link'
import { ClipboardCheck, Car, Battery, Droplets, Wind, Settings, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Battery,
    title: 'Hybrid Battery Repair',
    description: 'Specialized hybrid battery diagnostics, repair, reconditioning, and replacement. Save thousands vs dealership prices on Prius, Camry, Lexus, and other hybrids.',
    features: ['Cell Replacement', 'Reconditioning', 'Warranty Available'],
    featured: true,
    href: '/services/hybrid-battery',
    cta: 'View hybrid battery repair',
  },
  {
    icon: Droplets,
    title: 'Oil & Filter Change',
    description: 'Quick, professional oil changes using high-quality synthetic and conventional oils. Includes a multi-point inspection with every service.',
    features: ['Synthetic Oil', 'High-Mileage Options', '10% Off First Visit'],
  },
  {
    icon: ClipboardCheck,
    title: 'State Inspection',
    description: 'Pennsylvania state safety and emissions inspections. We identify issues before they become costly repairs, keeping you legal and safe.',
    features: ['Safety Inspection', 'Emissions Testing', 'Pre-Inspection Check'],
    href: '/services/inspection',
    cta: 'View inspection details',
  },
  {
    icon: Wind,
    title: 'A/C Repair',
    description: 'Complete air conditioning service from recharge to full system repair. Stay cool during Lancaster\'s hot summers.',
    features: ['Recharge Service', 'Leak Detection', 'Compressor Repair'],
  },
  {
    icon: Car,
    title: 'Brake Service',
    description: 'Expert brake inspection, pad replacement, rotor resurfacing, and full brake system repairs for all vehicle makes and models.',
    features: ['Pad Replacement', 'Rotor Service', 'Fluid Flush'],
    href: '/services/brakes',
    cta: 'View brake service',
  },
  {
    icon: Settings,
    title: 'Engine Diagnostics',
    description: 'Advanced computer diagnostics to identify check engine lights, performance issues, and underlying problems quickly and accurately.',
    features: ['Computer Scan', 'Performance Testing', 'Repair Estimate'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[#EAF7F8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-teal-500/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-teal-700">
            Precision repair services
          </div>
          <h2 className="text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl md:text-6xl">
            Advanced service for modern vehicles
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            From hybrid battery diagnostics to routine maintenance, our ASE-certified technicians deliver clear answers and quality repairs for Lancaster County drivers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className={`premium-card h-full p-7 ${service.featured ? 'diagnostic-border bg-slate-950 text-white shadow-2xl shadow-teal-950/20' : ''}`}>
                {/* Icon */}
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
                  service.featured
                    ? 'bg-teal-300 text-slate-950 shadow-[0_0_26px_rgba(16,245,212,0.35)]'
                    : 'bg-slate-950 text-teal-300 group-hover:bg-teal-300 group-hover:text-slate-950'
                }`}>
                  <service.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className={`mb-3 text-2xl font-black tracking-[-0.035em] ${service.featured ? 'text-white' : 'text-slate-950'}`}>
                  {service.title}
                </h3>
                <p className={`mb-6 leading-relaxed ${service.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-sm font-semibold ${service.featured ? 'text-teal-100' : 'text-slate-600'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${service.featured ? 'bg-teal-300 shadow-[0_0_10px_#10F5D4]' : 'bg-teal-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={service.href || '/#booking'}
                  className={`inline-flex items-center gap-2 font-black transition-colors ${service.featured ? 'text-teal-200 hover:text-white' : 'text-teal-700 hover:text-slate-950'}`}
                >
                  {service.cta || 'Get a Quote'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Vehicle Brands */}
        <div className="mt-16 rounded-[2rem] border border-white/70 bg-white/70 p-6 text-center shadow-xl shadow-slate-950/[0.04] backdrop-blur">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">We service all major vehicle brands</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-black text-slate-400">
            {['Toyota', 'Honda', 'Ford', 'Chevy', 'BMW', 'Audi', 'Mercedes', 'Lexus', 'Subaru', 'Nissan'].map((brand) => (
              <span key={brand} className="transition-colors hover:text-teal-700">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
