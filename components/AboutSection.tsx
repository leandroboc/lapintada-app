'use client'

export default function AboutSection() {
  return (
    <section id="espacios" className="py-20 bg-[#fffdf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div data-aos="fade-right">
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

          {/* Image Grid */}
          <div className="relative" data-aos="fade-left">
            <div className="grid grid-cols-2 gap-4">
               {/* Placeholder Images - Replace with real photos */}
              <div className="space-y-4 mt-8">
                 <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')" }}
                    ></div>
                 </div>
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225468359-2996bc01c34c?q=80&w=2069&auto=format&fit=crop')" }}
                    ></div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?q=80&w=2069&auto=format&fit=crop')" }}
                    ></div>
                 </div>
                 <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop')" }}
                    ></div>
                 </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pintada-gold/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
