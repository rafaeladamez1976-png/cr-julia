'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ChevronRight, Clock, X } from 'lucide-react'
import { INITIAL_EVENTS } from '../data'

type EventType = 'visita' | 'reunion' | 'firma' | 'interno'

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAY_NAMES   = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']

const eventTypeColors: Record<string, string> = {
  visita:  'border-teal-400 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
  reunion: 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
  firma:   'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  interno: 'border-slate-400 bg-slate-50 dark:bg-slate-700/20 text-slate-700 dark:text-slate-300',
}
const eventTypeBadge: Record<string, string> = {
  visita:  'bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300',
  reunion: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300',
  firma:   'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300',
  interno: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
}

const EMPTY_FORM = { title: '', type: 'reunion' as EventType, time: '10:00', duration: '1h' }

export function CalendarView() {
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)) // April 2026
  const [selectedDate, setSelectedDate] = useState('2026-04-10')
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const year  = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayRaw = new Date(year, month, 1).getDay()
  const startDay = (firstDayRaw + 6) % 7 // Mon = 0

  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const getEventsForDay = (day: number) =>
    events.filter(e => e.date === dateStr(day))

  const selectedDayEvents = events.filter(e => e.date === selectedDate)
  const selectedDay = selectedDate ? parseInt(selectedDate.split('-')[2]) : null

  const today = new Date()
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  const handleCreate = () => {
    if (!form.title.trim()) return
    const nuevo = {
      id: Date.now(),
      date: selectedDate,
      time: form.time,
      title: form.title,
      type: form.type,
      duration: form.duration,
    } as typeof INITIAL_EVENTS[number]
    setEvents(prev => [...prev, nuevo])
    setForm(EMPTY_FORM)
    setShowNew(false)
  }

  const formatSelectedLabel = () => {
    if (!selectedDate) return ''
    const [y, m, d] = selectedDate.split('-')
    return `${parseInt(d)} de ${MONTH_NAMES[parseInt(m) - 1]} ${y}`
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Calendario</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Agenda y Citas</p>
        </div>
        <button onClick={() => setShowNew(true)} className="bg-teal-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md w-full sm:w-auto">
          <Plus size={14} /> Nueva Cita
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              {MONTH_NAMES[month]} {year}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <ChevronRight className="rotate-180" size={16} />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
            {DAY_NAMES.map(d => (
              <div key={d} className="bg-slate-50 dark:bg-slate-800 p-2 text-center text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{d}</div>
            ))}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`empty-${i}`} className="bg-slate-50/50 dark:bg-slate-800/50 p-2 min-h-[60px] lg:min-h-[80px]" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = getEventsForDay(day)
              const ds = dateStr(day)
              return (
                <div key={day} onClick={() => setSelectedDate(ds)}
                  className={`bg-white dark:bg-slate-800 p-1.5 lg:p-2 min-h-[60px] lg:min-h-[80px] cursor-pointer hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors ${
                    selectedDate === ds ? 'ring-2 ring-teal-500 ring-inset' : ''
                  }`}>
                  <span className={`text-xs font-semibold inline-flex w-6 h-6 items-center justify-center rounded-lg ${
                    isToday(day) ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={`text-[7px] lg:text-[9px] font-semibold px-1 py-0.5 rounded truncate border-l-2 ${eventTypeColors[ev.type]}`}>
                        {ev.time} {ev.title.substring(0, 15)}…
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[8px] text-slate-400 font-semibold">+{dayEvents.length - 2} más</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Day Detail */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4 truncate">
            {selectedDate ? formatSelectedLabel() : 'Selecciona un día'}
          </h3>
          <div className="space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map(ev => (
                <div key={ev.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase ${eventTypeBadge[ev.type]}`}>{ev.type}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{ev.duration}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{ev.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> {ev.time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">Sin eventos</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Leyenda</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(eventTypeBadge).map(([type, color]) => (
                <span key={type} className={`text-[9px] px-2 py-1 rounded-lg font-semibold text-center capitalize ${color}`}>{type}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nueva Cita</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-1">
                  {selectedDate ? formatSelectedLabel() : 'Agenda'}
                </p>
              </div>
              <button onClick={() => setShowNew(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Título *</label>
                <input type="text" placeholder="Ej. Visita piso Salamanca" value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none placeholder:text-slate-300" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Tipo</label>
                <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value as EventType }))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                  <option value="visita">Visita</option>
                  <option value="reunion">Reunión</option>
                  <option value="firma">Firma</option>
                  <option value="interno">Interno</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Hora</label>
                  <input type="time" value={form.time}
                    onChange={e => setForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Duración</label>
                  <select value={form.duration} onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-300">
                    <option value="30min">30 min</option>
                    <option value="1h">1 hora</option>
                    <option value="1.5h">1.5 horas</option>
                    <option value="2h">2 horas</option>
                    <option value="3h">3 horas</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button onClick={handleCreate} className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-md">Guardar Cita</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancelar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

