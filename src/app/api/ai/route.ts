import { NextRequest, NextResponse } from 'next/server'
import {
  resumirNotasCliente,
  generarFollowUpEmail,
  analizarSentimiento,
  matchingPropiedades,
} from '@/lib/gemini'

type AiAction = 'resumir_notas' | 'followup_email' | 'sentimiento' | 'matching'

/**
 * POST /api/ai
 * Body: { action: AiAction; payload: object }
 */
export async function POST(req: NextRequest) {
  // TODO Fase 2: require auth session
  const body = await req.json().catch(() => null)
  if (!body?.action) {
    return NextResponse.json({ error: 'action required' }, { status: 400 })
  }

  try {
    const action  = body.action as AiAction
    const payload = body.payload ?? {}
    let result: unknown

    switch (action) {
      case 'resumir_notas':
        result = await resumirNotasCliente(payload.notas ?? [])
        break
      case 'followup_email':
        result = await generarFollowUpEmail(payload)
        break
      case 'sentimiento':
        result = await analizarSentimiento(payload.texto ?? '')
        break
      case 'matching':
        result = await matchingPropiedades(payload)
        break
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }

    return NextResponse.json({ ok: true, result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
