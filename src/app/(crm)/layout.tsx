'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCRMStore } from '@/components/crm/store'
import { NOTIFICATIONS_DATA } from '@/components/crm/data'
import { PAGE_TITLES } from '@/components/crm/constants'

import { LoginScreen } from '@/components/crm/layout/LoginScreen'
import { Sidebar } from '@/components/crm/layout/Sidebar'
import { TopBar } from '@/components/crm/layout/TopBar'
import { BottomNav } from '@/components/crm/layout/BottomNav'
import { NotificationPanel } from '@/components/crm/layout/NotificationPanel'

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    isLoggedIn,
    login,
    logout,
    sidebarOpen,
    setSidebarOpen,
    darkMode,
    toggleDarkMode,
    notifOpen,
    setNotifOpen,
    globalSearch,
    setGlobalSearch
  } = useCRMStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Redirigir al inicio si no hay ruta o es '/'
  useEffect(() => {
    if (isLoggedIn && pathname === '/') {
      router.push('/dashboard')
    }
  }, [isLoggedIn, pathname, router])

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />
  }

  // Derive title from pathname
  const pathKey = pathname.split('/')[1] || 'dashboard'
  const title = PAGE_TITLES[pathKey as keyof typeof PAGE_TITLES] || 'Privacidad'

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="md:ml-64 min-h-screen flex flex-col">
        <TopBar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          notifications={NOTIFICATIONS_DATA.filter(n => !n.read).length}
          onNotificationClick={() => setNotifOpen(true)}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
        />

        <main className="pt-16 md:pt-20 pb-20 md:pb-4 flex-1">
          {children}
        </main>
      </div>

      <BottomNav />
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  )
}
