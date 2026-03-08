'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ChoferesApp() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  type User = { id: number; nombre: string }
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const empleadoToken = localStorage.getItem('empleado_token')
    const empleadoUser = localStorage.getItem('empleado_user')
    if (empleadoToken && empleadoUser) {
      try {
        const parsed: User = JSON.parse(empleadoUser)
        setUser(parsed)
        setIsLoading(false)
        if (parsed?.id) {
          loadData(parsed.id)
        }
      } catch {
        router.push('/choferes/login')
      }
    } else {
      router.push('/choferes/login')
    }
  }, [router])

  

  const logout = () => {
    localStorage.removeItem('empleado_token')
    localStorage.removeItem('empleado_user')
    router.push('/choferes/login')
  }

  type Recibo = { id: number; nombre_archivo: string; fecha_subida: string; acknowledged?: number }
  type Horario = { id: number; nombre_archivo: string; fecha_subida: string }
  type Aviso = { id: number; titulo: string; mensaje: string; created_at: string; leido?: number }
  const [recibos, setRecibos] = useState<Recibo[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [avisos, setAvisos] = useState<Aviso[]>([])
  const unreadCount = avisos.filter(a => Number(a.leido || 0) === 0).length

  const loadData = async (uid: number) => {
    try {
      const r = await fetch(`/api/recibos?usuario_id=${uid}`)
      const h = await fetch(`/api/horarios?usuario_id=${uid}`)
      const a = await fetch(`/api/avisos?usuarioId=${uid}`)
      const rj = await r.json()
      const hj = await h.json()
      const aj = await a.json()
      setRecibos(rj.recibos || [])
      setHorarios(hj.horarios || [])
      setAvisos(aj.avisos || [])
    } catch {}
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Empleado */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <Image
                  src="/LIBERTADOR-logo-app.png"
                  alt="Libertador App"
                  width={200}
                  height={40}
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, 200px"
                  className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                />
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{user?.nombre || 'Usuario'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-blue-50 text-libertador-blue px-2 py-1 rounded-md text-xs">
                Avisos
                <span className="ml-2 bg-libertador-blue text-white px-2 py-0.5 rounded-full text-xs">{unreadCount}</span>
              </div>
              <button
                onClick={logout}
                className="bg-libertador-blue text-white hover:bg-libertador-blue-hover px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">{recibos.length}</p>
                <p className="text-sm text-gray-600">Recibos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">{horarios.length}</p>
                <p className="text-sm text-gray-600">Horarios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Recibos */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Mis Recibos de Sueldo
            </h2>
          </div>
          <div className="p-4">
            {recibos.length > 0 ? (
              <div className="space-y-3">
                {recibos.map((recibo) => (
                  <div key={recibo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{recibo.nombre_archivo}</p>
                      <p className="text-sm text-gray-600">{formatDate(recibo.fecha_subida)}</p>
                    </div>
                    <div className="flex gap-2">
                      {recibo.acknowledged ? (
                        <>
                          <a
                            href={`/api/recibos?download_id=${recibo.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                            </svg>
                          </a>
                          <span className="text-green-700 text-xs font-semibold flex items-center">
                            <i className="fas fa-check-circle mr-1"></i>Recibido
                          </span>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            try {
                              const empleadoUser = localStorage.getItem('empleado_user')
                              const parsed = empleadoUser ? JSON.parse(empleadoUser) : null
                              const response = await fetch('/api/recibos', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: recibo.id, usuario_id: parsed?.id }),
                              })
                              const data = await response.json()
                              if (response.ok) {
                                setRecibos((prev) => prev.map(r => r.id === recibo.id ? { ...r, acknowledged: 1 } : r))
                              } else {
                                alert(data.error || 'No se pudo marcar recibido')
                              }
                            } catch {
                              alert('Error de conexión')
                            }
                          }}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 text-xs"
                        >
                          Aceptar recibido
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <p className="text-gray-500">No hay recibos disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Horarios */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
              Mis Horarios de Trabajo
            </h2>
          </div>
          <div className="p-4">
            {horarios.length > 0 ? (
              <div className="space-y-3">
                {horarios.map((horario) => (
                  <div key={horario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{horario.nombre_archivo}</p>
                      <p className="text-sm text-gray-600">{formatDate(horario.fecha_subida)}</p>
                    </div>
                    <a
                      href={`/api/horarios?download_id=${horario.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
                <p className="text-gray-500">No hay horarios disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Notificaciones */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-libertador-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              Notificaciones
            </h2>
          </div>
          <div className="p-4">
            {avisos.length > 0 ? (
              <div className="space-y-3">
                {avisos.map((aviso) => (
                  <div key={aviso.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {aviso.titulo}
                          {Number(aviso.leido || 0) === 0 && (
                            <span className="ml-2 inline-block text-xs text-libertador-blue">Nuevo</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{aviso.mensaje}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(aviso.created_at)}</p>
                      </div>
                      {Number(aviso.leido || 0) === 0 ? (
                        <button
                          onClick={async () => {
                            try {
                              const parsed = user
                              const res = await fetch('/api/avisos/read', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ aviso_id: aviso.id, usuario_id: parsed?.id })
                              })
                              const data = await res.json()
                              if (res.ok) {
                                setAvisos((prev) => prev.map(a => a.id === aviso.id ? { ...a, leido: 1 } : a))
                              } else {
                                alert(data.error || 'No se pudo marcar leído')
                              }
                            } catch {
                              alert('Error de conexión')
                            }
                          }}
                          className="bg-blue-600 text-white px-3 py-2 rounded-md text-xs hover:bg-blue-700"
                        >
                          Marcar leído
                        </button>
                      ) : (
                        <span className="text-green-700 text-xs font-semibold"><i className="fas fa-check-circle mr-1"></i>Leído</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                <p className="text-gray-500">No hay notificaciones disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}