'use client'

import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
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
    <main className="min-h-screen bg-[#fffaf6]">
      <Navbar />
      <div className="relative">
        <HeroSection />
      </div>
      <div className="relative">
        <AboutSection />
      </div>
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 140" className="w-full h-20 md:h-28 fill-[#fdf6ef]">
          <path d="M0,32L60,48C120,64,240,96,360,106.7C480,117,600,107,720,85.3C840,64,960,32,1080,21.3C1200,11,1320,21,1380,26.7L1440,32L1440,140L1380,140C1320,140,1200,140,1080,140C960,140,840,140,720,140C600,140,480,140,360,140C240,140,120,140,60,140L0,140Z"></path>
        </svg>
      </div>
      <div className="relative">
        <ServicesSection />
      </div>
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 140" className="w-full h-20 md:h-28 fill-[#fff9f3]">
          <path d="M0,64L60,53.3C120,43,240,21,360,26.7C480,32,600,64,720,74.7C840,85,960,75,1080,74.7C1200,75,1320,85,1380,90.7L1440,96L1440,140L1380,140C1320,140,1200,140,1080,140C960,140,840,140,720,140C600,140,480,140,360,140C240,140,120,140,60,140L0,140Z"></path>
        </svg>
      </div>
      <div className="relative">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
