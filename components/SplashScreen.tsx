'use client'

import { useState, useEffect } from 'react'

interface SplashScreenProps {
  onLoadingComplete: () => void
}

export default function SplashScreen({ onLoadingComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Animación de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Mostrar mensaje después del 30% de carga
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(messageTimer)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
          <svg className="w-20 h-20 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        </div>
      </div>

      {/* Texto de la app */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          La Pintada
        </h1>
        <p className="text-blue-100 text-lg font-medium">
          Sistema de Gestión
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="w-80 max-w-sm mx-auto">
        <div className="bg-blue-800 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-white h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-white text-sm font-medium">
          {progress}%
        </div>
      </div>

      {/* Mensaje */}
      {showMessage && (
        <div className="absolute bottom-20">
          <p className="text-blue-100 text-sm font-medium text-center px-4">
            Inicializando sistema...
          </p>
        </div>
      )}

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-white opacity-15 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white opacity-25 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-white opacity-20 rounded-full"></div>
      </div>
    </div>
  )
}
