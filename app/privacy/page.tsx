import type { Metadata } from 'next'
import { Phone } from 'lucide-react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "How Steve's Automotive Technology in Lancaster, PA handles appointment requests and optional chat. We do not sell personal data. Call (717) 330-0041.",
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: 'Appointment requests',
    body: 'When you book online or send a callback request, we collect the details you submit — typically name, phone number, optional email, vehicle, service needed, preferred date and time, and notes. We use that information only to record the request, contact you about the appointment, and follow up on the repair. Requests may be stored on our server and emailed to stevesautotech@gmail.com when email delivery is configured.',
  },
  {
    title: 'Optional chat',
    body: 'The shop chat widget on this site is optional. If you use it, the message you type is sent to our chat service so we can answer questions about hybrid battery work, hours, and how to book. Do not send payment card numbers in chat. You can skip chat entirely and call (717) 330-0041 instead.',
  },
  {
    title: 'No sale of personal data',
    body: 'Steve’s Automotive Technology does not sell personal data. We do not rent, trade, or share appointment or chat information with data brokers. We may use trusted processors (for example email delivery) only to operate this site and respond to you.',
  },
]

export default function PrivacyPage() {
  return (
    <article>
      <section className="relative overflow-hidden bg-[#05070A] pt-36 text-white md:pt-40">
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <div className="container-custom relative z-10 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_14px_#10F5D4]" />
              Lancaster, PA shop
            </div>
            <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Privacy{' '}
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                policy
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D8F3F1]">
              Steve’s Automotive Technology at 1027 Dillerville Rd #16, Lancaster, PA 17603 collects only what we need
              to answer you and schedule work. We do not sell personal data.
            </p>
            <a
              href="tel:7173300041"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-teal-300 px-7 py-4 text-lg font-extrabold text-slate-950 shadow-[0_0_34px_rgba(16,245,212,0.35)] transition-all hover:-translate-y-1 hover:bg-white"
            >
              <Phone className="h-5 w-5" />
              Call (717) 330-0041
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#EAF7F8]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Updated August 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="premium-card p-6 md:p-8">
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#07111F]">{section.title}</h2>
              <p className="mt-3 leading-7 text-[#334155]">{section.body}</p>
            </div>
          ))}
          <p className="text-sm leading-6 text-slate-600">
            Questions about this policy: email{' '}
            <a href="mailto:stevesautotech@gmail.com" className="font-semibold text-teal-800 hover:text-teal-950">
              stevesautotech@gmail.com
            </a>{' '}
            or call (717) 330-0041.
          </p>
        </div>
      </section>
    </article>
  )
}
