import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const siteUrl = 'https://stevesautomotivetechnology.com'

const paths = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/services/hybrid-battery', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/services/inspection', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/services/brakes', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return paths.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
