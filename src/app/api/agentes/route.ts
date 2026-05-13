import { NextRequest, NextResponse } from 'next/server'
import { AgenteSchema } from '@/lib/schemas/agente'

const mockAgentes: unknown[] = []

export async function GET(_req: NextRequest) {
  // TODO: Supabase query
  return NextResponse.json({ data: mockAgentes })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = AgenteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newAgente = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }
  return NextResponse.json({ data: newAgente }, { status: 201 })
}
