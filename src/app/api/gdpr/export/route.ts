import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/gdpr/export
 * Body: { cliente_id: number }
 * DPO-only — requires Admin role with dpo_flag = true.
 * Returns JSON bundle of all PII for the client.
 * TODO Fase 1: replace with real Supabase query + ZIP generation.
 */
export async function POST(req: NextRequest) {
  // TODO Fase 2: validate session, check role === 'admin' && dpo_flag === true
  // const user = await getServerUser(req)
  // if (!user || user.role !== 'admin' || !user.dpo_flag) {
  //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  // }

  const body = await req.json().catch(() => null)
  if (!body?.cliente_id) {
    return NextResponse.json({ error: 'cliente_id required' }, { status: 400 })
  }

  // TODO Fase 1: query Supabase for all PII rows related to cliente_id
  // Record in gdpr_requests table
  // Generate ZIP and return as blob
  const bundle = {
    cliente_id:  body.cliente_id,
    exported_at: new Date().toISOString(),
    tables:      ['clientes', 'client_interactions', 'pipeline_deals', 'tasks', 'events'],
    data:        {},
    note:        'Supabase integration pending — data bundle will be populated in Fase 1.',
  }

  return NextResponse.json({ ok: true, bundle })
}
