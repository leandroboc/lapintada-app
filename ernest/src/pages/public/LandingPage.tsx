import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-bold text-xl tracking-tight">VetSystem</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#servicios" className="hover:text-black transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-black transition-colors">Nosotros</a>
            <a href="#sucursales" className="hover:text-black transition-colors">Sucursales</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sm">Soy Cliente</Button>
            </Link>
            <Link to="/login">
              <Button className="rounded-full px-6">Pedir Turno</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Abierto ahora en Sucursal Norte
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Cuidado experto para tu mejor amigo.
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              Medicina veterinaria de vanguardia con un enfoque humano. 
              Tecnología avanzada y especialistas apasionados.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg">
                Reservar Cita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2">
                Ver Urgencias
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm text-gray-500">Años de experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold">12k</p>
                <p className="text-sm text-gray-500">Mascotas felices</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-gray-100 overflow-hidden relative">
               {/* Placeholder para imagen real */}
               <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 flex items-center justify-center">
                  <span className="text-9xl opacity-10">🐕</span>
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1553688738-a278b9f72434?auto=format&fit=crop&q=80&w=1000" 
                 alt="Perro feliz" 
                 className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700"
               />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Certificado de Calidad</p>
                  <p className="text-xs text-gray-500">Aprobado por el Colegio Vet.</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white" />
                ))}
                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold">+2k</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gray-50" id="servicios">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Servicios Integrales</h2>
            <p className="text-gray-500">Desde chequeos de rutina hasta cirugías complejas. Todo lo que tu mascota necesita en un solo lugar.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Consultas Clínicas", icon: "🩺", desc: "Diagnóstico preciso con equipamiento de última generación." },
              { title: "Cirugía General", icon: "🏥", desc: "Quirófanos equipados para intervenciones seguras." },
              { title: "Vacunación", icon: "💉", desc: "Calendarios personalizados para perros y gatos." },
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center text-sm font-medium cursor-pointer hover:text-blue-600">
                  Saber más <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-24 px-6" id="sucursales">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-black text-white p-12 rounded-[3rem] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Sucursal Norte</h3>
                <p className="text-gray-400 mb-8">Av. Libertador 1234, San Juan</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Clock className="text-green-400" /> Lun - Vie: 8am - 8pm
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-400" /> Urgencias 24hs
                  </li>
                </ul>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8">
                  Ver en Mapa
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 p-12 rounded-[3rem] flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-2">Sucursal Centro</h3>
              <p className="text-gray-500 mb-8">Calle Mendoza 567, San Juan</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <Clock className="text-black" /> Lun - Sab: 9am - 9pm
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Star className="text-black" /> Especialistas en Felinos
                </li>
              </ul>
              <Button variant="outline" className="border-2 border-black bg-transparent hover:bg-black hover:text-white rounded-full px-8 w-fit">
                Ver en Mapa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; 2026 VetSystem. Diseñado con excelencia.</p>
        </div>
      </footer>
    </div>
  );
};
