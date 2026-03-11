'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="inicio" className="min-h-screen pt-16 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
          <div
            className="rounded-[2rem] border border-[#f8dcbc]/35 bg-[#2f2318]/25 backdrop-blur-sm p-8 md:p-10 shadow-[0_30px_120px_rgba(47,35,24,0.45)]"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="flex justify-start mb-8">
              <Image
                src="/LA PINTADA.png"
                alt="Quinta La Pintada"
                width={360}
                height={180}
                className="w-full max-w-sm h-auto drop-shadow-2xl"
                priority
              />
            </div>
            <p className="text-lg md:text-xl text-[#fef8f1] mb-8 max-w-2xl leading-relaxed font-light drop-shadow-md">
              Un rincón de ensueño en Pocito, San Juan. Salón climatizado, amplios jardines y todo lo necesario para que tu evento sea inolvidable. Casamientos, Cumpleaños y Eventos Corporativos.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
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

          <div
            className="rounded-[2rem] border border-[#f8dcbc]/30 bg-[#2f2318]/30 backdrop-blur-sm p-6 md:p-8 shadow-[0_30px_120px_rgba(47,35,24,0.45)] flex flex-col justify-between"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="120"
          >
            <div className="space-y-4">
              <div className="rounded-full border border-[#f4d8bd]/60 text-[#fef8f1] text-xs tracking-[0.2em] uppercase px-4 py-2 w-fit">
                Experiencias en movimiento
              </div>
              <h2 className="text-3xl md:text-4xl text-[#fff8f1] font-bold leading-tight">
                Bajás, descubrís,
                <br />
                y todo aparece con vida
              </h2>
              <p className="text-[#f4e3d4] text-base md:text-lg leading-relaxed font-light">
                Un diseño pensado para que cada sección te reciba con ritmo visual, profundidad y transiciones suaves de alto impacto.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="rounded-2xl border border-[#f4d8bd]/45 bg-[#2f2318]/45 p-4 text-center">
                <p className="text-[#fff8f1] text-2xl font-bold">360°</p>
                <p className="text-[#f4e3d4] text-xs tracking-wider uppercase">Espacios</p>
              </div>
              <div className="rounded-2xl border border-[#f4d8bd]/45 bg-[#2f2318]/45 p-4 text-center">
                <p className="text-[#fff8f1] text-2xl font-bold">15 min</p>
                <p className="text-[#f4e3d4] text-xs tracking-wider uppercase">Del centro</p>
              </div>
              <div className="rounded-2xl border border-[#f4d8bd]/45 bg-[#2f2318]/45 p-4 text-center">
                <p className="text-[#fff8f1] text-2xl font-bold">∞</p>
                <p className="text-[#f4e3d4] text-xs tracking-wider uppercase">Momentos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-44 z-10 bg-gradient-to-t from-[#fffdf9] via-[#fffdf9]/80 to-transparent">
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-20 bg-gradient-to-t from-[#fffdf9] to-transparent"></div>
      </div>
    </section>
  )
}
