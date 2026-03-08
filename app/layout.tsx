import './globals.css'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import { AuthProvider } from '../context/AuthContext'
import PWAInstallPrompt from '../components/PWAInstallPrompt'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','700','800'] })

export const metadata: Metadata = {
  title: 'Transportes Libertador - Sistema de Gestión',
  description: 'Sistema integral de gestión de recibos y horarios para Transportes Libertador',
  keywords: 'transporte, logística, cargas, terrestre, Argentina, empresa familiar',
  authors: [{ name: 'Transportes Libertador' }],
  manifest: '/manifest.json',
  themeColor: '#007bff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LibertadorApp'
  },
  openGraph: {
    title: 'Transportes Libertador - Sistema de Gestión',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LibertadorApp" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={montserrat.className}>
        <AuthProvider>
          {children}
          <PWAInstallPrompt />
        </AuthProvider>
      </body>
    </html>
  )
}