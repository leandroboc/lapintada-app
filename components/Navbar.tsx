'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image 
                src="/LA PINTADA - LP.png" 
                alt="La Pintada Eventos" 
                width={150} 
                height={45}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#inicio" className="text-gray-600 hover:text-pintada-gold px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wider">
                Inicio
              </a>
              <a href="#eventos" className="text-gray-600 hover:text-pintada-gold px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wider">
                Eventos
              </a>
              <a href="#espacios" className="text-gray-600 hover:text-pintada-gold px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wider">
                Espacios
              </a>
              <a href="#contacto" className="text-gray-600 hover:text-pintada-gold px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wider">
                Contacto
              </a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-pintada-green hover:text-pintada-gold px-3 py-2 text-xs font-semibold border border-pintada-green rounded-full hover:border-pintada-gold transition-all duration-300">
                ADMINISTRACION
              </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-libertador-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-libertador-blue"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#inicio" className="text-gray-700 hover:text-libertador-blue block px-3 py-2 rounded-md text-base font-medium">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-700 hover:text-libertador-blue block px-3 py-2 rounded-md text-base font-medium">
                Servicios
              </a>
              <a href="#nosotros" className="text-gray-700 hover:text-libertador-blue block px-3 py-2 rounded-md text-base font-medium">
                Nosotros
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-libertador-blue block px-3 py-2 rounded-md text-base font-medium">
                Contacto
              </a>
              <a href="/login" className="text-gray-700 hover:text-libertador-blue block px-3 py-2 rounded-md text-base font-medium">
                ADMINISTRACION
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}