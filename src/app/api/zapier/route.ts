import { NextRequest, NextResponse } from 'next/server'

const ZAPIER_SECRET = process.env.ZAPIER_WEBHOOK_SECRET

/**
 * Generic Zapier inbound webhook.
 * POST /api/zapier  { event: string; payload: Record<string, unknown> }
 * Header: x-zapier-secret must match ZAPIER_WEBHOOK_SECRET env var.
 */
export async function POST(req: NextRequest) {
  // Validate secret header
  const secret = req.headers.get('x-zapier-secret')
  if (!ZAPIER_SECRET || secret !== ZAPIER_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { event?: string; payload?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event, payload } = body
  if (!event) {
    return NextResponse.json({ error: 'Missing event field' }, { status: 400 })
  }

  // TODO Fase 4: route event to Supabase handler / Slack notification
  console.info('[zapier]', event, payload)

  return NextResponse.json({ ok: true, event, received_at: new Date().toISOString() })
}

// Zapier polling check (required for Zap trigger verification)
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-zapier-secret')
  if (!ZAPIER_SECRET || secret !== ZAPIER_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ ok: true, service: 'MAGNA CRM', version: '1.0' })
}
