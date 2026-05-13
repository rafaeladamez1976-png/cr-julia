const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL   = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash'
const BASE_URL       = 'https://generativelanguage.googleapis.com/v1beta/models'

interface GeminiPart    { text: string }
interface GeminiContent { role: 'user' | 'model'; parts: GeminiPart[] }

async function generate(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured')

  const contents: GeminiContent[] = [{ role: 'user', parts: [{ text: prompt }] }]

  const res = await fetch(`${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ contents }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${err}`)
  }

  const data = await res.json() as {
    candidates: Array<{ content: { parts: GeminiPart[] } }>
  }
  return data.candidates[0]?.content.parts[0]?.text ?? ''
}

// ── Public helpers ──────────────────────────────────────────────────────────

export async function resumirNotasCliente(notas: string[]): Promise<string> {
  const prompt = `Eres asistente de una agencia inmobiliaria premium de compradores. Resume de forma concisa y profesional las siguientes notas de cliente en 2-3 frases:\n\n${notas.join('\n')}`
  return generate(prompt)
}

export async function generarFollowUpEmail(params: {
  nombreCliente: string
  propiedad:     string
  etapa:         string
  notas?:        string
}): Promise<string> {
  const prompt = `Eres agente inmobiliario premium. Redacta un email de seguimiento profesional y breve (máx. 150 palabras) para el cliente ${params.nombreCliente} tras una visita a ${params.propiedad}. Etapa actual: ${params.etapa}. ${params.notas ? `Notas: ${params.notas}` : ''}`
  return generate(prompt)
}

export async function analizarSentimiento(texto: string): Promise<'positivo' | 'neutro' | 'negativo'> {
  const prompt = `Clasifica el sentimiento del siguiente texto en una sola palabra (positivo, neutro o negativo):\n\n"${texto}"\n\nResponde solo con la palabra.`
  const result = (await generate(prompt)).trim().toLowerCase()
  if (result.includes('positivo')) return 'positivo'
  if (result.includes('negativo')) return 'negativo'
  return 'neutro'
}

export async function matchingPropiedades(params: {
  perfilCliente: string
  propiedades:   string[]
}): Promise<string> {
  const prompt = `Eres experto inmobiliario. Dado el perfil del cliente: "${params.perfilCliente}", analiza las siguientes propiedades y recomienda las 3 más adecuadas con una breve justificación:\n\n${params.propiedades.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
  return generate(prompt)
}
