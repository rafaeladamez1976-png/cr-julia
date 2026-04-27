import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-magna-ivory p-4 font-sans relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-magna-teal/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-magna-gold/10 rounded-full blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-sm shadow-[0_64px_80px_-24px_rgba(26,92,90,0.1)] overflow-hidden p-16 flex flex-col items-center relative z-10 border border-white"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-10"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A5C5A" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
            <path d="M12 2L10 10H14L12 2Z" />
            <path d="M12 22L14 14H10L12 22Z" />
            <path d="M2 12L10 10V14L2 12Z" />
            <path d="M22 12L14 14V10L22 12Z" />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-3xl font-serif text-magna-teal mb-12 tracking-[0.1em] uppercase text-center leading-tight"
        >
          Magna<br/>Buyers Agents
        </motion.h1>

        <form onSubmit={handleSubmit} className="w-full space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative"
          >
            <label className="block text-[10px] uppercase tracking-[0.2em] font-serif text-magna-gold-dark font-bold mb-1" htmlFor="email">
              Institutional Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-0 py-3 bg-transparent border-b border-magna-gold-dark/10 focus:border-magna-gold-dark outline-none transition-all text-magna-text placeholder:text-magna-gold-dark/20"
              placeholder="agent@magna.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="relative"
          >
            <label className="block text-[10px] uppercase tracking-[0.2em] font-serif text-magna-gold-dark font-bold mb-1" htmlFor="password">
              Secure Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-0 py-3 bg-transparent border-b border-magna-gold-dark/10 focus:border-magna-gold-dark outline-none transition-all text-magna-text placeholder:text-magna-gold-dark/20"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#144846" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            type="submit"
            className="w-full bg-magna-teal text-white py-4 rounded-sm font-medium tracking-[0.2em] uppercase text-[10px] transition-all shadow-2xl shadow-magna-teal/20 mt-6"
          >
            Empoderar Sesión
          </motion.button>
        </form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-[9px] uppercase tracking-widest text-magna-gold-dark font-bold italic"
        >
          Solo para agentes autorizados
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
