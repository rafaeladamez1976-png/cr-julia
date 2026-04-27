import React from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const ConfigItem = ({ icon: Icon, label, description, isAction = false }) => (
  <div className={`p-8 bg-white rounded-sm shadow-[0_24px_32px_-12px_rgba(26,92,90,0.02)] border-l-2 border-transparent hover:border-magna-gold/30 transition-all flex items-center justify-between cursor-pointer group`}>
    <div className="flex items-center space-x-6">
      <div className="w-12 h-12 rounded-sm bg-magna-ivory flex items-center justify-center text-magna-gold group-hover:scale-105 transition-transform duration-500">
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-magna-teal uppercase tracking-widest">{label}</span>
        <span className="text-[10px] text-magna-gold-dark font-medium opacity-60 uppercase tracking-widest leading-loose mt-0.5">{description}</span>
      </div>
    </div>
    <div className={isAction ? 'text-magna-goldDark' : 'text-magna-gold-dark/20'}>
      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const Config = () => {
  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header section */}
      <div className="max-w-4xl">
        <h2 className="text-4xl font-serif text-magna-teal lowercase italic mb-2">Preferencias del Sistema</h2>
        <p className="text-magna-gold-dark text-sm tracking-widest uppercase font-bold opacity-60">Configuración Personal y de Marca</p>
      </div>

      {/* Grid of config sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        <div className="space-y-6">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-magna-goldDark px-2">Perfil Institucional</h3>
           <ConfigItem icon={User} label="Mi Cuenta" description="Gestionar datos personales y credenciales" />
           <ConfigItem icon={Shield} label="Seguridad" description="Doble factor de autenticación y accesos" />
           <ConfigItem icon={Bell} label="Notificaciones" description="Preferencias de alertas y alertas de clientes" />
        </div>
        
        <div className="space-y-6">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-magna-goldDark px-2">Entorno & Marca</h3>
           <ConfigItem icon={Palette} label="Personalización" description="Esquemas de color y estilo visual" />
           <ConfigItem icon={Globe} label="Plataforma" description="Idioma, zona horaria y moneda" />
           <ConfigItem icon={LogOut} label="Cerrar Sesión" description="Finalizar sesión de forma segura" isAction={true} />
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="pt-12 border-t border-magna-gold/10 opacity-20">
         <p className="font-serif italic text-sm text-magna-teal">Magna CRM Core Version 8.0.4 Platinum Edition</p>
      </div>
    </div>
  );
};

export default Config;
