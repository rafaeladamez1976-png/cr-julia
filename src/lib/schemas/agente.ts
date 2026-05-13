import { z } from 'zod'

export const KpisSchema = z.object({
  llamadas:               z.number().int().min(0).default(0),
  reuniones:              z.number().int().min(0).default(0),
  propuestas:             z.number().int().min(0).default(0),
  inmuebles_contactados:  z.number().int().min(0).default(0),
  inmuebles_visitados:    z.number().int().min(0).default(0),
  inmuebles_presentados:  z.number().int().min(0).default(0),
  compras:                z.number().int().min(0).default(0),
})

export const AgenteSchema = z.object({
  nombre:   z.string().min(2, 'Nombre requerido'),
  email:    z.string().email('Email inválido'),
  telefono: z.string().min(9, 'Teléfono inválido'),
  rol:      z.enum(['Agente Senior', 'Agente Junior', 'Manager', 'Admin']).default('Agente Junior'),
  activo:   z.boolean().default(true),
  kpis:     KpisSchema.optional(),
})

export const AgenteUpdateSchema = AgenteSchema.partial()

export type AgenteInput  = z.infer<typeof AgenteSchema>
export type AgenteUpdate = z.infer<typeof AgenteUpdateSchema>
export type Kpis         = z.infer<typeof KpisSchema>
