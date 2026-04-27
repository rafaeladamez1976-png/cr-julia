import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Home, 
  LayoutList, 
  Settings 
} from 'lucide-react';

import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Home, 
  LayoutList, 
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'colaboradores', label: 'Colaboradores', icon: UserPlus },
    { id: 'propiedades', label: 'Propiedades', icon: Home },
    { id: 'pipeline', label: 'Pipeline', icon: LayoutList },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <div className={`
        w-64 bg-magna-teal min-h-screen fixed left-0 top-0 flex flex-col font-sans z-40 shadow-2xl relative overflow-hidden transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Editorial Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-64 bg-white/5 blur-3xl -rotate-45 translate-x-16 -translate-y-16"></div>
        
        <div className="py-8 lg:py-12 px-6 lg:px-8 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-12 lg:mb-16 lg:justify-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center px-2"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4B896" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 lg:mb-4">
                <path d="M12 2L10 10H14L12 2Z" />
                <path d="M12 22L14 14H10L12 22Z" />
                <path d="M2 12L10 10V14L2 12Z" />
                <path d="M22 12L14 14V10L22 12Z" />
              </svg>
              <h2 className="text-lg lg:text-xl font-serif text-magna-gold tracking-[0.08em] uppercase text-center leading-tight">
                Magna<br/>Buyers Agents
              </h2>
            </motion.div>
            
            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="p-2 text-magna-gold lg:hidden hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-1 lg:space-y-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1 lg:space-y-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 lg:py-3.5 transition-all group relative ${
                      isActive 
                        ? 'text-magna-gold border-l-2 border-magna-gold bg-white/5' 
                        : 'text-white/60 border-l-2 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-pill"
                        className="absolute inset-0 bg-white/[0.03] z-0"
                      />
                    )}
                    <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className="transition-transform group-hover:scale-110 relative z-10" />
                    <span className={`text-[10px] lg:text-[11px] uppercase tracking-[0.2em] transition-all font-medium relative z-10 ${isActive ? 'translate-x-1' : ''}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </nav>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-auto pt-6 lg:pt-8 border-t border-white/10 flex flex-col items-center text-center"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-sm bg-magna-gold-dark/20 flex items-center justify-center text-magna-gold mb-2 lg:mb-3 border border-magna-gold/20 hover:scale-110 transition-transform cursor-pointer">
              <span className="font-serif text-base lg:text-lg">JR</span>
            </div>
            <p className="text-[9px] lg:text-[10px] text-magna-gold uppercase tracking-widest font-bold mb-0.5">Premium Agent</p>
            <p className="text-xs text-white/80 font-medium">Julia Richards</p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

export default Sidebar;
