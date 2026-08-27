import type { Metadata } from 'next'
import ServiceDetail from '../../components/ServiceDetail'
import { shop } from '../../../lib/shop'

export const metadata: Metadata = {
  title: 'Brake Service Lancaster PA',
  description:
    `Brake inspection, pads, rotors, and fluid service at ${shop.name} in ${shop.city}, ${shop.region} — including hybrid brake systems. Call ${shop.phone}.`,
  alternates: { canonical: '/services/brakes' },
}

export default function BrakesPage() {
  return (
    <ServiceDetail
      badge="Brake service · hybrid-aware"
      title="Brake repair that"
      accent="respects hybrid systems"
      lede="Pad replacement, rotor service, and fluid flushes for conventional and hybrid vehicles. Regenerative braking changes how a hybrid pedal feels — we inspect the hydraulic system and the electronics, not just the pads."
      bookLabel="Book Brake Service"
      defaultService="Brake Repair"
      highlights={[
        {
          title: 'Inspection first',
          body: 'Pad thickness, rotor condition, fluid, and warning lights. On hybrids we also check how regenerative braking and the hydraulic circuit are sharing the stop.',
        },
        {
          title: 'Pads, rotors, fluid',
          body: 'Pad replacement, rotor resurfacing or replacement when needed, and brake fluid service. We recommend what the vehicle needs — not a menu upsell.',
        },
        {
          title: 'Inspection-ready stops',
          body: 'Weak brakes fail a PA safety inspection. If you are already here for a sticker, we can inspect brakes in the same visit when the schedule allows.',
        },
      ]}
      process={[
        {
          title: 'Describe the symptoms',
          body: `Squeal, grind, pull, a soft pedal, or a brake warning light. Call ${shop.phone} or book below with year, make, model, and mileage.`,
        },
        {
          title: 'Measure, don’t guess',
          body: 'We inspect pads, rotors, hoses, and fluid. Hybrid vehicles get an extra look at the regen/hydraulic split so we do not “fix” a pedal feel that is actually the hybrid system.',
        },
        {
          title: 'Repair and road-test',
          body: 'Approved work is completed, then road-tested. You leave with a clear report of what was replaced and what still has life.',
        },
      ]}
      faqs={[
        {
          question: 'What are signs I need brake service?',
          answer:
            'Squealing or grinding, a vibrating pedal, longer stopping distances, a brake or ABS light, or a spongy pedal. Hybrids can also hide wear because regenerative braking does some of the work — an inspection still matters.',
        },
        {
          question: 'Do you service hybrid brakes?',
          answer:
            'Yes. Steve’s is a hybrid-battery specialist shop, and we service hybrid brake systems — pads, rotors, fluid, and the interaction with regenerative braking — not a generic pad-slap.',
        },
        {
          question: 'Do I always need new rotors with pads?',
          answer:
            'Not always. We measure rotor thickness and condition. Resurface when it is still in spec; replace when it is not. You approve the work before it starts.',
        },
        {
          question: 'Can brakes be done the same day?',
          answer:
            `Often, depending on parts and bay time. Call ${shop.phone}. Hours are ${shop.hours.summary}.`,
        },
        {
          question: 'Will bad brakes fail my PA inspection?',
          answer:
            'Yes. Safety inspection includes brakes. If you need both, book inspection and mention brake concerns so we can inspect them together.',
        },
      ]}
    />
  )
}
