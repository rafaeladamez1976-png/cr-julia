import { z } from 'zod'

export const SERVICIOS = [
  'AML',
  'Agentes de Viajes',
  'Transporte',
  'Alojamiento',
  'Financiación',
  'Reformas',
  'Decoración',
  'Asesoría Legal',
  'Notaría',
  'Otro',
] as const

export const ProveedorSchema = z.object({
  razon_social: z.string().min(2, 'Razón social requerida'),
  contacto:     z.string().min(2, 'Contacto requerido'),
  cargo:        z.string().optional(),
  telefono:     z.string().min(9, 'Teléfono inválido'),
  email:        z.string().email('Email inválido'),
  cif:          z.string().min(8, 'CIF requerido').optional(),
  servicio:     z.enum(SERVICIOS),
  coste:        z.string().optional(),
  web:          z.string().optional(),
  rrss: z.object({
    ig:     z.string().optional(),
    lkn:    z.string().optional(),
    fb:     z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
})

export const ProveedorUpdateSchema = ProveedorSchema.partial()

export type ProveedorInput  = z.infer<typeof ProveedorSchema>
export type ProveedorUpdate = z.infer<typeof ProveedorUpdateSchema>
export type Servicio        = typeof SERVICIOS[number]
