'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-pintada-green tracking-wide">
                La Pintada <span className="text-pintada-gold">Admin</span>
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-600">Hola,</span>
                <span className="font-semibold text-gray-900 ml-1">
                  {user?.nombre}
                </span>
              </div>
              <Link
                href="/"
                className="text-pintada-green hover:text-pintada-gold px-4 py-2 text-sm font-medium transition-colors"
              >
                <i className="fas fa-home mr-2"></i>
                Ver Sitio
              </Link>
              <button
                onClick={logout}
                className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
