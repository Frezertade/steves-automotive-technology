'use client'

import { Wrench, ClipboardCheck, Car, Battery, Droplets, Wind, Settings, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Battery,
    title: 'Hybrid Battery Repair',
    description: 'Specialized hybrid battery diagnostics, repair, and replacement. Save thousands vs dealership prices on your Prius, Camry, or other hybrid vehicle.',
    features: ['Battery Cell Replacement', 'Reconditioning', 'Warranty Available'],
  },
  {
    icon: Droplets,
    title: 'Oil & Filter Change',
    description: 'Quick, professional oil changes using high-quality synthetic and conventional oils. Includes multi-point inspection with every service.',
    features: ['Synthetic Oil', 'High-Mileage Options', '10% Off First Visit'],
  },
  {
    icon: ClipboardCheck,
    title: 'State Inspection',
    description: 'Pennsylvania state safety and emissions inspections. We identify issues before they become costly repairs, keeping you legal and safe.',
    features: ['Safety Inspection', 'Emissions Testing', 'Pre-Inspection Check'],
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
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-teal-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From routine maintenance to complex repairs, our ASE-certified technicians 
            deliver quality service for all makes and models.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                {/* Icon */}
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Vehicle Brands */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">We service all major vehicle brands</p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 font-semibold">
            {['Toyota', 'Honda', 'Ford', 'Chevy', 'BMW', 'Audi', 'Mercedes', 'Lexus', 'Subaru', 'Nissan'].map((brand) => (
              <span key={brand} className="hover:text-teal-600 transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
