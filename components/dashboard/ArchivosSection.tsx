'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ArchivosSection() {
  const [activeTab, setActiveTab] = useState('recibos')
  const { token } = useAuth()
  type ArchivoRow = { id: number; usuario_id: number; nombre_archivo: string; nombre?: string; apellido?: string; dni?: string; acknowledged?: number; acknowledged_at?: string }
  const [recibos, setRecibos] = useState<ArchivoRow[]>([])
  const [horarios, setHorarios] = useState<ArchivoRow[]>([])
  const [empleados, setEmpleados] = useState<{ id: number; nombre: string; dni: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [reciboFilter, setReciboFilter] = useState<'todos' | 'pendientes' | 'confirmados'>('todos')
  const [dniSearch, setDniSearch] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const [rRes, hRes, eRes] = await Promise.all([
          fetch('/api/recibos'),
          fetch('/api/horarios'),
          fetch('/api/empleados', { headers: { 'Authorization': `Bearer ${token}` } }),
        ])
        const rj = await rRes.json()
        const hj = await hRes.json()
        const ej = await eRes.json()
        setRecibos(rj.recibos || [])
        setHorarios(hj.horarios || [])
        setEmpleados(ej || [])
      } catch (err) {
        console.error('Error cargando archivos', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  type ReciboFull = ArchivoRow & { acknowledged?: number }
  const filteredRecibos = recibos.filter((r: ReciboFull) => {
    if (reciboFilter === 'pendientes') return Number(r.acknowledged || 0) === 0
    if (reciboFilter === 'confirmados') return Number(r.acknowledged || 0) === 1
    return true
  })

  const reassign = async (reciboId: number, nuevoUsuarioId: number) => {
    try {
      const res = await fetch('/api/recibos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reciboId, reassign_to: nuevoUsuarioId }),
      })
      const data = await res.json()
      if (res.ok) {
        setRecibos((prev) => prev.map(r => r.id === reciboId ? { ...r, usuario_id: nuevoUsuarioId, acknowledged: 0, acknowledged_at: null } : r))
      } else {
        alert(data.error || 'No se pudo reasignar')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const buscarRecibos = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (dniSearch.trim()) params.set('dni', dniSearch.trim())
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      const url = params.toString() ? `/api/recibos?${params.toString()}` : '/api/recibos'
      const rRes = await fetch(url)
      const rj = await rRes.json()
      setRecibos(rj.recibos || [])
    } catch (err) {
      console.error('Error buscando recibos', err)
    } finally {
      setLoading(false)
    }
  }

  const limpiarFiltros = async () => {
    setDniSearch('')
    setDesde('')
    setHasta('')
    await buscarRecibos()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <i className="fas fa-folder-open mr-3 text-libertador-blue"></i>
        Gestión de Archivos
      </h3>

      {/* Upload Section */}
      <div className="text-center mb-6">
        <a 
          href="/upload-masivo" 
          className="bg-libertador-blue text-white hover:bg-libertador-blue-hover px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
        >
          <i className="fas fa-layer-group mr-2"></i>
          Carga Masiva
        </a>
        <p className="text-sm text-gray-600 mt-2">
          Recomendado para múltiples archivos, también se puede cargar de 1 recibo
        </p>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('recibos')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recibos'
                  ? 'border-libertador-blue text-libertador-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-file-invoice mr-2"></i>
              Recibos
            </button>
            <button
              onClick={() => setActiveTab('horarios')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'horarios'
                  ? 'border-libertador-blue text-libertador-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-clock mr-2"></i>
              Horarios
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'recibos' && (
        <div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              value={dniSearch}
              onChange={(e) => setDniSearch(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
              placeholder="DNI (opcional)"
              maxLength={8}
              pattern="[0-9]{8}"
            />
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
            />
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
            />
            <div className="flex gap-2">
              <button onClick={buscarRecibos} className="px-4 py-3 rounded-lg bg-libertador-blue text-white w-full">Buscar</button>
              <button onClick={limpiarFiltros} className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 w-full">Limpiar</button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtro:</span>
              <button onClick={() => setReciboFilter('todos')} className={`px-3 py-1 rounded text-sm ${reciboFilter==='todos'?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>Todos</button>
              <button onClick={() => setReciboFilter('pendientes')} className={`px-3 py-1 rounded text-sm ${reciboFilter==='pendientes'?'bg-yellow-500 text-white':'bg-gray-100 text-gray-700'}`}>Pendientes</button>
              <button onClick={() => setReciboFilter('confirmados')} className={`px-3 py-1 rounded text-sm ${reciboFilter==='confirmados'?'bg-green-600 text-white':'bg-gray-100 text-gray-700'}`}>Confirmados</button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-libertador-blue text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Empleado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Archivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Asignación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Cargando...</td></tr>
                ) : recibos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      <i className="fas fa-inbox fa-3x mb-4 block text-gray-300"></i>
                      No hay recibos subidos
                    </td>
                  </tr>
                ) : (
                  filteredRecibos.map((r: ReciboFull) => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.nombre} · DNI {r.dni || '-'} · ID {r.usuario_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.nombre_archivo}</td>
                      <td className="px-6 py-4 text-sm">
                        {Number(r.acknowledged || 0) === 1 ? (
                          <span className="text-green-700 font-semibold"><i className="fas fa-check-circle mr-1"></i>Confirmado</span>
                        ) : (
                          <span className="text-yellow-700 font-semibold"><i className="fas fa-clock mr-1"></i>Pendiente</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <select
                          defaultValue={String(r.usuario_id)}
                          onChange={(e) => reassign(r.id, Number(e.target.value))}
                          className="border rounded px-2 py-1"
                        >
                          {empleados.map((e) => (
                            <option key={e.id} value={e.id}>{e.nombre} · {e.dni}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a href={`/api/recibos?download_id=${r.id}`} target="_blank" className="text-blue-600 hover:text-blue-800">Descargar</a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'horarios' && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
              placeholder="Buscar horarios..."
            />
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-libertador-blue text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Empleado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Archivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Cargando...</td></tr>
                ) : horarios.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      <i className="fas fa-clock fa-3x mb-4 block text-gray-300"></i>
                      No hay horarios subidos
                    </td>
                  </tr>
                ) : (
                  horarios.map((h) => (
                    <tr key={h.id}>
                      <td className="px-6 py-4 text-sm text-gray-700">{h.nombre} · ID {h.usuario_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{h.nombre_archivo}</td>
                      <td className="px-6 py-4 text-sm">
                        <a href={`/api/horarios?download_id=${h.id}`} target="_blank" className="text-blue-600 hover:text-blue-800">Descargar</a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}