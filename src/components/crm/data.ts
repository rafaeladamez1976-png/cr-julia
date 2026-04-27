export const INITIAL_CLIENTS = [
  { id: 1, name: 'Ignacio Valdés', phone: '+34 612 345 678', email: 'ivaldes@email.com', budget: '1.2M - 1.5M €', zone: 'Salamanca, Retiro', status: 'Activo', date: '02 Abr 2026', origin: 'Referido', type: 'Piso', size: '150+', score: 92, notes: 'Busca techos altos y molduras originales.', avatar: 'IV', interactions: [
    { type: 'phone', date: '08 Abr', text: 'Confirmación de interés en C/ Serrano 45.' },
    { type: 'message', date: '05 Abr', text: 'Enviado dossier de propiedades en Retiro.' },
    { type: 'meeting', date: '02 Abr', text: 'Reunión inicial de cualificación.' }
  ]},
  { id: 2, name: 'Beatriz Soler', phone: '+34 688 900 122', email: 'bsoler@email.com', budget: '850k - 1.1M €', zone: 'Chamberí, Justicia', status: 'Templado', date: '28 Mar 2026', origin: 'Web', type: 'Ático', size: '100+', score: 74, notes: 'Prioriza terraza con vistas.', avatar: 'BS', interactions: [
    { type: 'message', date: '01 Abr', text: 'Consulta sobre gastos de comunidad.' },
    { type: 'phone', date: '28 Mar', text: 'Llamada de prospección.' }
  ]},
  { id: 3, name: 'Marc Torrens', phone: '+34 655 433 211', email: 'mtorrens@email.com', budget: '2.5M - 3.2M €', zone: 'La Moraleja', status: 'Cerrado', date: '15 Feb 2026', origin: 'Evento', type: 'Chalet', size: '400+', score: 98, notes: 'Comprador recurrente.', avatar: 'MT', interactions: [
    { type: 'meeting', date: '15 Feb', text: 'Firma de contrato de compraventa.' }
  ]},
  { id: 4, name: 'Elena García', phone: '+34 600 111 222', email: 'e.garcia@email.com', budget: '600k - 750k €', zone: 'Arganzuela, Lavapiés', status: 'Activo', date: '05 Abr 2026', origin: 'Redes Sociales', type: 'Piso', size: '80+', score: 65, notes: 'Busca inversión para alquiler.', avatar: 'EG', interactions: [
    { type: 'phone', date: '07 Abr', text: 'Interés en obra nueva zona Delicias.' }
  ]},
  { id: 5, name: 'Jorge Méndez', phone: '+34 622 777 888', email: 'j.mendez@email.com', budget: '450k - 500k €', zone: 'Carabanchel, Latina', status: 'Dormido', date: '10 Ene 2026', origin: 'Web', type: 'Piso', size: '70+', score: 35, notes: 'Pausó búsqueda por motivos personales.', avatar: 'JM', interactions: [
    { type: 'message', date: '20 Ene', text: 'Informa que no visitará en el primer trimestre.' }
  ]},
  { id: 6, name: 'Sofía Navarro', phone: '+34 699 555 444', email: 'snavarro@email.com', budget: '1.8M - 2.2M €', zone: 'Puerta de Hierro', status: 'Activo', date: '07 Abr 2026', origin: 'Referido', type: 'Casa', size: '250+', score: 88, notes: 'Necesita jardín privado y seguridad 24h.', avatar: 'SN', interactions: [
    { type: 'meeting', date: '08 Abr', text: 'Primera visita a parcela en Peñalar.' }
  ]},
]

export const INITIAL_COLLABORATORS = [
  { id: 1, agency: 'Inmobiliaria Goya', contact: 'Marisa Gil', email: 'goya@inmo.com', phone: '+34 912 345 678', city: 'Madrid', specialty: 'Lujo', rating: 5, shared: 12, notes: 'Socios estratégicos para el Barrio de Salamanca.', history: [
    { date: '05 Abr 2026', text: 'Nueva propiedad compartida: Ático en C/ Lagasca.' },
    { date: '28 Mar 2026', text: 'Cierre exitoso de operación combinada - Cliente Valdés.' },
    { date: '10 Mar 2026', text: 'Actualización de catálogo premium trimestral.' }
  ], properties: [
    { address: 'Calle de Serrano 45', type: 'Piso', price: '2.4M €', status: 'Activo' },
    { address: 'Paseo de la Castellana 112', type: 'Locales', price: '4.1M €', status: 'Activo' }
  ]},
  { id: 2, agency: 'Barcelona Luxury Homes', contact: 'Jordi Alomar', email: 'jordi@bcnluxury.com', phone: '+34 932 777 888', city: 'Barcelona', specialty: 'Residencial', rating: 4, shared: 8, notes: 'Especialistas en fincas regias del Eixample.', history: [
    { date: '01 Abr 2026', text: 'Consulta sobre disponibilidad en Pedralbes.' }
  ], properties: [
    { address: 'Carrer de Mallorca 240', type: 'Piso', price: '1.2M €', status: 'Reservado' }
  ]},
  { id: 3, agency: 'Marbella Estates', contact: 'Carmen Ruiz', email: 'carmen@marbella.com', phone: '+34 952 111 222', city: 'Marbella', specialty: 'Vacacional', rating: 5, shared: 15, notes: 'Líderes en villas de la Zagaleta.', history: [
    { date: '08 Abr 2026', text: 'Dossier de preventas off-market recibido.' }
  ], properties: [
    { address: 'VILLA LA ZAGALETA', type: 'Chalet', price: '12.5M €', status: 'Activo' }
  ]},
  { id: 4, agency: 'Levante Proyectos', contact: 'Pau Ferrer', email: 'pau@levante.es', phone: '+34 963 444 555', city: 'Valencia', specialty: 'Obra Nueva', rating: 3, shared: 4, notes: 'Contactos directos con promotoras locales.', history: [
    { date: '15 Mar 2026', text: 'Presentación de nueva promoción en Playa Patacona.' }
  ], properties: [
    { address: 'Residencial Mar de Luz', type: 'Piso', price: '450k €', status: 'Activo' }
  ]},
  { id: 5, agency: 'Andalucía Real Estate', contact: 'Andrés Vera', email: 'avera@and.com', phone: '+34 954 123 456', city: 'Sevilla', specialty: 'Comercial', rating: 4, shared: 6, notes: 'Gran red de activos singulares en el centro.', history: [
    { date: '02 Abr 2026', text: 'Reunión de planificación estratégica Q2.' }
  ], properties: [
    { address: 'Plaza de San Francisco 2', type: 'Local', price: '1.8M €', status: 'Activo' }
  ]}
]

export const INITIAL_PROPERTIES = [
  { id: 1, address: 'Calle de Serrano 45, 4º Izq', ref: 'MAG-SER45', type: 'Piso', price: '2.450.000 €', collab: 'Inmobiliaria Goya', interested: 3, status: 'Disponible', area: '175 m²', rooms: 3, baths: 3, floor: '4º', features: 'Vistas al Retiro, techos altos, portero físico.', history: [
    { date: '05 Abr 2026', text: 'Propiedad dada de alta en colaboración.' },
    { date: '08 Abr 2026', text: 'Visita realizada por Cliente Valdés.' }
  ], linkedClients: ['Ignacio Valdés', 'Sofía Navarro'] },
  { id: 2, address: 'Don Ramón de la Cruz 12', ref: 'MAG-DRC12', type: 'Piso', price: '1.180.000 €', collab: 'Directo Prop.', interested: 5, status: 'Reservada', area: '120 m²', rooms: 2, baths: 2, floor: '2º', features: 'Totalmente reformado, mucha luz, balcón a la calle.', history: [
    { date: '20 Mar 2026', text: 'Señalizada por Beatriz Soler.' }
  ], linkedClients: ['Beatriz Soler'] },
  { id: 3, address: 'Paseo de la Castellana 112', ref: 'MAG-CAS112', type: 'Ático', price: '4.200.000 €', collab: 'Barcelona Luxury', interested: 2, status: 'Disponible', area: '310 m²', rooms: 4, baths: 4, floor: 'Ático', features: 'Terraza perimetral de 80m², piscina privada.', history: [
    { date: '12 Feb 2026', text: 'Bajada de precio de 4.5M a 4.2M.' }
  ], linkedClients: ['Marc Torrens'] },
  { id: 4, address: 'VILLA LA ZAGALETA', ref: 'MAG-ZAG10', type: 'Chalet', price: '12.500.000 €', collab: 'Marbella Estates', interested: 1, status: 'Vendida', area: '1100 m²', rooms: 7, baths: 8, floor: 'Triple', features: 'Seguridad máxima, garaje para 10 coches.', history: [
    { date: '05 Ene 2026', text: 'Operación cerrada con éxito.' }
  ], linkedClients: [] },
  { id: 5, address: 'Calle Mayor 10, Local', ref: 'MAG-COM10', type: 'Local', price: '890.000 €', collab: 'Levante Proy.', interested: 4, status: 'Disponible', area: '200 m²', rooms: 0, baths: 1, floor: 'Bajo', features: 'Salida de humos instalada, gran escaparate.', history: [
    { date: '10 Abr 2026', text: 'Solicitud de licencia de terraza enviada.' }
  ], linkedClients: ['Elena García'] },
]

export const INITIAL_PIPELINE = [
  { id: 101, name: 'Ricardo Darín', budget: '1.2M€ – 1.5M€', zone: 'Salamanca', stage: 'Primer Contacto', days: 2, score: 72 },
  { id: 102, name: 'Elena García', budget: '700k€ – 850k€', zone: 'Retiro', stage: 'Primer Contacto', days: 5, score: 65 },
  { id: 103, name: 'Ignacio Valdés', budget: '1.5M€ – 1.8M€', zone: 'Chamberí', stage: 'Cualificación', days: 1, score: 80 },
  { id: 104, name: 'Marta Solano', budget: '900k€ – 1.1M€', zone: 'Justicia', stage: 'Búsqueda Activa', days: 8, score: 75 },
  { id: 105, name: 'Beatriz Soler', budget: '1.1M€ – 1.3M€', zone: 'Eixample', stage: 'Visitas', days: 12, score: 82 },
  { id: 106, name: 'Sofía Navarro', budget: '2.2M€ – 2.5M€', zone: 'Pozuelo', stage: 'Negociación', days: 3, score: 90 },
  { id: 107, name: 'Marc Torrens', budget: '3.5M€ – 4M€', zone: 'Serrano', stage: 'Cerrado', days: 20, score: 98 },
  { id: 108, name: 'Julia Roberts', budget: '5M€ – 6M€', zone: 'La Moraleja', stage: 'Cerrado', days: 2, score: 95 },
]

export const INITIAL_TASKS = [
  { id: 1, title: 'Preparar dossier Valdés', client: 'Ignacio Valdés', priority: 'alta', dueDate: '10 Abr 2026', status: 'pendiente', type: 'document' },
  { id: 2, title: 'Llamar a Beatriz Soler', client: 'Beatriz Soler', priority: 'media', dueDate: '09 Abr 2026', status: 'pendiente', type: 'call' },
  { id: 3, title: 'Visita C/ Serrano 45', client: 'Ignacio Valdés', priority: 'alta', dueDate: '11 Abr 2026', status: 'en_progreso', type: 'meeting' },
  { id: 4, title: 'Enviar contrato arras', client: 'Sofía Navarro', priority: 'urgente', dueDate: '08 Abr 2026', status: 'pendiente', type: 'document' },
  { id: 5, title: 'Seguimiento Jorge Méndez', client: 'Jorge Méndez', priority: 'baja', dueDate: '15 Abr 2026', status: 'pendiente', type: 'call' },
  { id: 6, title: 'Actualizar listing La Moraleja', client: 'Marc Torrens', priority: 'media', dueDate: '12 Abr 2026', status: 'completada', type: 'update' },
]

export const INITIAL_EVENTS = [
  { id: 1, title: 'Visita con Valdés - Serrano 45', date: '2026-04-10', time: '10:00', type: 'visita', client: 'Ignacio Valdés', duration: '1h' },
  { id: 2, title: 'Reunión cualificación - Soler', date: '2026-04-09', time: '12:00', type: 'reunion', client: 'Beatriz Soler', duration: '45min' },
  { id: 3, title: 'Firma arras Navarro', date: '2026-04-11', time: '16:00', type: 'firma', client: 'Sofía Navarro', duration: '2h' },
  { id: 4, title: 'Cita con Inmobiliaria Goya', date: '2026-04-14', time: '09:30', type: 'reunion', client: 'Inmobiliaria Goya', duration: '1h' },
  { id: 5, title: 'Visita virtual - García', date: '2026-04-10', time: '15:00', type: 'visita', client: 'Elena García', duration: '30min' },
  { id: 6, title: 'Planificación semanal Q2', date: '2026-04-12', time: '09:00', type: 'interno', client: '-', duration: '1h' },
]

export const NOTIFICATIONS_DATA = [
  { id: 1, title: 'Nueva visita programada', description: 'Ignacio Valdés - C/ Serrano 45', time: 'hace 5 min', read: false, type: 'calendar' },
  { id: 2, title: 'Oferta recibida', description: 'Sofía Navarro ha enviado una oferta por Puerta de Hierro', time: 'hace 1h', read: false, type: 'deal' },
  { id: 3, title: 'Cliente inactivo', description: 'Jorge Méndez lleva 87 días sin actividad', time: 'hace 3h', read: false, type: 'alert' },
  { id: 4, title: 'Propiedad compartida', description: 'Inmobiliaria Goya ha añadido un nuevo ático', time: 'hace 5h', read: true, type: 'property' },
  { id: 5, title: 'Reunión completada', description: 'Visita con Marc Torrens finalizada con éxito', time: 'ayer', read: true, type: 'calendar' },
  { id: 6, title: 'Documento firmado', description: 'Contrato de arras firmado por Torrens', time: 'ayer', read: true, type: 'document' },
  { id: 7, title: 'Nuevo colaborador', description: 'Andalucía Real Estate se ha unido a tu red', time: 'hace 2 días', read: true, type: 'partner' },
]

export const EMAIL_TEMPLATES = [
  { id: 1, name: 'Seguimiento Post-Visita', subject: 'Gracias por su visita - {{propiedad}}', category: 'Seguimiento' },
  { id: 2, name: 'Nueva Propiedad Disponible', subject: 'Oportunidad exclusiva en {{zona}}', category: 'Promoción' },
  { id: 3, name: 'Oferta Formal', subject: 'Oferta formal por {{propiedad}}', category: 'Negociación' },
  { id: 4, name: 'Recordatorio de Visita', subject: 'Recordatorio: Visita {{fecha}}', category: 'Agenda' },
  { id: 5, name: 'Bienvenida Nuevo Cliente', subject: 'Bienvenido a Magna Buyers Agents', category: 'Onboarding' },
]

export const PIPELINE_STAGES = [
  'Primer Contacto',
  'Cualificación',
  'Búsqueda Activa',
  'Visitas',
  'Negociación',
  'Cerrado'
]
