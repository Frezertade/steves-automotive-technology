import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import ChatBot from './components/ChatBot'
import SchemaMarkup from './components/SchemaMarkup'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Navigation />
      <Hero />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}
