'use client'
import { ChevronRight, User, Shield, Bell, Moon, Sun, Globe, Palette, ExternalLink } from 'lucide-react'

export function Config({ darkMode, toggleDarkMode, onLogout }: {
  darkMode: boolean
  toggleDarkMode: () => void
  onLogout: () => void
}) {
  const settingsSections = [
    { title: 'Perfil', items: [
      { icon: User,      label: 'Mi Cuenta',   desc: 'Datos personales y credenciales',   action: undefined,      danger: false },
      { icon: Shield,    label: 'Seguridad',    desc: 'Doble factor de autenticación',      action: undefined,      danger: false },
      { icon: Bell,      label: 'Notificaciones', desc: 'Preferencias de alertas',          action: undefined,      danger: false },
    ]},
    { title: 'Entorno', items: [
      { icon: darkMode ? Sun : Moon, label: darkMode ? 'Modo Claro' : 'Modo Oscuro', desc: 'Cambiar apariencia', action: toggleDarkMode, danger: false },
      { icon: Globe,     label: 'Plataforma',   desc: 'Idioma, zona horaria y moneda',     action: undefined,      danger: false },
      { icon: Palette,   label: 'Personalización', desc: 'Esquemas de color y estilo',     action: undefined,      danger: false },
    ]},
    { title: 'Sesión', items: [
      { icon: ExternalLink, label: 'Cerrar Sesión', desc: 'Finalizar sesión de forma segura', action: onLogout,    danger: true },
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
            {section.items.map(item => {
              const Icon = item.icon
              return (
                <button key={item.label} onClick={item.action}
                  className={`w-full p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 hover:shadow-md transition-all group text-left ${
                    item.danger ? 'hover:border-red-200 dark:hover:border-red-800' : 'hover:border-teal-200 dark:hover:border-teal-700'
                  }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                    item.danger ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  }`}>
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
