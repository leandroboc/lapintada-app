'use client'

import { useEffect, useState } from 'react'

const GOOGLE_OPINIONS_URL = 'https://www.google.com/search?sca_esv=014cb5ad1839ea23&sxsrf=ANbL-n4P_c56VX0vxK3wNN9mTu_nBIo4Vg:1773275997937&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOW5hrmeVCwJ76b__AOraeLSBLQUTSpjAaowR1c8davbi4IMVM1AJPPVkZT64uqFzQSravl9ET7lOtlrOzlcI3RTJtZW4Y2rAVTi0nv3XV7n1TvuaAA%3D%3D&q=Quinta+La+Pintada+Opiniones&sa=X&ved=2ahUKEwj5l8jvj5mTAxVNDLkGHVbGKUMQ0bkNegQIPRAF&biw=1366&bih=641&dpr=1'

const reviews = [
  {
    author: 'Opinión de Google',
    text: 'La atención y la energía del lugar hicieron que todo saliera perfecto.',
  },
  {
    author: 'Opinión de Google',
    text: 'Hermoso predio, excelente ambientación y un entorno ideal para celebrar.',
  },
  {
    author: 'Opinión de Google',
    text: 'El equipo acompañó cada detalle y la experiencia fue inolvidable.',
  },
  {
    author: 'Opinión de Google',
    text: 'Eventos súper bien organizados, espacios cómodos y una vibra única.',
  },
  {
    author: 'Opinión de Google',
    text: 'Un lugar que realmente se siente premium desde que entrás.',
  },
]

export default function GoogleOpinionsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-[linear-gradient(180deg,#fff8f1_0%,#fffaf6_100%)] relative overflow-hidden">
      <div className="absolute -top-12 right-0 w-72 h-72 bg-[#f4dbc3]/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f7eadc]/55 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-[#c39a72] uppercase tracking-[0.25em] text-xs md:text-sm mb-3 font-semibold">Opiniones de Google</p>
          <h2 className="text-3xl md:text-5xl text-[#5f4b3e] font-bold leading-tight">
            Lo que dicen quienes ya vivieron La Pintada
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" data-aos="fade-up" data-aos-delay="120">
          <div className="lg:col-span-4 rounded-[2rem] border border-[#ead9c8] bg-[#fffaf4]/95 p-7 md:p-8 shadow-[0_24px_70px_rgba(122,92,70,0.14)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#d8b28a] px-4 py-2 text-[#7b6554] text-[11px] uppercase tracking-[0.22em] font-semibold mb-5">
                Reseñas reales
              </div>
              <p className="text-[#6f5a4e] text-lg leading-relaxed">
                Experiencias compartidas por clientes en Google. Las opiniones se muestran con transición automática para mantener el mismo ritmo premium del landing.
              </p>
            </div>
            <a
              href={GOOGLE_OPINIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex justify-center rounded-full border border-[#c9b09a] px-6 py-3 text-[#6f5a4e] text-sm font-semibold hover:text-[#b88b5a] hover:border-[#b88b5a] transition-colors"
            >
              Ver todas en Google
            </a>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, index) => {
              const isActive = index === active
              return (
                <article
                  key={`${review.author}-${index}`}
                  className={`rounded-[1.6rem] border p-6 md:p-7 transition-all duration-700 ${
                    isActive
                      ? 'border-[#d8b28a] bg-[#fffaf4] shadow-[0_20px_50px_rgba(122,92,70,0.2)] md:-translate-y-1'
                      : 'border-[#ead9c8] bg-white/70 shadow-[0_14px_35px_rgba(122,92,70,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#5f4b3e] text-lg font-bold">{review.author}</span>
                    <span className="text-[#d8b28a] text-lg tracking-wide">★★★★★</span>
                  </div>
                  <p className="text-[#7b6554] leading-relaxed text-[1.02rem]">{review.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
