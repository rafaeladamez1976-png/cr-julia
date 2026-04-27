import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  MapPin, 
  Star, 
  Home, 
  ArrowRight, 
  Mail, 
  Phone, 
  Briefcase,
  ChevronRight,
  User
} from 'lucide-react';

const INITIAL_COLLABORATORS = [
  { id: 1, agency: 'Inmobiliaria Goya', contact: 'Marisa Gil', email: 'goya@inmo.com', phone: '+34 912 345 678', city: 'Madrid', specialty: 'Lujo', rating: 5, shared: 12, notes: 'Socios estratégicos para el Barrio de Salamanca.', history: [
    { date: '05 Abr 2026', text: 'Nueva propiedad compartida: Ático en C/ Lagasca.' },
    { date: '28 Mar 2026', text: 'Cierre exitoso de operación combinada - Cliente Valdés.' },
    { date: '10 Mar 2026', text: 'Actualización de catálogo premium trimestral.' }
  ], properties: [
    { address: 'Calle de Serrano 45', type: 'Piso', price: '2.4M €', status: 'Activo' },
    { address: 'Paseo de la Castellana 112', type: 'Locales', price: '4.1M €', status: 'Activo' }
  ]},
  { id: 2, agency: 'Barcelona Luxury Homes', contact: 'Jordi Alomar', email: 'jordi@bcnluxury.com', phone: '+34 932 777 888', city: 'Barcelona', specialty: 'Residencial', rating: 4, shared: 8, notes: 'Especialistas en fincas regias del Eixample.', history: [
    { date: '01 Abr 2026', text: 'Consulta sobre disponibilidad en Pedralbes.' }
  ], properties: [
    { address: 'Carrer de Mallorca 240', type: 'Piso', price: '1.2M €', status: 'Reservado' }
  ]},
  { id: 3, agency: 'Marbella Estates', contact: 'Carmen Ruiz', email: 'carmen@marbella.com', phone: '+34 952 111 222', city: 'Marbella', specialty: 'Vacacional', rating: 5, shared: 15, notes: 'Líderes en villas de la Zagaleta.', history: [
    { date: '08 Abr 2026', text: 'Dossier de preventas off-market recibido.' }
  ], properties: [
    { address: 'VILLA LA ZAGALETA', type: 'Chalet', price: '12.5M €', status: 'Activo' }
  ]},
  { id: 4, agency: 'Levante Proyectos', contact: 'Pau Ferrer', email: 'pau@levante.es', phone: '+34 963 444 555', city: 'Valencia', specialty: 'Obra Nueva', rating: 3, shared: 4, notes: 'Contactos directos con promotoras locales.', history: [
    { date: '15 Mar 2026', text: 'Presentación de nueva promoción en Playa Patacona.' }
  ], properties: [
    { address: 'Residencial Mar de Luz', type: 'Piso', price: '450k €', status: 'Activo' }
  ]},
  { id: 5, agency: 'Andalucía Real Estate', contact: 'Andrés Vera', email: 'avera@and.com', phone: '+34 954 123 456', city: 'Sevilla', specialty: 'Comercial', rating: 4, shared: 6, notes: 'Gran red de activos singulares en el centro.', history: [
    { date: '02 Abr 2026', text: 'Reunión de planificación estratégica Q2.' }
  ], properties: [
    { address: 'Plaza de San Francisco 2', type: 'Local', price: '1.8M €', status: 'Activo' }
  ]}
];

const CollaboratorCard = ({ collab, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-8 lg:p-10 rounded-sm shadow-[0_24px_32px_-12px_rgba(26,92,90,0.02)] hover:shadow-[0_32px_48px_-12px_rgba(26,92,90,0.06)] transition-all duration-500 cursor-pointer group flex flex-col items-center text-center border-t-2 border-transparent hover:border-magna-gold/30 active:scale-[0.98]"
    >
      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-sm bg-magna-ivory flex items-center justify-center text-magna-teal font-serif text-xl lg:text-2xl mb-6 border border-magna-gold/10 group-hover:scale-105 transition-transform duration-500">
        {collab.agency.split(' ').map(n => n[0]).join('').substring(0, 2)}
      </div>
      <h3 className="text-xl lg:text-2xl font-serif text-magna-teal lowercase italic mb-1 truncate w-full">{collab.agency}</h3>
      <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/60 mb-6">{collab.contact}</p>
      
      <div className="flex items-center space-x-3 lg:space-x-4 mb-6">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < collab.rating ? 'fill-magna-gold text-magna-gold' : 'text-magna-ivory'} />
          ))}
        </div>
        <div className="w-1 h-1 rounded-full bg-magna-ivory"></div>
        <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold text-magna-teal/70 px-2 py-0.5 bg-magna-ivory rounded-sm">{collab.specialty}</span>
      </div>

      <div className="mt-auto pt-6 border-t border-magna-ivory w-full flex justify-between items-center">
         <div className="flex items-center space-x-2 text-magna-gold-dark/40">
           <MapPin size={12} />
           <span className="text-[9px] lg:text-[10px] uppercase tracking-widest font-bold">{collab.city}</span>
         </div>
         <div className="flex items-center space-x-2">
           <Home size={12} className="text-magna-gold" />
           <span className="text-[9px] lg:text-[10px] font-serif italic text-magna-teal">{collab.shared} compartidas</span>
         </div>
      </div>
    </div>
  );
};

const Collaborators = () => {
  const [collabs] = useState(INITIAL_COLLABORATORS);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  return (
    <div className="p-6 lg:p-12 font-sans relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-16 space-y-4 sm:space-y-0 text-center sm:text-left">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl lg:text-4xl font-serif text-magna-teal lowercase italic leading-none truncate max-w-[250px] sm:max-w-none mx-auto sm:mx-0">Red de Alianzas</h2>
          <p className="mt-2 text-magna-gold-dark text-[10px] sm:text-sm tracking-widest uppercase font-bold opacity-60">Colaboradores Partner</p>
        </div>
        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="w-full sm:w-auto bg-magna-teal text-magna-gold px-6 lg:px-8 py-3 rounded-sm flex items-center justify-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/95 transition-all shadow-lg"
        >
          <Plus size={14} />
          <span>Nuevo Partner</span>
        </button>
      </div>

      {selectedCollab ? (
        <CollaboratorProfile 
          collab={selectedCollab} 
          onBack={() => setSelectedCollab(null)} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {collabs.map(collab => (
            <CollaboratorCard 
              key={collab.id} 
              collab={collab} 
              onClick={() => setSelectedCollab(collab)} 
            />
          ))}
        </div>
      )}

      {/* Slide-over Panel */}
      <NewCollabPanel isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
    </div>
  );
};

const NewCollabPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-magna-teal/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-10 border-b border-magna-ivory flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-serif text-magna-teal italic lowercase">Nuevo Partner</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mt-1">Alta de Agencia Colaboradora</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-magna-ivory rounded-full transition-colors">
            <X size={20} className="text-magna-gold-dark" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-10">
          <div className="space-y-8">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Nombre de la Agencia</label>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all placeholder:text-gray-300 font-serif text-xl italic" placeholder="Ej. Real Estate Heritage" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Persona de Contacto</label>
                <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Ciudad</label>
                <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Email Corporativo</label>
                <input type="email" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Teléfono</label>
                <input type="tel" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-magna-ivory">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Especialidad</label>
                <select className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none transition-all appearance-none cursor-pointer text-xs uppercase tracking-widest font-bold">
                  <option>Lujo</option>
                  <option>Residencial</option>
                  <option>Obra Nueva</option>
                  <option>Comercial</option>
                  <option>Vacacional</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Valoración</label>
                <div className="flex space-x-2 py-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="cursor-pointer text-magna-ivory hover:text-magna-gold" />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Notas de Colaboración</label>
              <textarea className="w-full border border-magna-gold-dark/10 p-4 h-32 focus:border-magna-teal outline-none transition-all resize-none text-sm font-sans italic opacity-70" placeholder="Acuerdos específicos, honorarios compartidos..." />
            </div>
          </div>
        </div>

        <div className="p-10 bg-magna-ivory/50 flex space-x-6">
          <button className="flex-1 bg-magna-teal text-white py-4 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/95 transition-all shadow-lg">Registrar Partner</button>
          <button onClick={onClose} className="px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-magna-gold-dark hover:bg-magna-gold-dark/5 transition-all rounded-sm border border-magna-gold-dark/10">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const CollaboratorProfile = ({ collab, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex justify-between items-start mb-12 lg:mb-16">
        <button onClick={onBack} className="flex items-center space-x-3 text-magna-gold-dark hover:text-magna-teal transition-all group">
          <ChevronRight className="rotate-180 transition-transform group-hover:-translate-x-1" size={18} />
          <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em]">Volver a la Red</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          <div className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] text-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-magna-ivory rounded-sm mx-auto mb-6 lg:mb-8 flex items-center justify-center border border-magna-gold/10 text-3xl lg:text-4xl font-serif text-magna-teal shadow-inner">
              {collab.agency.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif text-magna-teal italic lowercase mb-2">{collab.agency}</h3>
            <span className="inline-block px-3 py-1 bg-magna-teal/5 text-magna-teal text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-sm mb-6 lg:mb-8">{collab.specialty}</span>
            
            <div className="space-y-6 text-left pt-6 lg:pt-8 border-t border-magna-ivory">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-magna-ivory flex items-center justify-center text-magna-gold-dark flex-shrink-0">
                  <User size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold text-magna-gold-dark/50">Contacto</span>
                  <span className="text-sm font-medium text-magna-teal truncate font-bold">{collab.contact}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-magna-ivory flex items-center justify-center text-magna-gold-dark flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold text-magna-gold-dark/50">Ubicación</span>
                  <span className="text-sm font-medium text-magna-teal truncate">{collab.city}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-magna-ivory flex items-center justify-center text-magna-gold-dark flex-shrink-0">
                   <Star size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold text-magna-gold-dark/50">Valoración</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < collab.rating ? 'fill-magna-gold text-magna-gold' : 'text-magna-ivory'} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] space-y-6">
            <h4 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark">Acción Inmediata</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-magna-teal text-white rounded-sm text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-magna-teal/90 transition-all">
                <span>Enviar Email</span>
                <Mail size={14} />
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-magna-gold/20 text-magna-teal rounded-sm text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-magna-ivory transition-all">
                <span>Llamar Ahora</span>
                <Phone size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Profile Area */}
        <div className="lg:col-span-3 space-y-8 lg:space-y-12">
          {/* Shared Properties */}
          <section className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] border-l-4 border-magna-gold">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 space-y-2 sm:space-y-0">
               <h3 className="text-2xl lg:text-3xl font-serif text-magna-teal lowercase italic">Propiedades Compartidas</h3>
               <span className="text-[9px] lg:text-[10px] font-serif text-magna-gold-dark italic">Activas: {collab.properties.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {collab.properties.map((prop, i) => (
                <div key={i} className="group relative bg-[#FDF9F4] p-6 lg:p-8 rounded-sm hover:translate-x-1 transition-transform border border-magna-gold/5">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] font-bold text-magna-teal/50">{prop.type}</span>
                     <span className={`text-[8px] lg:text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${prop.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-magna-gold/10 text-magna-gold-dark'}`}>{prop.status}</span>
                   </div>
                   <p className="text-lg lg:text-xl font-serif text-magna-text mb-4 italic truncate">{prop.address}</p>
                   <div className="flex justify-between items-end">
                     <span className="text-lg lg:text-xl font-serif text-magna-goldDark">{prop.price}</span>
                     <button className="p-2 bg-white rounded-sm text-magna-teal opacity-0 lg:opacity-0 lg:group-hover:opacity-100 opacity-100 transition-opacity">
                       <ArrowRight size={14} />
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Golden Divider */}
          <div className="hidden lg:block h-[1px] w-full bg-gradient-to-r from-transparent via-magna-gold/30 to-transparent"></div>

          {/* Collaboration History */}
          <section className="bg-white p-8 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)]">
            <h3 className="text-2xl lg:text-3xl font-serif text-magna-teal lowercase italic mb-8 lg:mb-12">Historial</h3>
            <div className="space-y-8 lg:space-y-10 relative">
              <div className="absolute left-4 lg:left-6 top-2 bottom-2 w-[1px] bg-magna-ivory"></div>
              {collab.history.map((item, i) => (
                <div key={i} className="flex space-x-6 lg:space-x-10 items-start group relative pl-10 lg:pl-16">
                  <div className="absolute left-3.5 lg:left-5.5 top-2 w-2 h-2 rounded-full bg-magna-gold border-4 border-white z-10"></div>
                  <div className="flex-1 pb-6 lg:pb-10 border-b border-magna-ivory last:border-0 w-full">
                    <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark/40 mb-2 block">{item.date}</span>
                    <p className="text-sm lg:text-lg font-serif text-magna-text opacity-80 leading-relaxed italic">"{item.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
