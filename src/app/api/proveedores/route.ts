import { NextRequest, NextResponse } from 'next/server'
import { ProveedorSchema } from '@/lib/schemas/proveedor'
import { sendSlackNotification } from '@/lib/slack'

const mockProveedores: unknown[] = []

export async function GET(_req: NextRequest) {
  return NextResponse.json({ data: mockProveedores })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = ProveedorSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newProveedor = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }

  await sendSlackNotification({
    event:   'nuevo_proveedor',
    title:   'Nuevo proveedor registrado',
    message: `${parsed.data.razon_social} (${parsed.data.servicio}) añadido a la red de proveedores.`,
  })

  return NextResponse.json({ data: newProveedor }, { status: 201 })
}
