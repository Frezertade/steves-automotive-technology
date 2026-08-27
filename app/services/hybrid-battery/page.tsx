import type { Metadata } from 'next'
import ServiceDetail from '../../components/ServiceDetail'

export const metadata: Metadata = {
  title: 'Hybrid Battery Repair Lancaster PA',
  description:
    "Diagnose, recondition, or replace a hybrid battery at Steve's Automotive Technology in Lancaster, PA — typically thousands less than a dealer pack. Call (717) 330-0041.",
  alternates: { canonical: '/services/hybrid-battery' },
}

export default function HybridBatteryPage() {
  return (
    <ServiceDetail
      money
      badge="Lancaster hybrid battery lab"
      title="Hybrid battery repair"
      accent="without dealer pack prices"
      lede="Steve's Automotive Technology diagnoses hybrid packs first, reconditions modules when they still have life, and replaces only when the pack is beyond repair. Local shop care for Lancaster and Millersville drivers since 2007."
      bookLabel="Book Hybrid Diagnostic"
      defaultService="Hybrid Battery Diagnostic"
      highlights={[
        {
          title: 'Diagnostics first',
          body: 'We test warning lights, pack capacity, and module balance before anyone talks replacement. Codes and symptoms — not a parts-counter guess — decide the path.',
        },
        {
          title: 'Reconditioning',
          body: 'When cells and modules can be restored, we recondition the pack so a healthy battery stays in service. Replacement is quoted only after the diagnostic says it is needed.',
        },
        {
          title: 'Replacement, not a dealer invoice',
          body: 'If the pack is beyond repair, replacement is typically thousands less than a dealer pack quote. We do not invent a price without year, make, model, mileage, and a test.',
        },
      ]}
      process={[
        {
          title: 'Call or book a diagnostic',
          body: 'Share year, make, model, mileage, and what the dash shows. Call (717) 330-0041 or use the form on this page. Hours: Mon–Fri 8:30 AM–5:00 PM, Sat 8:30 AM–1:00 PM, Sunday closed.',
        },
        {
          title: 'Test the pack',
          body: 'We scan hybrid and powertrain codes, measure capacity, and check module balance so the recommendation is specific to your vehicle — not a generic “replace the battery” script.',
        },
        {
          title: 'Recondition or replace',
          body: 'You get a clear recommendation: restore the pack when it still has life, or replace it when it does not. Warranty options are explained before any repair starts.',
        },
      ]}
      makes={['Toyota Prius', 'Camry Hybrid', 'Lexus hybrid', 'Honda Insight', 'Highlander Hybrid', 'Other hybrids']}
      featuredQuote={{
        text: "I took my 2005 Toyota Prius to Steve after my traction battery failed. He repaired the battery at an incredibly fair price, and he saved me thousands of dollars compared to replacing the battery at a dealership. I will continue to take my car to Steve's for any repair or inspection.",
        author: 'Jeremy Metze',
        date: 'July 17, 2017 · Hybrid Battery Repair',
      }}
      faqs={[
        {
          question: 'How do I know my hybrid battery is failing?',
          answer:
            'Common signs include a hybrid-system or check-engine light, reduced fuel economy, sluggish acceleration, a battery cooling fan that runs often, or codes such as P0A80. A diagnostic at Steve’s is the right first step — we do not replace a pack on symptoms alone.',
        },
        {
          question: 'Can you recondition the battery instead of replacing it?',
          answer:
            'Often yes. After we test capacity and module balance, we recondition packs that can still hold service. Replacement is recommended only when the pack is beyond repair.',
        },
        {
          question: 'How much cheaper is this than the dealer?',
          answer:
            'Hybrid battery work here is typically thousands less than a dealer pack quote. We will not guess a dollar amount without your year/make/model, mileage, warning lights, and a diagnostic. Call (717) 330-0041 with those details.',
        },
        {
          question: 'Which hybrids do you work on?',
          answer:
            'Prius, Camry Hybrid, Lexus hybrids, Honda Insight, and other hybrid platforms common in Lancaster County. Bring the vehicle or call with the year, make, and model.',
        },
        {
          question: 'Do you offer a warranty?',
          answer:
            'Warranty options are available on hybrid battery work. Coverage is explained before the repair — we do not bury terms after the fact.',
        },
        {
          question: 'Where is the shop and when are you open?',
          answer:
            '1027 Dillerville Rd #16, Lancaster, PA 17603, serving Lancaster and Millersville. Monday–Friday 8:30 AM–5:00 PM, Saturday 8:30 AM–1:00 PM, Sunday closed. Call (717) 330-0041.',
        },
      ]}
    />
  )
}
