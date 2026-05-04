'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Wrench } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
{ label: 'Book Appointment', href: '#booking' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className={`${isScrolled ? 'hidden' : 'block'} bg-slate-900 text-white py-2`}>
          <div className="container-custom flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:7173300041" className="flex items-center gap-2 hover:text-teal-400 transition-colors">
                <Phone className="w-4 h-4" />
                (717) 330-0041
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-gray-400">Mon-Fri: 8:30AM-5PM | Sat: 8:30AM-1PM</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isScrolled ? 'bg-teal-600' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <Wrench className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
              </div>
              <div className={isScrolled ? 'text-slate-900' : 'text-white'}>
                <div className="font-bold text-lg leading-tight">Steve's Auto</div>
                <div className="text-xs opacity-80">Technology</div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-medium hover:text-teal-500 transition-colors ${
                    isScrolled ? 'text-slate-700' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:7173300041"
                className="bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Call Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-fade-in"
        >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-slate-900 py-3 border-b border-gray-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:7173300041"
                className="mt-4 bg-teal-600 text-white text-center py-4 rounded-xl font-semibold text-lg"
              >
                Call (717) 330-0041
              </a>
            </nav>
          </div>
        )}
    </>
  )
}
