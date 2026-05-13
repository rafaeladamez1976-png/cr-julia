import { z } from 'zod'

export const AgenciaSchema = z.object({
  razon_social: z.string().min(2, 'Razón social requerida'),
  contacto:     z.string().min(2, 'Nombre de contacto requerido'),
  email:        z.string().email('Email inválido'),
  telefono:     z.string().min(9, 'Teléfono inválido'),
  ciudad:       z.string().min(2, 'Ciudad requerida'),
  especialidad: z.string().min(2, 'Especialidad requerida'),
  rating:       z.number().int().min(1).max(5).default(3),
  notas:        z.string().optional(),
  web:          z.string().url().optional().or(z.literal('')),
})

export const AgenciaUpdateSchema = AgenciaSchema.partial()

export type AgenciaInput  = z.infer<typeof AgenciaSchema>
export type AgenciaUpdate = z.infer<typeof AgenciaUpdateSchema>
