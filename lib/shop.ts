export const shop = {
  name: "Steve's Automotive Technology",
  shortName: "Steve's Auto",
  phone: '(717) 330-0041',
  phoneTel: '7173300041',
  phoneE164: '+17173300041',
  email: 'stevesautotech@gmail.com',
  siteUrl: 'https://stevesautomotivetechnology.com',
  street: '1027 Dillerville Rd #16',
  city: 'Lancaster',
  region: 'PA',
  postalCode: '17603',
  country: 'US',
  areas: ['Lancaster', 'Millersville'] as const,
  geo: {
    latitude: 40.0583,
    longitude: -76.3234,
  },
  hours: {
    weekday: {
      label: 'Monday - Friday',
      time: '8:30 AM - 5:00 PM',
      opens: '08:30',
      closes: '17:00',
    },
    saturday: {
      label: 'Saturday',
      time: '8:30 AM - 1:00 PM',
      opens: '08:30',
      closes: '13:00',
    },
    sunday: {
      label: 'Sunday',
      time: 'Closed',
    },
    summary: 'Monday–Friday 8:30 AM–5:00 PM, Saturday 8:30 AM–1:00 PM, Sunday closed',
    nav: 'Mon-Fri: 8:30AM-5PM | Sat: 8:30AM-1PM',
    chat: 'Mon-Fri 8:30-5',
    schema: ['Mo-Fr 08:30-17:00', 'Sa 08:30-13:00'] as const,
  },
  services: [
    { name: 'Hybrid Battery Repair', href: '/services/hybrid-battery' },
    { name: 'Oil & Filter Change', href: '/#services' },
    { name: 'Brake Service', href: '/services/brakes' },
    { name: 'State Inspection', href: '/services/inspection' },
    { name: 'A/C Repair', href: '/#services' },
    { name: 'Engine Diagnostics', href: '/#services' },
  ] as const,
  bookingServices: [
    'Hybrid Battery Diagnostic',
    'Hybrid Battery Repair',
    'Oil Change',
    'PA State Inspection',
    'Brake Repair',
    'A/C Repair',
    'Engine Diagnostics',
    'General Service',
  ] as const,
  contactServices: [
    'Oil Change',
    'Hybrid Battery Repair',
    'Brake Service',
    'State Inspection',
    'A/C Repair',
    'Engine Diagnostics',
    'General Repair',
    'Other',
  ] as const,
} as const

export const shopAddress = `${shop.street}, ${shop.city}, ${shop.region} ${shop.postalCode}`
export const shopTelHref = `tel:${shop.phoneTel}`
export const shopMailtoHref = `mailto:${shop.email}`
export const shopMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`
