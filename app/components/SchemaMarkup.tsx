import { shop, shopAddress } from '../../lib/shop'

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: shop.street,
  addressLocality: shop.city,
  addressRegion: shop.region,
  postalCode: shop.postalCode,
  addressCountry: shop.country,
}

const geo = {
  '@type': 'GeoCoordinates',
  latitude: shop.geo.latitude,
  longitude: shop.geo.longitude,
}

export default function SchemaMarkup() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: shop.name,
    image: `${shop.siteUrl}/og-image.jpg`,
    url: shop.siteUrl,
    telephone: shop.phoneE164,
    email: shop.email,
    address: postalAddress,
    geo,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: shop.hours.weekday.opens,
        closes: shop.hours.weekday.closes,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: shop.hours.saturday.opens,
        closes: shop.hours.saturday.closes,
      },
    ],
    priceRange: '$',
    areaServed: {
      '@type': 'City',
      name: shop.city,
    },
    serviceType: ['Auto Repair', ...shop.services.map((service) => service.name)],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: shop.name,
    description: `Expert auto repair in ${shop.city}, ${shop.region}. Hybrid battery specialists since 2007. Trusted mechanic for all vehicle makes and models. ${shopAddress}.`,
    url: shop.siteUrl,
    telephone: shop.phoneE164,
    address: postalAddress,
    geo,
    openingHours: [...shop.hours.schema],
    priceRange: '$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check',
    sameAs: ['https://www.google.com/maps/place/Steve\'s+Automotive+Technology'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
