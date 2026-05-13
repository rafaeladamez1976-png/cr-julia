'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Bell, Search, Globe, X } from 'lucide-react'

interface TopBarProps {
  title: string
  onMenuClick: () => void
  notifications: number
  onNotificationClick: () => void
  globalSearch: string
  setGlobalSearch: (v: string) => void
}

export function TopBar({ title, onMenuClick, notifications, onNotificationClick, globalSearch, setGlobalSearch }: TopBarProps) {
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
        <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-slate-500 dark:text-slate-400 md:hidden hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <Search size={18} />
        </button>

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
