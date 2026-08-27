import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/services/hybrid-battery',
        '/services/inspection',
        '/services/brakes',
        '/privacy',
      ],
    },
    sitemap: 'https://stevesautomotivetechnology.com/sitemap.xml',
  }
}
