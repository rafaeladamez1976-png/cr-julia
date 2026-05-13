'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NOTIFICATIONS_DATA } from './data'
import { PAGE_TITLES } from './constants'
import type { ActiveTab } from './store'

import { LoginScreen }      from './layout/LoginScreen'
import { Sidebar }          from './layout/Sidebar'
import { TopBar }           from './layout/TopBar'
import { BottomNav }        from './layout/BottomNav'
import { NotificationPanel } from './layout/NotificationPanel'

import { Dashboard }        from './modules/Dashboard'
import { Agentes }          from './modules/Agentes'
import { Agencias }         from './modules/Agencias'
import { Clientes }         from './modules/Clientes'
import { Propiedades }      from './modules/Propiedades'
import { Pipeline }         from './modules/Pipeline'
import { Proveedores }      from './modules/Proveedores'
import { Tasks }            from './modules/Tasks'
import { CalendarView }     from './modules/CalendarView'
import { Analytics }        from './modules/Analytics'
import { Communications }   from './modules/Communications'
import { Config }           from './modules/Config'

function CRMApp() {
  const [isLoggedIn, setIsLoggedIn]   = useState(false)
  const [activeTab, setActiveTab]     = useState<ActiveTab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode]       = useState(false)
  const [notifOpen, setNotifOpen]     = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':      return <Dashboard onNavigate={setActiveTab} />
      case 'agentes':        return <Agentes />
      case 'agencias':       return <Agencias />
      case 'clientes':       return <Clientes search={globalSearch} />
      case 'propiedades':    return <Propiedades search={globalSearch} />
      case 'pipeline':       return <Pipeline />
      case 'proveedores':    return <Proveedores />
      case 'tareas':         return <Tasks />
      case 'calendario':     return <CalendarView />
      case 'analiticas':     return <Analytics />
      case 'comunicaciones': return <Communications />
      case 'configuracion':  return <Config darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={() => setIsLoggedIn(false)} />
      default:               return <Dashboard onNavigate={setActiveTab} />
    }
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setIsLoggedIn(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        <TopBar
          title={PAGE_TITLES[activeTab]}
          onMenuClick={() => setSidebarOpen(true)}
          notifications={NOTIFICATIONS_DATA.filter(n => !n.read).length}
          onNotificationClick={() => setNotifOpen(true)}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
        />

        <main className="pt-16 sm:pt-20 pb-20 lg:pb-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
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

export default function CRMPage() {
  return <CRMApp />
}
