export default function SchemaMarkup() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Steve's Automotive Technology",
    "image": "https://stevesautomotivetechnology.com/og-image.jpg",
    "url": "https://stevesautomotivetechnology.com",
    "telephone": "+17173300041",
    "email": "stevesautotech@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1027 Dillerville Rd #16",
      "addressLocality": "Lancaster",
      "addressRegion": "PA",
      "postalCode": "17603",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.0583,
      "longitude": -76.3234
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:30",
        "closes": "13:00"
      }
    ],
    "priceRange": "$",
    "areaServed": {
      "@type": "City",
      "name": "Lancaster"
    },
    "serviceType": [
      "Auto Repair",
      "Hybrid Battery Repair",
      "Oil Change",
      "Brake Service",
      "State Inspection",
      "A/C Repair",
      "Engine Diagnostics"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Steve's Automotive Technology",
    "description": "Expert auto repair in Lancaster, PA. Hybrid battery specialists since 2007. Trusted mechanic for all vehicle makes and models.",
    "url": "https://stevesautomotivetechnology.com",
    "telephone": "+17173300041",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1027 Dillerville Rd #16",
      "addressLocality": "Lancaster",
      "addressRegion": "PA",
      "postalCode": "17603",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.0583,
      "longitude": -76.3234
    },
    "openingHours": [
      "Mo-Fr 08:30-17:00",
      "Sa 08:30-13:00"
    ],
    "priceRange": "$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Check",
    "sameAs": [
      "https://www.google.com/maps/place/Steve's+Automotive+Technology"
    ]
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
