import type { LucideIcon } from 'lucide-react'
import {
  BarChart3, Users, UserPlus, Home, LayoutList, Settings,
  Calendar, TrendingUp, CheckSquare, MessageSquare, Briefcase, Shield,
} from 'lucide-react'
export type ActiveTab =
  | 'dashboard'
  | 'agentes'
  | 'agencias'
  | 'clientes'
  | 'propiedades'
  | 'pipeline'
  | 'proveedores'
  | 'tareas'
  | 'calendario'
  | 'analiticas'
  | 'comunicaciones'
  | 'configuracion'
  | 'privacidad'

export type NavItem = { id: ActiveTab; label: string; icon: LucideIcon }

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',      label: 'Dashboard',      icon: BarChart3 },
  { id: 'agentes',        label: 'Agentes',         icon: Users },
  { id: 'agencias',       label: 'Agencias',        icon: UserPlus },
  { id: 'clientes',       label: 'Clientes',        icon: Briefcase },
  { id: 'propiedades',    label: 'Propiedades',     icon: Home },
  { id: 'pipeline',       label: 'Pipeline',        icon: LayoutList },
  { id: 'proveedores',    label: 'Proveedores',     icon: Briefcase },
  { id: 'tareas',         label: 'Tareas',          icon: CheckSquare },
  { id: 'calendario',     label: 'Calendario',      icon: Calendar },
  { id: 'analiticas',     label: 'Analíticas',      icon: TrendingUp },
  { id: 'comunicaciones', label: 'Comunicaciones',  icon: MessageSquare },
  { id: 'configuracion',  label: 'Configuración',   icon: Settings },
  { id: 'privacidad',     label: 'Privacidad DPO',  icon: Shield },
]

export const BOTTOM_NAV: NavItem[] = [
  { id: 'dashboard',  label: 'Inicio',    icon: BarChart3 },
  { id: 'clientes',   label: 'Clientes',  icon: Briefcase },
  { id: 'pipeline',   label: 'Pipeline',  icon: LayoutList },
  { id: 'calendario', label: 'Agenda',    icon: Calendar },
  { id: 'tareas',     label: 'Tareas',    icon: CheckSquare },
]

export const PAGE_TITLES: Record<ActiveTab, string> = {
  dashboard:      'Dashboard',
  agentes:        'Agentes',
  agencias:       'Agencias',
  clientes:       'Clientes',
  propiedades:    'Propiedades',
  pipeline:       'Pipeline',
  proveedores:    'Proveedores',
  tareas:         'Tareas',
  calendario:     'Calendario',
  analiticas:     'Analíticas',
  comunicaciones: 'Comunicaciones',
  configuracion:  'Configuración',
  privacidad:     'Privacidad DPO',
}

export const STATUS_COLORS: Record<string, string> = {
  'Activo':     'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Templado':   'bg-amber-100 text-amber-700 border-amber-200',
  'Dormido':    'bg-gray-100 text-gray-500 border-gray-200',
  'Cerrado':    'bg-teal-100 text-teal-700 border-teal-200',
  'Disponible': 'bg-emerald-100 text-emerald-700',
  'Reservada':  'bg-amber-100 text-amber-700',
  'Vendida':    'bg-teal-100 text-teal-700',
}

export const PRIORITY_COLORS: Record<string, string> = {
  'urgente': 'bg-red-100 text-red-700 border-red-200',
  'alta':    'bg-orange-100 text-orange-700 border-orange-200',
  'media':   'bg-amber-100 text-amber-700 border-amber-200',
  'baja':    'bg-gray-100 text-gray-500 border-gray-200',
}

export const SCORE_COLOR = (score: number) => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-50'
  if (score >= 70) return 'text-amber-600 bg-amber-50'
  return 'text-red-500 bg-red-50'
}

export const SERVICIO_COLORS: Record<string, string> = {
  'AML':               'bg-red-100 text-red-700',
  'Agentes de Viajes': 'bg-sky-100 text-sky-700',
  'Transporte':        'bg-indigo-100 text-indigo-700',
  'Alojamiento':       'bg-violet-100 text-violet-700',
  'Financiación':      'bg-emerald-100 text-emerald-700',
  'Reformas':          'bg-orange-100 text-orange-700',
  'Decoración':        'bg-pink-100 text-pink-700',
}
