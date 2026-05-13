import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/gdpr/delete
 * Body: { cliente_id: number; razon: string }
 * DPO-only. Soft delete + tombstone in gdpr_requests.
 * TODO Fase 1: replace with real Supabase UPDATE + INSERT.
 */
export async function POST(req: NextRequest) {
  // TODO Fase 2: auth check — admin + dpo_flag

  const body = await req.json().catch(() => null)
  if (!body?.cliente_id) {
    return NextResponse.json({ error: 'cliente_id required' }, { status: 400 })
  }
  if (!body?.razon) {
    return NextResponse.json({ error: 'razon required' }, { status: 400 })
  }

  // TODO Fase 1:
  // UPDATE clientes SET deleted_at = now(), pii_cleared = true WHERE id = cliente_id
  // INSERT INTO gdpr_requests { tipo: 'delete', razon, cliente_id, estado: 'completada' }
  // INSERT INTO audit_log { accion: 'gdpr_delete', row_id: cliente_id }

  return NextResponse.json({
    ok:         true,
    cliente_id: body.cliente_id,
    deleted_at: new Date().toISOString(),
    note:       'Soft delete — Supabase integration pending. Row will be tombstoned in Fase 1.',
  })
}
