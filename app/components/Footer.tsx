'use client'

import Link from 'next/link'
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Steve's Auto</div>
                <div className="text-xs text-gray-400">Technology</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Trusted auto repair in Lancaster, PA since 2007. Hybrid battery specialists 
              serving Lancaster & Millersville.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Hybrid Battery Repair', href: '/services/hybrid-battery' },
                { label: 'Oil & Filter Change', href: '/#services' },
                { label: 'Brake Service', href: '/services/brakes' },
                { label: 'State Inspection', href: '/services/inspection' },
                { label: 'A/C Repair', href: '/#services' },
                { label: 'Engine Diagnostics', href: '/#services' },
              ].map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/#about' },
                { label: 'Our Services', href: '/#services' },
                { label: 'Book Appointment', href: '/#booking' },
                { label: 'Privacy Policy', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  1027 Dillerville Rd #16<br />
                  Lancaster, PA 17603
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a href="tel:7173300041" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                  (717) 330-0041
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a href="mailto:stevesautotech@gmail.com" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                  stevesautotech@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Steve's Automotive Technology. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built by <a href="https://aetherisinnovations.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">Aetheris Innovations</a> — AI-Powered Business Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
