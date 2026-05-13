'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Globe, ChevronRight, Plus, ExternalLink, X } from 'lucide-react'
import { INITIAL_PROVEEDORES } from '../data'
import { SERVICIO_COLORS } from '../constants'
import { SERVICIOS } from '@/lib/schemas/proveedor'

type Proveedor = typeof INITIAL_PROVEEDORES[number]

function ProveedorDetail({ prov, onBack }: { prov: Proveedor; onBack: () => void }) {
  return (
    <div className="p-4 lg:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-teal-700 dark:text-teal-300">
              {prov.razon_social.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-center">{prov.razon_social}</h3>
            <div className="flex justify-center mt-2">
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${SERVICIO_COLORS[prov.servicio] ?? 'bg-slate-100 text-slate-600'}`}>
                {prov.servicio}
              </span>
            </div>
            <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Mail size={14} className="text-slate-400 shrink-0" />{prov.email}</div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Phone size={14} className="text-slate-400 shrink-0" />{prov.telefono}</div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Globe size={14} className="text-slate-400 shrink-0" />{prov.web}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={`mailto:${prov.email}`} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors">
              <Mail size={14} /> Email
            </a>
            <a href={`tel:${prov.telefono}`} className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors">
              <Phone size={14} /> Llamar
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Datos de Contacto</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Contacto',     value: prov.contacto },
                { label: 'Cargo',        value: prov.cargo },
                { label: 'CIF',          value: prov.cif },
                { label: 'Coste',        value: prov.coste },
                { label: 'Servicio',     value: prov.servicio },
                { label: 'Web',          value: prov.web },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-1">{f.label}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Redes Sociales</h3>
            <div className="flex flex-wrap gap-2">
              {prov.rrss.ig && (
                <a href={`https://instagram.com/${prov.rrss.ig}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-semibold hover:bg-pink-100 transition-colors">
                  <ExternalLink size={11} /> @{prov.rrss.ig}
                </a>
              )}
              {prov.rrss.lkn && (
                <a href={`https://linkedin.com/in/${prov.rrss.lkn}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                  <ExternalLink size={11} /> LinkedIn
                </a>
              )}
              {prov.rrss.fb && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold">
                  <ExternalLink size={11} /> Facebook
                </span>
              )}
              {prov.rrss.tiktok && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
                  <ExternalLink size={11} /> TikTok
                </span>
              )}
              {!prov.rrss.ig && !prov.rrss.lkn && !prov.rrss.fb && !prov.rrss.tiktok && (
                <p className="text-sm text-slate-400 italic">Sin redes sociales registradas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Proveedores() {
  const [proveedores, setProveedores] = useState(INITIAL_PROVEEDORES)
  const [selected, setSelected]       = useState<Proveedor | null>(null)
  const [filtroServicio, setFiltroServicio] = useState('todos')
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({
    razon_social: '', contacto: '', cargo: '', telefono: '', email: '', cif: '',
    servicio: SERVICIOS[0] as typeof SERVICIOS[number], coste: '', web: '',
  })

  const handleCreate = () => {
    if (!form.razon_social || !form.contacto || !form.email) return
    const nuevo = { id: Date.now(), ...form, rrss: { ig: '', lkn: '', fb: '', tiktok: '' } }
    setProveedores(prev => [...prev, nuevo as typeof INITIAL_PROVEEDORES[number]])
    setForm({ razon_social: '', contacto: '', cargo: '', telefono: '', email: '', cif: '', servicio: SERVICIOS[0], coste: '', web: '' })
    setShowNew(false)
  }

  if (selected) return <ProveedorDetail prov={selected} onBack={() => setSelected(null)} />

  const servicios = ['todos', ...Array.from(new Set(proveedores.map(p => p.servicio)))]
  const filtered = filtroServicio === 'todos' ? proveedores : proveedores.filter(p => p.servicio === filtroServicio)

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Proveedores Premium</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Red de Servicios</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nuevo Proveedor
        </button>
      </div>

      {/* Filtro por servicio */}
      <div className="flex flex-wrap gap-2 mb-6">
        {servicios.map(s => (
          <button key={s} onClick={() => setFiltroServicio(s)}
            className={`px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              filtroServicio === s
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-teal-300'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prov, i) => (
          <motion.div key={prov.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(prov)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-800/30 dark:to-teal-900/30 flex items-center justify-center font-bold text-teal-700 dark:text-teal-300 text-xs">
                  {prov.razon_social.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate max-w-[140px]">{prov.razon_social}</h4>
                  <span className="text-[10px] text-slate-400">{prov.contacto}</span>
                </div>
              </div>
              <span className={`text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-wider flex-shrink-0 ${SERVICIO_COLORS[prov.servicio] ?? 'bg-slate-100 text-slate-600'}`}>
                {prov.servicio}
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2"><Mail size={12} className="shrink-0" /><span className="truncate">{prov.email}</span></div>
              <div className="flex items-center gap-2"><Phone size={12} className="shrink-0" /><span>{prov.telefono}</span></div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{prov.coste}</span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nuevo Proveedor</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Alta Red de Servicios</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Razón Social', key: 'razon_social', type: 'text',  placeholder: 'Empresa S.L.' },
                { label: 'Contacto',     key: 'contacto',     type: 'text',  placeholder: 'Nombre apellidos' },
                { label: 'Cargo',        key: 'cargo',        type: 'text',  placeholder: 'Director Comercial' },
                { label: 'Teléfono',     key: 'telefono',     type: 'tel',   placeholder: '+34 900 000 000' },
                { label: 'Email',        key: 'email',        type: 'email', placeholder: 'contacto@empresa.com' },
                { label: 'CIF',          key: 'cif',          type: 'text',  placeholder: 'B12345678' },
                { label: 'Coste',        key: 'coste',        type: 'text',  placeholder: 'Por servicio / % / Consultar' },
                { label: 'Web',          key: 'web',          type: 'url',   placeholder: 'https://empresa.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Servicio</label>
                <select value={form.servicio} onChange={e => setForm(prev => ({ ...prev, servicio: e.target.value as typeof SERVICIOS[number] }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                  {SERVICIOS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-800">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Proveedor</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
