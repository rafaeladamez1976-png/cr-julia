const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export type SlackEvent =
  | 'nuevo_cliente'
  | 'cambio_etapa'
  | 'reunion_proxima'
  | 'cierre_operacion'
  | 'alerta_inactividad'
  | 'nuevo_proveedor'

interface SlackPayload {
  event:   SlackEvent
  title:   string
  message: string
  url?:    string
  color?:  'good' | 'warning' | 'danger' | string
}

export async function sendSlackNotification(payload: SlackPayload): Promise<void> {
  if (!SLACK_WEBHOOK_URL) {
    console.warn('[slack] SLACK_WEBHOOK_URL not set — notification skipped')
    return
  }

  const colorMap: Record<SlackEvent, string> = {
    nuevo_cliente:      '#0d9488',
    cambio_etapa:       '#6366f1',
    reunion_proxima:    '#d97706',
    cierre_operacion:   '#10b981',
    alerta_inactividad: '#ef4444',
    nuevo_proveedor:    '#8b5cf6',
  }

  const body = {
    attachments: [
      {
        color:      payload.color ?? colorMap[payload.event],
        title:      payload.title,
        text:       payload.message,
        footer:     'MAGNA CRM',
        ts:         Math.floor(Date.now() / 1000),
        ...(payload.url ? { title_link: payload.url } : {}),
      },
    ],
  }

  const res = await fetch(SLACK_WEBHOOK_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('[slack] webhook failed', res.status, await res.text())
  }
}
