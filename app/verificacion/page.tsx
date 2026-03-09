"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type VerifyResult = {
  valido: boolean
  error?: string
  rid?: number
  dni?: string | null
  empleado?: string
  nombre_archivo?: string
  fecha_emision?: string
  estado?: string
}

function VerifyContent() {
  const searchParams = useSearchParams()
  const rid = searchParams.get('rid')
  const sig = searchParams.get('sig')
  const [data, setData] = useState<VerifyResult | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      try {
        if (!rid || !sig) {
          setData({ valido: false, error: 'Parámetros inválidos' })
          setLoading(false)
          return
        }
        const res = await fetch(`/api/verify?rid=${encodeURIComponent(rid)}&sig=${encodeURIComponent(sig)}`)
        const j = await res.json()
        setData(j as VerifyResult)
      } catch {
        setData({ valido: false, error: 'Error de conexión' })
      } finally {
        setLoading(false)
      }
    })()
  }, [rid, sig])
  return (
    <div className="pt-20">
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-libertador-blue to-libertador-orange p-6 text-white">
            <h1 className="text-2xl font-extrabold">Verificación de Recibo</h1>
            <p className="text-white/90 text-sm">Verificado por La Pintada</p>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libertador-blue"></div>
              </div>
            ) : !data ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Sin datos</p>
              </div>
            ) : data.valido ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Empleado</div>
                    <div className="text-xl font-semibold text-gray-900">{data.empleado}</div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    <i className="fas fa-check-circle mr-2"></i>Recibo genuino
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-xs text-gray-500">Fecha de emisión</div>
                    <div className="text-sm text-gray-800">{data.fecha_emision}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-xs text-gray-500">Estado</div>
                    <div className={`text-sm font-semibold ${data.estado==='confirmado' ? 'text-green-700' : 'text-yellow-700'}`}>{data.estado}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-xs text-gray-500">DNI</div>
                    <div className="text-sm text-gray-800">{data.dni || '-'}</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700">
                  Cualquier consulta comuníquese con la empresa al teléfono fijo 4240365.
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Estado</div>
                    <div className="text-xl font-semibold text-gray-900">Verificación inválida</div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                    <i className="fas fa-times-circle mr-2"></i>Firma inválida
                  </span>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-xs text-gray-500">Detalle</div>
                  <div className="text-sm text-gray-800">{data.error || 'No se pudo verificar el recibo'}</div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700">
                  Cualquier consulta comuníquese con la empresa al teléfono fijo 4240365.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function VerificacionPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <img src="/LA PINTADA.png" alt="La Pintada" className="h-8 w-auto" />
          </div>
        </div>
      </nav>
      <Suspense fallback={<div className="pt-20"><div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libertador-blue"></div></div></div>}>
        <VerifyContent />
      </Suspense>
    </main>
  )
}
