'use client'
import { create } from 'zustand'

// ActiveTab ya no se usa como estado, dependemos de usePathname.

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

export interface CRMState {
  isLoggedIn: boolean
  sidebarOpen: boolean
  darkMode: boolean
  notifOpen: boolean
  globalSearch: string
  selectedClient: Client | null
  selectedCollab: Collaborator | null
  selectedProperty: Property | null
  notifications: number
  login: () => void
  logout: () => void
  setSidebarOpen: (open: boolean) => void
  setNotifOpen: (open: boolean) => void
  setGlobalSearch: (search: string) => void
  toggleDarkMode: () => void
  setSelectedClient: (client: Client | null) => void
  setSelectedCollab: (collab: Collaborator | null) => void
  setSelectedProperty: (property: Property | null) => void
}

export const useCRMStore = create<CRMState>((set) => ({
  isLoggedIn: false,
  sidebarOpen: false,
  darkMode: false,
  notifOpen: false,
  globalSearch: '',
  selectedClient: null,
  selectedCollab: null,
  selectedProperty: null,
  notifications: 7,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotifOpen: (open) => set({ notifOpen: open }),
  setGlobalSearch: (search) => set({ globalSearch: search }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  setSelectedClient: (client) => set({ selectedClient: client }),
  setSelectedCollab: (collab) => set({ selectedCollab: collab }),
  setSelectedProperty: (property) => set({ selectedProperty: property }),
}))
