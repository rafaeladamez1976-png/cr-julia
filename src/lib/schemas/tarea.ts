import { z } from 'zod'

export const TareaSchema = z.object({
  titulo:     z.string().min(3, 'Título requerido'),
  cliente_id: z.number().int().positive().optional(),
  cliente:    z.string().optional(),
  prioridad:  z.enum(['urgente', 'alta', 'media', 'baja']).default('media'),
  due_date:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD'),
  status:     z.enum(['pendiente', 'en_progreso', 'completada']).default('pendiente'),
  tipo:       z.enum(['call', 'meeting', 'document', 'visit', 'update', 'other']).default('other'),
  notas:      z.string().optional(),
  owner_id:   z.string().uuid().optional(),
})

export const TareaUpdateSchema = TareaSchema.partial()

export type TareaInput  = z.infer<typeof TareaSchema>
export type TareaUpdate = z.infer<typeof TareaUpdateSchema>
