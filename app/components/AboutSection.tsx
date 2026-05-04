'use client'

import { MapPin, Clock, Phone, CheckCircle } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-teal-200">Steve's Auto</span>
            </h2>
            
            <p className="text-teal-100 text-lg mb-6 leading-relaxed">
              Since 2007, Steve's Automotive Technology has been Lancaster County's trusted source for 
              dependable, honest auto repair. We specialize in hybrid battery repair and maintenance, 
              saving our customers thousands compared to dealership prices.
            </p>

            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              Our team of ASE-certified technicians brings decades of combined experience to every repair. 
              From routine oil changes to complex engine diagnostics, we treat every vehicle as if it were our own.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                'ASE-Certified Technicians',
                'State-of-the-Art Diagnostic Equipment',
                'Hybrid Battery Specialists',
                'Transparent Pricing - No Hidden Fees',
                'Same-Day Service Available',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-200 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6">
              <a href="tel:7173300041" className="flex items-center gap-2 text-white hover:text-teal-200 transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(717) 330-0041</span>
              </a>
              <div className="flex items-center gap-2 text-teal-100">
                <MapPin className="w-5 h-5" />
                <span>Lancaster, PA</span>
              </div>
            </div>
          </div>

          {/* Team Member Card */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                  alt="Getachew Hirpo - Office Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Getachew Hirpo</h3>
                <p className="text-teal-600 font-medium mb-3">Office Manager</p>
                <p className="text-gray-600 text-sm">
                  Ensuring every customer receives exceptional service and transparent communication 
                  throughout their repair experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
