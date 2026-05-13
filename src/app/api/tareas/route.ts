import { NextRequest, NextResponse } from 'next/server'
import { TareaSchema } from '@/lib/schemas/tarea'

const mockTareas: unknown[] = []

export async function GET(_req: NextRequest) {
  return NextResponse.json({ data: mockTareas })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = TareaSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newTarea = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }
  return NextResponse.json({ data: newTarea }, { status: 201 })
}
