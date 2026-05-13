'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon, ExternalLink } from 'lucide-react'
import { NAV_ITEMS } from '../constants'
import type { ActiveTab } from '../store'

interface SidebarProps {
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose, onLogout, darkMode, toggleDarkMode }: SidebarProps) {
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

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" />
        )}
      </AnimatePresence>
    </>
  )
}
