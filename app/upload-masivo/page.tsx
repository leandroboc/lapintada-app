'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function UploadMasivoPage() {
  const { token } = useAuth()
  const [usuarioId, setUsuarioId] = useState('')
  const [tipo, setTipo] = useState<'recibo' | 'horario'>('recibo')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [empleados, setEmpleados] = useState<{ id: number; nombre: string; dni: string }[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/empleados', { headers: { 'Authorization': `Bearer ${token}` } })
        if (res.ok) {
          const data = await res.json()
          setEmpleados(data)
        }
      } catch {}
    }
    load()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('')
    if (!usuarioId || !file) {
      setStatus('Faltan datos')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      form.append('usuario_id', usuarioId)
      form.append('file', file)
      const url = tipo === 'recibo' ? '/api/recibos' : '/api/horarios'
      const res = await fetch(url, { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) {
        setStatus(`Subido OK. id=${data.id}`)
      } else {
        setStatus(data.error || 'Error al subir')
      }
    } catch {
      setStatus('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Carga de archivos</h1>
        {status && (
          <div className="mb-4 text-sm text-gray-700">{status}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">Usuario</label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Seleccione un usuario</option>
              {empleados.map((e) => (
                <option key={e.id} value={String(e.id)}>{e.nombre} · {e.dni}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de archivo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'recibo' | 'horario')}
              className="w-full border rounded px-3 py-2"
            >
              <option value="recibo">Recibo</option>
              <option value="horario">Horario</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>
          <div className="text-xs text-gray-600">
            Puede subir un archivo PDF por vez. Para carga masiva, prepare un ZIP con PDFs nombrados por DNI.
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Subiendo...' : 'Subir'}
          </button>
        </form>
        <div className="mt-6">
          <a href="/dashboard" className="text-blue-600">← Volver al panel</a>
        </div>
      </div>
    </div>
  )
}