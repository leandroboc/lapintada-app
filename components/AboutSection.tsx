'use client'

import { useEffect, useState } from 'react'

export default function AboutSection() {
  const [activeSpace, setActiveSpace] = useState<'coral' | 'habano' | null>(null)
  const [modalSpace, setModalSpace] = useState<'coral' | 'habano' | null>(null)
  const [modalIndex, setModalIndex] = useState(0)

  const coralSlides = [
    '/ESPACIOS/casa%20coral/565620080_18077906978114911_4962993372681842896_n..jpg',
    '/ESPACIOS/casa%20coral/566225263_18080745392061419_2870736016126793691_n..jpg',
    '/ESPACIOS/casa%20coral/566867275_18077596640323451_6169359340524573308_n..jpg',
    '/ESPACIOS/casa%20coral/568785184_18078078782116705_4689832732621851106_n..jpg',
    '/ESPACIOS/casa%20coral/575744533_18184146181343547_656631123698890639_n..jpg',
  ]

  const habanoSlides = [
    '/ESPACIOS/casa%20habano/559715448_17996989223826687_7644015389572705418_n..jpg',
    '/ESPACIOS/casa%20habano/565572585_18084198937957394_4193041597020174975_n..jpg',
    '/ESPACIOS/casa%20habano/571781769_18044363375678704_4892063616175662468_n..jpg',
    '/ESPACIOS/casa%20habano/573356327_18123915301515095_2565020779678248690_n..jpg',
    '/ESPACIOS/casa%20habano/581241040_18514415425070367_7316424698478704448_n..jpg',
  ]

  const slides = modalSpace === 'coral' ? coralSlides : modalSpace === 'habano' ? habanoSlides : []

  const openModal = (space: 'coral' | 'habano') => {
    setModalSpace(space)
    setModalIndex(0)
  }

  const closeModal = () => {
    setModalSpace(null)
    setModalIndex(0)
  }

  useEffect(() => {
    if (!modalSpace || slides.length <= 1) return
    const timer = setInterval(() => {
      setModalIndex((prev) => (prev + 1) % slides.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [modalSpace, slides.length])

  useEffect(() => {
    if (!modalSpace) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') setModalIndex((prev) => (prev + 1) % slides.length)
      if (e.key === 'ArrowLeft') setModalIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [modalSpace, slides.length])

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
                onMouseEnter={() => { setActiveSpace('coral'); openModal('coral') }}
                onClick={() => openModal('coral')}
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
                  <h3 className="text-[#fff8f1] text-4xl font-bold leading-tight">Casa Coral</h3>
                </div>
              </div>

              <div
                className={`relative rounded-[2rem] overflow-hidden border border-[#ead9c8] shadow-2xl transition-all duration-700 cursor-pointer ${
                  activeSpace === 'habano' ? 'flex-[1.35]' : 'flex-1'
                } ${activeSpace === 'coral' ? 'opacity-80' : 'opacity-100'}`}
                onMouseEnter={() => { setActiveSpace('habano'); openModal('habano') }}
                onClick={() => openModal('habano')}
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
                  <h3 className="text-[#fff8f1] text-4xl font-bold leading-tight">Casa Habano</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden" data-aos="fade-up">
              <button
                type="button"
                onClick={() => openModal('coral')}
                className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#ead9c8] shadow-2xl text-left"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20coral/566225263_18080745392061419_2870736016126793691_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-[#fff8f1] font-bold text-xl">Casa Coral</p>
              </button>
              <button
                type="button"
                onClick={() => openModal('habano')}
                className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#ead9c8] shadow-2xl text-left"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/ESPACIOS/casa%20habano/573356327_18123915301515095_2565020779678248690_n..jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-[#fff8f1] font-bold text-xl">Casa Habano</p>
              </button>
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
      {modalSpace && (
        <div className="fixed inset-0 z-[80] bg-[#1f140b]/78 backdrop-blur-md p-4 md:p-10" onClick={closeModal}>
          <div className="max-w-6xl mx-auto h-full flex items-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full rounded-[2rem] overflow-hidden border border-[#ead9c8] bg-[#fffaf4] shadow-[0_30px_90px_rgba(31,20,11,0.45)]">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 relative aspect-[4/3] bg-black">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url('${slides[modalIndex]}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f2318]/70 via-transparent to-transparent"></div>
                  <button
                    type="button"
                    onClick={() => setModalIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fffaf4]/25 backdrop-blur-sm border border-[#f4dbc3]/80 text-[#fff8f1] text-2xl leading-none"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalIndex((prev) => (prev + 1) % slides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fffaf4]/25 backdrop-blur-sm border border-[#f4dbc3]/80 text-[#fff8f1] text-2xl leading-none"
                  >
                    ›
                  </button>
                </div>
                <div className="md:col-span-5 p-6 md:p-8 lg:p-10">
                  <div className="rounded-full border border-[#d8b28a] text-[#7b6554] text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-2 inline-block mb-4">
                    Galería Premium
                  </div>
                  <h3 className="text-[#5f4b3e] text-4xl font-bold mb-6">
                    {modalSpace === 'coral' ? 'Casa Coral' : 'Casa Habano'}
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {slides.map((slide, index) => (
                      <button
                        key={slide}
                        type="button"
                        onClick={() => setModalIndex(index)}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden border ${modalIndex === index ? 'border-[#c39a72] ring-2 ring-[#ead9c8]' : 'border-[#ead9c8]'}`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${slide}')` }}
                        ></div>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-8 inline-flex items-center justify-center rounded-full border border-[#c9b09a] px-6 py-3 text-[#6f5a4e] text-sm font-semibold hover:text-[#b88b5a] hover:border-[#b88b5a] transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
