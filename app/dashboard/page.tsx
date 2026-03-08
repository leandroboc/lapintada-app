'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

// Components
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import EmpleadosSection from '../../components/dashboard/EmpleadosSection'
import ArchivosSection from '../../components/dashboard/ArchivosSection'
import AdminSection from '../../components/dashboard/AdminSection'
import StatsSection from '../../components/dashboard/StatsSection'

export default function DashboardPage() {
  const { user, token, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('empleados')

  useEffect(() => {
    if (!isLoading && (!user || !token)) {
      router.push('/login')
    }
  }, [user, token, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-libertador-blue"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const tabs = [
    { id: 'empleados', label: 'Gestión de Empleados', icon: 'fas fa-users' },
    { id: 'archivos', label: 'Gestión de Archivos', icon: 'fas fa-folder-open' },
    { id: 'admin', label: 'Configuración Admin', icon: 'fas fa-cog' },
    { id: 'stats', label: 'Dashboard & Utilidades', icon: 'fas fa-chart-bar' }
  ]

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'empleados':
        return <EmpleadosSection />
      case 'archivos':
        return <ArchivosSection />
      case 'admin':
        return <AdminSection />
      case 'stats':
        return <StatsSection />
      default:
        return <EmpleadosSection />
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Panel Administrativo
          </h1>
          <p className="text-lg text-gray-600">
            Bienvenido {user.nombre} • {user.rol === 'contador' ? 'Administrador' : 'Empleado'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-libertador-blue text-libertador-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Section */}
        <div data-aos="fade-up" data-aos-delay="400">
          {renderActiveSection()}
        </div>
      </div>
    </DashboardLayout>
  )
}