'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckCircle2, Circle, AlertCircle, X } from 'lucide-react'
import { INITIAL_TASKS } from '../data'
import { PRIORITY_COLORS } from '../constants'

const statusLabels: Record<string, string> = {
  pendiente:   'Pendiente',
  en_progreso: 'En Progreso',
  completada:  'Completada',
}
const statusIcons = {
  pendiente:   Circle,
  en_progreso: AlertCircle,
  completada:  CheckCircle2,
} as const
const statusColors: Record<string, string> = {
  pendiente:   'text-slate-400',
  en_progreso: 'text-amber-500',
  completada:  'text-emerald-500',
}

type TaskStatus = keyof typeof statusIcons
type Priority = 'Alta' | 'Media' | 'Baja'

const EMPTY_FORM = {
  title: '',
  client: '',
  dueDate: '',
  priority: 'Media' as Priority,
  status: 'pendiente' as TaskStatus,
}

export function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('todas')
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === 'completada' ? 'pendiente' : 'completada' } : t
    ))
  }

  const handleCreate = () => {
    if (!form.title.trim()) return
    const nueva = {
      id: Date.now(),
      title: form.title,
      client: form.client || 'Sin cliente',
      dueDate: form.dueDate || new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      priority: form.priority,
      status: form.status,
      type: 'general',
    } as typeof INITIAL_TASKS[number]
    setTasks(prev => [...prev, nueva])
    setForm(EMPTY_FORM)
    setShowNew(false)
  }

  const filtered = filter === 'todas' ? tasks : tasks.filter(t => t.status === filter)

  const taskCounts = {
    total:       tasks.length,
    pendiente:   tasks.filter(t => t.status === 'pendiente').length,
    en_progreso: tasks.filter(t => t.status === 'en_progreso').length,
    completada:  tasks.filter(t => t.status === 'completada').length,
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Tareas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Gestión de Actividades</p>
        </div>
        <button onClick={() => setShowNew(true)} className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">
          <Plus size={14} /> Nueva Tarea
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total',       count: taskCounts.total,       color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
          { label: 'Pendientes',  count: taskCounts.pendiente,   color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
          { label: 'En Progreso', count: taskCounts.en_progreso, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' },
          { label: 'Completadas', count: taskCounts.completada,  color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {['todas', 'pendiente', 'en_progreso', 'completada'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              filter === f
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
            {statusLabels[f] ?? 'Todas'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(task => {
          const StatusIcon = statusIcons[task.status as TaskStatus] ?? Circle
          return (
            <div key={task.id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group ${task.status === 'completada' ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleTask(task.id)} className={`flex-shrink-0 ${statusColors[task.status]} group-hover:scale-110 transition-transform`}>
                <StatusIcon size={20} />
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${task.status === 'completada' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-slate-400 font-medium">{task.client}</span>
                  <span className="text-[10px] text-slate-400">·</span>
                  <span className="text-[10px] text-slate-400 font-medium">{task.dueDate}</span>
                </div>
              </div>
              <span className={`text-[9px] px-2 py-1 rounded-lg font-semibold ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 py-12 text-sm">Sin tareas en esta categoría</p>
        )}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nueva Tarea</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">Crear Actividad</p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Título *</label>
                <input type="text" placeholder="Ej. Llamada de seguimiento" value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Cliente</label>
                <input type="text" placeholder="Nombre del cliente" value={form.client}
                  onChange={e => setForm(prev => ({ ...prev, client: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Fecha límite</label>
                  <input type="date" value={form.dueDate}
                    onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Prioridad</label>
                  <select value={form.priority} onChange={e => setForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option>Alta</option><option>Media</option><option>Baja</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Estado inicial</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En Progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Crear Tarea</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

