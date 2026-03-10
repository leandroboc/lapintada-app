'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#2f2318]/40 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,220,185,0.28),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(255,189,138,0.22),transparent_46%)] z-10"></div>
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="text-center rounded-[2rem] border border-[#f8dcbc]/35 bg-[#2f2318]/25 backdrop-blur-sm p-8 md:p-12 shadow-[0_30px_120px_rgba(47,35,24,0.45)]" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex justify-center mb-10">
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
              className="bg-[#d8b28a] text-white hover:bg-[#fdf5ee] hover:text-[#6f5a4e] px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_12px_30px_rgba(216,178,138,0.45)] border-2 border-[#f6dfc7]/80 uppercase tracking-widest"
            >
              Reservar Fecha
            </a>
            <a
              href="#espacios"
              className="bg-[#2f2318]/65 border-2 border-[#f7e4cf] text-[#fff8f1] hover:bg-[#fff8f1] hover:text-[#6f5a4e] px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 uppercase tracking-widest shadow-[0_10px_24px_rgba(47,35,24,0.35)]"
            >
              Ver Espacios
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-44 z-10 bg-gradient-to-t from-[#fffdf9] via-[#fffdf9]/80 to-transparent">
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-20 bg-gradient-to-t from-[#fffdf9] to-transparent"></div>
      </div>
    </section>
  )
}
