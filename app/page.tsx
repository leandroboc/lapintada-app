'use client'

import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'
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

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 80,
    })
  }, [])

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
      <section className="py-20 md:py-24 bg-[#fffdf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[2.2rem] overflow-hidden border border-[#ead9c8] shadow-[0_28px_80px_rgba(111,90,78,0.2)] bg-[#fffaf4]"
            data-aos="zoom-in-up"
            data-aos-duration="1100"
          >
            <div className="relative h-[320px] md:h-[520px] bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
                src="/QLP_RESUMEN.mov"
              >
                <source src="/QLP_RESUMEN.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
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
