'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#3a2f2a] text-white">
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
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/lapintadasanjuan/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#f2dcc6]/35 bg-[#f2dcc6]/10 text-[#f9eee3] hover:text-[#f0c89b] hover:border-[#f0c89b]/70 hover:bg-[#f2dcc6]/20 transition-all duration-200 hover:scale-105">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0022 12z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/quintalapintada/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#f2dcc6]/35 bg-[#f2dcc6]/10 text-[#f9eee3] hover:text-[#f0c89b] hover:border-[#f0c89b]/70 hover:bg-[#f2dcc6]/20 transition-all duration-200 hover:scale-105">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4zm6.5-10.9a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-[#f2dcc6]/20 bg-[#f2dcc6]/8 backdrop-blur-sm p-6">
            <h4 className="text-sm font-semibold tracking-[0.24em] uppercase text-[#f0c89b]">Nuestras Redes</h4>
            <div className="mt-3 h-px w-24 bg-gradient-to-r from-[#f0c89b] to-transparent"></div>
            <p className="mt-4 text-[#f5e7db] leading-relaxed">
              Seguinos en Facebook e Instagram para ver novedades, fechas y promociones.
            </p>
            <p className="mt-3 text-[#dcc8b8]">
              Reservas y consultas por mensaje directo.
            </p>
            <div className="mt-4 text-sm text-[#d2bcab] space-y-1">
              <p>@quintalapintada</p>
              <p>La Pintada San Juan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#f2dcc6]/15 mt-12 pt-8 text-center">
          <p className="text-[#ccb6a4] text-sm">
            © {new Date().getFullYear()} Quinta La Pintada. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
