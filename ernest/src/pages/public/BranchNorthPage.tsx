import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, MapPin, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const BranchNorthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={18} />
              <span className="font-medium">Volver al Inicio</span>
           </Link>
           <span className="font-bold text-lg">Sucursal NORTE</span>
           <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
             Acceso Personal
           </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                <Star size={12} fill="currentColor" />
                Abierto 24 Horas
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-6">
                Cuidado Experto para <br/> <span className="text-blue-600">Perros Activos</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                En Sucursal Norte contamos con el quirófano más avanzado de la ciudad y un parque de rehabilitación de 500m².
              </p>
              <div className="flex gap-4">
                <Button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                  Agendar Turno Norte
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-full border-gray-300">
                  <Phone className="mr-2 h-4 w-4" /> Urgencias
                </Button>
              </div>
            </div>
            <div className="relative">
               <img 
                 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80" 
                 alt="Veterinario con perro" 
                 className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
               />
            </div>
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Ofertas Exclusivas Norte</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-blue-100 bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <span className="font-bold text-xl">2x1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Vacunación Antirrábica</h3>
              <p className="text-gray-600 mb-4">
                Trae a dos de tus mascotas y paga solo una vacuna. Válido todo el mes.
              </p>
              <Button variant="link" className="text-blue-600 p-0">Reservar Ahora &rarr;</Button>
            </Card>

            <Card className="p-6 border-gray-100 hover:shadow-lg transition-shadow">
               <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-4">
                <span className="font-bold text-xl">-20%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Baño y Corte</h3>
              <p className="text-gray-600 mb-4">
                Descuento especial los días Martes y Jueves en peluquería canina.
              </p>
               <Button variant="link" className="text-gray-900 p-0">Reservar Ahora &rarr;</Button>
            </Card>

            <Card className="p-6 border-gray-100 hover:shadow-lg transition-shadow">
               <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-4">
                <span className="font-bold text-xl">Free</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Revisión Dental</h3>
              <p className="text-gray-600 mb-4">
                Chequeo dental gratuito con cualquier consulta clínica general.
              </p>
               <Button variant="link" className="text-gray-900 p-0">Más info &rarr;</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
