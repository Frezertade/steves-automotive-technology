import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { shop } from '../lib/shop'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const siteUrl = shop.siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Steve's Automotive Technology | Hybrid Battery Repair Lancaster PA",
    template: "%s | Steve's Automotive Technology",
  },
  description:
    `Lancaster, PA hybrid battery repair and diagnostic specialists. ${shop.name} helps drivers save thousands versus dealership replacement quotes. Call ${shop.phone}.`,
  keywords: [
    'hybrid battery repair Lancaster PA',
    'hybrid battery diagnostic Lancaster',
    'Prius battery repair Lancaster',
    'auto repair Lancaster PA',
    'Steve\'s Automotive Technology',
    'Millersville PA mechanic',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hybrid Battery Repair Without Dealership Prices",
    description:
      "Lancaster's specialist for hybrid battery diagnostics, reconditioning, replacement, and trusted auto repair since 2007.",
    url: siteUrl,
    siteName: "Steve's Automotive Technology",
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Steve's Automotive Technology hybrid battery diagnostic hero graphic",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hybrid Battery Repair Without Dealership Prices",
    description:
      "Advanced hybrid battery diagnostics and repair from Steve's Automotive Technology in Lancaster, PA.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'automotive repair',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
