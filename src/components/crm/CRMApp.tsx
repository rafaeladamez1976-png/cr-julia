'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3, Users, UserPlus, Home, LayoutList, Settings,
  Calendar, TrendingUp, CheckSquare, MessageSquare, X,
  Menu, Bell, Search, Globe, Moon, Sun, ChevronRight,
  Plus, Phone, Mail, MapPin, Star, Clock, ArrowRight,
  Edit, TrendingDown, Minus, ArrowUpRight, FileText,
  Zap, Target, Award, Briefcase, Euro, Tag, Filter,
  MoreVertical, Send, ChevronDown, ExternalLink,
  CheckCircle2, Circle, AlertCircle, Timer
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts'
import {
  INITIAL_CLIENTS, INITIAL_COLLABORATORS, INITIAL_PROPERTIES,
  INITIAL_PIPELINE, INITIAL_TASKS, INITIAL_EVENTS,
  NOTIFICATIONS_DATA, EMAIL_TEMPLATES, PIPELINE_STAGES
} from './data'
import { ActiveTab } from './store'

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────
type NavItem = { id: ActiveTab; label: string; icon: any }

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'colaboradores', label: 'Colaboradores', icon: UserPlus },
  { id: 'propiedades', label: 'Propiedades', icon: Home },
  { id: 'pipeline', label: 'Pipeline', icon: LayoutList },
  { id: 'calendario', label: 'Calendario', icon: Calendar },
  { id: 'analiticas', label: 'Analíticas', icon: TrendingUp },
  { id: 'tareas', label: 'Tareas', icon: CheckSquare },
  { id: 'comunicaciones', label: 'Comunicaciones', icon: MessageSquare },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
]

const BOTTOM_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Inicio', icon: BarChart3 },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: LayoutList },
  { id: 'calendario', label: 'Agenda', icon: Calendar },
  { id: 'tareas', label: 'Tareas', icon: CheckSquare },
]

const STATUS_COLORS: Record<string, string> = {
  'Activo': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Templado': 'bg-amber-100 text-amber-700 border-amber-200',
  'Dormido': 'bg-gray-100 text-gray-500 border-gray-200',
  'Cerrado': 'bg-teal-100 text-teal-700 border-teal-200',
  'Disponible': 'bg-emerald-100 text-emerald-700',
  'Reservada': 'bg-amber-100 text-amber-700',
  'Vendida': 'bg-teal-100 text-teal-700',
}

const PRIORITY_COLORS: Record<string, string> = {
  'urgente': 'bg-red-100 text-red-700 border-red-200',
  'alta': 'bg-orange-100 text-orange-700 border-orange-200',
  'media': 'bg-amber-100 text-amber-700 border-amber-200',
  'baja': 'bg-gray-100 text-gray-500 border-gray-200',
}

const SCORE_COLORS = (score: number) => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-50'
  if (score >= 70) return 'text-amber-600 bg-amber-50'
  return 'text-red-500 bg-red-50'
}

// ─── LOGIN SCREEN ───────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/30 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-10 sm:p-16 flex flex-col items-center relative z-10 border border-white/50 dark:border-slate-700/50">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }} className="mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-amber-300">M</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="text-2xl sm:text-3xl font-light text-teal-700 dark:text-teal-300 mb-2 tracking-wider text-center">
          Magna
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-amber-600/60 dark:text-amber-400/60 font-semibold mb-10">
          Buyers Agents
        </motion.p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin() }} className="w-full space-y-8">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Email Institucional
            </label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b border-slate-200 dark:border-slate-600 focus:border-teal-600 outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              placeholder="agent@magna.com" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Contraseña
            </label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b border-slate-200 dark:border-slate-600 focus:border-teal-600 outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              placeholder="••••••••" />
          </motion.div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-semibold tracking-[0.15em] uppercase text-xs transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30">
            Acceder al Sistema
          </motion.button>
        </form>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
          Solo para agentes autorizados
        </motion.p>
      </motion.div>
    </div>
  )
}

// ─── SIDEBAR ────────────────────────────────────────────────────────
function Sidebar({ activeTab, setActiveTab, isOpen, onClose, onLogout, darkMode, toggleDarkMode }: {
  activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void; isOpen: boolean;
  onClose: () => void; onLogout: () => void; darkMode: boolean; toggleDarkMode: () => void;
}) {
  return (
    <>
      <div className={`w-64 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-black min-h-screen fixed left-0 top-0 flex flex-col z-40 shadow-2xl transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-amber-300">M</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide">Magna</h2>
              <p className="text-[9px] text-teal-400/70 uppercase tracking-[0.2em]">Buyers Agents</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 lg:hidden hover:text-white rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); onClose() }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group text-sm ${
                  isActive
                    ? 'bg-teal-600/20 text-teal-300 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="transition-transform group-hover:scale-110" />
                <span className={`text-xs tracking-wide font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                {isActive && <motion.div layoutId="sidebar-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm mb-2">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-xs tracking-wide font-medium">{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-md">JR</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Julia Richards</p>
              <p className="text-[9px] text-teal-400/70 uppercase tracking-widest">Premium Agent</p>
            </div>
            <button onClick={onLogout} className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── TOPBAR ─────────────────────────────────────────────────────────
function TopBar({ title, onMenuClick, notifications, onNotificationClick, globalSearch, setGlobalSearch }: {
  title: string; onMenuClick: () => void; notifications: number;
  onNotificationClick: () => void; globalSearch: string; setGlobalSearch: (v: string) => void;
}) {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="h-16 sm:h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between px-4 lg:px-8 fixed top-0 right-0 left-0 lg:left-64 z-20 transition-all">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 text-slate-600 dark:text-slate-300 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <Menu size={22} />
        </button>
        <div>
          <div className="hidden sm:flex items-center gap-2 mb-0.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500">Navegación / {title}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 dark:text-white truncate max-w-[120px] sm:max-w-none">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile search toggle */}
        <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-slate-500 dark:text-slate-400 md:hidden hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <Search size={18} />
        </button>

        {/* Desktop search */}
        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-3 text-slate-400 dark:text-slate-500" size={15} />
          <input type="text" placeholder="Buscar en todo el CRM..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-xl text-xs focus:border-teal-500 dark:focus:border-teal-400 outline-none w-48 lg:w-64 transition-all focus:w-72 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
        </div>

        <button onClick={onNotificationClick} className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <Bell size={18} strokeWidth={1.5} />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{notifications}</span>
          )}
        </button>

        <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
          <div className="text-right">
            <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider group-hover:text-teal-600 transition-colors">Workspace</p>
            <p className="text-[9px] text-slate-400 dark:text-slate-500">Madrid Heritage</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 flex items-center justify-center border border-teal-200 dark:border-teal-700">
            <Globe size={14} className="text-teal-600 dark:text-teal-400" />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-3 md:hidden shadow-lg z-50">
            <div className="flex items-center gap-2">
              <Search className="text-slate-400" size={16} />
              <input type="text" placeholder="Buscar..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} autoFocus
                className="flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-white placeholder:text-slate-400" />
              <button onClick={() => setShowSearch(false)} className="p-1 text-slate-400"><X size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── BOTTOM NAV (Mobile) ────────────────────────────────────────────
function BottomNav({ activeTab, setActiveTab }: { activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 z-30 lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around py-1.5 px-2">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${
                isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'
              }`}>
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              <span className={`text-[9px] font-semibold tracking-wide ${isActive ? 'text-teal-600 dark:text-teal-400' : ''}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── KPI CARD ───────────────────────────────────────────────────────
function KPICard({ label, value, trend, trendType, icon: Icon, index }: {
  label: string; value: string; trend: string; trendType: string; icon: any; index: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="bg-white dark:bg-slate-800 p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-transparent dark:from-teal-900/20 dark:to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-semibold ${trendType === 'up' ? 'text-emerald-500' : 'text-slate-400'}`}>
          {trendType === 'up' ? <TrendingUp size={12} /> : <Minus size={12} />}
          {trend}
        </div>
      </div>
      <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{value}</h3>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] font-semibold">{label}</p>
    </motion.div>
  )
}

// ─── DASHBOARD ──────────────────────────────────────────────────────
function Dashboard({ onNavigate }: { onNavigate: (tab: ActiveTab) => void }) {
  const revenueData = [
    { month: 'Ene', operaciones: 3, ingresos: 450000 },
    { month: 'Feb', operaciones: 5, ingresos: 780000 },
    { month: 'Mar', operaciones: 4, ingresos: 620000 },
    { month: 'Abr', operaciones: 7, ingresos: 1150000 },
    { month: 'May', operaciones: 6, ingresos: 890000 },
    { month: 'Jun', operaciones: 8, ingresos: 1340000 },
  ]

  const sourceData = [
    { name: 'Referidos', value: 35, color: '#0d9488' },
    { name: 'Web', value: 25, color: '#d97706' },
    { name: 'Eventos', value: 20, color: '#6366f1' },
    { name: 'Redes', value: 15, color: '#ec4899' },
    { name: 'Otro', value: 5, color: '#94a3b8' },
  ]

  const activities = [
    { initial: 'C', name: 'Carlos M.', action: 'avanzó a Visitas', time: 'hace 2h', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
    { initial: 'S', name: 'Sonia L.', action: 'Nueva propiedad', time: 'hace 4h', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    { initial: 'G', name: 'Inmobiliaria Goya', action: 'Colaborador', time: 'ayer', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
    { initial: 'M', name: 'Miguel R.', action: 'Oferta enviada', time: 'ayer', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
    { initial: 'A', name: 'Ana P.', action: 'Visita virtual', time: 'ayer', color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  ]

  const upcomingTasks = [
    { title: 'Preparar dossier Valdés', priority: 'alta', due: '10 Abr' },
    { title: 'Llamar a Beatriz Soler', priority: 'media', due: '09 Abr' },
    { title: 'Enviar contrato arras', priority: 'urgente', due: '08 Abr' },
  ]

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard label="Clientes Activos" value="34" trend="+3" trendType="up" icon={Users} index={0} />
        <KPICard label="Visitas Este Mes" value="12" trend="+12%" trendType="up" icon={Home} index={1} />
        <KPICard label="Oper. en Curso" value="08" trend="0" trendType="neutral" icon={Briefcase} index={2} />
        <KPICard label="Op. Cerradas" value="05" trend="+2" trendType="up" icon={Award} index={3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Ingresos</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Últimos 6 meses</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">+18%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`${(value/1000).toFixed(0)}k €`, 'Ingresos']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="ingresos" stroke="#0d9488" strokeWidth={2.5} fill="url(#colorIngresos)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source Pie Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Origen de Leads</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Distribución actual</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{s.name} {s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Actividad Reciente</h2>
            <button onClick={() => onNavigate('calendario')} className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700">Ver todo</button>
          </div>
          <div className="space-y-4">
            {activities.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-semibold text-sm ${item.color}`}>
                  {item.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    <span className="font-semibold">{item.name}</span> {item.action}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Tareas Pendientes</h2>
            <button onClick={() => onNavigate('tareas')} className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700">Ver todas</button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === 'urgente' ? 'bg-red-500' : task.priority === 'alta' ? 'bg-orange-500' : 'bg-amber-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{task.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{task.due}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
              </div>
            ))}
          </div>

          {/* Pipeline Mini Summary */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Pipeline</span>
              <button onClick={() => onNavigate('pipeline')} className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700">Ver Pipeline →</button>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              <div className="bg-slate-300 dark:bg-slate-600 flex-[18]" title="Primer Contacto: 18" />
              <div className="bg-teal-300 dark:bg-teal-600 flex-[12]" title="Cualificación: 12" />
              <div className="bg-teal-400 dark:bg-teal-500 flex-[9]" title="Búsqueda Activa: 9" />
              <div className="bg-teal-500 dark:bg-teal-400 flex-[6]" title="Visitas: 6" />
              <div className="bg-amber-400 dark:bg-amber-500 flex-[4]" title="Negociación: 4" />
              <div className="bg-emerald-500 dark:bg-emerald-400 flex-[5]" title="Cerrado: 5" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] text-slate-400">54 clientes activos</span>
              <span className="text-[9px] text-emerald-500 font-semibold">9.3% cierre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CLIENTS ────────────────────────────────────────────────────────
function Clients({ search }: { search: string }) {
  const [clients] = useState(INITIAL_CLIENTS)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [localSearch, setLocalSearch] = useState('')
  const [showNewClient, setShowNewClient] = useState(false)
  const [filterStatus, setFilterStatus] = useState('todos')

  const filteredClients = useMemo(() => {
    let result = clients
    const q = search || localSearch
    if (q) result = result.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.zone.toLowerCase().includes(q.toLowerCase()))
    if (filterStatus !== 'todos') result = result.filter(c => c.status === filterStatus)
    return result
  }, [clients, search, localSearch, filterStatus])

  if (selectedClient) {
    return (
      <div className="p-4 lg:p-8">
        <button onClick={() => setSelectedClient(null)} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Profile Card */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-teal-700 dark:text-teal-300 shadow-inner">
                {selectedClient.avatar}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{selectedClient.name}</h3>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${STATUS_COLORS[selectedClient.status]}`}>{selectedClient.status}</span>

              {/* Score */}
              <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl ${SCORE_COLORS(selectedClient.score)}`}>
                <Target size={14} />
                <span className="text-lg font-bold">{selectedClient.score}</span>
                <span className="text-[10px] font-semibold">Score</span>
              </div>

              <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-left">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Phone size={14} className="text-slate-400" /><span className="text-sm">{selectedClient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Mail size={14} className="text-slate-400" /><span className="text-sm truncate">{selectedClient.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Clock size={14} className="text-slate-400" /><span className="text-[10px] uppercase tracking-wider font-semibold">Desde {selectedClient.date}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-teal-900 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-300/80 mb-3">Notas Internas</h4>
              <p className="text-sm leading-relaxed opacity-80 italic">"{selectedClient.notes}"</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Edit size={14} /> Editar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
                <Phone size={14} /> Llamar
              </button>
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Criterio de Inversión</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Presupuesto', value: selectedClient.budget },
                  { label: 'Tipo', value: selectedClient.type },
                  { label: 'Superficie', value: `${selectedClient.size} m²` },
                  { label: 'Origen', value: selectedClient.origin },
                  { label: 'Zonas', value: selectedClient.zone },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Interacciones</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-700" />
                {selectedClient.interactions.map((int: any, i: number) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-white dark:border-slate-800 ${int.type === 'phone' ? 'bg-teal-400' : int.type === 'meeting' ? 'bg-amber-400' : 'bg-indigo-400'}`} />
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{int.date}</span>
                      <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full font-semibold text-slate-600 dark:text-slate-300 uppercase">
                        {int.type === 'phone' ? 'Llamada' : int.type === 'message' ? 'Dossier' : 'Reunión'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{int.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Portfolio de Clientes</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Gestión de Inversores</p>
        </div>
        <button onClick={() => setShowNewClient(true)}
          className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20">
          <Plus size={14} /> Nuevo Cliente
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input type="text" placeholder="Buscar por nombre o zona..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
        </div>
        <div className="flex gap-2">
          {['todos', 'Activo', 'Templado', 'Dormido', 'Cerrado'].map((status) => (
            <button key={status} onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                filterStatus === status
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-teal-300'
              }`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">Nombre</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">Presupuesto</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">Zona</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">Score</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">Estado</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {filteredClients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group" onClick={() => setSelectedClient(client)}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-300">{client.avatar}</div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{client.name}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">{client.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{client.budget}</td>
                <td className="px-6 py-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{client.zone}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${SCORE_COLORS(client.score)}`}>
                    <Target size={10} /> {client.score}
                  </span>
                </td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${STATUS_COLORS[client.status]}`}>{client.status}</span></td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-300 group-hover:text-teal-500 transition-colors"><ChevronRight size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 gap-3">
        {filteredClients.map(client => (
          <div key={client.id} onClick={() => setSelectedClient(client)}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 active:scale-[0.98] cursor-pointer hover:border-teal-200 dark:hover:border-teal-700 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-300">{client.avatar}</div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{client.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${STATUS_COLORS[client.status]}`}>{client.status}</span>
                </div>
              </div>
              <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${SCORE_COLORS(client.score)}`}><Target size={9} /> {client.score}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-slate-400 dark:text-slate-500 text-[9px] font-semibold uppercase block">Presupuesto</span><span className="font-medium text-slate-700 dark:text-slate-200">{client.budget}</span></div>
              <div><span className="text-slate-400 dark:text-slate-500 text-[9px] font-semibold uppercase block">Zona</span><span className="font-medium text-slate-700 dark:text-slate-200 text-[10px]">{client.zone}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* New Client Modal */}
      {showNewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNewClient(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nuevo Cliente</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Alta de Inversor</p>
              </div>
              <button onClick={() => setShowNewClient(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Nombre Completo', placeholder: 'Ej. Ricardo Darín', type: 'text' },
                { label: 'Email', placeholder: 'email@ejemplo.com', type: 'email' },
                { label: 'Teléfono', placeholder: '+34 600 000 000', type: 'tel' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Origen</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none">
                    <option>Referido</option><option>Web</option><option>Redes Sociales</option><option>Evento</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Tipo</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none">
                    <option>Piso</option><option>Casa</option><option>Ático</option><option>Chalet</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Presupuesto Mín</label>
                  <input type="text" placeholder="500.000 €"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Presupuesto Máx</label>
                  <input type="text" placeholder="1.200.000 €"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Notas</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none resize-none h-24 placeholder:text-slate-300 dark:placeholder:text-slate-500" placeholder="Características deseadas..." />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-800">
              <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Cliente</button>
              <button onClick={() => setShowNewClient(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// ─── PIPELINE ───────────────────────────────────────────────────────
function Pipeline() {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE)

  const moveClient = (clientId: number) => {
    setPipeline(prev => prev.map(client => {
      if (client.id === clientId) {
        const currentIndex = PIPELINE_STAGES.indexOf(client.stage)
        if (currentIndex < PIPELINE_STAGES.length - 1) {
          return { ...client, stage: PIPELINE_STAGES[currentIndex + 1], days: 0 }
        }
      }
      return client
    }))
  }

  const stageColors = ['bg-slate-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-amber-500', 'bg-orange-500', 'bg-emerald-500']

  return (
    <div className="p-4 lg:p-8 h-full">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Flujo de Negocio</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Seguimiento de Operaciones</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex gap-4 min-w-max lg:min-w-0">
          {PIPELINE_STAGES.map((stage, idx) => {
            const stageClients = pipeline.filter(c => c.stage === stage)
            return (
              <div key={stage} className="w-[280px] lg:w-[calc((100vw-320px-80px)/6)] min-w-[280px] bg-white dark:bg-slate-800 rounded-2xl flex flex-col shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <div className={`${stageColors[idx]} p-3 lg:p-4 flex justify-between items-center`}>
                  <h3 className="text-white font-semibold text-sm">{stage}</h3>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">{stageClients.length}</div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50 dark:bg-slate-800/50 min-h-[200px] max-h-[calc(100vh-280px)]">
                  {stageClients.map((client) => (
                    <div key={client.id}
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-[10px] font-bold text-teal-700 dark:text-teal-300">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-white truncate">{client.name}</h4>
                          <span className="text-[10px] text-slate-400">{client.days} días</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">{client.budget}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md font-semibold text-slate-600 dark:text-slate-300">{client.zone}</span>
                          <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${SCORE_COLORS(client.score)}`}>
                            <Target size={8} />{client.score}
                          </span>
                        </div>
                        {stage !== 'Cerrado' && (
                          <button onClick={() => moveClient(client.id)}
                            className="bg-teal-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-teal-700 shadow-sm">
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── CALENDAR ───────────────────────────────────────────────────────
function CalendarView() {
  const [events] = useState(INITIAL_EVENTS)
  const [selectedDate, setSelectedDate] = useState('2026-04-10')

  const eventTypeColors: Record<string, string> = {
    visita: 'border-teal-400 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
    reunion: 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
    firma: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    interno: 'border-slate-400 bg-slate-50 dark:bg-slate-700/20 text-slate-700 dark:text-slate-300',
  }
  const eventTypeBadge: Record<string, string> = {
    visita: 'bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300',
    reunion: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300',
    firma: 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300',
    interno: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  }

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const april2026 = Array.from({ length: 30 }, (_, i) => i + 1)
  // April 2026 starts on Wednesday (index 2)
  const startDay = 2

  const getEventsForDay = (day: number) => events.filter(e => e.date === `2026-04-${day.toString().padStart(2, '0')}`)

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Calendario</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Agenda y Citas</p>
        </div>
        <button className="bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Cita
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Abril 2026</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><ChevronRight className="rotate-180" size={16} /></button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
            {daysOfWeek.map(d => (
              <div key={d} className="bg-slate-50 dark:bg-slate-800 p-2 text-center text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{d}</div>
            ))}
            {/* Empty cells for start offset */}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`empty-${i}`} className="bg-slate-50/50 dark:bg-slate-800/50 p-2 min-h-[60px] lg:min-h-[80px]" />
            ))}
            {april2026.map(day => {
              const dayEvents = getEventsForDay(day)
              const isToday = day === 10
              return (
                <div key={day} onClick={() => setSelectedDate(`2026-04-${day.toString().padStart(2, '0')}`)}
                  className={`bg-white dark:bg-slate-800 p-1.5 lg:p-2 min-h-[60px] lg:min-h-[80px] cursor-pointer hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors ${
                    selectedDate === `2026-04-${day.toString().padStart(2, '0')}` ? 'ring-2 ring-teal-500 ring-inset' : ''
                  }`}>
                  <span className={`text-xs font-semibold inline-flex w-6 h-6 items-center justify-center rounded-lg ${
                    isToday ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={`text-[7px] lg:text-[9px] font-semibold px-1 py-0.5 rounded truncate border-l-2 ${eventTypeColors[ev.type]}`}>
                        {ev.time} {ev.title.substring(0, 15)}...
                      </div>
                    ))}
                    {dayEvents.length > 2 && <span className="text-[8px] text-slate-400 font-semibold">+{dayEvents.length - 2} más</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Day Detail */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">
            {selectedDate === '2026-04-10' ? 'Hoy' : selectedDate}
          </h3>
          <div className="space-y-3">
            {getEventsForDay(parseInt(selectedDate.split('-')[2])).length > 0 ? (
              getEventsForDay(parseInt(selectedDate.split('-')[2])).map(ev => (
                <div key={ev.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase ${eventTypeBadge[ev.type]}`}>{ev.type}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{ev.duration}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{ev.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"><Clock size={10} /> {ev.time}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">Sin eventos</p>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Leyenda</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(eventTypeBadge).map(([type, color]) => (
                <span key={type} className={`text-[9px] px-2 py-1 rounded-lg font-semibold text-center capitalize ${color}`}>{type}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ANALYTICS ──────────────────────────────────────────────────────
function Analytics() {
  const monthlyData = [
    { month: 'Ene', clientes: 28, visitas: 15, operaciones: 3, ingresos: 450 },
    { month: 'Feb', clientes: 31, visitas: 22, operaciones: 5, ingresos: 780 },
    { month: 'Mar', clientes: 30, visitas: 18, operaciones: 4, ingresos: 620 },
    { month: 'Abr', clientes: 34, visitas: 28, operaciones: 7, ingresos: 1150 },
    { month: 'May', clientes: 36, visitas: 24, operaciones: 6, ingresos: 890 },
    { month: 'Jun', clientes: 40, visitas: 32, operaciones: 8, ingresos: 1340 },
  ]

  const performanceKPIs = [
    { label: 'Tasa de Conversión', value: '9.3%', trend: '+1.2%', icon: Target, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Ticket Medio', value: '1.4M €', trend: '+8%', icon: Euro, color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' },
    { label: 'Tiempo Medio Cierre', value: '47 días', trend: '-5 días', icon: Timer, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Satisfacción Cliente', value: '4.8/5', trend: '+0.2', icon: Star, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
  ]

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Analíticas</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Métricas de Rendimiento</p>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceKPIs.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon size={18} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{kpi.label}</p>
            <span className="text-[10px] text-emerald-500 font-semibold mt-1 inline-block">{kpi.trend}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Evolución de Clientes</h3>
          <p className="text-xs text-slate-400 mb-4">Clientes y Visitas por mes</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="clientes" fill="#0d9488" radius={[6, 6, 0, 0]} />
              <Bar dataKey="visitas" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Ingresos (k€)</h3>
          <p className="text-xs text-slate-400 mb-4">Tendencia mensual</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${v}k €`, 'Ingresos']} />
              <Line type="monotone" dataKey="ingresos" stroke="#0d9488" strokeWidth={2.5} dot={{ fill: '#0d9488', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── TASKS ──────────────────────────────────────────────────────────
function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('todas')

  const statusLabels: Record<string, string> = { pendiente: 'Pendiente', en_progreso: 'En Progreso', completada: 'Completada' }
  const statusIcons: Record<string, any> = { pendiente: Circle, en_progreso: AlertCircle, completada: CheckCircle2 }
  const statusColors: Record<string, string> = {
    pendiente: 'text-slate-400', en_progreso: 'text-amber-500', completada: 'text-emerald-500'
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completada' ? 'pendiente' : 'completada' } : t))
  }

  const filtered = filter === 'todas' ? tasks : tasks.filter(t => t.status === filter)

  const taskCounts = {
    total: tasks.length,
    pendiente: tasks.filter(t => t.status === 'pendiente').length,
    en_progreso: tasks.filter(t => t.status === 'en_progreso').length,
    completada: tasks.filter(t => t.status === 'completada').length,
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Tareas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Gestión de Actividades</p>
        </div>
        <button className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Tarea
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', count: taskCounts.total, color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
          { label: 'Pendientes', count: taskCounts.pendiente, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
          { label: 'En Progreso', count: taskCounts.en_progreso, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' },
          { label: 'Completadas', count: taskCounts.completada, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['todas', 'pendiente', 'en_progreso', 'completada'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              filter === f ? 'bg-teal-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
            {statusLabels[f] || 'Todas'}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filtered.map(task => {
          const StatusIcon = statusIcons[task.status]
          return (
            <div key={task.id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group ${task.status === 'completada' ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleTask(task.id)} className={`flex-shrink-0 ${statusColors[task.status]} group-hover:scale-110 transition-transform`}>
                <StatusIcon size={20} />
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${task.status === 'completada' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>{task.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-slate-400 font-medium">{task.client}</span>
                  <span className="text-[10px] text-slate-400">·</span>
                  <span className="text-[10px] text-slate-400 font-medium">{task.dueDate}</span>
                </div>
              </div>
              <span className={`text-[9px] px-2 py-1 rounded-lg font-semibold ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── COLLABORATORS ──────────────────────────────────────────────────
function Collaborators() {
  const [collabs] = useState(INITIAL_COLLABORATORS)
  const [selectedCollab, setSelectedCollab] = useState<any>(null)

  if (selectedCollab) {
    return (
      <div className="p-4 lg:p-8">
        <button onClick={() => setSelectedCollab(null)} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-teal-700 dark:text-teal-300">
                {selectedCollab.agency.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{selectedCollab.agency}</h3>
              <span className="inline-block mt-2 px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-[9px] font-bold tracking-wider uppercase rounded-lg">{selectedCollab.specialty}</span>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < selectedCollab.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'} />)}
              </div>
              <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-left">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><UserPlus size={14} className="text-slate-400" />{selectedCollab.contact}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><MapPin size={14} className="text-slate-400" />{selectedCollab.city}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Mail size={14} className="text-slate-400" />{selectedCollab.email}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Phone size={14} className="text-slate-400" />{selectedCollab.phone}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors"><Mail size={14} /> Email</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"><Phone size={14} /> Llamar</button>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Propiedades Compartidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCollab.properties.map((prop: any, i: number) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{prop.type}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${prop.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{prop.status}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white mb-2">{prop.address}</p>
                    <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">{prop.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Historial</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-700" />
                {selectedCollab.history.map((item: any, i: number) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-[3px] border-white dark:border-slate-800" />
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">{item.date}</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Red de Alianzas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Colaboradores Partner</p>
        </div>
        <button className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nuevo Partner
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collabs.map(collab => (
          <div key={collab.id} onClick={() => setSelectedCollab(collab)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer group text-center active:scale-[0.98]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-lg font-bold text-teal-700 dark:text-teal-300 group-hover:scale-105 transition-transform">
              {collab.agency.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white truncate">{collab.agency}</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1 mb-3">{collab.contact}</p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < collab.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'} />)}</div>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md font-semibold text-slate-600 dark:text-slate-300">{collab.specialty}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10} />{collab.city}</span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">{collab.shared} compartidas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PROPERTIES ─────────────────────────────────────────────────────
function Properties({ search }: { search: string }) {
  const [properties] = useState(INITIAL_PROPERTIES)
  const [selectedProp, setSelectedProp] = useState<any>(null)
  const [localSearch, setLocalSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search || localSearch
    if (!q) return properties
    return properties.filter(p => p.address.toLowerCase().includes(q.toLowerCase()) || p.ref.toLowerCase().includes(q.toLowerCase()))
  }, [properties, search, localSearch])

  if (selectedProp) {
    return (
      <div className="p-4 lg:p-8">
        <button onClick={() => setSelectedProp(null)} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 dark:text-white">{selectedProp.address}</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">{selectedProp.ref} · {selectedProp.collab}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${STATUS_COLORS[selectedProp.status]}`}>{selectedProp.status}</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-t border-slate-100 dark:border-slate-700">
              {[
                { label: 'Precio', value: selectedProp.price, icon: Euro },
                { label: 'Tipo', value: selectedProp.type, icon: Home },
                { label: 'Superficie', value: selectedProp.area, icon: MapPin },
                { label: 'Habitaciones', value: selectedProp.rooms.toString(), icon: MapPin },
                { label: 'Baños', value: selectedProp.baths.toString(), icon: MapPin },
                { label: 'Planta', value: selectedProp.floor, icon: Clock },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="flex items-center gap-1.5 mb-1"><spec.icon size={12} className="text-teal-500" /><span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">{spec.label}</span></div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block mb-2">Características</span>
              <p className="text-sm text-slate-600 dark:text-slate-400">{selectedProp.features}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-teal-900 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Compradores Interesados</h3>
              <div className="space-y-2">
                {selectedProp.linkedClients.map((client: string, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-transparent hover:border-teal-500/20 transition-colors">
                    <span className="text-sm font-medium truncate pr-4">{client}</span>
                    <button className="text-white/30 hover:text-white flex-shrink-0"><X size={14} /></button>
                  </div>
                ))}
                {selectedProp.linkedClients.length === 0 && <p className="text-sm opacity-40 italic">Sin clientes vinculados</p>}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Historial</h4>
              <div className="space-y-4">
                {selectedProp.history.map((h: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-amber-400 mb-1" /><div className="w-px flex-1 bg-slate-100 dark:bg-slate-700" /></div>
                    <div><span className="text-[9px] font-semibold text-slate-400 block">{h.date}</span><p className="text-xs text-slate-600 dark:text-slate-400">{h.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Colección Inmobiliaria</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Control de Activos</p>
        </div>
        <button className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Propiedad
        </button>
      </div>
      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        <input type="text" placeholder="Buscar por dirección o ref..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">Dirección</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">Tipo</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">Precio</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">Colaborador</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 text-center">Interés</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">Estado</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {filtered.map(prop => (
              <tr key={prop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group" onClick={() => setSelectedProp(prop)}>
                <td className="px-6 py-4"><div><span className="text-sm font-semibold text-slate-800 dark:text-white">{prop.address}</span><span className="block text-[9px] text-slate-400 font-semibold">{prop.ref}</span></div></td>
                <td className="px-6 py-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500">{prop.type}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-white">{prop.price}</td>
                <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">{prop.collab}</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"><Users size={12} />{prop.interested}</span></td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${STATUS_COLORS[prop.status]}`}>{prop.status}</span></td>
                <td className="px-6 py-4 text-right"><button className="text-slate-300 group-hover:text-teal-500 transition-colors"><ChevronRight size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 gap-3">
        {filtered.map(prop => (
          <div key={prop.id} onClick={() => setSelectedProp(prop)}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 active:scale-[0.98] cursor-pointer hover:border-teal-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="min-w-0 flex-1 pr-3"><h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{prop.address}</h4><span className="text-[9px] text-slate-400 font-semibold">{prop.ref}</span></div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${STATUS_COLORS[prop.status]}`}>{prop.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div><span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 block">Precio</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{prop.price}</span></div>
              <div><span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 block">Tipo</span><span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{prop.type}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── COMMUNICATIONS ─────────────────────────────────────────────────
function Communications() {
  const [templates] = useState(EMAIL_TEMPLATES)

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Comunicaciones</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Plantillas y Mensajes</p>
        </div>
        <button className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Plantilla
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Enviar Email', icon: Mail, color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800' },
          { label: 'WhatsApp', icon: MessageSquare, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
          { label: 'Llamada', icon: Phone, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
          { label: 'Documento', icon: FileText, color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
        ].map(action => (
          <button key={action.label} className={`flex items-center justify-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-colors hover:shadow-md ${action.color}`}>
            <action.icon size={18} /><span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Templates */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Plantillas de Email</h3>
          <p className="text-xs text-slate-400 mt-1">Crea y reutiliza plantillas profesionales</p>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {templates.map(template => (
            <div key={template.id} className="p-5 flex items-center gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{template.name}</h4>
                <p className="text-xs text-slate-400 truncate">{template.subject}</p>
              </div>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg font-semibold text-slate-600 dark:text-slate-300">{template.category}</span>
              <button className="p-2 text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Send size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Communications */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Comunicaciones Recientes</h3>
        <div className="space-y-3">
          {[
            { type: 'email', client: 'Ignacio Valdés', subject: 'Dossier propiedades Retiro', time: 'hace 2h', status: 'enviado' },
            { type: 'call', client: 'Beatriz Soler', subject: 'Llamada de prospección', time: 'hace 4h', status: 'completada' },
            { type: 'email', client: 'Sofía Navarro', subject: 'Oferta formal Puerta de Hierro', time: 'ayer', status: 'abierto' },
            { type: 'whatsapp', client: 'Elena García', subject: 'Confirmación de visita', time: 'ayer', status: 'leído' },
          ].map((comm, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${comm.type === 'email' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : comm.type === 'call' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                {comm.type === 'email' ? <Mail size={14} /> : comm.type === 'call' ? <Phone size={14} /> : <MessageSquare size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{comm.subject}</p>
                <p className="text-xs text-slate-400">{comm.client} · {comm.time}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${comm.status === 'abierto' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{comm.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── NOTIFICATION PANEL ─────────────────────────────────────────────
function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const notifications = NOTIFICATIONS_DATA

  const typeIcons: Record<string, any> = { calendar: Calendar, deal: TrendingUp, alert: AlertCircle, property: Home, document: FileText, partner: UserPlus }
  const typeColors: Record<string, string> = { calendar: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400', deal: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', alert: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', property: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400', document: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300', partner: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
          <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Notificaciones</h3>
                <p className="text-xs text-slate-400">{notifications.filter(n => !n.read).length} sin leer</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.map(notif => {
                const Icon = typeIcons[notif.type] || Bell
                return (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer ${!notif.read ? 'bg-teal-50/30 dark:bg-teal-900/10' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type]}`}><Icon size={16} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{notif.title}</h4>
                          {!notif.read && <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.description}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <button className="w-full py-2.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-colors">Marcar todas como leídas</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── CONFIG ─────────────────────────────────────────────────────────
function Config({ darkMode, toggleDarkMode, onLogout }: { darkMode: boolean; toggleDarkMode: () => void; onLogout: () => void }) {
  const settingsSections = [
    { title: 'Perfil', items: [
      { icon: User, label: 'Mi Cuenta', desc: 'Datos personales y credenciales' },
      { icon: Shield, label: 'Seguridad', desc: 'Doble factor de autenticación' },
      { icon: Bell, label: 'Notificaciones', desc: 'Preferencias de alertas' },
    ]},
    { title: 'Entorno', items: [
      { icon: Moon, label: darkMode ? 'Modo Claro' : 'Modo Oscuro', desc: 'Cambiar apariencia', action: toggleDarkMode },
      { icon: Globe, label: 'Plataforma', desc: 'Idioma, zona horaria y moneda' },
      { icon: Palette, label: 'Personalización', desc: 'Esquemas de color y estilo' },
    ]},
    { title: 'Sesión', items: [
      { icon: ExternalLink, label: 'Cerrar Sesión', desc: 'Finalizar sesión de forma segura', action: onLogout, danger: true },
    ]},
  ]

  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Configuración</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Preferencias del Sistema</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        {settingsSections.map(section => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-slate-400 dark:text-slate-500 px-1">{section.title}</h3>
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.label} onClick={item.action}
                  className={`w-full p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 hover:shadow-md transition-all group text-left ${item.danger ? 'hover:border-red-200 dark:hover:border-red-800' : 'hover:border-teal-200 dark:hover:border-teal-700'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${item.danger ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold block ${item.danger ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.desc}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN CRM APP ───────────────────────────────────────────────────
function CRMApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const pageTitles: Record<ActiveTab, string> = {
    dashboard: 'Dashboard', clientes: 'Clientes', colaboradores: 'Colaboradores',
    propiedades: 'Propiedades', pipeline: 'Pipeline', calendario: 'Calendario',
    analiticas: 'Analíticas', tareas: 'Tareas', comunicaciones: 'Comunicaciones',
    configuracion: 'Configuración'
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />
      case 'clientes': return <Clients search={globalSearch} />
      case 'colaboradores': return <Collaborators />
      case 'propiedades': return <Properties search={globalSearch} />
      case 'pipeline': return <Pipeline />
      case 'calendario': return <CalendarView />
      case 'analiticas': return <Analytics />
      case 'tareas': return <Tasks />
      case 'comunicaciones': return <Communications />
      case 'configuracion': return <Config darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={() => setIsLoggedIn(false)} />
      default: return <Dashboard onNavigate={setActiveTab} />
    }
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        activeTab={activeTab} setActiveTab={setActiveTab}
        isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
        onLogout={() => setIsLoggedIn(false)}
        darkMode={darkMode} toggleDarkMode={toggleDarkMode}
      />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        <TopBar
          title={pageTitles[activeTab]}
          onMenuClick={() => setSidebarOpen(true)}
          notifications={NOTIFICATIONS_DATA.filter(n => !n.read).length}
          onNotificationClick={() => setNotifOpen(true)}
          globalSearch={globalSearch} setGlobalSearch={setGlobalSearch}
        />

        <main className="pt-16 sm:pt-20 pb-20 lg:pb-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  )
}

// ─── EXPORT ─────────────────────────────────────────────────────────
export default function CRMPage() {
  return <CRMApp />
}
