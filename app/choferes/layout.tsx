import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Mi App - Recibos y Horarios',
  description: 'Aplicación para ver tus recibos de sueldo y horarios de trabajo',
  manifest: '/manifest-choferes.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MiApp'
  },
  openGraph: {
    title: 'Mi App - Recibos y Horarios',
    description: 'Aplicación para ver tus recibos de sueldo y horarios de trabajo.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function ChoferesLayout({
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
        <meta name="apple-mobile-web-app-title" content="MiApp" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}