'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Mail, Phone, MessageSquare, FileText, Send, X, Check } from 'lucide-react'
import { EMAIL_TEMPLATES } from '../data'

type ActionType = 'email' | 'whatsapp' | 'llamada' | 'documento' | null

const EMPTY_TEMPLATE = { name: '', subject: '', category: 'Seguimiento', body: '' }

export function Communications() {
  const [templates, setTemplates] = useState(EMAIL_TEMPLATES)
  const [showNew, setShowNew] = useState(false)
  const [activeAction, setActiveAction] = useState<ActionType>(null)
  const [sentIds, setSentIds] = useState<Set<number>>(new Set())
  const [templateForm, setTemplateForm] = useState(EMPTY_TEMPLATE)
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', message: '', phone: '' })
  const [composeSent, setComposeSent] = useState(false)

  const handleSendTemplate = (id: number) => {
    setSentIds(prev => new Set(prev).add(id))
    setTimeout(() => setSentIds(prev => { const s = new Set(prev); s.delete(id); return s }), 2000)
  }

  const handleSaveTemplate = () => {
    if (!templateForm.name.trim() || !templateForm.subject.trim()) return
    const nueva = { id: Date.now(), ...templateForm } as typeof EMAIL_TEMPLATES[number]
    setTemplates(prev => [...prev, nueva])
    setTemplateForm(EMPTY_TEMPLATE)
    setShowNew(false)
  }

  const handleCompose = () => {
    setComposeSent(true)
    setTimeout(() => {
      setComposeSent(false)
      setActiveAction(null)
      setComposeForm({ to: '', subject: '', message: '', phone: '' })
    }, 1500)
  }

  const actionConfig = {
    email:     { label: 'Nuevo Email',    color: 'teal',    fields: ['to', 'subject', 'message'] },
    whatsapp:  { label: 'WhatsApp',       color: 'emerald', fields: ['phone', 'message'] },
    llamada:   { label: 'Registrar Llamada', color: 'amber', fields: ['phone', 'message'] },
    documento: { label: 'Nuevo Documento', color: 'indigo', fields: ['subject', 'message'] },
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Comunicaciones</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Plantillas y Mensajes</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Plantilla
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Enviar Email', icon: Mail,         color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',       action: 'email'     as ActionType },
          { label: 'WhatsApp',    icon: MessageSquare, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', action: 'whatsapp' as ActionType },
          { label: 'Llamada',     icon: Phone,         color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',   action: 'llamada'  as ActionType },
          { label: 'Documento',   icon: FileText,      color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800', action: 'documento' as ActionType },
        ].map(item => (
          <button key={item.label} onClick={() => setActiveAction(item.action)}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all hover:shadow-md active:scale-[0.97] ${item.color}`}>
            <item.icon size={18} /><span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Plantillas de Email</h3>
          <p className="text-xs text-slate-400 mt-1">Crea y reutiliza plantillas profesionales</p>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {templates.map(template => {
            const isSent = sentIds.has(template.id)
            return (
              <div key={template.id} className="p-5 flex items-center gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform flex-shrink-0">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{template.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{template.subject}</p>
                </div>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg font-semibold text-slate-600 dark:text-slate-300">{template.category}</span>
                <button onClick={e => { e.stopPropagation(); handleSendTemplate(template.id) }}
                  className={`p-2 rounded-lg transition-all ${isSent ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  {isSent ? <Check size={14} /> : <Send size={14} />}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Comunicaciones Recientes</h3>
        <div className="space-y-3">
          {[
            { type: 'email',    client: 'Ignacio Valdés', subject: 'Dossier propiedades Retiro',     time: 'hace 2h', status: 'enviado' },
            { type: 'call',     client: 'Beatriz Soler',  subject: 'Llamada de prospección',         time: 'hace 4h', status: 'completada' },
            { type: 'email',    client: 'Sofía Navarro',  subject: 'Oferta formal Puerta de Hierro', time: 'ayer',    status: 'abierto' },
            { type: 'whatsapp', client: 'Elena García',   subject: 'Confirmación de visita',         time: 'ayer',    status: 'leído' },
          ].map((comm, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                comm.type === 'email'    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' :
                comm.type === 'call'     ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                                           'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              }`}>
                {comm.type === 'email' ? <Mail size={14} /> : comm.type === 'call' ? <Phone size={14} /> : <MessageSquare size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{comm.subject}</p>
                <p className="text-xs text-slate-400">{comm.client} · {comm.time}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${comm.status === 'abierto' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {comm.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nueva Plantilla modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nueva Plantilla</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Email Template</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Nombre *',  key: 'name',     placeholder: 'Ej. Bienvenida cliente nuevo' },
                { label: 'Asunto *',  key: 'subject',  placeholder: 'Asunto del email' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} value={(templateForm as Record<string, string>)[f.key]}
                    onChange={e => setTemplateForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Categoría</label>
                <select value={templateForm.category} onChange={e => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                  <option>Seguimiento</option><option>Bienvenida</option><option>Oferta</option><option>Cierre</option><option>Otro</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Cuerpo</label>
                <textarea value={templateForm.body} onChange={e => setTemplateForm(prev => ({ ...prev, body: e.target.value }))}
                  rows={5} placeholder="Estimado/a {{nombre}},..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none resize-none placeholder:text-slate-300" />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button onClick={handleSaveTemplate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Plantilla</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quick compose modal */}
      {activeAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => { setActiveAction(null); setComposeSent(false) }} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{actionConfig[activeAction].label}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Comunicación Rápida</p>
              </div>
              <button onClick={() => { setActiveAction(null); setComposeSent(false) }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {composeSent ? (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">¡Enviado!</p>
                </div>
              ) : (
                <>
                  {(activeAction === 'email') && (
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Para</label>
                      <input type="email" placeholder="email@ejemplo.com" value={composeForm.to}
                        onChange={e => setComposeForm(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                    </div>
                  )}
                  {(activeAction === 'whatsapp' || activeAction === 'llamada') && (
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Teléfono</label>
                      <input type="tel" placeholder="+34 600 000 000" value={composeForm.phone}
                        onChange={e => setComposeForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                    </div>
                  )}
                  {(activeAction === 'email' || activeAction === 'documento') && (
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Asunto</label>
                      <input type="text" placeholder="Asunto..." value={composeForm.subject}
                        onChange={e => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">
                      {activeAction === 'llamada' ? 'Notas' : 'Mensaje'}
                    </label>
                    <textarea value={composeForm.message} onChange={e => setComposeForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4} placeholder="Escribe tu mensaje..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none resize-none placeholder:text-slate-300" />
                  </div>
                </>
              )}
            </div>
            {!composeSent && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
                <button onClick={handleCompose} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center gap-2">
                  <Send size={14} /> {activeAction === 'llamada' ? 'Registrar' : 'Enviar'}
                </button>
                <button onClick={() => setActiveAction(null)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
