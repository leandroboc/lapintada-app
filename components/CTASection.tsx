'use client'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-libertador-blue to-libertador-blue-hover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte con tus necesidades de transporte
          </p>
          <a 
            href="#contacto"
            className="inline-flex items-center bg-white text-libertador-blue hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Contactar Ahora
          </a>
        </div>
      </div>
    </section>
  )
}