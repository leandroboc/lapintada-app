'use client'

export default function ServicesSection() {
  return (
    <section id="eventos" className="py-24 bg-[linear-gradient(180deg,#fdf6ef_0%,#f7eee4_100%)] relative overflow-hidden">
      <div className="absolute -top-10 right-0 w-72 h-72 bg-[#f2d8bf]/55 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-[#5f4b3e] mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-[#7b6554] max-w-2xl mx-auto italic">Creamos experiencias únicas cuidando cada detalle</p>
        </div>

        <div className="bg-[#fffaf5]/95 rounded-[2rem] shadow-[0_25px_80px_rgba(111,90,78,0.18)] p-8 md:p-10 border border-[#e8d7c7]" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Salón Climatizado</h3>
              <p className="text-[#7b6554]">Espacio cerrado con temperatura ideal para disfrutar en cualquier época del año.</p>
            </div>

            {/* Servicio 2 */}
            <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Parque y Piscina</h3>
              <p className="text-[#7b6554]">Amplios espacios verdes y piscina iluminada para eventos al aire libre soñados.</p>
            </div>

            {/* Servicio 3 */}
            <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Pista de Baile</h3>
              <p className="text-[#7b6554]">Tecnología en sonido e iluminación para que la fiesta no pare.</p>
            </div>
            
            {/* Servicio 4 */}
            <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Catering</h3>
              <p className="text-[#7b6554]">Zona de barra y cocina equipada para servicios gastronómicos de primer nivel.</p>
            </div>

             {/* Servicio 5 */}
             <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Decoración</h3>
              <p className="text-[#7b6554]">Asesoramiento integral y espacios versátiles para ambientar a tu gusto.</p>
            </div>

            {/* Servicio 6 */}
            <div className="text-center p-6 rounded-2xl bg-white/70 border border-[#eddccc] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#ead8c8] rounded-full flex items-center justify-center text-[#866850] mb-4 group-hover:bg-[#d8b28a] group-hover:text-white transition-colors shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#5f4b3e] mb-2">Planificación</h3>
              <p className="text-[#7b6554]">Acompañamiento en cada etapa para que disfrutes de tu evento sin preocupaciones.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
