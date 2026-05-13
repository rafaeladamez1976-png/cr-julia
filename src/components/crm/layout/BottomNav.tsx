'use client'
import { BOTTOM_NAV } from '../constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 z-30 lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around py-1.5 px-2">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon
          const isActive = pathname === `/${item.id}` || (pathname === '/' && item.id === 'dashboard')
          return (
            <Link key={item.id} href={`/${item.id}`}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${
                isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'
              }`}>
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              <span className={`text-[9px] font-semibold tracking-wide ${isActive ? 'text-teal-600 dark:text-teal-400' : ''}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
