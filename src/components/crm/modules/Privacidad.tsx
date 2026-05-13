'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Download, EyeOff, Trash2, Search, CheckCircle2, AlertTriangle } from 'lucide-react'

export function Privacidad() {
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [actionStatus, setActionStatus] = useState<{ type: string; message: string } | null>(null)

  // Datos simulados
  const mockClients = [
    { id: '1', name: 'Ricardo Darín', email: 'ricardo@example.com' },
    { id: '2', name: 'Penélope Cruz', email: 'penelope@example.com' },
    { id: '3', name: 'Javier Bardem', email: 'javier@example.com' },
  ]

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAction = (type: string, message: string) => {
    setActionStatus({ type, message })
    setTimeout(() => setActionStatus(null), 3000)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
          <Shield className="text-teal-600" size={28} />
          Herramientas DPO (RGPD)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">
          Gestión de Privacidad y Derechos de Datos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Buscador */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Seleccionar Cliente</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:border-teal-500 outline-none" 
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredClients.map(client => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${
                    selectedClient === client.id 
                      ? 'bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800' 
                      : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{client.name}</p>
                  <p className="text-xs text-slate-500">{client.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Acciones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 opacity-100 transition-opacity">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Acciones de Privacidad</h3>
            
            {actionStatus && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{actionStatus.message}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Exportar */}
              <div className={`p-5 rounded-xl border ${selectedClient ? 'border-slate-200 dark:border-slate-700' : 'border-slate-100 dark:border-slate-800 opacity-50'} flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                    <Download size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Exportación de Datos</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">Genera un archivo ZIP con toda la información personal y registros de interacciones del cliente.</p>
                  </div>
                </div>
                <button 
                  disabled={!selectedClient}
                  onClick={() => handleAction('export', 'Archivo ZIP generado correctamente.')}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
                >
                  Exportar JSON
                </button>
              </div>

              {/* Anonimizar */}
              <div className={`p-5 rounded-xl border ${selectedClient ? 'border-slate-200 dark:border-slate-700' : 'border-slate-100 dark:border-slate-800 opacity-50'} flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                    <EyeOff size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Anonimización</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">Aplica un hash irreversible a los datos personales. Se mantendrán agregados para analíticas.</p>
                  </div>
                </div>
                <button 
                  disabled={!selectedClient}
                  onClick={() => handleAction('anonymize', 'Datos personales anonimizados con éxito.')}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 w-full sm:w-auto"
                >
                  Anonimizar PII
                </button>
              </div>

              {/* Borrar */}
              <div className={`p-5 rounded-xl border ${selectedClient ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10' : 'border-slate-100 dark:border-slate-800 opacity-50'} flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 text-red-600 dark:text-red-400">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-400">Derecho al Olvido</h4>
                    <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1 max-w-sm">Eliminación permanente (soft-delete y tombstone) de todo el registro del cliente en el sistema.</p>
                  </div>
                </div>
                <button 
                  disabled={!selectedClient}
                  onClick={() => handleAction('delete', 'Registro eliminado (Derecho al olvido aplicado).')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <AlertTriangle size={14} /> Eliminar
                </button>
              </div>
            </div>

            {!selectedClient && (
              <p className="text-xs text-slate-400 text-center mt-6">Selecciona un cliente para habilitar las acciones.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
