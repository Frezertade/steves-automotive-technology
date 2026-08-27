import { Quote, Star } from 'lucide-react'

const sourcedComments = [
  {
    text: "I took my 2005 Toyota Prius to Steve after my traction battery failed. He repaired the battery at an incredibly fair price, and he saved me thousands of dollars compared to replacing the battery at a dealership. I will continue to take my car to Steve's for any repair or inspection.",
    author: 'Jeremy Metze',
    date: 'July 17, 2017',
    rating: 5,
    service: 'Hybrid Battery Repair',
  },
]

export default function TestimonialsSection() {
  const comment = sourcedComments[0]

  return (
    <section id="comments" className="section-padding relative overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80')`,
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-teal-300">Sourced review</p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Customer <span className="text-teal-400">comments</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            We publish named comments we can source. This hybrid-battery review is from Jeremy Metze — we do not invent five-star names to fill a carousel.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <blockquote className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:p-12">
            <Quote className="mb-6 h-10 w-10 text-teal-400" aria-hidden="true" />
            <p className="mb-8 text-lg leading-relaxed text-white md:text-xl">“{comment.text}”</p>
            <footer className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <cite className="text-lg font-semibold not-italic text-white">{comment.author}</cite>
                <p className="text-sm text-teal-400">
                  {comment.service} • {comment.date}
                </p>
              </div>
              <p className="flex gap-1" aria-label={`${comment.rating} out of 5 stars`}>
                {Array.from({ length: comment.rating }, (_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
