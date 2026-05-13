import { z } from 'zod'

export const PropiedadSchema = z.object({
  direccion:      z.string().min(5, 'Dirección requerida'),
  referencia:     z.string().optional(),
  tipo:           z.enum(['Piso', 'Ático', 'Chalet', 'Casa', 'Local', 'Oficina', 'Parking', 'Otro']),
  precio:         z.number().positive('Precio debe ser positivo'),
  area:           z.number().positive('Superficie debe ser positiva'),
  habitaciones:   z.number().int().min(0).default(0),
  banos:          z.number().int().min(0).default(0),
  planta:         z.string().optional(),
  caracteristicas: z.string().optional(),
  off_market:     z.boolean().default(false),
  status:         z.enum(['Disponible', 'Reservada', 'Vendida']).default('Disponible'),
  agencia_id:     z.number().int().positive().optional(),
  collab:         z.string().optional(),
})

export const PropiedadUpdateSchema = PropiedadSchema.partial()

export type PropiedadInput  = z.infer<typeof PropiedadSchema>
export type PropiedadUpdate = z.infer<typeof PropiedadUpdateSchema>
