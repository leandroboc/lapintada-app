import { NextResponse } from 'next/server'
import { getConnection } from '../../../lib/db'
import { PDFDocument, StandardFonts, rgb, PDFPage } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    let empleadosTotal = 0
    let recibosTotal = 0
    let horariosTotal = 0
    let confirmados = 0
    try {
      const connection = await getConnection()
      const [empleados] = await connection.execute("SELECT COUNT(*)::int as total FROM usuarios WHERE rol IN ('empleado','chofer')")
      const [recibos] = await connection.execute('SELECT COUNT(*)::int as total FROM recibos')
      const [horarios] = await connection.execute('SELECT COUNT(*)::int as total FROM horarios')
      try {
        const [ack] = await connection.execute('SELECT COUNT(*)::int as total FROM recibos WHERE acknowledged = TRUE')
        confirmados = (ack[0] as unknown as { total: number }).total || 0
      } catch {}
      await connection.end()
      empleadosTotal = (empleados[0] as unknown as { total: number })?.total || 0
      recibosTotal = (recibos[0] as unknown as { total: number })?.total || 0
      horariosTotal = (horarios[0] as unknown as { total: number })?.total || 0
    } catch {}

    const pdf = await PDFDocument.create()
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

    const addPage = (w = 595.28, h = 841.89) => pdf.addPage([w, h])
    const drawHeading = (page: PDFPage, text: string, y: number) => {
      page.drawText(text, { x: 40, y, size: 18, font: bold, color: rgb(0.09, 0.32, 0.69) })
    }
    const drawText = (page: PDFPage, text: string, y: number, size = 12) => {
      page.drawText(text, { x: 40, y, size, font, color: rgb(0.1, 0.1, 0.1) })
    }
    const drawBullet = (page: PDFPage, text: string, y: number) => {
      page.drawText('•', { x: 40, y, size: 12, font: bold })
      page.drawText(text, { x: 55, y, size: 12, font })
    }
    const drawFrame = (page: PDFPage, label: string, x: number, y: number, w: number, h: number) => {
      page.drawRectangle({ x, y, width: w, height: h, borderColor: rgb(0.8, 0.8, 0.8), borderWidth: 1 })
      page.drawText(label, { x: x + 8, y: y + h - 18, size: 10, font: bold, color: rgb(0.4, 0.4, 0.4) })
    }

    const cover = addPage()
    let logoBytes: Buffer | null = null
    try {
      const logoPath = path.join(process.cwd(), 'public', 'logo-LIBERTADOR-3.png')
      logoBytes = await fs.readFile(logoPath)
    } catch {}
    if (logoBytes) {
      const img = await pdf.embedPng(logoBytes)
      const dims = img.scale(0.5)
      cover.drawImage(img, { x: 40, y: 700, width: dims.width, height: dims.height })
    }
    drawHeading(cover, 'Informe del Sistema', 640)
    drawText(cover, 'Portal de recibos, horarios y notificaciones para empresas', 610)
    drawText(cover, 'Tecnología: Next.js, TypeScript, MySQL', 590)

    const p1 = addPage()
    drawHeading(p1, 'Resumen Ejecutivo', 800)
    drawBullet(p1, 'Gestión digital de recibos y horarios con verificación QR.', 770)
    drawBullet(p1, 'Portal de empleados/choferes y panel administrativo completo.', 750)
    drawBullet(p1, 'Avisos dirigidos y masivos con seguimiento de lectura.', 730)
    drawBullet(p1, `Empleados: ${empleadosTotal} · Recibos: ${recibosTotal} · Horarios: ${horariosTotal}`, 710)
    drawBullet(p1, `Recibos confirmados: ${confirmados}`, 690)

    drawHeading(p1, 'Módulos', 650)
    drawBullet(p1, 'Portal Choferes: login, descarga, confirmación y avisos.', 620)
    drawBullet(p1, 'Panel Admin: empleados, archivos, avisos y estadísticas.', 600)
    drawBullet(p1, 'Verificación: validación pública via QR.', 580)

    const p2 = addPage()
    drawHeading(p2, 'Funcionalidades', 800)
    drawBullet(p2, 'Subida y distribución de PDFs por empleado.', 770)
    drawBullet(p2, 'Estampado y verificación de QR.', 750)
    drawBullet(p2, 'Confirmación de recibido con trazabilidad.', 730)
    drawBullet(p2, 'Avisos con expiración y estado activo/inactivo.', 710)
    drawBullet(p2, 'Estadísticas: totales y últimos movimientos.', 690)

    drawHeading(p2, 'Flujos', 650)
    drawText(p2, 'Empleado: login → descarga → confirmar recibido → avisos.', 630)
    drawText(p2, 'Admin: login → gestiona empleados → sube archivos → avisos.', 610)

    const p3 = addPage()
    drawHeading(p3, 'Seguridad y Tecnologías', 800)
    drawBullet(p3, 'Next.js 15, TypeScript, Tailwind, MySQL.', 770)
    drawBullet(p3, 'Recomendado: contraseñas hasheadas y JWT en producción.', 750)
    drawBullet(p3, 'Validación de archivos y control de acceso.', 730)

    drawHeading(p3, 'Página Empresarial', 690)
    drawText(p3, 'Landing corporativa con secciones: Hero, Servicios, Nosotros, Contacto.', 670)
    drawText(p3, 'Accesos rápidos al Panel Admin y Portal de Choferes.', 650)

    const p4 = addPage()
    drawHeading(p4, 'Capturas', 800)
    drawFrame(p4, 'Home corporativa', 40, 620, 515, 150)
    drawFrame(p4, 'Portal Choferes', 40, 450, 515, 150)
    drawFrame(p4, 'Panel Admin: Avisos', 40, 280, 515, 150)
    drawFrame(p4, 'Verificación QR', 40, 110, 515, 150)
    drawText(p4, 'Se pueden insertar capturas reales en estos marcos.', 80)

    const p5 = addPage()
    drawHeading(p5, 'Beneficios para Empresas', 800)
    drawBullet(p5, 'Reducción de papel y costos operativos.', 770)
    drawBullet(p5, 'Entrega inmediata y verificación externa.', 750)
    drawBullet(p5, 'Mejor comunicación con avisos dirigidos y masivos.', 730)
    drawBullet(p5, 'Trazabilidad y métricas de uso.', 710)

    const bytes = await pdf.save()
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="informe-sistema.pdf"'
      }
    })
  } catch {
    return NextResponse.json({ error: 'Error generando informe' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
