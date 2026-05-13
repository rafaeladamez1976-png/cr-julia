import { NextRequest, NextResponse } from 'next/server'
import { ClienteSchema } from '@/lib/schemas/cliente'
import { sendSlackNotification } from '@/lib/slack'

// TODO Fase 1: replace mock with Supabase client
const mockClientes: unknown[] = []

export async function GET(_req: NextRequest) {
  // TODO: const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false })
  return NextResponse.json({ data: mockClientes })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = ClienteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  // TODO: const { data, error } = await supabase.from('clientes').insert(parsed.data).select().single()
  const newCliente = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }

  await sendSlackNotification({
    event:   'nuevo_cliente',
    title:   'Nuevo cliente registrado',
    message: `${parsed.data.nombre} ha sido dado de alta en el CRM.`,
  })

  return NextResponse.json({ data: newCliente }, { status: 201 })
}
