import React from 'react';
import { Bell, Search, Globe, Menu } from 'lucide-react';

const TopBar = ({ title, onMenuClick }) => {
  return (
    <div className="h-20 lg:h-24 bg-white/70 backdrop-blur-md border-b border-magna-gold/5 flex items-center justify-between px-4 lg:px-12 fixed top-0 right-0 left-0 lg:left-64 z-30 font-sans transition-all duration-500">
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="p-2 text-magna-teal lg:hidden hover:bg-magna-teal/5 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col">
          <div className="hidden sm:flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-magna-gold-dark/60">Navigation / {title}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif text-magna-teal lowercase italic leading-none truncate max-w-[150px] sm:max-w-none">
            {title}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 lg:space-x-10">
        <div className="hidden md:relative group md:block">
          <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 text-magna-gold-dark/30 group-focus-within:text-magna-teal transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            className="pr-8 pl-0 py-2 bg-transparent border-b border-magna-gold-dark/10 focus:border-magna-gold-dark outline-none w-32 lg:w-48 transition-all text-xs uppercase tracking-widest placeholder:text-magna-gold-dark/30"
          />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-6">
          <button className="relative p-2 text-magna-gold-dark/60 hover:text-magna-teal transition-all hover:scale-110">
            <Bell size={18} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-magna-gold-dark rounded-full"></span>
          </button>
          
          <div className="hidden sm:block h-8 w-[1px] bg-magna-gold-dark/10"></div>
          
          <div className="flex items-center space-x-3 lg:space-x-4 group cursor-pointer">
            <div className="hidden sm:block text-right">
              <p className="text-[11px] font-bold text-magna-teal uppercase tracking-widest group-hover:text-magna-gold-dark transition-colors">Workspace</p>
              <p className="text-[10px] text-magna-gold-dark font-medium italic">London Heritage</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-magna-ivory flex items-center justify-center border border-magna-gold/20 text-magna-teal shadow-sm">
              <Globe size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
