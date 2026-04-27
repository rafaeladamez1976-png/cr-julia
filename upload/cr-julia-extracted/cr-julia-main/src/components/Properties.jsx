import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  X, 
  Search, 
  ChevronRight, 
  Home, 
  MapPin, 
  Euro, 
  Users, 
  Info,
  Clock,
  ArrowRight,
  TrendingDown,
  LayoutGrid
} from 'lucide-react';

const INITIAL_PROPERTIES = [
  { id: 1, address: 'Calle de Serrano 45, 4º Izq', ref: 'MAG-SER45', type: 'Piso', price: '2.450.000 €', collab: 'Inmobiliaria Goya', interested: 3, status: 'Disponible', area: '175 m²', rooms: 3, baths: 3, floor: '4º', features: 'Vistas al Retiro, techos altos, portero físico.', history: [
    { date: '05 Abr 2026', text: 'Propiedad dada de alta en colaboración.' },
    { date: '08 Abr 2026', text: 'Visita realizada por Cliente Valdés.' }
  ], linkedClients: ['Ignacio Valdés', 'Sofía Navarro'] },
  { id: 2, address: 'Don Ramón de la Cruz 12', ref: 'MAG-DRC12', type: 'Piso', price: '1.180.000 €', collab: 'Directo Prop.', interested: 5, status: 'Reservada', area: '120 m²', rooms: 2, baths: 2, floor: '2º', features: 'Totalmente reformado, mucha luz, balcón a la calle.', history: [
    { date: '20 Mar 2026', text: 'Señalizada por Beatriz Soler.' }
  ], linkedClients: ['Beatriz Soler'] },
  { id: 3, address: 'Paseo de la Castellana 112', ref: 'MAG-CAS112', type: 'Ático', price: '4.200.000 €', collab: 'Barcelona Luxury', interested: 2, status: 'Disponible', area: '310 m²', rooms: 4, baths: 4, floor: 'Ático', features: 'Terraza perimetral de 80m², piscina privada.', history: [
    { date: '12 Feb 2026', text: 'Bajada de precio de 4.5M a 4.2M.' }
  ], linkedClients: ['Marc Torrens'] },
  { id: 4, address: 'VILLA LA ZAGALETA', ref: 'MAG-ZAG10', type: 'Chalet', price: '12.500.000 €', collab: 'Marbella Estates', interested: 1, status: 'Vendida', area: '1100 m²', rooms: 7, baths: 8, floor: 'Triple', features: 'Seguridad máxima, garaje para 10 coches.', history: [
    { date: '05 Ene 2026', text: 'Operación cerrada con éxito.' }
  ], linkedClients: [] },
  { id: 5, address: 'Calle Mayor 10, Local', ref: 'MAG-COM10', type: 'Local', price: '890.000 €', collab: 'Levante Proy.', interested: 4, status: 'Disponible', area: '200 m²', rooms: 0, baths: 1, floor: 'Bajo', features: 'Salida de humos instalada, gran escaparate.', history: [
    { date: '10 Abr 2026', text: 'Solicitud de licencia de terraza enviada.' }
  ], linkedClients: ['Elena García'] },
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Disponible': 'bg-green-100 text-green-700',
    'Reservada': 'bg-amber-100 text-amber-700',
    'Vendida': 'bg-magna-teal/10 text-magna-teal',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

const Properties = () => {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [selectedProp, setSelectedProp] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredProps = useMemo(() => {
    return properties.filter(p => p.address.toLowerCase().includes(search.toLowerCase()) || p.ref.toLowerCase().includes(search.toLowerCase()));
  }, [properties, search]);

  return (
    <div className="p-6 lg:p-12 font-sans relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-16 space-y-4 sm:space-y-0 text-center sm:text-left">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl lg:text-4xl font-serif text-magna-teal lowercase italic leading-none truncate max-w-[250px] sm:max-w-none mx-auto sm:mx-0">Colección Inmobiliaria</h2>
          <p className="mt-2 text-magna-gold-dark text-[10px] sm:text-sm tracking-widest uppercase font-bold opacity-60">Control de Activos</p>
        </div>
        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="w-full sm:w-auto bg-magna-teal text-magna-gold px-6 lg:px-8 py-3 rounded-sm flex items-center justify-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/95 transition-all shadow-lg"
        >
          <Plus size={14} />
          <span>Nueva Propiedad</span>
        </button>
      </div>

      {selectedProp ? (
        <PropertyDetail 
          property={selectedProp} 
          onBack={() => setSelectedProp(null)} 
        />
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          {/* Search Bar */}
          <div className="mb-8 lg:mb-10 relative max-w-sm mx-auto sm:mx-0">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-magna-gold-dark/40" size={16} />
            <input 
              type="text" 
              placeholder="Dirección o referencia..." 
              className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-magna-gold-dark/10 focus:border-magna-gold-dark outline-none text-[10px] uppercase tracking-widest font-bold transition-all placeholder:text-magna-gold-dark/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FDF9F4] border-b border-magna-ivory">
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Dirección</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Tipo</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Precio</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Colaborador</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 text-center">Interés</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Estado</th>
                  <th className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-magna-ivory">
                {filteredProps.map(prop => (
                  <tr 
                    key={prop.id} 
                    className="hover:bg-magna-ivory/20 transition-colors cursor-pointer group"
                    onClick={() => setSelectedProp(prop)}
                  >
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-magna-teal mb-0.5">{prop.address}</span>
                        <span className="text-[9px] text-magna-gold-dark font-bold uppercase tracking-widest opacity-60">{prop.ref}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-magna-teal/70">{prop.type}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-lg font-serif italic text-magna-text">{prop.price}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-magna-gold-dark">{prop.collab}</span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="inline-flex items-center space-x-1 px-2 py-1 bg-magna-ivory rounded-sm text-magna-teal">
                        <Users size={12} />
                        <span className="text-xs font-bold">{prop.interested}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <StatusBadge status={prop.status} />
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button className="text-magna-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {filteredProps.map(prop => (
              <div 
                key={prop.id} 
                className="bg-white p-6 rounded-sm shadow-sm border border-magna-ivory hover:border-magna-gold/30 transition-all active:scale-[0.98] cursor-pointer"
                onClick={() => setSelectedProp(prop)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-bold text-magna-teal truncate pr-4">{prop.address}</h4>
                    <span className="text-[9px] text-magna-gold-dark font-bold uppercase tracking-widest opacity-60">{prop.ref}</span>
                  </div>
                  <StatusBadge status={prop.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-magna-ivory/50">
                   <div>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-magna-gold-dark/40 block mb-1">Precio</span>
                      <span className="text-base font-serif italic text-magna-text">{prop.price}</span>
                   </div>
                   <div>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-magna-gold-dark/40 block mb-1">Tipo / Ref</span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-magna-teal/70">{prop.type}</span>
                   </div>
                </div>

                <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark">
                  <span>{prop.collab}</span>
                  <span className="text-magna-gold flex items-center">
                    Detalles <ChevronRight size={12} className="ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide-over Form */}
      <NewPropertyPanel isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
    </div>
  );
};

const NewPropertyPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-magna-teal/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-10 border-b border-magna-ivory flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-serif text-magna-teal italic lowercase">Nueva Propiedad</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50">Referencia de Colaboración</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-magna-ivory rounded-full transition-colors"><X size={20} className="text-magna-gold-dark" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Dirección Completa</label>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none font-serif text-xl italic" placeholder="Ej. Calle de Velázquez 24..." />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Ref. Interna</label>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none" placeholder="MAG-XXXX" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Tipo de Activo</label>
              <select className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none uppercase text-[10px] font-bold tracking-widest">
                <option>Piso</option><option>Casa</option><option>Ático</option><option>Chalet</option><option>Local</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Precio (€)</label>
              <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none" placeholder="1.200.000" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">m² Construidos</label>
              <input type="number" className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none" />
            </div>
            <div className="grid grid-cols-3 gap-4 col-span-2 pt-6 border-t border-magna-ivory">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Rooms</label>
                <input type="number" className="w-full border-b border-magna-gold-dark/10 py-2" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Baths</label>
                <input type="number" className="w-full border-b border-magna-gold-dark/10 py-2" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Floor</label>
                <input type="text" className="w-full border-b border-magna-gold-dark/10 py-2" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Agencia Colaboradora</label>
              <select className="w-full border-b border-magna-gold-dark/10 py-2 focus:border-magna-teal outline-none font-serif italic text-lg">
                <option>Inmobiliaria Goya</option><option>Directo Propietario</option><option>Barcelona Luxury</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-magna-gold-dark mb-2 block">Características Destacadas</label>
              <textarea className="w-full border border-magna-gold-dark/10 p-3 h-24 focus:border-magna-teal outline-none resize-none text-sm" />
            </div>
          </div>
        </div>

        <div className="p-10 bg-magna-ivory/50 flex space-x-6">
          <button className="flex-1 bg-magna-teal text-white py-4 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-magna-teal/95 transition-all">Registrar Ficha</button>
          <button onClick={onClose} className="px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-magna-gold-dark hover:bg-magna-gold-dark/5 transition-all border border-magna-gold-dark/10 rounded-sm">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 lg:mb-16 space-y-6 sm:space-y-0">
        <button onClick={onBack} className="flex items-center space-x-3 text-magna-gold-dark hover:text-magna-teal transition-all group">
          <ChevronRight className="rotate-180 transition-transform group-hover:-translate-x-1" size={18} />
          <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em]">Volver al Listado</span>
        </button>
        <div className="flex items-center space-x-6 sm:space-x-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
           <div className="flex flex-col items-end">
              <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/40 mb-1">Estado Actual</span>
              <StatusBadge status={property.status} />
           </div>
           <button className="p-3 bg-white border border-magna-gold/20 rounded-sm text-magna-teal hover:bg-magna-ivory transition-colors"><Info size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Specs */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-12 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)] border-t-4 border-magna-gold/10">
           <h3 className="text-2xl lg:text-4xl font-serif text-magna-teal lowercase italic mb-2 leading-tight">{property.address}</h3>
           <p className="text-[9px] lg:text-[11px] font-bold tracking-[0.3em] text-magna-gold-dark mb-8 lg:mb-12 uppercase opacity-70 truncate">{property.ref} · {property.collab}</p>
           
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-12 gap-x-6 lg:gap-x-8 pb-8 lg:pb-12 border-b border-magna-ivory">
              {[
                { label: 'Precio Venta', value: property.price, icon: Euro },
                { label: 'Tipo Propiedad', value: property.type, icon: Home },
                { label: 'Superficie', value: property.area, icon: LayoutGrid },
                { label: 'Habitaciones', value: property.rooms.toString(), icon: MapPin },
                { label: 'Baños', value: property.baths.toString(), icon: MapPin },
                { label: 'Planta', value: property.floor, icon: Clock },
              ].map((spec, i) => (
                <div key={i}>
                   <div className="flex items-center space-x-2 mb-2 text-magna-gold">
                      <spec.icon size={12} lg:size={14} />
                      <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest">{spec.label}</span>
                   </div>
                   <p className="text-base lg:text-xl font-serif text-magna-teal">{spec.value}</p>
                </div>
              ))}
           </div>
           
           <div className="pt-8 lg:pt-12">
              <h4 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/50 mb-4 block">Características Destacadas</h4>
              <p className="text-sm lg:text-lg font-serif italic text-magna-text opacity-80 leading-relaxed font-sans">{property.features}</p>
           </div>
        </div>

        {/* Right Panel: Interested Clients */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
           <div className="bg-magna-teal p-8 lg:p-10 rounded-sm text-white shadow-xl">
              <h3 className="text-xl lg:text-2xl font-serif italic lowercase mb-6 lg:mb-8">Compradores Interesados</h3>
              <div className="relative mb-6 lg:mb-8">
                 <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                 <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 pl-8 outline-none text-[9px] lg:text-[10px] uppercase tracking-widest placeholder:text-white/30" placeholder="Vincular cliente..." />
              </div>
              <div className="space-y-2 lg:space-y-3">
                 {property.linkedClients.map((client, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-sm group border border-transparent hover:border-magna-gold/20 transition-all">
                       <span className="text-xs font-medium tracking-wide truncate pr-4">{client}</span>
                       <button className="text-magna-gold opacity-30 group-hover:opacity-100 flex-shrink-0"><X size={14}/></button>
                    </div>
                 ))}
                 {property.linkedClients.length === 0 && <p className="text-[10px] italic opacity-40">No hay clientes vinculados aún.</p>}
              </div>
           </div>

           <div className="bg-white p-8 lg:p-10 rounded-sm shadow-[0_32px_48px_-12px_rgba(26,92,90,0.03)]">
              <h4 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark mb-6 lg:mb-8">Historial de Ficha</h4>
              <div className="space-y-6 lg:space-y-8">
                 {property.history.map((h, i) => (
                    <div key={i} className="flex space-x-4 lg:space-x-6">
                       <div className="flex flex-col items-center">
                          <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-magna-gold mb-2"></div>
                          <div className="w-[1px] h-full bg-magna-ivory last:hidden"></div>
                       </div>
                       <div className="min-w-0">
                          <span className="text-[8px] lg:text-[9px] font-bold text-magna-gold-dark/40 uppercase tracking-widest block mb-1">{h.date}</span>
                          <p className="text-[11px] lg:text-xs font-medium text-magna-text opacity-70 leading-relaxed italic">{h.text}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
