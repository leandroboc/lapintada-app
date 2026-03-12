'use client'

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-[linear-gradient(180deg,#fff9f3_0%,#fff3e8_100%)] relative overflow-hidden">
      <div className="absolute -top-8 left-0 w-72 h-72 bg-[#f4dbc3]/55 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#f8eadb]/60 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5f4b3e] mb-4">
            Contactanos
          </h2>
          <p className="text-lg text-[#7b6554] max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos para cualquier consulta sobre eventos y reservas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div data-aos="fade-right" data-aos-duration="900">
            <div className="bg-[#fffaf5]/95 border border-[#ecdccd] rounded-[2rem] p-8 shadow-[0_24px_70px_rgba(111,90,78,0.18)]">
              <h3 className="text-2xl font-bold text-[#5f4b3e] mb-8">Información de Contacto</h3>
              
              {/* Address */}
              <div className="flex items-start mb-6 p-4 rounded-2xl bg-white/60 border border-[#efdfcf]">
                <div className="bg-[#f3e7db] rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-[#a98263]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#5f4b3e] mb-1">Dirección</h4>
                  <p className="text-[#7b6554]">Los Sauces 649 este, Pocito</p>
                  <p className="text-sm text-[#9a8371] mt-1">
                    (Entre calle 13 y 14, o entre Mendoza y Ruta 40)
                  </p>
                  <p className="text-[#7b6554]">San Juan, Argentina</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start mb-6 p-4 rounded-2xl bg-white/60 border border-[#efdfcf]">
                <div className="bg-[#f3e7db] rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-[#a98263]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#5f4b3e] mb-1">Teléfono (Solo WhatsApp)</h4>
                  <a
                    href="https://wa.me/5492644146619?text=Hola%2C%20quisiera%20info%20sobre%20La%20Pintada%2C%20costos%20y%20fechas%20disponibles."
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#7b6554] hover:text-[#b88b5a] transition-colors"
                  >
                    +54 9 2644 14-6619
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start mb-6 p-4 rounded-2xl bg-white/60 border border-[#efdfcf]">
                <div className="bg-[#f3e7db] rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-[#a98263]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#5f4b3e] mb-1">Email</h4>
                  <p className="text-[#7b6554]">info@lapintada.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start p-4 rounded-2xl bg-white/60 border border-[#efdfcf]">
                <div className="bg-[#f3e7db] rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-[#a98263]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#5f4b3e] mb-1">Horarios de Atención</h4>
                  <p className="text-[#7b6554]">Solo mensajes por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div data-aos="fade-left" data-aos-duration="1000">
            <div className="bg-[#fffaf5]/95 border border-[#ecdccd] rounded-[2rem] p-4 shadow-[0_24px_70px_rgba(111,90,78,0.18)] h-full">
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-4">Nuestra Ubicación</h3>
              <div className="aspect-w-16 aspect-h-12 h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.089989918237!2d-68.5878!3d-31.6835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQxJzAwLjYiUyA2OMKwMzUnMTYuMSJX!5e0!3m2!1ses!2sar!4v1635789012345!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-4 p-3 bg-[#f7ece1] rounded-xl border border-[#ead7c4]">
                <p className="text-sm text-[#7b6554] flex items-center">
                  <svg className="w-4 h-4 text-[#a98263] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Haz clic en el mapa para abrir en Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
