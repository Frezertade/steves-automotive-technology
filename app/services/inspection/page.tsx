import type { Metadata } from 'next'
import ServiceDetail from '../../components/ServiceDetail'
import { shop, shopAddress } from '../../../lib/shop'

export const metadata: Metadata = {
  title: 'PA State Inspection Lancaster',
  description:
    `Pennsylvania safety and emissions inspections at ${shop.name}, ${shop.street}, ${shop.city}. Call ${shop.phone}.`,
  alternates: { canonical: '/services/inspection' },
}

export default function InspectionPage() {
  return (
    <ServiceDetail
      badge="Pennsylvania inspection station"
      title="PA state inspection"
      accent="done right the first time"
      lede="Safety and emissions inspections for Lancaster and Millersville drivers. We flag issues before they become failed stickers or roadside surprises — including hybrid systems other shops skip."
      bookLabel="Book Inspection"
      defaultService="PA State Inspection"
      highlights={[
        {
          title: 'Safety inspection',
          body: 'Lights, brakes, tires, steering, and the rest of the PA safety checklist. We tell you what actually fails — not a padded list of extras.',
        },
        {
          title: 'Emissions testing',
          body: 'On-board diagnostics and emissions inspection for vehicles that require it. If a hybrid or check-engine light will fail you, we diagnose the cause instead of sending you in circles.',
        },
        {
          title: 'Pre-inspection check',
          body: 'Ask for a pre-check if you already suspect a light, tire, or brake issue. Combining inspection with hybrid battery or brake work keeps you on one visit when the bay allows.',
        },
      ]}
      process={[
        {
          title: 'Get on the schedule',
          body: `Call ${shop.phone} or book a preferred time below. Hours: ${shop.hours.summary}.`,
        },
        {
          title: 'Inspect to the PA list',
          body: 'We run the required safety and emissions items and document what passes or fails. Hybrid warning lights are treated as diagnostic work, not a mystery “come back later.”',
        },
        {
          title: 'Repair only what you need',
          body: 'If something fails, you get a clear estimate. Approve the work, get the sticker when the vehicle is legal, or decline — no hidden fees.',
        },
      ]}
      faqs={[
        {
          question: 'Do you perform both safety and emissions inspections?',
          answer:
            `Yes. ${shop.name} handles Pennsylvania state safety and emissions inspections at ${shopAddress}.`,
        },
        {
          question: 'What if my vehicle fails?',
          answer:
            'We explain the failing items and quote the repair. You can have us fix it, or take the report and decide. Hybrid-related fail items can often be diagnosed in the same shop.',
        },
        {
          question: 'Do I need an appointment?',
          answer:
            `Appointments keep the wait down, especially on Saturdays (open ${shop.hours.saturday.time}). Call ${shop.phone} for same-day availability or use the booking form.`,
        },
        {
          question: 'Can I combine inspection with hybrid battery or brake work?',
          answer:
            'Yes. If a warning light or brake issue will fail the inspection, tell us when you book so we can plan diagnostic time — not just the sticker.',
        },
        {
          question: 'Where are you located?',
          answer:
            `${shopAddress}, serving ${shop.areas.join(' and ')}. Call ${shop.phone}.`,
        },
      ]}
    />
  )
}
