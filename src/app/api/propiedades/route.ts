import { NextRequest, NextResponse } from 'next/server'
import { PropiedadSchema } from '@/lib/schemas/propiedad'

const mockPropiedades: unknown[] = []

export async function GET(_req: NextRequest) {
  return NextResponse.json({ data: mockPropiedades })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = PropiedadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newPropiedad = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }
  return NextResponse.json({ data: newPropiedad }, { status: 201 })
}
