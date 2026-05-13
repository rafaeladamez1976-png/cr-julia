'use client'
import { motion } from 'framer-motion'
import { Users, Home, Briefcase, Award, TrendingUp, Minus } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { PRIORITY_COLORS } from '../constants'
import { useRouter } from 'next/navigation'

function KPICard({ label, value, trend, trendType, icon: Icon, index }: {
  label: string; value: string; trend: string; trendType: string; icon: React.ComponentType<{ size?: number }>; index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="bg-white dark:bg-slate-800 p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-transparent dark:from-teal-900/20 dark:to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-semibold ${trendType === 'up' ? 'text-emerald-500' : 'text-slate-400'}`}>
          {trendType === 'up' ? <TrendingUp size={12} /> : <Minus size={12} />}
          {trend}
        </div>
      </div>
      <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{value}</h3>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] font-semibold">{label}</p>
    </motion.div>
  )
}

const revenueData = [
  { month: 'Ene', ingresos: 450000 },
  { month: 'Feb', ingresos: 780000 },
  { month: 'Mar', ingresos: 620000 },
  { month: 'Abr', ingresos: 1150000 },
  { month: 'May', ingresos: 890000 },
  { month: 'Jun', ingresos: 1340000 },
]

const sourceData = [
  { name: 'Referidos', value: 35, color: '#0d9488' },
  { name: 'Web',       value: 25, color: '#d97706' },
  { name: 'Eventos',   value: 20, color: '#6366f1' },
  { name: 'Redes',     value: 15, color: '#ec4899' },
  { name: 'Otro',      value: 5,  color: '#94a3b8' },
]

const activities = [
  { initial: 'C', name: 'Carlos M.',        action: 'avanzó a Visitas',    time: 'hace 2h', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { initial: 'S', name: 'Sonia L.',         action: 'Nueva propiedad',     time: 'hace 4h', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { initial: 'G', name: 'Inmobiliaria Goya',action: 'Colaborador',         time: 'ayer',    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { initial: 'M', name: 'Miguel R.',        action: 'Oferta enviada',      time: 'ayer',    color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { initial: 'A', name: 'Ana P.',           action: 'Visita virtual',      time: 'ayer',    color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
]

const upcomingTasks = [
  { title: 'Preparar dossier Valdés',  priority: 'alta',    due: '10 May' },
  { title: 'Llamar a Beatriz Soler',   priority: 'media',   due: '09 May' },
  { title: 'Enviar contrato arras',    priority: 'urgente', due: '08 May' },
]

export function Dashboard() {
  const router = useRouter()
  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard label="Clientes Activos"  value="34" trend="+3"   trendType="up"      icon={Users}    index={0} />
        <KPICard label="Visitas Este Mes"  value="12" trend="+12%" trendType="up"      icon={Home}     index={1} />
        <KPICard label="Oper. en Curso"    value="08" trend="0"    trendType="neutral" icon={Briefcase}index={2} />
        <KPICard label="Op. Cerradas"      value="05" trend="+2"   trendType="up"      icon={Award}    index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Ingresos</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Últimos 6 meses</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">+18%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0d9488" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`${(value/1000).toFixed(0)}k €`, 'Ingresos']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="ingresos" stroke="#0d9488" strokeWidth={2.5} fill="url(#colorIngresos)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Origen de Leads</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Distribución actual</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{s.name} {s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Actividad Reciente</h2>
            <button onClick={() => router.push('/calendario')} className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700">Ver todo</button>
          </div>
          <div className="space-y-4">
            {activities.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-semibold text-sm ${item.color}`}>{item.initial}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    <span className="font-semibold">{item.name}</span> {item.action}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 lg:p-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Tareas Pendientes</h2>
            <button onClick={() => router.push('/tareas')} className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700">Ver todas</button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === 'urgente' ? 'bg-red-500' : task.priority === 'alta' ? 'bg-orange-500' : 'bg-amber-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{task.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{task.due}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Pipeline (9 etapas)</span>
              <button onClick={() => router.push('/pipeline')} className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700">Ver Pipeline →</button>
            </div>
            <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
              {['bg-slate-300','bg-indigo-300','bg-cyan-300','bg-teal-300','bg-teal-400','bg-amber-400','bg-amber-500','bg-orange-400','bg-emerald-500'].map((c, i) => (
                <div key={i} className={`${c} flex-1`} />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] text-slate-400">Discovery → Compra</span>
              <span className="text-[9px] text-emerald-500 font-semibold">9.3% cierre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
