'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Plus, Search, Phone, Mail, Clock, Edit, Target, X, Save } from 'lucide-react'
import { INITIAL_CLIENTS } from '../data'
import { STATUS_COLORS, SCORE_COLOR } from '../constants'

type Client = typeof INITIAL_CLIENTS[number]

function ClientDetail({ client, onBack, onSave }: { client: Client; onBack: () => void; onSave: (c: Client) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [edited, setEdited] = useState(client)

  const handleSave = () => {
    onSave(edited)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEdited(client)
    setIsEditing(false)
  }

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
              {edited.avatar}
            </div>
            {isEditing ? (
              <input value={edited.name} onChange={e => setEdited(prev => ({ ...prev, name: e.target.value }))}
                className="w-full text-center text-lg font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-1.5 outline-none focus:border-teal-500 mb-2" />
            ) : (
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{edited.name}</h3>
            )}
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${STATUS_COLORS[edited.status]}`}>{edited.status}</span>
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl ${SCORE_COLOR(edited.score)}`}>
              <Target size={14} />
              <span className="text-lg font-bold">{edited.score}</span>
              <span className="text-[10px] font-semibold">Score</span>
            </div>
            <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-left">
              {isEditing ? (
                <>
                  <input value={edited.phone} onChange={e => setEdited(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Teléfono" type="tel"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-teal-500" />
                  <input value={edited.email} onChange={e => setEdited(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Email" type="email"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-teal-500" />
                  <input value={edited.budget} onChange={e => setEdited(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="Presupuesto"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-teal-500" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><Phone size={14} className="text-slate-400" /><span className="text-sm">{edited.phone}</span></div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><Mail size={14} className="text-slate-400" /><span className="text-sm truncate">{edited.email}</span></div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><Clock size={14} className="text-slate-400" /><span className="text-[10px] uppercase tracking-wider font-semibold">Desde {edited.date}</span></div>
                </>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-teal-900 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-300/80 mb-3">Notas Internas</h4>
            {isEditing ? (
              <textarea value={edited.notes} onChange={e => setEdited(prev => ({ ...prev, notes: e.target.value }))}
                rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-teal-400 resize-none" />
            ) : (
              <p className="text-sm leading-relaxed opacity-80 italic">"{edited.notes}"</p>
            )}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
                  <Save size={14} /> Guardar
                </button>
                <button onClick={handleCancel} className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Edit size={14} /> Editar
                </button>
                <a href={`tel:${edited.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
                  <Phone size={14} /> Llamar
                </a>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Criterio de Inversión</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: 'Presupuesto', value: edited.budget },
                { label: 'Tipo',        value: edited.type },
                { label: 'Superficie',  value: `${edited.size} m²` },
                { label: 'Origen',      value: edited.origin },
                { label: 'Zonas',       value: edited.zone },
                { label: 'Estado AML',  value: edited.estado_aml },
                { label: 'Rep. Legal',  value: edited.representante_legal },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Interacciones</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-700" />
              {edited.interactions.map((int, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-white dark:border-slate-800 ${int.type === 'phone' ? 'bg-teal-400' : int.type === 'meeting' ? 'bg-amber-400' : 'bg-indigo-400'}`} />
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{int.date}</span>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full font-semibold text-slate-600 dark:text-slate-300 uppercase">
                      {int.type === 'phone' ? 'Llamada' : int.type === 'message' ? 'Dossier' : 'Reunión'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{int.text}</p>
                </div>
              ))}
              {edited.interactions.length === 0 && (
                <p className="text-sm text-slate-400 pl-8">Sin interacciones registradas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useCRMStore } from '../store'

const EMPTY_FORM = {
  nombre: '', email: '', telefono: '', nif: '', domicilio: '', web: '',
  presupuestoMin: '', presupuestoMax: '', idioma: 'Español', origen: 'Web',
  identidadProtegida: false, rgpdConsent: false, rgpdMarketing: false, notas: '',
  estadoAML: 'Pendiente', representanteLegal: ''
}

export function Clientes() {
  const { globalSearch: search } = useCRMStore()
  const [clients, setClients] = useState(INITIAL_CLIENTS)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [localSearch, setLocalSearch] = useState('')
  const [showNewClient, setShowNewClient] = useState(false)
  const [filterStatus, setFilterStatus] = useState('todos')
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')

  const filteredClients = useMemo(() => {
    let result = clients
    const q = search || localSearch
    if (q) result = result.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.zone.toLowerCase().includes(q.toLowerCase()))
    if (filterStatus !== 'todos') result = result.filter(c => c.status === filterStatus)
    return result
  }, [clients, search, localSearch, filterStatus])

  const handleSaveClient = () => {
    if (!form.nombre.trim() || !form.email.trim()) { setFormError('Nombre y email son obligatorios'); return }
    if (!form.rgpdConsent) { setFormError('El consentimiento RGPD es obligatorio'); return }
    setFormError('')
    const nuevo = {
      id: Date.now(),
      name: form.nombre,
      avatar: form.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      email: form.email,
      phone: form.telefono || '—',
      budget: form.presupuestoMin && form.presupuestoMax ? `${form.presupuestoMin} – ${form.presupuestoMax}` : 'Por definir',
      zone: 'Por definir',
      type: 'Por definir',
      size: '0',
      status: 'Activo' as const,
      score: 0,
      origin: form.origen,
      estado_aml: form.estadoAML,
      representante_legal: form.representanteLegal || '—',
      date: new Date().toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
      notes: form.notas || 'Sin notas',
      interactions: [],
    } as Client
    setClients(prev => [...prev, nuevo])
    setForm(EMPTY_FORM)
    setShowNewClient(false)
  }

  const handleUpdateClient = (updated: Client) => {
    setClients(prev => prev.map(c => c.id === updated.id ? updated : c))
    setSelectedClient(updated)
  }

  if (selectedClient) return (
    <ClientDetail
      client={selectedClient}
      onBack={() => setSelectedClient(null)}
      onSave={handleUpdateClient}
    />
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Portfolio de Clientes</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Gestión de Inversores</p>
        </div>
        <button onClick={() => setShowNewClient(true)}
          className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20">
          <Plus size={14} /> Nuevo Cliente
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input type="text" placeholder="Buscar por nombre o zona..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['todos', 'Activo', 'Templado', 'Dormido', 'Cerrado'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                filterStatus === s ? 'bg-teal-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-teal-300'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet table */}
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              {['Nombre', 'Presupuesto', 'Zona', 'Score', 'Estado', ''].map(h => (
                <th key={h} className={`px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 ${h === '' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {filteredClients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group" onClick={() => setSelectedClient(client)}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-300">{client.avatar}</div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{client.name}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">{client.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{client.budget}</td>
                <td className="px-6 py-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{client.zone}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${SCORE_COLOR(client.score)}`}>
                    <Target size={10} /> {client.score}
                  </span>
                </td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${STATUS_COLORS[client.status]}`}>{client.status}</span></td>
                <td className="px-6 py-4 text-right"><button className="text-slate-300 group-hover:text-teal-500 transition-colors"><ChevronRight size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredClients.map(client => (
          <div key={client.id} onClick={() => setSelectedClient(client)}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 active:scale-[0.98] cursor-pointer hover:border-teal-200 dark:hover:border-teal-700 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-300">{client.avatar}</div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{client.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${STATUS_COLORS[client.status]}`}>{client.status}</span>
                </div>
              </div>
              <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${SCORE_COLOR(client.score)}`}><Target size={9} /> {client.score}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-slate-400 dark:text-slate-500 text-[9px] font-semibold uppercase block">Presupuesto</span><span className="font-medium text-slate-700 dark:text-slate-200">{client.budget}</span></div>
              <div><span className="text-slate-400 dark:text-slate-500 text-[9px] font-semibold uppercase block">Zona</span><span className="font-medium text-slate-700 dark:text-slate-200 text-[10px]">{client.zone}</span></div>
            </div>
          </div>
        ))}
      </div>

      {showNewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNewClient(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nuevo Cliente</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Alta de Inversor</p>
              </div>
              <button onClick={() => setShowNewClient(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Nombre Completo *', key: 'nombre',    placeholder: 'Ej. Ricardo Darín',        type: 'text' },
                { label: 'Email *',           key: 'email',     placeholder: 'email@ejemplo.com',        type: 'email' },
                { label: 'Teléfono',          key: 'telefono',  placeholder: '+34 600 000 000',          type: 'tel' },
                { label: 'NIF / NIE / CIF',   key: 'nif',       placeholder: '12345678A',                type: 'text' },
                { label: 'Domicilio completo',key: 'domicilio', placeholder: 'Calle, número, CP, ciudad',type: 'text' },
                { label: 'Web',               key: 'web',       placeholder: 'https://...',              type: 'url' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as unknown as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Presupuesto Mín</label>
                  <input type="text" placeholder="500.000 €" value={form.presupuestoMin}
                    onChange={e => setForm(prev => ({ ...prev, presupuestoMin: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Presupuesto Máx</label>
                  <input type="text" placeholder="1.200.000 €" value={form.presupuestoMax}
                    onChange={e => setForm(prev => ({ ...prev, presupuestoMax: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Idioma</label>
                  <select value={form.idioma} onChange={e => setForm(prev => ({ ...prev, idioma: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option>Español</option><option>Inglés</option><option>Francés</option><option>Alemán</option><option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Origen</label>
                  <select value={form.origen} onChange={e => setForm(prev => ({ ...prev, origen: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option>Referido</option><option>Web</option><option>Redes Sociales</option><option>Evento</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Estado AML</label>
                  <select value={form.estadoAML} onChange={e => setForm(prev => ({ ...prev, estadoAML: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option>Pendiente</option><option>En Revisión</option><option>Aprobado</option><option>Rechazado</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Rep. Legal</label>
                  <input type="text" placeholder="Abogado / Empresa" value={form.representanteLegal}
                    onChange={e => setForm(prev => ({ ...prev, representanteLegal: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="identidad_protegida" checked={form.identidadProtegida}
                  onChange={e => setForm(prev => ({ ...prev, identidadProtegida: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <label htmlFor="identidad_protegida" className="text-sm text-slate-700 dark:text-slate-300 font-medium">Identidad protegida</label>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-amber-700 dark:text-amber-400">Consentimiento RGPD</p>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="rgpd_consent" checked={form.rgpdConsent}
                    onChange={e => setForm(prev => ({ ...prev, rgpdConsent: e.target.checked }))}
                    className="w-4 h-4 rounded border-amber-300 text-teal-600 focus:ring-teal-500 mt-0.5 flex-shrink-0" />
                  <label htmlFor="rgpd_consent" className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    El cliente consiente el tratamiento de sus datos personales conforme al RGPD (UE) 2016/679 y a la política de privacidad de la agencia.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="rgpd_marketing" checked={form.rgpdMarketing}
                    onChange={e => setForm(prev => ({ ...prev, rgpdMarketing: e.target.checked }))}
                    className="w-4 h-4 rounded border-amber-300 text-teal-600 focus:ring-teal-500 mt-0.5 flex-shrink-0" />
                  <label htmlFor="rgpd_marketing" className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    Acepta recibir comunicaciones comerciales relacionadas con propiedades y servicios de la agencia.
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Notas Confidenciales</label>
                <textarea value={form.notas} onChange={e => setForm(prev => ({ ...prev, notas: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none resize-none h-24 placeholder:text-slate-300"
                  placeholder="Características deseadas..." />
              </div>
              {formError && <p className="text-xs text-red-500 font-semibold">{formError}</p>}
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-800">
              <button onClick={handleSaveClient} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Cliente</button>
              <button onClick={() => { setShowNewClient(false); setFormError('') }} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
