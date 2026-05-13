import { z } from 'zod'

export const PIPELINE_STAGES_ENUM = [
  'Discovery',
  'Contacto',
  'Reunión',
  'Propuesta',
  'Mandatos',
  'Property Assessment',
  'Elección Inmueble',
  'Negociación',
  'Compra',
] as const

export const DealSchema = z.object({
  cliente_id:      z.number().int().positive(),
  agente_id:       z.number().int().positive().optional(),
  propiedad_id:    z.number().int().positive().optional(),
  etapa:           z.enum(PIPELINE_STAGES_ENUM).default('Discovery'),
  valor_estimado:  z.number().positive().optional(),
  presupuesto:     z.string().optional(),
  zona:            z.string().optional(),
  score:           z.number().int().min(0).max(100).default(50),
  notas:           z.string().optional(),
})

export const DealUpdateSchema = DealSchema.partial()
export const DealMoveSchema   = z.object({ etapa: z.enum(PIPELINE_STAGES_ENUM) })

export type DealInput  = z.infer<typeof DealSchema>
export type DealUpdate = z.infer<typeof DealUpdateSchema>
export type PipelineStage = typeof PIPELINE_STAGES_ENUM[number]
