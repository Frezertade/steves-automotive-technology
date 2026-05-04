import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Steve\'s Automotive Technology | Hybrid Battery Repair Lancaster PA',
  description: 'Expert auto repair in Lancaster, PA. Hybrid battery specialists. Trusted since 2007. Oil changes, inspections, brakes, A/C repair. Call (717) 330-0041.',
  keywords: 'auto repair Lancaster PA, hybrid battery repair, car mechanic Lancaster, oil change Lancaster, auto inspection PA, Steve\'s Automotive',
  openGraph: {
    title: 'Steve\'s Automotive Technology | Lancaster PA Auto Repair',
    description: 'Trusted auto repair since 2007. Hybrid battery specialists serving Lancaster & Millersville, PA.',
    type: 'website',
    locale: 'en_US',
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://stevesautomotivetechnology.com',
  },
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
