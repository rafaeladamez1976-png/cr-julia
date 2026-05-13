import { z } from 'zod'

export const ClienteSchema = z.object({
  nombre:              z.string().min(2, 'Nombre requerido'),
  email:               z.string().email('Email inválido'),
  telefono:            z.string().min(9, 'Teléfono inválido'),
  nif:                 z.string().min(8, 'NIF/NIE/CIF requerido').optional(),
  domicilio:           z.string().optional(),
  web:                 z.string().url('URL inválida').optional().or(z.literal('')),
  idioma:              z.enum(['Español', 'Inglés', 'Francés', 'Alemán', 'Otro']).default('Español'),
  origen:              z.enum(['Referido', 'Web', 'Redes Sociales', 'Evento', 'Otro']).default('Web'),
  presupuesto_min:     z.number().positive().optional(),
  presupuesto_max:     z.number().positive().optional(),
  zona:                z.string().optional(),
  tipo_inmueble:       z.string().optional(),
  superficie_min:      z.number().positive().optional(),
  status:              z.enum(['Activo', 'Templado', 'Dormido', 'Cerrado']).default('Activo'),
  score:               z.number().min(0).max(100).default(50),
  aml_status:          z.enum(['pendiente', 'aprobado', 'rechazado']).default('pendiente'),
  identidad_protegida: z.boolean().default(false),
  representante_legal: z.string().optional(),
  notas_confidenciales: z.string().optional(),
  rgpd_consent:        z.boolean().refine(v => v === true, { message: 'El consentimiento RGPD es obligatorio' }),
  rgpd_marketing:      z.boolean().default(false),
  owner_id:            z.string().uuid().optional(),
})

export const ClienteUpdateSchema = ClienteSchema.partial().omit({ rgpd_consent: true })

export type ClienteInput  = z.infer<typeof ClienteSchema>
export type ClienteUpdate = z.infer<typeof ClienteUpdateSchema>
