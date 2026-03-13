'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

interface Empleado {
  id: number
  nombre: string
  dni: string
  fecha_creacion?: string
  fecha_modificacion?: string
}

const DEFAULT_PASSWORD = 'LpEvento2026'

const onlyDigits = (value: string) => value.replace(/\D/g, '').slice(0, 8)

const formatDni = (value: string) => {
  const digits = onlyDigits(value)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
}

const generateSecurePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  let password = ''
  for (let i = 0; i < 12; i += 1) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export default function EmpleadosSection() {
  const { token } = useAuth()
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    password: DEFAULT_PASSWORD
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuccess, setShowSuccess] = useState('')
  const [showError, setShowError] = useState('')
  const [passwordCount, setPasswordCount] = useState(DEFAULT_PASSWORD.length)
  const [showPassword, setShowPassword] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editNombre, setEditNombre] = useState('')
  const [editDni, setEditDni] = useState('')
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; empleado: Empleado | null }>({
    isOpen: false,
    empleado: null
  })

  useEffect(() => {
    fetchEmpleados()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchEmpleados = async () => {
    try {
      const response = await fetch('/api/empleados', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setEmpleados(data)
      }
    } catch (e) {
      console.error('Error fetching empleados:', e)
    }
  }

  const handleCreateEmpleado = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setShowSuccess('')
    setShowError('')
    const dniLimpio = onlyDigits(formData.dni)

    if (dniLimpio.length !== 8) {
      setShowError('El DNI debe tener formato xx.xxx.xxx')
      setLoading(false)
      return
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)) {
      setShowError('La contraseña debe tener letras, al menos 1 número y mínimo 8 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          dni: dniLimpio,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess('Empleado creado exitosamente')
        setFormData({ nombre: '', dni: '', password: DEFAULT_PASSWORD })
        setPasswordCount(DEFAULT_PASSWORD.length)
        fetchEmpleados()
      } else {
        setShowError(data.error || 'Error al crear empleado')
      }
    } catch {
      setShowError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (dni: string) => {
    if (confirm(`¿Resetear contraseña del empleado con DNI ${dni} a "${DEFAULT_PASSWORD}"?`)) {
      try {
        const response = await fetch('/api/empleados/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ dni, password: DEFAULT_PASSWORD }),
        })

        if (response.ok) {
          setShowSuccess('Contraseña reseteada exitosamente')
        } else {
          let errorMessage = 'Error al resetear contraseña'
          try {
            const data = await response.json()
            errorMessage = data?.error || errorMessage
          } catch {
            const raw = await response.text()
            if (raw) errorMessage = raw
          }
          setShowError(errorMessage)
        }
      } catch {
        setShowError('Error de conexión')
      }
    }
  }

  const handleGeneratePassword = () => {
    const password = generateSecurePassword()
    setFormData((prev) => ({ ...prev, password }))
    setPasswordCount(password.length)
    setShowPassword(true)
  }

  const filteredEmpleados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dni.includes(searchTerm)
  )

  const handleDelete = async () => {
    if (!deleteModal.empleado) return

    try {
      const response = await fetch('/api/empleados', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: deleteModal.empleado.id }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess('Empleado y registros eliminados permanentemente')
        fetchEmpleados()
      } else {
        setShowError(data.error || 'Error al eliminar')
      }
    } catch {
      setShowError('Error de conexión')
    } finally {
      setDeleteModal({ isOpen: false, empleado: null })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative">
      {/* Modal de Confirmación */}
      {deleteModal.isOpen && deleteModal.empleado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-red-500 animate-in zoom-in-95 duration-200">
            <div className="bg-red-50 p-6 border-b border-red-100 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-700">¿Eliminar Empleado?</h3>
                <p className="text-sm text-red-600 font-medium">Esta acción es irreversible</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Estás a punto de eliminar a <span className="font-bold text-gray-900">{deleteModal.empleado.nombre}</span> (DNI: {deleteModal.empleado.dni}).
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm font-semibold">
                  ⚠️ ADVERTENCIA CRÍTICA:
                </p>
                <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
                  <li>Se eliminará el usuario permanentemente.</li>
                  <li>Se borrarán TODOS sus recibos de sueldo.</li>
                  <li><strong>NO SE PUEDE DESHACER.</strong></li>
                </ul>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, empleado: null })}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg shadow-red-200 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Sí, Eliminar Definitivamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <i className="fas fa-users mr-3 text-libertador-blue"></i>
        Gestión de Empleados
      </h3>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
          <i className="fas fa-check-circle mr-2"></i>
          {showSuccess}
        </div>
      )}

      {showError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {showError}
        </div>
      )}

      {/* Create Employee Form */}
      <form onSubmit={handleCreateEmpleado} className="mb-8" autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <i className="fas fa-user mr-2"></i>Nombre Completo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
              placeholder="Ej: Juan Pérez"
              autoComplete="off"
              name="nombre_empleado"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <i className="fas fa-id-card mr-2"></i>DNI
            </label>
            <input
              type="text"
              value={formData.dni}
              onChange={(e) => setFormData({...formData, dni: formatDni(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
              placeholder="Ej: 12.345.678"
              maxLength={10}
              pattern="[0-9]{2}\.[0-9]{3}\.[0-9]{3}"
              title="DNI debe tener formato xx.xxx.xxx"
              inputMode="numeric"
              autoComplete="off"
              name="dni_empleado"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <i className="fas fa-lock mr-2"></i>Contraseña ({passwordCount} caracteres)
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value})
                setPasswordCount(e.target.value.length)
              }}
              className="w-full px-4 py-3 pr-40 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
              placeholder="Contraseña segura"
              autoComplete="new-password"
              name="password_empleado"
              required
            />
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-[#6f5a4e] hover:text-[#b88b5a] transition-colors"
            >
              Generar
            </button>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f5a4e] hover:text-[#b88b5a] transition-colors"
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Sugerida: {DEFAULT_PASSWORD} (letras + número)</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-libertador-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-libertador-blue-hover focus:ring-2 focus:ring-libertador-blue focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando empleado...
            </div>
          ) : (
            <i className="fas fa-plus mr-2"></i>
          )}
          Crear Empleado
        </button>
      </form>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-libertador-blue focus:border-transparent"
          placeholder="Buscar empleados por nombre o DNI..."
        />
      </div>

      {/* Empleados List */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-libertador-blue text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-hashtag mr-2"></i>ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-user mr-2"></i>Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-id-card mr-2"></i>DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-calendar mr-2"></i>Fecha Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-clock mr-2"></i>Fecha Modificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <i className="fas fa-cog mr-2"></i>Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmpleados.length > 0 ? (
              filteredEmpleados.map((empleado) => (
                <tr key={empleado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{empleado.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === empleado.id ? (
                      <input
                        type="text"
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      empleado.nombre
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingId === empleado.id ? (
                      <input
                        type="text"
                        value={editDni}
                        onChange={(e) => setEditDni(e.target.value)}
                        maxLength={8}
                        pattern="[0-9]{8}"
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      empleado.dni
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.fecha_creacion ? new Date(empleado.fecha_creacion).toLocaleString('es-ES') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.fecha_modificacion ? new Date(empleado.fecha_modificacion).toLocaleString('es-ES') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === empleado.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            setShowError('')
                            const response = await fetch('/api/empleados', {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({ id: empleado.id, nombre: editNombre, dni: onlyDigits(editDni) }),
                            })
                            const data = await response.json()
                            if (response.ok) {
                              setShowSuccess('Empleado actualizado')
                              setEditingId(null)
                              fetchEmpleados()
                            } else {
                              setShowError(data.error || 'Error al actualizar')
                            }
                          }}
                          className="bg-green-600 text-white hover:bg-green-700 px-3 py-1 rounded text-xs font-medium"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-3 py-1 rounded text-xs font-medium"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(empleado.id)
                            setEditNombre(empleado.nombre)
                            setEditDni(empleado.dni)
                          }}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded text-xs font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleResetPassword(empleado.dni)}
                          className="bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-1 rounded text-xs font-medium"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, empleado })}
                          className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 rounded text-xs font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <i className="fas fa-users fa-3x mb-4 block text-gray-300"></i>
                  {searchTerm ? 'No se encontraron empleados' : 'No hay empleados registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
