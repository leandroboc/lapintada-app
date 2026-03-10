'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
                <Image
                  src="/LA PINTADA.png"
                  alt="La Pintada"
                  width={280}
                  height={70}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-5">
              <a href="https://www.facebook.com/lapintadasanjuan/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-pintada-gold transition-all duration-200 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0022 12z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/quintalapintada/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-pintada-gold transition-all duration-200 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4zm6.5-10.9a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pintada-gold">Nuestras Redes</h4>
            <ul className="space-y-4">
              <li className="text-gray-300 leading-relaxed">
                Seguinos en Facebook e Instagram para ver novedades, fechas y promociones.
              </li>
              <li className="text-gray-400">
                Reservas y consultas por mensaje directo.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Quinta La Pintada. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
