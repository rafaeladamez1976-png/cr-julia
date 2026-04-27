import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  Calendar,
  Clock,
  MessageSquare,
  Edit,
  ArrowRight
} from 'lucide-react';

const INITIAL_CLIENTS = [
  { id: 1, name: 'Ignacio Valdés', phone: '+34 612 345 678', email: 'ivaldes@email.com', budget: '1.2M - 1.5M €', zone: 'Salamanca, Retiro', status: 'Activo', date: '02 Abr 2026', origin: 'Referido', type: 'Piso', size: '150+', notes: 'Busca techos altos y molduras originales.', interactions: [
    { type: 'phone', date: '08 Abr', text: 'Confirmación de interés en C/ Serrano 45.' },
    { type: 'message', date: '05 Abr', text: 'Enviado dossier de propiedades en Retiro.' },
    { type: 'meeting', date: '02 Abr', text: 'Reunión inicial de cualificación.' }
  ]},
  { id: 2, name: 'Beatriz Soler', phone: '+34 688 900 122', email: 'bsoler@email.com', budget: '850k - 1.1M €', zone: 'Chamberí, Justicia', status: 'Templado', date: '28 Mar 2026', origin: 'Web', type: 'Ático', size: '100+', notes: 'Prioriza terraza con vistas.', interactions: [
    { type: 'message', date: '01 Abr', text: 'Consulta sobre gastos de comunidad.' },
    { type: 'phone', date: '28 Mar', text: 'Llamada de prospección.' }
  ]},
  { id: 3, name: 'Marc Torrens', phone: '+34 655 433 211', email: 'mtorrens@email.com', budget: '2.5M - 3.2M €', zone: 'La Moraleja', status: 'Cerrado', date: '15 Feb 2026', origin: 'Evento', type: 'Chalet', size: '400+', notes: 'Comprador recurrente.', interactions: [
    { type: 'meeting', date: '15 Feb', text: 'Firma de contrato de compraventa.' }
  ]},
  { id: 4, name: 'Elena García', phone: '+34 600 111 222', email: 'e.garcia@email.com', budget: '600k - 750k €', zone: 'Arganzuela, Lavapiés', status: 'Activo', date: '05 Abr 2026', origin: 'Redes Sociales', type: 'Piso', size: '80+', notes: 'Busca inversión para alquiler.', interactions: [
    { type: 'phone', date: '07 Abr', text: 'Interés en obra nueva zona Delicias.' }
  ]},
  { id: 5, name: 'Jorge Méndez', phone: '+34 622 777 888', email: 'j.mendez@email.com', budget: '450k - 500k €', zone: 'Carabanchel, Latina', status: 'Dormido', date: '10 Ene 2026', origin: 'Web', type: 'Piso', size: '70+', notes: 'Pausó búsqueda por motivos personales.', interactions: [
    { type: 'message', date: '20 Ene', text: 'Informa que no visitará en el primer trimestre.' }
  ]},
  { id: 6, name: 'Sofía Navarro', phone: '+34 699 555 444', email: 'snavarro@email.com', budget: '1.8M - 2.2M €', zone: 'Puerta de Hierro', status: 'Activo', date: '07 Abr 2026', origin: 'Referido', type: 'Casa', size: '250+', notes: 'Necesita jardín privado y seguridad 24h.', interactions: [
    { type: 'meeting', date: '08 Abr', text: 'Primera visita a parcela en Peñalar.' }
  ]},
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Activo': 'bg-green-100/50 text-green-700 border-green-200/50',
    'Templado': 'bg-amber-100/50 text-amber-700 border-amber-200/50',
    'Dormido': 'bg-gray-100/50 text-gray-500 border-gray-200/50',
    'Cerrado': 'bg-magna-teal/10 text-magna-teal border-magna-teal/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
};

const Clients = ({ externalSelectedClient, onClearSelected }) => {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  useEffect(() => {
    if (externalSelectedClient) {
      // If client comes from external (Pipeline), we might need to match it with our data
      // but for mock purposes we'll just use the object passed
      setSelectedClient(externalSelectedClient);
    }
  }, [externalSelectedClient]);

  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.zone.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const handleBack = () => {
    setSelectedClient(null);
    if (onClearSelected) onClearSelected();
  };

  return (
    <div className="p-6 lg:p-12 font-sans relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 space-y-4 sm:space-y-0 text-center sm:text-left">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl lg:text-4xl font-serif text-magna-teal lowercase italic leading-none truncate max-w-[250px] sm:max-w-none mx-auto sm:mx-0">Portfolio de Clientes</h2>
          <p className="mt-2 text-magna-gold-dark text-[10px] sm:text-sm tracking-widest uppercase font-bold opacity-60">Gestión de Inversores</p>
        </div>
        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="w-full sm:w-auto bg-magna-teal text-magna-gold px-6 py-3 lg:py-4 rounded-sm flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/95 transition-all shadow-lg"
        >
          <Plus size={14} />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Table Section or Profile View */}
      {selectedClient ? (
        <ClientProfile 
          client={selectedClient} 
          onBack={handleBack} 
        />
      ) : (
        <div className="animate-in fade-in duration-700">
          {/* Search Bar */}
          <div className="mb-6 lg:mb-8 relative max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-magna-gold-dark/40" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o zona..." 
              className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-magna-gold-dark/10 focus:border-magna-gold-dark outline-none text-xs uppercase tracking-widest transition-all placeholder:text-magna-gold-dark/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-magna-ivory bg-magna-ivory/30">
                  <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/50">Nombre</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/50">Presupuesto</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/50">Zona de Interés</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/50">Estado</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/50 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-magna-ivory">
                {filteredClients.map(client => (
                  <tr 
                    key={client.id} 
                    className="hover:bg-magna-ivory/20 transition-colors cursor-pointer group"
                    onClick={() => setSelectedClient(client)}
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-magna-teal">{client.name}</span>
                        <span className="text-[10px] text-magna-gold-dark font-medium uppercase tracking-widest">{client.phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-serif italic text-magna-text">{client.budget}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-magna-gold-dark/60">{client.zone}</span>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-magna-gold hover:text-magna-teal transition-all p-2 bg-magna-ivory/50 rounded-sm opacity-0 group-hover:opacity-100">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {filteredClients.map(client => (
              <div 
                key={client.id} 
                className="bg-white p-6 rounded-sm shadow-sm border border-magna-ivory hover:border-magna-gold/30 transition-all active:scale-[0.98] cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-bold text-magna-teal">{client.name}</h4>
                    <span className="text-[10px] text-magna-gold-dark font-bold uppercase tracking-widest">{client.phone}</span>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-magna-gold-dark/40">Inversión</span>
                    <span className="text-sm font-serif italic text-magna-text">{client.budget}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-magna-gold-dark/40">Zonas</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-magna-gold-dark/60 text-right truncate ml-4">{client.zone}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-magna-gold flex items-center">
                    Ver Expediente <ChevronRight size={12} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide-over Panel */}
      <NewClientPanel isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
    </div>
  );
};

const NewClientPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-magna-teal/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-8 border-b border-magna-ivory flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif text-magna-teal italic">Nuevo Cliente</h3>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Alta de Inversor</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-magna-ivory rounded-full transition-colors">
            <X size={20} className="text-magna-gold-dark" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Nombre Completo</label>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all placeholder:text-gray-300" placeholder="Ej. Ricardo Darín" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Email</label>
                <input type="email" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Teléfono</label>
                <input type="tel" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Origen del Contacto</label>
              <select className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all appearance-none cursor-pointer">
                <option>Referido</option>
                <option>Web</option>
                <option>Redes Sociales</option>
                <option>Evento</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-magna-ivory">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Presupuesto Mín</label>
                <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" placeholder="500.000 €" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Presupuesto Máx</label>
                <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" placeholder="1.200.000 €" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Zonas de Interés</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-magna-ivory text-magna-teal px-3 py-1 rounded-sm text-[10px] font-bold uppercase flex items-center gap-2">Chamberí <X size={10} /></span>
                <span className="bg-magna-ivory text-magna-teal px-3 py-1 rounded-sm text-[10px] font-bold uppercase flex items-center gap-2">Retiro <X size={10} /></span>
              </div>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" placeholder="Escribe y pulsa enter..." />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Tipo Propiedad</label>
                <select className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all">
                  <option>Piso</option>
                  <option>Casa</option>
                  <option>Ático</option>
                  <option>Chalet</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">m² Mínimos</label>
                <input type="number" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" placeholder="100" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Características Deseadas</label>
              <textarea className="w-full border border-magna-gold-dark/10 p-3 h-24 focus:border-magna-teal outline-none transition-all resize-none text-sm" placeholder="Exterior, ascensor, plaza de garaje..." />
            </div>
          </div>
        </div>

        <div className="p-8 bg-magna-ivory/50 flex space-x-4">
          <button className="flex-1 bg-magna-teal text-white py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-magna-teal/95 transition-all">Guardar Cliente</button>
          <button onClick={onClose} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-magna-gold-dark hover:bg-magna-gold-dark/5 transition-all rounded-sm">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const ClientProfile = ({ client, onBack }) => {
  // Mock data if some fields are missing (from Pipeline)
  const displayClient = {
    phone: '+34 600 000 000',
    email: 'contacto@magna.com',
    date: 'Abril 2026',
    origin: 'Pipeline',
    type: 'Residencial',
    size: '120+',
    status: 'Activo',
    notes: 'Cliente gestionado desde el flujo de negocio.',
    interactions: [
      { type: 'meeting', date: 'Hoy', text: 'Avance de etapa en el pipeline comercial.' }
    ],
    ...client
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 lg:mb-12 space-y-6 sm:space-y-0">
        <button onClick={onBack} className="flex items-center space-x-2 text-magna-gold-dark hover:text-magna-teal transition-all group">
          <ChevronRight className="rotate-180 transition-transform group-hover:-translate-x-1" size={18} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Volver al Listado</span>
        </button>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white border border-magna-gold/30 text-magna-gold-dark px-4 lg:px-6 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-magna-ivory transition-all">Editar</button>
          <button className="flex-1 sm:flex-none bg-magna-teal text-white px-4 lg:px-6 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/90 transition-all shadow-md">Estado</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Contact + Status */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          <div className="bg-white p-6 lg:p-10 rounded-sm shadow-[0_24px_32px_-12px_rgba(26,92,90,0.02)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-magna-ivory rounded-sm mx-auto mb-6 flex items-center justify-center border border-magna-gold/10">
                <span className="text-3xl lg:text-4xl font-serif text-magna-gold">{displayClient.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif text-magna-teal mb-2 lowercase italic truncate">{displayClient.name}</h3>
              <StatusBadge status={displayClient.status} />
            </div>
            
            <div className="space-y-4 pt-6 lg:pt-8 border-t border-magna-ivory">
              <div className="flex items-center space-x-4 text-magna-text">
                <Phone size={14} className="text-magna-gold-dark/40" />
                <span className="text-sm font-medium">{displayClient.phone}</span>
              </div>
              <div className="flex items-center space-x-4 text-magna-text">
                <Mail size={14} className="text-magna-gold-dark/40 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{displayClient.email}</span>
              </div>
              <div className="flex items-center space-x-4 text-magna-text">
                <Clock size={14} className="text-magna-gold-dark/40" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-magna-gold-dark/60">Desde {displayClient.date}</span>
              </div>
            </div>
          </div>

          <div className="bg-magna-teal p-6 lg:p-8 rounded-sm text-white shadow-xl">
            <h4 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold mb-4 lg:mb-6 text-magna-gold">Notas Internas</h4>
            <p className="text-xs lg:text-sm leading-relaxed italic opacity-80">"{displayClient.notes}"</p>
          </div>
        </div>

        {/* Right Column: Buying Criteria */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <div className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)]">
            <h3 className="text-xl lg:text-2xl font-serif text-magna-teal lowercase italic mb-8 lg:mb-10 pb-4 border-b border-magna-ivory">Criterio de Inversión</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-2 block">Presupuesto</label>
                  <p className="text-xl lg:text-2xl font-serif text-magna-text">{displayClient.budget}</p>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-2 block">Zonas</label>
                  <div className="flex flex-wrap gap-2">
                    {displayClient.zone.split(',').map(z => (
                      <span key={z} className="px-3 py-1 bg-magna-ivory text-magna-teal text-[9px] lg:text-[10px] font-bold uppercase tracking-widest">{z.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-2 block">Tipo</label>
                    <p className="text-xs lg:text-sm font-bold text-magna-teal uppercase tracking-widest">{displayClient.type}</p>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-2 block">Superficie</label>
                    <p className="text-xs lg:text-sm font-bold text-magna-teal uppercase tracking-widest">{displayClient.size} m²</p>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-2 block">Lead Source</label>
                  <p className="text-xs lg:text-sm font-bold text-magna-teal uppercase tracking-widest">{displayClient.origin}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)]">
            <h3 className="text-lg lg:text-xl font-serif text-magna-teal lowercase italic mb-6 lg:mb-8">Interacciones</h3>
            <div className="space-y-6 lg:space-y-8 relative">
              <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-[1px] bg-magna-ivory"></div>
              {displayClient.interactions.map((int, i) => (
                <div key={i} className="relative pl-10 sm:pl-16">
                  <div className="absolute left-[0.85rem] sm:left-[1.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-magna-gold border-4 border-white"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-magna-gold-dark">{int.date}</span>
                    <span className="capitalize text-[9px] bg-magna-ivory px-2 py-0.5 font-bold tracking-widest text-magna-teal w-min whitespace-nowrap">{int.type === 'phone' ? 'Llamada' : int.type === 'message' ? 'Dossier' : 'Reunión'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-magna-text opacity-70 leading-relaxed font-sans">{int.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
