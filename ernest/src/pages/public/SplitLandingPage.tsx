import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Clock, UserCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SplitLandingPage = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col md:flex-row overflow-hidden font-sans">
      
      {/* HEADER FLOTANTE (ABSOLUTE) */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <div className="h-6 w-6 bg-black rounded flex items-center justify-center text-white font-bold text-xs">V</div>
          <span className="font-bold text-lg tracking-tight text-gray-900">VetSystem</span>
        </div>
        
        <div className="pointer-events-auto">
             <Button 
                onClick={() => navigate('/login')}
                className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-sm border border-gray-200"
             >
                <UserCircle className="mr-2 h-4 w-4" />
                Acceso Personal
            </Button>
        </div>
      </header>

      {/* IZQUIERDA: SUCURSAL NORTE (PERROS) */}
      <div 
        className={`relative flex-1 transition-all duration-700 ease-in-out cursor-pointer group
          ${hoveredSide === 'left' ? 'md:flex-[1.5]' : 'md:flex-1'}
          ${hoveredSide === 'right' ? 'md:flex-[0.8] opacity-90' : 'opacity-100'}
        `}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/norte')}
      >
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80" 
            alt="Perro Golden Retriever" 
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* CONTENIDO */}
        <div className="relative flex h-full flex-col justify-end p-10 md:p-20 text-white">
          <div className="transform transition-all duration-500 group-hover:-translate-y-4">
            <span className="inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              Especialistas en Caninos
            </span>
            <h2 className="text-4xl font-bold md:text-6xl mb-4 leading-tight">
              Sucursal <br/> Norte
            </h2>
            <p className="max-w-md text-lg text-gray-200 mb-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 delay-100">
              Atención clínica integral, cirugía y guardería para tu mejor amigo.
            </p>
            <div className="flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 delay-200">
               <span className="flex items-center gap-2 text-sm font-medium"><MapPin size={16}/> Av. Libertador 2000</span>
               <span className="flex items-center gap-2 text-sm font-medium"><Clock size={16}/> 24 Hs</span>
            </div>
            
            <div className="mt-8">
                <Button className="bg-white text-black hover:bg-gray-100 border-none rounded-full px-8 py-6 text-lg">
                    Ver Servicios Norte <ArrowRight className="ml-2" />
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* DERECHA: SUCURSAL CENTRO (GATOS) */}
      <div 
        className={`relative flex-1 transition-all duration-700 ease-in-out cursor-pointer group border-t-4 md:border-t-0 md:border-l-4 border-white
          ${hoveredSide === 'right' ? 'md:flex-[1.5]' : 'md:flex-1'}
          ${hoveredSide === 'left' ? 'md:flex-[0.8] opacity-90' : 'opacity-100'}
        `}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/centro')}
      >
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80" 
            alt="Gato mirando ventana" 
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
        </div>

        {/* CONTENIDO */}
        <div className="relative flex h-full flex-col justify-end p-10 md:p-20 text-white">
          <div className="transform transition-all duration-500 group-hover:-translate-y-4">
            <span className="inline-block rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              Clínica Felina & Exóticos
            </span>
            <h2 className="text-4xl font-bold md:text-6xl mb-4 leading-tight">
              Sucursal <br/> Centro
            </h2>
            <p className="max-w-md text-lg text-gray-200 mb-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 delay-100">
              Un ambiente tranquilo y especializado, diseñado para reducir el estrés de tu gato.
            </p>
             <div className="flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 delay-200">
               <span className="flex items-center gap-2 text-sm font-medium"><MapPin size={16}/> Calle 9 de Julio 500</span>
               <span className="flex items-center gap-2 text-sm font-medium"><Clock size={16}/> 9:00 - 20:00</span>
            </div>
            
            <div className="mt-8">
                <Button className="bg-white text-black hover:bg-gray-100 border-none rounded-full px-8 py-6 text-lg">
                    Ver Servicios Centro <ArrowRight className="ml-2" />
                </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
