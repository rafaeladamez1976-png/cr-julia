'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, Calendar, TrendingUp, AlertCircle, Home, FileText, UserPlus } from 'lucide-react'
import { NOTIFICATIONS_DATA } from '../data'

const TYPE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  calendar: Calendar,
  deal: TrendingUp,
  alert: AlertCircle,
  property: Home,
  document: FileText,
  partner: UserPlus,
}

const TYPE_COLORS: Record<string, string> = {
  calendar: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  deal: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  alert: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  property: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  document: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  partner: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
}

export function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA)
  const unread = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
          <motion.div
            initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Notificaciones</h3>
                <p className="text-xs text-slate-400">{unread} sin leer</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.map(notif => {
                const Icon = TYPE_ICONS[notif.type] || Bell
                return (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer ${!notif.read ? 'bg-teal-50/30 dark:bg-teal-900/10' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[notif.type]}`}>
                        <Icon size={16} />
                      </div>
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
              <button onClick={markAllRead} className="w-full py-2.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-colors">
                {unread > 0 ? `Marcar todas como leídas (${unread})` : 'Todo al día ✓'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
