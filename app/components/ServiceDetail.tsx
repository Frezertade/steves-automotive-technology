import Image from 'next/image'
import { Phone, Calendar, ArrowRight, CheckCircle, Quote } from 'lucide-react'
import AppointmentBooking from './AppointmentBooking'
import { shop, shopTelHref } from '../../lib/shop'

export type ServiceFaq = { question: string; answer: string }
export type ServiceBlock = { title: string; body: string }

export type ServiceDetailProps = {
  badge: string
  title: string
  accent?: string
  lede: string
  bookLabel: string
  defaultService: string
  highlights: ServiceBlock[]
  process: ServiceBlock[]
  faqs: ServiceFaq[]
  makes?: string[]
  featuredQuote?: { text: string; author: string; date?: string }
  money?: boolean
}

export default function ServiceDetail({
  badge,
  title,
  accent,
  lede,
  bookLabel,
  defaultService,
  highlights,
  process,
  faqs,
  makes,
  featuredQuote,
  money = false,
}: ServiceDetailProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className={`relative overflow-hidden pt-36 text-white md:pt-40 ${money ? 'bg-[#05070A]' : 'bg-[#0B1120]'}`}>
        {money && (
          <>
            <div className="absolute inset-0 hidden opacity-35 lg:block" aria-hidden="true">
              <Image
                src="/media/hybrid-battery-diagnostic-poster.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(16,245,212,0.18),transparent_34%),linear-gradient(90deg,#05070A_0%,rgba(5,7,10,0.94)_42%,rgba(5,7,10,0.72)_100%)]" />
            </div>
            <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
          </>
        )}

        <div className="container-custom relative z-10 pb-16 md:pb-20">
          <div className={`grid items-center gap-10 ${money ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-teal-200">
                <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_14px_#10F5D4]" />
                {badge}
              </div>
              <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
                {title}{' '}
                {accent ? (
                  <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                    {accent}
                  </span>
                ) : null}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D8F3F1]">{lede}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={shopTelHref}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-teal-300 px-7 py-4 text-lg font-extrabold text-slate-950 shadow-[0_0_34px_rgba(16,245,212,0.35)] transition-all hover:-translate-y-1 hover:bg-white"
                >
                  <Phone className="h-5 w-5" />
                  Call {shop.phone}
                </a>
                <a
                  href="#book"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-teal-200/60"
                >
                  <Calendar className="h-5 w-5 text-teal-200" />
                  {bookLabel}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            {money && (
              <div className="relative hidden lg:block">
                <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#0B1120]/78 p-3 shadow-2xl shadow-teal-950/50 backdrop-blur-xl">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[1.45rem]">
                    <Image
                      src="/media/hybrid-battery-diagnostic-poster.jpg"
                      alt="Hybrid battery diagnostic visualization at Steve's Automotive Technology"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#EAF7F8]">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="premium-card p-7">
                <h2 className="mb-3 text-2xl font-black tracking-[-0.035em] text-slate-950">{item.title}</h2>
                <p className="leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-teal-700">How it works</p>
          <h2 className="mb-10 text-4xl font-black tracking-[-0.05em] text-slate-950">A specialist process, not a guess</h2>
          <ol className="space-y-6">
            {process.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-teal-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {featuredQuote && (
        <section className="bg-[#0B1120] py-16 text-white">
          <div className="container-custom max-w-3xl">
            <Quote className="mb-6 h-10 w-10 text-teal-300" />
            <blockquote className="text-xl leading-8 text-[#D8F3F1]">“{featuredQuote.text}”</blockquote>
            <p className="mt-6 font-black text-white">{featuredQuote.author}</p>
            {featuredQuote.date ? <p className="text-sm text-teal-200">{featuredQuote.date}</p> : null}
          </div>
        </section>
      )}

      {makes && makes.length > 0 && (
        <section className="bg-[#EAF7F8] py-12">
          <div className="container-custom text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Common hybrid platforms we diagnose</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-black text-slate-500">
              {makes.map((make) => (
                <span key={make}>{make}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="book" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-slate-950 md:text-4xl">Book this service</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Send a preferred date and time, or call {shop.phone} for the fastest confirmation.
            </p>
          </div>
          <AppointmentBooking defaultService={defaultService} />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="mb-8 text-3xl font-black tracking-[-0.05em] text-slate-950">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="premium-card p-6">
                <summary className="cursor-pointer list-none text-lg font-black text-slate-950">{faq.question}</summary>
                <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white">
        <div className="container-custom flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="flex items-center gap-2 text-lg font-bold">
            <CheckCircle className="h-5 w-5 text-teal-300" />
            Same shop, specialist answers — Lancaster & Millersville
          </p>
          <a
            href={shopTelHref}
            className="inline-flex items-center gap-2 rounded-2xl bg-teal-300 px-6 py-3 font-black text-slate-950 hover:bg-white"
          >
            <Phone className="h-5 w-5" />
            {shop.phone}
          </a>
        </div>
      </section>
    </article>
  )
}
