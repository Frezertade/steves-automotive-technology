'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Wrench } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
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
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-200/70 bg-white/94 shadow-lg shadow-slate-950/5 backdrop-blur-xl'
            : 'border-b border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/35 backdrop-blur-xl'
        }`}
      >
        {/* Top Bar */}
        <div className={`${isScrolled ? 'hidden' : 'block'} border-b border-white/10 bg-slate-950/80 py-2 text-white backdrop-blur-xl`}>
          <div className="container-custom flex items-center justify-between text-sm">
            <a href="tel:7173300041" className="flex items-center gap-2 font-semibold text-teal-100 transition-colors hover:text-teal-300">
              <Phone className="h-4 w-4 text-teal-300" />
              (717) 330-0041
            </a>
            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-slate-300">Mon-Fri: 8:30AM-5PM | Sat: 8:30AM-1PM</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
                isScrolled
                  ? 'border-slate-200 bg-slate-950 text-teal-300 shadow-lg shadow-slate-950/10'
                  : 'border-white/15 bg-white/10 text-teal-200 shadow-[0_0_24px_rgba(16,245,212,0.14)] backdrop-blur-md'
              }`}>
                <Wrench className="h-5 w-5" />
              </div>
              <div className={isScrolled ? 'text-slate-950' : 'text-white'}>
                <div className="text-lg font-black leading-tight tracking-[-0.03em]">Steve's Auto</div>
                <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${isScrolled ? 'text-slate-500' : 'text-teal-100/75'}`}>Technology</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden items-center gap-2 rounded-2xl border px-2 py-2 md:flex ${
              isScrolled
                ? 'border-slate-200 bg-white/80 shadow-sm shadow-slate-950/5'
                : 'border-white/20 bg-white/95 shadow-[0_18px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl'
            }`}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-xl px-3.5 py-2 text-sm font-black tracking-[-0.01em] transition-all ${
                    isScrolled
                      ? 'text-slate-800 hover:bg-slate-100 hover:text-teal-700'
                      : 'text-slate-950 hover:bg-slate-950 hover:text-teal-200'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:7173300041"
                className="rounded-2xl bg-teal-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Call Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`rounded-xl border p-2 md:hidden ${
                isScrolled
                  ? 'border-slate-200 bg-white text-slate-950'
                  : 'border-white/15 bg-slate-950/70 text-white shadow-lg shadow-slate-950/30 backdrop-blur-xl'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 px-6 pt-28 text-white animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/10 py-3 text-2xl font-semibold text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:7173300041"
              className="mt-4 rounded-2xl bg-teal-300 py-4 text-center text-lg font-black text-slate-950"
            >
              Call (717) 330-0041
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
