'use client'

import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const { user, token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Si ya hay usuario logueado, ir directo al dashboard
    if (user && token) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }, [user, token, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pintada-green"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section (Historia) */}
      <AboutSection />

      {/* Services Section (Eventos) */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}