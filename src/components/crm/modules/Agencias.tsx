'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Plus, Mail, Phone, MapPin, Star, UserPlus, X } from 'lucide-react'
import { INITIAL_COLLABORATORS } from '../data'

type Collab = typeof INITIAL_COLLABORATORS[number]

function AgenciaDetail({ collab, onBack }: { collab: Collab; onBack: () => void }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors mb-6 group">
        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider">Volver</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-teal-700 dark:text-teal-300">
              {collab.agency.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{collab.agency}</h3>
            <span className="inline-block mt-2 px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-[9px] font-bold tracking-wider uppercase rounded-lg">
              {collab.specialty}
            </span>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < collab.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'} />
              ))}
            </div>
            <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><UserPlus size={14} className="text-slate-400" />{collab.contact}</div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><MapPin size={14} className="text-slate-400" />{collab.city}</div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Mail size={14} className="text-slate-400" />{collab.email}</div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><Phone size={14} className="text-slate-400" />{collab.phone}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={`mailto:${collab.email}`} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors">
              <Mail size={14} /> Email
            </a>
            <a href={`tel:${collab.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Phone size={14} /> Llamar
            </a>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Propiedades Compartidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collab.properties.map((prop, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{prop.type}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${prop.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {prop.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white mb-2">{prop.address}</p>
                  <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">{prop.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Historial</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-700" />
              {collab.history.map((item, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-[3px] border-white dark:border-slate-800" />
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">{item.date}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Agencias() {
  const [collabs, setCollabs] = useState(INITIAL_COLLABORATORS)
  const [selected, setSelected] = useState<Collab | null>(null)
  const [showNew, setShowNew]   = useState(false)
  const [form, setForm] = useState({ agency: '', contact: '', email: '', phone: '', city: '', specialty: '' })

  const handleCreate = () => {
    if (!form.agency || !form.contact || !form.email) return
    const nueva = { id: Date.now(), ...form, rating: 3, shared: 0, notes: '', history: [], properties: [] }
    setCollabs(prev => [...prev, nueva as typeof INITIAL_COLLABORATORS[number]])
    setForm({ agency: '', contact: '', email: '', phone: '', city: '', specialty: '' })
    setShowNew(false)
  }

  if (selected) return <AgenciaDetail collab={selected} onBack={() => setSelected(null)} />

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Red de Alianzas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Colaboradores Partner</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nuevo Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collabs.map((collab, i) => (
          <motion.div key={collab.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(collab)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer group text-center active:scale-[0.98]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-800 dark:to-teal-900 mx-auto mb-4 flex items-center justify-center text-lg font-bold text-teal-700 dark:text-teal-300 group-hover:scale-105 transition-transform">
              {collab.agency.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white truncate">{collab.agency}</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1 mb-3">{collab.contact}</p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < collab.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'} />
                ))}
              </div>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md font-semibold text-slate-600 dark:text-slate-300">
                {collab.specialty}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10} />{collab.city}</span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">{collab.shared} compartidas</span>
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
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nuevo Partner</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Alta Agencia Colaboradora</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Razón Social',    key: 'agency',    type: 'text',  placeholder: 'Inmobiliaria Ejemplo' },
                { label: 'Contacto',        key: 'contact',   type: 'text',  placeholder: 'Nombre apellidos' },
                { label: 'Email',           key: 'email',     type: 'email', placeholder: 'contacto@agencia.com' },
                { label: 'Teléfono',        key: 'phone',     type: 'tel',   placeholder: '+34 900 000 000' },
                { label: 'Ciudad',          key: 'city',      type: 'text',  placeholder: 'Madrid' },
                { label: 'Especialidad',    key: 'specialty', type: 'text',  placeholder: 'Lujo / Obra Nueva / ...' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Partner</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

