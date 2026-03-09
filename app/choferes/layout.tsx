import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'La Pintada',
  description: 'Aplicación para ver tus recibos de sueldo y horarios de trabajo',
  manifest: '/manifest-choferes.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'La Pintada'
  },
  openGraph: {
    title: 'La Pintada',
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
        <link rel="icon" href="/LA%20PINTADA%20-%20LP.png" />
        <link rel="apple-touch-icon" href="/LA%20PINTADA%20-%20LP.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="La Pintada" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
