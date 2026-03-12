'use client'

import { useState } from 'react'

export default function AboutSection() {
  const [activeSpace, setActiveSpace] = useState<'coral' | 'habano' | null>(null)

  return (
    <section id="espacios" className="py-24 bg-[#fffdf9] overflow-hidden relative">
      <div className="absolute -top-20 left-0 w-72 h-72 bg-[#f5ddc5]/45 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#f7eadc]/60 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 rounded-[2rem] border border-[#ead9c8] bg-[#fffaf4]/90 p-8 md:p-10 shadow-[0_24px_70px_rgba(122,92,70,0.12)] flex flex-col justify-between" data-aos="fade-right">
            <h4 className="text-[#c39a72] uppercase tracking-widest font-semibold mb-2 text-sm">Nuestra Historia</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5f4b3e] mb-8">
              Un Oasis Natural <br/> a minutos de la ciudad
            </h2>
            <p className="text-lg text-[#7b6554] mb-6 leading-relaxed font-light">
              Ubicada en el corazón de <strong>Pocito, San Juan</strong>, Quinta La Pintada nació como un proyecto familiar para celebrar la vida. Hoy, abrimos nuestras puertas para que vos también puedas crear recuerdos imborrables.
            </p>
            <p className="text-lg text-[#7b6554] mb-6 leading-relaxed font-light">
              A solo <strong>15 minutos del centro</strong>, ofrecemos la combinación perfecta entre accesibilidad y desconexión. Nuestro predio cuenta con años de árboles añosos que brindan una sombra natural inigualable, creando el marco perfecto para ceremonias al atardecer.
            </p>
            <p className="text-lg text-[#7b6554] mb-10 leading-relaxed font-light">
              Ya sea una boda íntima, un cumpleaños de 15 soñado o un evento corporativo, en La Pintada cada detalle está pensado para que anfitriones e invitados solo se preocupen por disfrutar.
            </p>
            
            <a
              href="#contacto"
              className="inline-block border-b-2 border-[#d8b28a] text-[#5f4b3e] font-semibold pb-1 hover:text-[#c39a72] transition-colors duration-300 uppercase tracking-widest text-sm"
            >
              Consultar Disponibilidad &rarr;
            </a>
          </div>
          <div className="lg:col-span-7 relative space-y-5">
            <div
              className="hidden lg:flex h-[520px] gap-4"
              data-aos="fade-left"
              onMouseLeave={() => setActiveSpace(null)}
            >
              <div
                className={`relative rounded-[2rem] overflow-hidden border border-[#ead9c8] shadow-2xl transition-all duration-700 cursor-pointer ${
                  activeSpace === 'coral' ? 'flex-[1.35]' : 'flex-1'
                } ${activeSpace === 'habano' ? 'opacity-80' : 'opacity-100'}`}
                onMouseEnter={() => setActiveSpace('coral')}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20coral/565620080_18077906978114911_4962993372681842896_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/75 via-[#2f2318]/30 to-transparent"></div>
                <div className="absolute top-5 left-5 rounded-full border border-[#f4dbc3]/80 bg-[#fff8f1]/20 backdrop-blur-sm px-4 py-2 text-[#fff8f1] uppercase tracking-[0.2em] text-[10px] font-semibold">
                  Casa Coral
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-[#fff8f1] text-3xl font-bold leading-tight mb-3">Espacio íntimo y natural</h3>
                  <p className="text-[#f4e3d4] text-sm">Ideal para celebraciones con clima cálido y paisajes protagonistas.</p>
                </div>
              </div>

              <div
                className={`relative rounded-[2rem] overflow-hidden border border-[#ead9c8] shadow-2xl transition-all duration-700 cursor-pointer ${
                  activeSpace === 'habano' ? 'flex-[1.35]' : 'flex-1'
                } ${activeSpace === 'coral' ? 'opacity-80' : 'opacity-100'}`}
                onMouseEnter={() => setActiveSpace('habano')}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20habano/559715448_17996989223826687_7644015389572705418_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/75 via-[#2f2318]/30 to-transparent"></div>
                <div className="absolute top-5 left-5 rounded-full border border-[#f4dbc3]/80 bg-[#fff8f1]/20 backdrop-blur-sm px-4 py-2 text-[#fff8f1] uppercase tracking-[0.2em] text-[10px] font-semibold">
                  Casa Habano
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-[#fff8f1] text-3xl font-bold leading-tight mb-3">Diseño premium y amplitud</h3>
                  <p className="text-[#f4e3d4] text-sm">Para eventos elegantes con una atmósfera sofisticada y moderna.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden" data-aos="fade-up">
              <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#ead9c8] shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20coral/566225263_18080745392061419_2870736016126793691_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-[#fff8f1] font-bold text-xl">Casa Coral</p>
              </div>
              <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#ead9c8] shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20habano/573356327_18123915301515095_2565020779678248690_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-[#fff8f1] font-bold text-xl">Casa Habano</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="160">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#ead9c8] shadow-xl">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/ESPACIOS/ESPECIOS%20COMPARTIDOS/GYM.mp4"></video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/65 to-transparent"></div>
                <p className="absolute bottom-3 left-3 text-[#fff8f1] text-sm font-semibold tracking-wider uppercase">Espacios en común</p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#ead9c8] shadow-xl">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/ESPACIOS/ESPECIOS%20COMPARTIDOS/PLAYROOM2.mp4"></video>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#ead9c8] shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/ESPACIOS/ESPECIOS%20COMPARTIDOS/PLAYROOM.jpg')" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
