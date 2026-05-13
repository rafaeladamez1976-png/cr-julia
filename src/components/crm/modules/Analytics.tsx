'use client'
import { motion } from 'framer-motion'
import { Target, Euro, Timer, Star } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const monthlyData = [
  { month: 'Ene', clientes: 28, visitas: 15, operaciones: 3, ingresos: 450 },
  { month: 'Feb', clientes: 31, visitas: 22, operaciones: 5, ingresos: 780 },
  { month: 'Mar', clientes: 30, visitas: 18, operaciones: 4, ingresos: 620 },
  { month: 'Abr', clientes: 34, visitas: 28, operaciones: 7, ingresos: 1150 },
  { month: 'May', clientes: 36, visitas: 24, operaciones: 6, ingresos: 890 },
  { month: 'Jun', clientes: 40, visitas: 32, operaciones: 8, ingresos: 1340 },
]

const performanceKPIs = [
  { label: 'Tasa de Conversión',   value: '9.3%',   trend: '+1.2%',   icon: Target, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Ticket Medio',          value: '1.4M €', trend: '+8%',     icon: Euro,   color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' },
  { label: 'Tiempo Medio Cierre',   value: '47 días',trend: '-5 días', icon: Timer,  color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Satisfacción Cliente',  value: '4.8/5',  trend: '+0.2',    icon: Star,   color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
]

export function Analytics() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Analíticas</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Métricas de Rendimiento</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceKPIs.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon size={18} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{kpi.label}</p>
            <span className="text-[10px] text-emerald-500 font-semibold mt-1 inline-block">{kpi.trend}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Evolución de Clientes</h3>
          <p className="text-xs text-slate-400 mb-4">Clientes y Visitas por mes</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="clientes" fill="#0d9488" radius={[6, 6, 0, 0]} />
              <Bar dataKey="visitas" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Ingresos (k€)</h3>
          <p className="text-xs text-slate-400 mb-4">Tendencia mensual</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v: number) => [`${v}k €`, 'Ingresos']} />
              <Line type="monotone" dataKey="ingresos" stroke="#0d9488" strokeWidth={2.5} dot={{ fill: '#0d9488', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
