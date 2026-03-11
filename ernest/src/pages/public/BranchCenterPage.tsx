import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, MapPin, Check, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const BranchCenterPage = () => {
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
           <span className="font-bold text-lg text-emerald-800">Sucursal CENTRO</span>
           <Button 
             variant="outline" 
             size="sm" 
             className="text-emerald-800 border-emerald-200 hover:bg-emerald-50"
             onClick={() => navigate('/login')}
           >
             Acceso Personal
           </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative py-20 bg-emerald-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
               <img 
                 src="https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80" 
                 alt="Gato relajado" 
                 className="rounded-3xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white"
               />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                <Heart size={12} fill="currentColor" />
                Cat Friendly Gold Standard
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-6 text-gray-900">
                Especialistas en <br/> <span className="text-emerald-600">Medicina Felina</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ambiente silencioso, sin ladridos y con feromonas relajantes. Sabemos que tu gato necesita un trato diferente.
              </p>
              <div className="flex gap-4">
                <Button className="h-12 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
                  Agendar Turno Gatos
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-full border-gray-300">
                  <Phone className="mr-2 h-4 w-4" /> Consultas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Promociones Felinas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-emerald-100 bg-emerald-50 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <span className="font-bold text-xl">Kit</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Bienvenida Gatito</h3>
              <p className="text-gray-600 mb-4">
                Primera consulta + Desparasitación + Kit de juegos con 50% de descuento.
              </p>
              <Button variant="link" className="text-emerald-600 p-0">Reservar Ahora &rarr;</Button>
            </Card>

            <Card className="p-6 border-gray-100 hover:shadow-lg transition-shadow">
               <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-4">
                <span className="font-bold text-xl">3x2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Pipetas Felinas</h3>
              <p className="text-gray-600 mb-4">
                Llevando 3 pipetas de cualquier marca, pagas solo 2. Stock limitado.
              </p>
               <Button variant="link" className="text-gray-900 p-0">Ver marcas &rarr;</Button>
            </Card>

            <Card className="p-6 border-gray-100 hover:shadow-lg transition-shadow">
               <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-4">
                <span className="font-bold text-xl">VIP</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Plan Salud Senior</h3>
              <p className="text-gray-600 mb-4">
                Chequeo renal y cardíaco anual bonificado para gatos mayores de 7 años.
              </p>
               <Button variant="link" className="text-gray-900 p-0">Más info &rarr;</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
