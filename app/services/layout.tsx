import ChatBot from '../components/ChatBot'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <Navigation />
      {children}
      <Footer />
      <ChatBot />
    </main>
  )
}
