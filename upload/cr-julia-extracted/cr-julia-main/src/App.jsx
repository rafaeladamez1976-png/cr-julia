import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Collaborators from './components/Collaborators';
import Properties from './components/Properties';
import Pipeline from './components/Pipeline';
import Config from './components/Config';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      clientes: 'Portfolio de Clientes',
      colaboradores: 'Red de Alianzas',
      propiedades: 'Colección Inmobiliaria',
      pipeline: 'Flujo de Negocio',
      configuracion: 'Preferencias'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const handleSelectClientFromPipeline = (client) => {
    setSelectedClient(client);
    setActiveTab('clientes');
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="min-h-screen bg-magna-ivory flex overflow-hidden selection:bg-magna-gold selection:text-magna-teal">
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'clientes') setSelectedClient(null);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }} 
      />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-magna-teal/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col h-screen overflow-hidden relative">
        <TopBar 
          title={getPageTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="pt-24 flex-1 h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <div className="h-full overflow-y-auto overflow-x-hidden safe-area-inset-bottom">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'clientes' && (
                  <Clients externalSelectedClient={selectedClient} onClearSelected={() => setSelectedClient(null)} />
                )}
                {activeTab === 'colaboradores' && <Collaborators />}
                {activeTab === 'propiedades' && <Properties />}
                {activeTab === 'pipeline' && <div className="h-full overflow-hidden lg:overflow-visible"><Pipeline onSelectClient={handleSelectClientFromPipeline} /></div>}
                {activeTab === 'configuracion' && <Config />}
                
                {!['dashboard', 'clientes', 'colaboradores', 'propiedades', 'pipeline', 'configuracion'].includes(activeTab) && (
                  <div className="p-12 h-full flex flex-col items-center justify-center opacity-30 pointer-events-none">
                    <h2 className="text-3xl md:text-5xl font-serif text-magna-teal lowercase italic mb-4">{getPageTitle()}</h2>
                    <div className="w-24 h-[1px] bg-magna-gold-dark mb-4"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark text-center">Espacio Reservado para el Curador</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
