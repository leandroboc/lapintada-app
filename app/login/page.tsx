'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Formulario enviado:', { usuario, password: password ? '***' : 'empty' })
    
    // Validación manual
    if (!usuario.trim()) {
      setError('El usuario/email es requerido')
      return
    }
    
    if (!password) {
      setError('La contraseña es requerida')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const ok = await login(usuario.trim(), password)
      if (!ok) {
        setError('Error de autenticación')
      }
    } catch {
      setError('Error de conexión. Verifica que el servidor esté ejecutándose.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-md w-full px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
          <Image
            src="/fondo-admin.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="pointer-events-none select-none object-fill"
            priority
          />
          <div className="relative z-10 space-y-8 px-7 py-8 sm:px-8 sm:py-9">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative w-full flex justify-center">
                  <Image
                    src="/LA PINTADA.png"
                    alt="La Pintada Eventos"
                    width={300}
                    height={150}
                    className="w-auto h-auto max-h-32 object-contain"
                    priority
                  />
                </div>
              </div>

              <h2 className="text-lg font-medium text-gray-600 mt-1">Panel Administrativo</h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email o DNI
                </label>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => {
                    setUsuario(e.target.value)
                    if (error) setError('')
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent transition-colors"
                  placeholder="Ingresa tu email o DNI"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (error) setError('')
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent transition-colors pr-12"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-libertador-blue hover:text-libertador-blue-hover"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-libertador-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-libertador-blue-hover focus:ring-2 focus:ring-libertador-blue focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="text-center">
              <Link href="/" className="inline-flex items-center text-libertador-blue hover:text-libertador-blue-hover font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
