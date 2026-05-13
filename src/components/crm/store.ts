'use client'
import { create } from 'zustand'

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

// Tipos provisionales de mock data. Se reemplazan por los tipos generados
// de Supabase (src/types/db.ts) al completar Fase 1.
export interface Interaction {
  type: 'phone' | 'message' | 'meeting' | string
  date: string
  text: string
}

export interface Client {
  id: number
  name: string
  phone: string
  email: string
  budget: string
  zone: string
  status: string
  date: string
  origin: string
  type: string
  size: string
  score: number
  notes: string
  avatar: string
  interactions: Interaction[]
}

export interface CollaboratorProperty {
  address: string
  type: string
  price: string
  status: string
}

export interface Collaborator {
  id: number
  agency: string
  contact: string
  email: string
  phone: string
  city: string
  specialty: string
  rating: number
  shared: number
  notes: string
  history: { date: string; text: string }[]
  properties: CollaboratorProperty[]
}

export interface Property {
  id: number
  address: string
  ref: string
  type: string
  price: string
  collab: string
  interested: number
  status: string
  area: string
  rooms: number
  baths: number
  floor: string
  features: string
  history: { date: string; text: string }[]
  linkedClients: string[]
}

interface CRMState {
  isLoggedIn: boolean
  activeTab: ActiveTab
  sidebarOpen: boolean
  darkMode: boolean
  selectedClient: Client | null
  selectedCollab: Collaborator | null
  selectedProperty: Property | null
  notifications: number
  login: () => void
  logout: () => void
  setActiveTab: (tab: ActiveTab) => void
  setSidebarOpen: (open: boolean) => void
  toggleDarkMode: () => void
  setSelectedClient: (client: Client | null) => void
  setSelectedCollab: (collab: Collaborator | null) => void
  setSelectedProperty: (property: Property | null) => void
}

export const useCRMStore = create<CRMState>((set) => ({
  isLoggedIn: false,
  activeTab: 'dashboard',
  sidebarOpen: false,
  darkMode: false,
  selectedClient: null,
  selectedCollab: null,
  selectedProperty: null,
  notifications: 7,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, activeTab: 'dashboard' }),
  setActiveTab: (tab) => set({ activeTab: tab, sidebarOpen: false }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  setSelectedClient: (client) => set({ selectedClient: client }),
  setSelectedCollab: (collab) => set({ selectedCollab: collab }),
  setSelectedProperty: (property) => set({ selectedProperty: property }),
}))
