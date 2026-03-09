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
              <Link href="/" aria-label="Ir a inicio" className="text-2xl font-bold text-white font-serif tracking-wide">
                La Pintada <span className="text-pintada-gold">Eventos</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/lapintadasanjuan/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-pintada-gold transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0022 12z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/quintalapintada/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pintada-gold transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4zm6.5-10.9a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pintada-gold">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Consultar por Redes Sociales</span>
              </li>
              <li className="flex items-start text-gray-400">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>
                  Los Sauces 649 este, Pocito<br/>
                  (Entre calle 13 y 14)<br/>
                  San Juan, Argentina
                </span>
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