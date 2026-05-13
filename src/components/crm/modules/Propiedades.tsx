'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Plus, Search, Euro, Home, MapPin, Clock, Users, X } from 'lucide-react'
import { INITIAL_PROPERTIES } from '../data'
import { STATUS_COLORS } from '../constants'

type Property = typeof INITIAL_PROPERTIES[number]

function PropiedadDetail({ prop, onBack }: { prop: Property; onBack: () => void }) {
  const [linkedClients, setLinkedClients] = useState(prop.linkedClients)

  return (
    <div className="p-4 lg:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 dark:text-white">{prop.address}</h3>
                {prop.offMarket && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded text-[9px] font-bold uppercase tracking-wider">Off-Market</span>}
              </div>
              <p className="text-xs text-slate-400 font-semibold mt-1">{prop.ref} · {prop.collab}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${STATUS_COLORS[prop.status]}`}>
              {prop.status}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-t border-slate-100 dark:border-slate-700">
            {[
              { label: 'Precio',       value: prop.price,           icon: Euro },
              { label: 'Tipo',         value: prop.type,            icon: Home },
              { label: 'Superficie',   value: prop.area,            icon: MapPin },
              { label: 'Habitaciones', value: prop.rooms.toString(), icon: MapPin },
              { label: 'Baños',        value: prop.baths.toString(), icon: MapPin },
              { label: 'Planta',       value: prop.floor,           icon: Clock },
            ].map(spec => (
              <div key={spec.label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <spec.icon size={12} className="text-teal-500" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">{spec.label}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{spec.value}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block mb-2">Características</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">{prop.features}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-teal-900 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Compradores Interesados</h3>
            <div className="space-y-2">
              {linkedClients.map((client, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-transparent hover:border-teal-500/20 transition-colors">
                  <span className="text-sm font-medium truncate pr-4">{client}</span>
                  <button onClick={() => setLinkedClients(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-white/30 hover:text-white flex-shrink-0 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
              {linkedClients.length === 0 && (
                <p className="text-sm opacity-40 italic">Sin clientes vinculados</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Historial</h4>
            <div className="space-y-4">
              {prop.history.map((h, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mb-1" />
                    <div className="w-px flex-1 bg-slate-100 dark:bg-slate-700" />
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 block">{h.date}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useCRMStore } from '../store'

const EMPTY_FORM = {
  address: '', ref: '', type: 'Piso', price: '', area: '', rooms: '3', baths: '2', floor: '', collab: '', features: '', offMarket: false,
}

export function Propiedades() {
  const { globalSearch: search } = useCRMStore()
  const [properties, setProperties] = useState(INITIAL_PROPERTIES)
  const [selected, setSelected] = useState<Property | null>(null)
  const [localSearch, setLocalSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    const q = search || localSearch
    if (!q) return properties
    return properties.filter(p =>
      p.address.toLowerCase().includes(q.toLowerCase()) ||
      p.ref.toLowerCase().includes(q.toLowerCase())
    )
  }, [properties, search, localSearch])

  const handleCreate = () => {
    if (!form.address.trim() || !form.price.trim()) return
    const nueva = {
      id: Date.now(),
      address: form.address,
      ref: form.ref || `REF-${Date.now().toString().slice(-5)}`,
      type: form.type,
      price: form.price,
      area: form.area || '—',
      rooms: Number(form.rooms) || 0,
      baths: Number(form.baths) || 0,
      floor: form.floor || '—',
      collab: form.collab || 'Sin colaborador',
      features: form.features || '—',
      status: 'Disponible',
      interested: 0,
      linkedClients: [],
      history: [{ date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }), text: 'Propiedad añadida al portfolio.' }],
      offMarket: form.offMarket,
    } as unknown as Property
    setProperties(prev => [...prev, nueva])
    setForm(EMPTY_FORM)
    setShowNew(false)
  }

  if (selected) return <PropiedadDetail prop={selected} onBack={() => setSelected(null)} />

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Colección Inmobiliaria</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Control de Activos</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Propiedad
        </button>
      </div>

      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        <input type="text" placeholder="Buscar por dirección o ref..." value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              {['Dirección', 'Tipo', 'Precio', 'Colaborador', 'Interés', 'Estado', ''].map(h => (
                <th key={h} className={`px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 ${h === 'Interés' ? 'text-center' : h === '' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {filtered.map(prop => (
              <tr key={prop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group" onClick={() => setSelected(prop)}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">{prop.address}</span>
                    {prop.offMarket && <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded text-[8px] font-bold uppercase tracking-wider">Off-Market</span>}
                  </div>
                  <span className="block text-[9px] text-slate-400 font-semibold">{prop.ref}</span>
                </td>
                <td className="px-6 py-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500">{prop.type}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-white">{prop.price}</td>
                <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">{prop.collab}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Users size={12} />{prop.interested}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${STATUS_COLORS[prop.status]}`}>{prop.status}</span>
                </td>
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
        {filtered.map(prop => (
          <div key={prop.id} onClick={() => setSelected(prop)}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 active:scale-[0.98] cursor-pointer hover:border-teal-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="min-w-0 flex-1 pr-3">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{prop.address}</h4>
                <span className="text-[9px] text-slate-400 font-semibold">{prop.ref}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${STATUS_COLORS[prop.status]}`}>{prop.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 block">Precio</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white">{prop.price}</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 block">Tipo</span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{prop.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nueva Propiedad</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Añadir al Portfolio</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Dirección *',     key: 'address',  placeholder: 'Calle Serrano 45, Madrid' },
                { label: 'Referencia',      key: 'ref',      placeholder: 'REF-2026-001' },
                { label: 'Precio *',        key: 'price',    placeholder: '1.250.000 €' },
                { label: 'Superficie',      key: 'area',     placeholder: '185 m²' },
                { label: 'Planta',          key: 'floor',    placeholder: '3ª con ascensor' },
                { label: 'Colaborador',     key: 'collab',   placeholder: 'Agencia o propietario' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Tipo</label>
                  <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option>Piso</option><option>Ático</option><option>Casa</option><option>Dúplex</option><option>Villa</option><option>Local</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Habitaciones</label>
                  <input type="number" min="0" max="20" value={form.rooms}
                    onChange={e => setForm(prev => ({ ...prev, rooms: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Baños</label>
                  <input type="number" min="0" max="10" value={form.baths}
                    onChange={e => setForm(prev => ({ ...prev, baths: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Características</label>
                <textarea value={form.features} onChange={e => setForm(prev => ({ ...prev, features: e.target.value }))}
                  rows={3} placeholder="Terraza, garaje, trastero, vistas..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none resize-none placeholder:text-slate-300" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="off_market" checked={form.offMarket}
                  onChange={e => setForm(prev => ({ ...prev, offMarket: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <label htmlFor="off_market" className="text-sm text-slate-700 dark:text-slate-300 font-medium">Propiedad Off-Market (Privada)</label>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-800">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Propiedad</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
