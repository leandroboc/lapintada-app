import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';
import QRCode from 'qrcode'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import crypto from 'crypto'

export const runtime = 'nodejs'


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuario_id');
    const downloadId = searchParams.get('download_id');
    const dni = searchParams.get('dni');
    const desde = searchParams.get('desde');
    const hasta = searchParams.get('hasta');

    const connection = await getConnection();

    if (downloadId) {
      const [rows] = await connection.execute(
        'SELECT archivo, mime_type, nombre_archivo FROM recibos WHERE id = ?',
        [downloadId]
      );
      await connection.end();
      const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
      if (!row || !row.archivo) {
        return new NextResponse('Not Found', { status: 404 });
      }
      const buffer = Buffer.from(row.archivo);
      const isPdf = (row.mime_type || '').toLowerCase().includes('pdf') || (row.nombre_archivo || '').toLowerCase().endsWith('.pdf')
      if (!isPdf) {
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': row.mime_type || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${row.nombre_archivo || 'archivo'}"`
          }
        });
      }

      const proto = request.headers.get('x-forwarded-proto') || 'http'
      const host = request.headers.get('host') || 'localhost:3000'
      const baseUrl = `${proto}://${host}`
      const secret = process.env.QR_SECRET || 'libertador_qr_secret_development_only'
      const sig = crypto.createHmac('sha256', secret).update(String(downloadId)).digest('hex')
      const verifyUrl = `${baseUrl}/verificacion?rid=${downloadId}&sig=${sig}`

      const qrPng = await QRCode.toBuffer(verifyUrl, { type: 'png', width: 180, margin: 1 })
      const pdfDoc = await PDFDocument.load(buffer)
      const page = pdfDoc.getPages()[0]
      const pngImage = await pdfDoc.embedPng(qrPng)
      const { width } = page.getSize()
      const qrWidth = 96
      const qrHeight = (pngImage.height / pngImage.width) * qrWidth
      const margin = 24
      const x = width - qrWidth - margin
      const y = margin
      page.drawImage(pngImage, { x, y, width: qrWidth, height: qrHeight })
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const legend = 'Verificación QR — escanear para validar autenticidad'
      const size = 10
      const textWidth = font.widthOfTextAtSize(legend, size)
      const textX = x - 12 - textWidth
      const textY = y + (qrHeight / 2) - (size / 2)
      page.drawText(legend, { x: textX, y: textY, size, font, color: rgb(0, 0, 0) })
      const stamped = await pdfDoc.save()

      return new NextResponse(Buffer.from(stamped), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${row.nombre_archivo || 'recibo.pdf'}"`
        }
      });
    }

    const params: (string | number)[] = []
    const whereParts: string[] = []

    if (usuarioId) {
      params.push(Number(usuarioId))
      whereParts.push('r.usuario_id = ?')
    }

    let dniUsuarioId: number | null = null
    if (dni) {
      try {
        const [uRows] = await connection.execute(
          'SELECT id FROM usuarios WHERE dni_admin = $1 LIMIT 1',
          [dni]
        )
        const uRow = Array.isArray(uRows) && uRows.length > 0 ? (uRows[0] as unknown as { id: number }) : null
        if (!uRow) {
          await connection.end()
          return NextResponse.json({ recibos: [] })
        }
        dniUsuarioId = Number(uRow.id)
      } catch {
        await connection.end()
        return NextResponse.json({ recibos: [] })
      }
      params.push(dniUsuarioId)
      whereParts.push('r.usuario_id = ?')
    }

    if (desde) {
      params.push(`${desde} 00:00:00`)
      whereParts.push('r.fecha_subida >= ?')
    }
    if (hasta) {
      params.push(`${hasta} 23:59:59`)
      whereParts.push('r.fecha_subida <= ?')
    }

    const whereSQL = whereParts.length ? ` WHERE ${whereParts.join(' AND ')}` : ''
    const base = `FROM recibos r LEFT JOIN usuarios u ON r.usuario_id = u.id${whereSQL} ORDER BY r.fecha_subida DESC`

    const queriesAll = [
      `SELECT r.id, r.usuario_id, r.nombre_archivo, r.mime_type, r.size, r.fecha_subida, r.acknowledged, r.acknowledged_at, u.nombre, u.apellido, u.dni_admin AS dni ${base}`,
      `SELECT r.id, r.usuario_id, r.nombre_archivo, r.mime_type, r.size, r.fecha_subida, r.acknowledged, r.acknowledged_at, u.nombre, u.dni_admin AS dni ${base}`,
      `SELECT r.id, r.usuario_id, r.nombre_archivo, r.fecha_subida, r.acknowledged, r.acknowledged_at, u.nombre, u.dni_admin AS dni ${base}`,
      `SELECT r.id, r.usuario_id, r.nombre_archivo, r.fecha_subida, u.nombre, u.dni_admin AS dni ${base}`,
      `SELECT r.id, r.usuario_id, r.nombre_archivo, r.fecha_subida ${base.replace(' LEFT JOIN usuarios u ON r.usuario_id = u.id', '')}`,
    ]

    const queriesUser = queriesAll

    let rows: unknown[] = []
    const list = usuarioId ? queriesUser : queriesAll
    for (const q of list) {
      try {
        const [res] = await connection.execute(q, params)
        rows = res
        break
      } catch {
        // try next query
      }
    }
    await connection.end();
    return NextResponse.json({ recibos: rows });

  } catch (error) {
    console.error('Error obteniendo recibos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const usuarioIdRaw = form.get('usuario_id');
      const file = form.get('file') as File | null;
      const altFile = form.get('archivo') as File | null;
      const f = file || altFile;
      if (!usuarioIdRaw || !f) {
        return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
      }
      const usuarioId = Number(usuarioIdRaw);
      const arrayBuffer = await f.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const nombre = form.get('nombre_archivo')?.toString() || f.name || 'recibo.pdf';
      const mime = f.type || 'application/pdf';
      const size = buffer.length;
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO recibos (usuario_id, nombre_archivo, mime_type, size, archivo) VALUES (?, ?, ?, ?, ?) RETURNING id',
        [usuarioId, nombre, mime, size, buffer]
      );
      await connection.end();
      return NextResponse.json({ message: 'Recibo subido exitosamente', id: (result[0] as { id: number })?.id });
    } else {
      const { usuario_id, nombre_archivo, ruta_archivo } = await request.json();
      if (!usuario_id || !nombre_archivo || !ruta_archivo) {
        return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
      }
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO recibos (usuario_id, nombre_archivo, ruta_archivo) VALUES (?, ?, ?) RETURNING id',
        [usuario_id, nombre_archivo, ruta_archivo]
      );
      await connection.end();
      return NextResponse.json({ message: 'Recibo subido exitosamente', id: (result[0] as { id: number })?.id });
    }
  } catch (error) {
    console.error('Error subiendo recibo:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json() as { id?: number; usuario_id?: number; reassign_to?: number }
    const { id, usuario_id, reassign_to } = body
    if (!id) {
      return NextResponse.json({ error: 'id requerido' }, { status: 400 })
    }
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT id, usuario_id FROM recibos WHERE id = ? LIMIT 1',
      [id]
    );
    type RecRow = { id: number; usuario_id: number }
    const rec = Array.isArray(rows) && rows.length > 0 ? (rows[0] as unknown as RecRow) : null;
    if (!rec) {
      await connection.end();
      return NextResponse.json({ error: 'Recibo no encontrado' }, { status: 404 });
    }
    try {
      await connection.execute(
        'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged BOOLEAN NOT NULL DEFAULT FALSE'
      )
      await connection.execute(
        'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged_at TIMESTAMP NULL'
      )
      await connection.execute(
        'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged_by INT NULL'
      )
    } catch {}
    if (reassign_to && Number(reassign_to) !== Number(rec.usuario_id)) {
      await connection.execute(
        'UPDATE recibos SET usuario_id = ?, acknowledged = FALSE, acknowledged_at = NULL, acknowledged_by = NULL WHERE id = ?',
        [reassign_to, id]
      )
      await connection.end()
      return NextResponse.json({ message: 'Recibo reasignado' })
    }
    if (!usuario_id || Number(rec.usuario_id) !== Number(usuario_id)) {
      await connection.end();
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }
    try {
      await connection.execute(
        'UPDATE recibos SET acknowledged = TRUE, acknowledged_at = CURRENT_TIMESTAMP, acknowledged_by = ? WHERE id = ?',
        [usuario_id, id]
      );
    } catch {
      await connection.end();
      return NextResponse.json({ error: 'No se pudo marcar recibido' }, { status: 500 });
    }
    await connection.end();
    return NextResponse.json({ message: 'Recibo marcado como recibido' });
  } catch (error) {
    console.error('Error marcando recibido:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
