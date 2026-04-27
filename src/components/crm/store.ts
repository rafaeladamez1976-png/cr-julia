'use client'
import { create } from 'zustand'

export type ActiveTab = 'dashboard' | 'clientes' | 'colaboradores' | 'propiedades' | 'pipeline' | 'calendario' | 'analiticas' | 'tareas' | 'comunicaciones' | 'configuracion'

interface CRMState {
  isLoggedIn: boolean
  activeTab: ActiveTab
  sidebarOpen: boolean
  darkMode: boolean
  selectedClient: any | null
  selectedCollab: any | null
  selectedProperty: any | null
  notifications: number
  login: () => void
  logout: () => void
  setActiveTab: (tab: ActiveTab) => void
  setSidebarOpen: (open: boolean) => void
  toggleDarkMode: () => void
  setSelectedClient: (client: any | null) => void
  setSelectedCollab: (collab: any | null) => void
  setSelectedProperty: (property: any | null) => void
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
