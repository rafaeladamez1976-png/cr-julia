import { NextRequest, NextResponse } from 'next/server'
import { AgenciaSchema } from '@/lib/schemas/agencia'

const mockAgencias: unknown[] = []

export async function GET(_req: NextRequest) {
  return NextResponse.json({ data: mockAgencias })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = AgenciaSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newAgencia = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }
  return NextResponse.json({ data: newAgencia }, { status: 201 })
}
