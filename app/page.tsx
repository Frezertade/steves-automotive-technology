import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import AppointmentBooking from './components/AppointmentBooking'
import ChatBot from './components/ChatBot'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import SchemaMarkup from './components/SchemaMarkup'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Navigation />
      <Hero />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      
      <section id="booking" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Send a fast appointment request with your preferred date, time, vehicle, and service details.
            </p>
          </div>
          <AppointmentBooking />
        </div>
      </section>
      
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}
