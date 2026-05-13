'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, ChevronRight, Plus, TrendingUp, Users, X } from 'lucide-react'
import { INITIAL_AGENTES } from '../data'

type Agente = typeof INITIAL_AGENTES[number]

const KPI_LABELS: { key: keyof Agente['kpis']; label: string }[] = [
  { key: 'llamadas',              label: '📞 Llamadas' },
  { key: 'reuniones',             label: '🤝 Reuniones' },
  { key: 'propuestas',            label: '📄 Propuestas' },
  { key: 'inmuebles_contactados', label: '🏠 Contactados' },
  { key: 'inmuebles_visitados',   label: '👁️ Visitados' },
  { key: 'inmuebles_presentados', label: '🎯 Presentados' },
  { key: 'compras',               label: '✅ Compras' },
]

function AgenteDetail({ agente, onBack }: { agente: Agente; onBack: () => void }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-teal-700 dark:text-teal-300 shadow-inner">
              {agente.avatar}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{agente.nombre}</h3>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              {agente.rol}
            </span>
            <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-left">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Phone size={14} className="text-slate-400" /><span className="text-sm">{agente.telefono}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Mail size={14} className="text-slate-400" /><span className="text-sm truncate">{agente.email}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <a href={`mailto:${agente.email}`} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors">
                <Mail size={14} /> Email
              </a>
              <a href={`tel:${agente.telefono}`} className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                <Phone size={14} /> Llamar
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-teal-500" /> KPIs del Período
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {KPI_LABELS.map(({ key, label }) => (
                <div key={key} className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{agente.kpis[key]}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Agentes() {
  const [agentes, setAgentes] = useState(INITIAL_AGENTES)
  const [selected, setSelected]   = useState<Agente | null>(null)
  const [showNew, setShowNew]     = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', rol: 'Agente Junior' as Agente['rol'] })

  const handleCreate = () => {
    if (!form.nombre || !form.email || !form.telefono) return
    const nuevo: Agente = {
      id: Date.now(), ...form, avatar: form.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      activo: true,
      kpis: { llamadas: 0, reuniones: 0, propuestas: 0, inmuebles_contactados: 0, inmuebles_visitados: 0, inmuebles_presentados: 0, compras: 0 },
    }
    setAgentes(prev => [...prev, nuevo])
    setForm({ nombre: '', email: '', telefono: '', rol: 'Agente Junior' })
    setShowNew(false)
  }

  if (selected) return <AgenteDetail agente={selected} onBack={() => setSelected(null)} />

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Equipo de Agentes</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Staff Interno</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nuevo Agente
        </button>
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Agentes',  value: agentes.length.toString(),                                    icon: Users },
          { label: 'Activos',        value: agentes.filter(a => a.activo).length.toString(),              icon: Users },
          { label: 'Total Llamadas', value: agentes.reduce((s, a) => s + a.kpis.llamadas, 0).toString(),  icon: Phone },
          { label: 'Total Compras',  value: agentes.reduce((s, a) => s + a.kpis.compras, 0).toString(),   icon: TrendingUp },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
            <p className="text-3xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentes.map((agente, i) => (
          <motion.div key={agente.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(agente)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 flex items-center justify-center font-bold text-teal-700 dark:text-teal-300 text-sm">
                {agente.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{agente.nombre}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{agente.rol}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${agente.activo ? 'bg-emerald-400' : 'bg-slate-300'}`} title={agente.activo ? 'Activo' : 'Inactivo'} />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800 dark:text-white">{agente.kpis.llamadas}</p>
                <p className="text-[9px] text-slate-400 uppercase">Llamadas</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800 dark:text-white">{agente.kpis.reuniones}</p>
                <p className="text-[9px] text-slate-400 uppercase">Reuniones</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{agente.kpis.compras}</p>
                <p className="text-[9px] text-slate-400 uppercase">Compras</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nuevo Agente</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Alta Staff Interno</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Nombre Completo', key: 'nombre',   type: 'text',  placeholder: 'Ej. Laura Sánchez' },
                { label: 'Email',           key: 'email',    type: 'email', placeholder: 'agente@magna.com' },
                { label: 'Teléfono',        key: 'telefono', type: 'tel',   placeholder: '+34 600 000 000' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Rol</label>
                <select value={form.rol} onChange={e => setForm(prev => ({ ...prev, rol: e.target.value as Agente['rol'] }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                  <option>Agente Junior</option><option>Agente Senior</option><option>Manager</option><option>Admin</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Agente</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

