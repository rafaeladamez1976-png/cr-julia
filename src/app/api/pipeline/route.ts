import { NextRequest, NextResponse } from 'next/server'
import { DealSchema, DealMoveSchema } from '@/lib/schemas/deal'
import { sendSlackNotification } from '@/lib/slack'

const mockDeals: unknown[] = []

export async function GET(_req: NextRequest) {
  return NextResponse.json({ data: mockDeals })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = DealSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const newDeal = { id: Date.now(), ...parsed.data, created_at: new Date().toISOString() }
  return NextResponse.json({ data: newDeal }, { status: 201 })
}

// PATCH /api/pipeline { dealId, etapa } — move deal to next stage
export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { dealId, ...moveData } = body
  const parsed = DealMoveSchema.safeParse(moveData)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  // TODO: update Supabase pipeline_deals
  await sendSlackNotification({
    event:   'cambio_etapa',
    title:   'Deal avanzó en el pipeline',
    message: `Deal #${dealId} movido a etapa: ${parsed.data.etapa}`,
  })

  return NextResponse.json({ ok: true, dealId, etapa: parsed.data.etapa })
}
