import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/gdpr/anonymize
 * Body: { cliente_id: number }
 * DPO-only. Hashes PII fields, keeps aggregate data for analytics.
 * TODO Fase 1: replace with real Supabase UPDATE.
 */
export async function POST(req: NextRequest) {
  // TODO Fase 2: auth check — admin + dpo_flag

  const body = await req.json().catch(() => null)
  if (!body?.cliente_id) {
    return NextResponse.json({ error: 'cliente_id required' }, { status: 400 })
  }

  // TODO Fase 1:
  // const piiFields = ['nombre', 'email', 'telefono', 'nif', 'domicilio']
  // UPDATE clientes SET nombre='ANONIMIZADO', email=sha256(email), ... WHERE id = cliente_id
  // INSERT INTO audit_log { accion: 'gdpr_anonymize', row_id: cliente_id }
  // INSERT INTO gdpr_requests { tipo: 'anonymize', estado: 'completada' }

  return NextResponse.json({
    ok:          true,
    cliente_id:  body.cliente_id,
    anonymized_at: new Date().toISOString(),
    note:        'Supabase integration pending — anonymization will execute in Fase 1.',
  })
}
