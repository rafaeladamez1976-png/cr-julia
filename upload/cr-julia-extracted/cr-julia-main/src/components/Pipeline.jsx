import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const INITIAL_PIPELINE_DATA = [
  { id: 101, name: 'Ricardo Darín', budget: '1.2M€ – 1.5M€', zone: 'Salamanca', stage: 'Primer Contacto', days: 2 },
  { id: 102, name: 'Elena García', budget: '700k€ – 850k€', zone: 'Retiro', stage: 'Primer Contacto', days: 5 },
  { id: 103, name: 'Ignacio Valdés', budget: '1.5M€ – 1.8M€', zone: 'Chamberí', stage: 'Cualificación', days: 1 },
  { id: 104, name: 'Marta Solano', budget: '900k€ – 1.1M€', zone: 'Justicia', stage: 'Búsqueda Activa', days: 8 },
  { id: 105, name: 'Beatriz Soler', budget: '1.1M€ – 1.3M€', zone: 'Eixample', stage: 'Visitas', days: 12 },
  { id: 106, name: 'Sofía Navarro', budget: '2.2M€ – 2.5M€', zone: 'Pozuelo', stage: 'Negociación', days: 3 },
  { id: 107, name: 'Marc Torrens', budget: '3.5M€ – 4M€', zone: 'Serrano', stage: 'Cerrado', days: 20 },
  { id: 108, name: 'Julia Roberts', budget: '5M€ – 6M€', zone: 'La Moraleja', stage: 'Cerrado', days: 2 },
];

const STAGES = [
  'Primer Contacto',
  'Cualificación',
  'Búsqueda Activa',
  'Visitas',
  'Negociación',
  'Cerrado'
];

const Pipeline = ({ onSelectClient }) => {
  const [clients, setClients] = useState(INITIAL_PIPELINE_DATA);

  const moveClient = (clientId) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const currentIndex = STAGES.indexOf(client.stage);
        if (currentIndex < STAGES.length - 1) {
          return { ...client, stage: STAGES[currentIndex + 1], days: 0 };
        }
      }
      return client;
    }));
  };

  return (
    <div className="p-6 lg:p-12 font-sans h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="mb-8 lg:mb-12">
        <h2 className="text-3xl lg:text-4xl font-serif text-magna-teal lowercase italic leading-none">Flujo de Negocio</h2>
        <p className="mt-2 text-magna-gold-dark text-[10px] sm:text-xs tracking-widest uppercase font-bold opacity-60">Seguimiento de Operaciones</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="flex space-x-4 lg:space-x-6 h-full min-w-max">
          {STAGES.map((stage) => {
            const stageClients = clients.filter(c => c.stage === stage);
            return (
              <div key={stage} className="w-[280px] lg:w-[320px] bg-white rounded-sm flex flex-col shadow-sm border border-magna-ivory overflow-hidden h-full">
                {/* Stage Header */}
                <div className="bg-magna-teal p-3 lg:p-4 flex justify-between items-center">
                  <h3 className="text-white font-serif text-base lg:text-lg leading-none">{stage}</h3>
                  <div className="w-6 h-6 rounded-full bg-magna-gold flex items-center justify-center text-[10px] font-bold text-magna-teal">
                    {stageClients.length}
                  </div>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-4 bg-magna-ivory/20">
                  {stageClients.map((client) => (
                    <div 
                      key={client.id}
                      className="bg-white p-4 lg:p-5 rounded-sm border-t-4 border-magna-gold shadow-md hover:shadow-lg transition-all cursor-pointer group relative"
                      onClick={() => onSelectClient(client)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-magna-ivory flex items-center justify-center text-[10px] lg:text-xs font-bold text-magna-teal border border-magna-gold/20">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-medium text-magna-teal leading-tight truncate">{client.name}</h4>
                          <span className="text-[10px] text-gray-400 font-sans tracking-wide">· {client.days} días</span>
                        </div>
                      </div>
                      
                      <p className="text-xs font-serif italic text-magna-gold-dark mb-3 truncate">{client.budget}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] uppercase tracking-widest bg-magna-ivory px-2 py-1 rounded-sm text-magna-teal font-bold">{client.zone}</span>
                        
                        {stage !== 'Cerrado' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              moveClient(client.id);
                            }}
                            className="bg-magna-teal text-white p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-magna-teal/90"
                          >
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
