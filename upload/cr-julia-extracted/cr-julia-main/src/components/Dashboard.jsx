import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Minus, ArrowUpRight } from 'lucide-react';

const KPICard = ({ label, value, trend, trendType, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    className="bg-white p-6 lg:p-8 rounded-sm shadow-[0_24px_32px_-12px_rgba(26,92,90,0.04)] border-l-4 border-magna-gold flex flex-col justify-between h-full group hover:shadow-[0_48px_64px_-12px_rgba(26,92,90,0.08)] transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight size={14} className="text-magna-gold" />
    </div>
    <p className="text-[10px] text-magna-gold-dark uppercase tracking-[0.3em] font-bold mb-4">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-4xl lg:text-5xl font-serif text-magna-teal leading-none group-hover:scale-105 transition-transform duration-500 origin-left">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.5, duration: 1 }}
        >
          {value}
        </motion.span>
      </h3>
      <div className={`flex items-center space-x-1 ${trendType === 'up' ? 'text-green-600/60' : 'text-gray-400'}`}>
        {trendType === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
        <span className="text-[10px] font-bold tracking-widest">{trend}</span>
      </div>
    </div>
  </motion.div>
);

const PipelineFunnel = () => {
  const stages = [
    { label: 'Primer Contacto', count: 18, percentage: 100 },
    { label: 'Cualificación', count: 12, percentage: 66 },
    { label: 'Búsqueda Activa', count: 9, percentage: 50 },
    { label: 'Visitas', count: 6, percentage: 33 },
    { label: 'Negociación', count: 4, percentage: 22 },
    { label: 'Cerrado', count: 5, percentage: 27 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] font-sans h-full"
    >
      <div className="flex justify-between items-end mb-8 lg:mb-12 border-b border-magna-ivory pb-4">
        <h2 className="text-xl lg:text-2xl font-serif text-magna-teal lowercase italic">Pipeline de Clientes</h2>
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/40">Visión Global</span>
      </div>
      
      <div className="space-y-6">
        {stages.map((stage, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-magna-teal uppercase tracking-widest truncate mr-4">{stage.label}</span>
              <span className="text-[10px] sm:text-xs font-serif italic text-magna-gold-dark whitespace-nowrap">{stage.count} Clientes</span>
            </div>
            <div className="h-3 sm:h-4 bg-magna-ivory rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stage.percentage}%` }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-magna-teal/40 via-magna-teal/70 to-magna-teal flex items-center justify-end px-4 shadow-inner"
              >
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const RecentActivity = () => {
  const activities = [
    { initial: 'C', name: 'Carlos M.', action: 'avanzó a Visitas', time: 'hace 2h', color: 'bg-magna-teal/10 text-magna-teal' },
    { initial: 'S', name: 'Sonia L.', action: 'Nueva propiedad', time: 'hace 4h', color: 'bg-magna-gold/20 text-magna-gold-dark' },
    { initial: 'G', name: 'Inmobiliaria Goya', action: 'Colaborador', time: 'ayer', color: 'bg-magna-teal/5 text-magna-gold-dark' },
    { initial: 'M', name: 'Miguel R.', action: 'Oferta enviada', time: 'ayer', color: 'bg-magna-teal/10 text-magna-teal' },
    { initial: 'A', name: 'Ana P.', action: 'Visita virtual', time: 'ayer', color: 'bg-magna-gold/20 text-magna-gold-dark' },
    { initial: 'P', name: 'Pablo V.', action: 'Arras firmado', time: 'lunes', color: 'bg-magna-teal/20 text-magna-teal' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] font-sans h-full"
    >
      <div className="flex justify-between items-end mb-8 lg:mb-12 border-b border-magna-ivory pb-4">
        <h2 className="text-xl lg:text-2xl font-serif text-magna-teal lowercase italic">Actividad</h2>
        <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark hover:text-magna-teal transition-colors">Historial</button>
      </div>
      
      <div className="space-y-6 lg:space-y-10">
        {activities.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="flex items-center space-x-4 lg:space-x-6 group cursor-pointer"
          >
            <div className={`w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-sm flex items-center justify-center font-serif text-base lg:text-lg border border-transparent group-hover:border-magna-gold/20 transition-all ${item.color} group-hover:scale-110`}>
              {item.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-magna-text group-hover:text-magna-teal transition-colors truncate">
                <span className="font-bold">{item.name}</span> {item.action}
              </p>
              <p className="text-[9px] lg:text-[10px] text-magna-gold-dark/40 uppercase tracking-widest mt-1 font-bold italic">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-12 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl ml-2 uppercase tracking-[0.4em]"
      >
         <span className="text-[10px] lg:text-[11px] font-bold text-magna-gold-dark/50 italic font-serif tracking-widest">Intelligence Overview</span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <KPICard label="Clientes Activos" value="34" trend="+3" trendType="up" index={0} />
        <KPICard label="Visitas Este Mes" value="12" trend="+12%" trendType="up" index={1} />
        <KPICard label="Operaciones en Curso" value="08" trend="0" trendType="neutral" index={2} />
        <KPICard label="Operaciones Cerradas" value="05" trend="+2" trendType="up" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <PipelineFunnel />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="pt-8 border-t border-magna-gold/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 italic font-serif text-magna-teal text-center sm:text-left"
      >
        <p className="text-sm">Estándares de excelencia Magna Buyers Agents</p>
        <p className="text-sm">© 2026 Portfolio de Julia Richards</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
