'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function StatsSection() {
  const { token } = useAuth()
  const [stats, setStats] = useState<{ empleados: number; recibosConfirmados: number; recibosPendientes: number; recibos: number; horarios: number; ultimoRecibo: string | null; ultimoHorario: string | null }>({
    empleados: 0,
    recibosConfirmados: 0,
    recibosPendientes: 0,
    recibos: 0,
    horarios: 0,
    ultimoRecibo: null,
    ultimoHorario: null,
  })
  const [loading, setLoading] = useState(true)

  const [logsModal, setLogsModal] = useState(false)
  const [logs, setLogs] = useState<any[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('/api/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats || data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  const handleBackup = async () => {
    try {
      const response = await fetch('/api/admin/backup', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `libertador-backup-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Error al generar backup')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const handleClean = async () => {
    if (!confirm('¿Estás seguro de realizar la limpieza? Esto eliminará todos los recibos y horarios que no pertenezcan a ningún empleado existente.')) {
      return
    }
    
    try {
      const response = await fetch('/api/admin/cleanup', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        alert(`Limpieza completada:\n- Recibos eliminados: ${data.detalles.recibosEliminados}\n- Horarios eliminados: ${data.detalles.horariosEliminados}`)
        // Recargar stats
        window.location.reload()
      } else {
        alert('Error: ' + data.error)
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const handleLogs = async () => {
    setLogsModal(true)
    setLoadingLogs(true)
    try {
      const response = await fetch('/api/admin/logs', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch {
      alert('Error cargando logs')
    } finally {
      setLoadingLogs(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-libertador-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-600">Cargando estadísticas...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <i className="fas fa-chart-bar mr-3 text-libertador-blue"></i>
        Dashboard & Utilidades
      </h3>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center border border-blue-200">
          <div className="text-3xl font-extrabold text-libertador-blue mb-2">{stats.empleados}</div>
          <div className="text-sm font-semibold text-gray-600"><i className="fas fa-users mr-1"></i>Empleados</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center border border-green-200">
          <div className="text-3xl font-extrabold text-green-600 mb-2">{stats.recibosConfirmados}</div>
          <div className="text-sm font-semibold text-gray-600"><i className="fas fa-check mr-1"></i>Recibos confirmados</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg text-center border border-yellow-200">
          <div className="text-3xl font-extrabold text-yellow-600 mb-2">{stats.recibosPendientes}</div>
          <div className="text-sm font-semibold text-gray-600"><i className="fas fa-clock mr-1"></i>Recibos pendientes</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center border border-purple-200">
          <div className="text-3xl font-extrabold text-purple-600 mb-2">{stats.horarios}</div>
          <div className="text-sm font-semibold text-gray-600"><i className="fas fa-calendar mr-1"></i>Horarios</div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* System Alerts */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-bell mr-2 text-yellow-500"></i>
          Alertas del Sistema
        </h5>
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-blue-400 mr-2"></i>
              <span className="text-blue-700 text-sm">
                Confirmados: {stats.recibosConfirmados} · Pendientes: {stats.recibosPendientes}
              </span>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-yellow-400 mr-2"></i>
              <span className="text-yellow-700 text-sm">
                Recordatorio: Hacer backup semanal
              </span>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-green-400 mr-2"></i>
              <span className="text-green-700 text-sm">
                Sistema operativo y actualizado
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Quick Utilities */}
      <div>
        <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-tools mr-2 text-libertador-blue"></i>
          Utilidades Rápidas
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleBackup}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <i className="fas fa-download mr-2"></i>
            Crear Backup
          </button>
          <button
            onClick={handleClean}
            className="bg-yellow-600 text-white hover:bg-yellow-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <i className="fas fa-broom mr-2"></i>
            Limpiar Archivos
          </button>
          <button
            onClick={handleLogs}
            className="bg-green-600 text-white hover:bg-green-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <i className="fas fa-list mr-2"></i>
            Ver Logs
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h6 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <i className="fas fa-server mr-2 text-gray-500"></i>
          Información del Sistema
        </h6>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
          <div>
            <span className="font-medium">Versión:</span> 1.0.0
          </div>
          <div>
            <span className="font-medium">Base de Datos:</span> PostgreSQL
          </div>
          <div>
            <span className="font-medium">Servidor:</span> XAMPP
          </div>
          <div>
            <span className="font-medium">Framework:</span> Next.js 15
          </div>
        </div>
      </div>

      {/* Logs Modal */}
      {logsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center rounded-t-xl">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <i className="fas fa-list-alt mr-2 text-libertador-blue"></i>
                Logs del Sistema
              </h3>
              <button 
                onClick={() => setLogsModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {loadingLogs ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libertador-blue"></div>
                </div>
              ) : logs.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(log.fecha).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.accion.includes('DELETE') ? 'bg-red-100 text-red-800' :
                            log.accion.includes('BACKUP') ? 'bg-blue-100 text-blue-800' :
                            log.accion.includes('CLEANUP') ? 'bg-yellow-100 text-yellow-800' :
                            log.accion.includes('FAIL') ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {log.accion}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{log.usuario}</td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={log.detalle}>{log.detalle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">{log.ip || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  No hay registros de actividad recientes.
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-200 text-right rounded-b-xl">
              <button 
                onClick={() => setLogsModal(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
