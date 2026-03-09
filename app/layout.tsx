import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '../context/AuthContext'
import PWAInstallPrompt from '../components/PWAInstallPrompt'

export const metadata: Metadata = {
  title: 'La Pintada - Sistema de Gestión',
  description: 'Sistema integral de gestión de recibos y horarios para La Pintada',
  keywords: 'transporte, logística, cargas, terrestre, Argentina, empresa familiar',
  authors: [{ name: 'La Pintada' }],
  manifest: '/manifest.json',
  themeColor: '#007bff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'La Pintada'
  },
  openGraph: {
    title: 'La Pintada - Sistema de Gestión',
    description: 'Sistema integral de gestión de recibos y horarios.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/LA%20PINTADA%20-%20LP.png" />
        <link rel="apple-touch-icon" href="/LA%20PINTADA%20-%20LP.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="La Pintada" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <PWAInstallPrompt />
        </AuthProvider>
      </body>
    </html>
  )
}
