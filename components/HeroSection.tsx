'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#2f2318]/40 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/VIDEO-1.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
          <span className="block text-[#f6d8b5] text-xl md:text-2xl italic font-semibold mb-4 tracking-wider">
            Donde la magia sucede
          </span>
          <div className="flex justify-center mb-8">
            <Image
              src="/LA PINTADA.png"
              alt="Quinta La Pintada"
              width={400}
              height={200}
              className="w-full max-w-md h-auto drop-shadow-2xl"
              priority
            />
          </div>
          <p className="text-lg md:text-xl text-[#fef8f1] mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            Un rincón de ensueño en Pocito, San Juan. Salón climatizado, amplios jardines y todo lo necesario para que tu evento sea inolvidable. Casamientos, Cumpleaños y Eventos Corporativos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#contacto"
              className="bg-[#d8b28a] text-white hover:bg-[#fdf5ee] hover:text-[#6f5a4e] px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-transparent hover:border-[#d8b28a] uppercase tracking-widest"
            >
              Reservar Fecha
            </a>
            <a
              href="#espacios"
              className="bg-transparent border-2 border-[#f7e4cf] text-[#fff8f1] hover:bg-[#fff8f1] hover:text-[#6f5a4e] px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 uppercase tracking-widest"
            >
              Ver Espacios
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
    </section>
  )
}
