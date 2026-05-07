'use client'

import { Phone, Calendar, ArrowRight, BatteryCharging, BadgeCheck, MapPin, Gauge, ShieldCheck } from 'lucide-react'

const proofPoints = [
  { icon: BatteryCharging, label: 'Hybrid Battery Specialists' },
  { icon: BadgeCheck, label: 'Trusted Since 2007' },
  { icon: ShieldCheck, label: 'Warranty Options Available' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070A] pt-32 text-white lg:pt-28">
      {/* Cinematic video background */}
      <div className="absolute inset-0 opacity-45">
        <video
          className="h-full w-full object-cover"
          src="/media/hybrid-battery-diagnostic-loop.mp4"
          poster="/media/hybrid-battery-diagnostic-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(16,245,212,0.18),transparent_34%),linear-gradient(90deg,#05070A_0%,rgba(5,7,10,0.92)_38%,rgba(5,7,10,0.52)_100%)]" />
      </div>

      {/* Tech pattern overlays */}
      <div className="absolute inset-0 hero-grid opacity-60" aria-hidden="true" />
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10 flex min-h-[calc(100vh-7rem)] items-center py-14">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="max-w-3xl animate-fade-in text-left">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-teal-200 shadow-[0_0_35px_rgba(16,245,212,0.16)]">
              <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_14px_#10F5D4]" />
              Lancaster Hybrid Diagnostic Lab
            </div>

            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-8xl">
              Hybrid Battery Repair{' '}
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                Without Dealership Prices
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#D8F3F1] sm:text-xl">
              Steve's Automotive Technology helps Lancaster and Millersville drivers diagnose, recondition,
              and replace hybrid batteries with honest guidance, advanced testing, and local-shop care.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:7173300041"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-teal-300 px-7 py-4 text-lg font-extrabold text-slate-950 shadow-[0_0_34px_rgba(16,245,212,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_46px_rgba(16,245,212,0.5)] active:translate-y-0"
              >
                <Phone className="h-5 w-5" />
                Call (717) 330-0041
              </a>

              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-200/60 hover:bg-white/15 active:translate-y-0"
              >
                <Calendar className="h-5 w-5 text-teal-200" />
                Book Hybrid Diagnostic
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-slate-100 backdrop-blur-md">
                  <item.icon className="h-5 w-5 shrink-0 text-teal-300" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Video presentation panel */}
          <div className="relative lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-300/20 via-sky-400/10 to-transparent blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0B1120]/78 p-3 shadow-2xl shadow-teal-950/50 backdrop-blur-xl">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.45rem] bg-slate-950">
                <video
                  className="h-full w-full object-cover"
                  src="/media/hybrid-battery-diagnostic-loop.mp4"
                  poster="/media/hybrid-battery-diagnostic-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Decorative 3D-style hybrid battery diagnostic animation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-teal-200/25 bg-slate-950/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-100 backdrop-blur-md">
                  Live Diagnostic Visual
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['98.7%', 'Cell Balance'],
                    ['17+', 'Years Trusted'],
                    ['PA', 'Inspection Ready'],
                  ].map(([number, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/62 p-3 backdrop-blur-md">
                      <div className="text-2xl font-black text-white">{number}</div>
                      <div className="text-xs uppercase tracking-[0.14em] text-teal-100/75">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-8 hidden rounded-2xl border border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm font-semibold text-amber-100 backdrop-blur-xl lg:flex lg:items-center lg:gap-3">
              <Gauge className="h-5 w-5 text-amber-300" />
              Save thousands vs dealership replacement quotes
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/45 md:flex">
        <MapPin className="h-4 w-4 text-teal-300" />
        Lancaster & Millersville, PA
      </div>
    </section>
  )
}
