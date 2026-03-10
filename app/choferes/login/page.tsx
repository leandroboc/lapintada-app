'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EmpleadoLogin() {
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/empleado-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('empleado_token', data.token)
        localStorage.setItem('empleado_user', JSON.stringify(data.user))
        router.push('/choferes')
      } else {
        setError(data.error || 'Error de conexión')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pintada-cream to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-t-4 border-pintada-gold">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <Image
              src="/LA PINTADA - LP.png"
              alt="La Pintada Eventos"
              width={280}
              height={120}
              className="w-auto h-auto max-h-24 object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Portal Empleados</h2>
          <p className="text-gray-600">Acceso exclusivo para el personal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pintada-gold focus:border-pintada-gold outline-none transition"
              placeholder="Ingresa tu DNI"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pintada-gold focus:border-pintada-gold outline-none transition"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label="Mostrar contraseña"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.5-10-7.5 0-1.063.375-2.063 1.05-3l3.9 3.9A4.5 4.5 0 0012 15a4.5 4.5 0 004.275-3.075l2.1 2.1a10.095 10.095 0 01-4.5 4.8zM6.225 6.225A10.095 10.095 0 0112 4.5c5.523 0 10 4.5 10 7.5 0 .9-.3 1.8-.825 2.625L18.9 12.45A4.5 4.5 0 0012 9a4.5 4.5 0 00-3.6 1.8L6.225 6.225z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          <a
            href="mailto:info@elibertador.com?subject=Recuperar%20contrase%C3%B1a"
            className="w-full inline-flex items-center justify-center border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
          >
            Olvidé mi contraseña
          </a>
        </form>

      </div>
    </div>
  )
}
