'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/30 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-10 sm:p-16 flex flex-col items-center relative z-10 border border-white/50 dark:border-slate-700/50">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }} className="mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-amber-300">M</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="text-2xl sm:text-3xl font-light text-teal-700 dark:text-teal-300 mb-2 tracking-wider text-center">
          Magna
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-amber-600/60 dark:text-amber-400/60 font-semibold mb-10">
          Buyers Agents
        </motion.p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin() }} className="w-full space-y-8">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Email Institucional
            </label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b border-slate-200 dark:border-slate-600 focus:border-teal-600 outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              placeholder="agent@magna.com" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Contraseña
            </label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b border-slate-200 dark:border-slate-600 focus:border-teal-600 outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              placeholder="••••••••" />
          </motion.div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-semibold tracking-[0.15em] uppercase text-xs transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30">
            Acceder al Sistema
          </motion.button>
        </form>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
          Solo para agentes autorizados
        </motion.p>
      </motion.div>
    </div>
  )
}
