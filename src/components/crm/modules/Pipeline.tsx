'use client'
import { useState } from 'react'
import { ArrowRight, Target } from 'lucide-react'
import { INITIAL_PIPELINE, PIPELINE_STAGES } from '../data'
import { SCORE_COLOR } from '../constants'

const STAGE_COLORS = [
  'bg-slate-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-teal-600',
  'bg-amber-500',
  'bg-amber-600',
  'bg-orange-500',
  'bg-emerald-600',
]

type PipelineClient = typeof INITIAL_PIPELINE[number]

export function Pipeline() {
  const [pipeline, setPipeline] = useState<PipelineClient[]>(INITIAL_PIPELINE)

  const moveClient = (clientId: number) => {
    setPipeline(prev => prev.map(client => {
      if (client.id !== clientId) return client
      const currentIndex = PIPELINE_STAGES.indexOf(client.stage)
      if (currentIndex < PIPELINE_STAGES.length - 1) {
        return { ...client, stage: PIPELINE_STAGES[currentIndex + 1], days: 0 }
      }
      return client
    }))
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-white">Flujo de Negocio</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">
          Seguimiento de Operaciones · 9 Etapas
        </p>
      </div>

      <div className="overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex gap-3 min-w-max">
          {PIPELINE_STAGES.map((stage, idx) => {
            const stageClients = pipeline.filter(c => c.stage === stage)
            const isLastStage = idx === PIPELINE_STAGES.length - 1
            return (
              <div key={stage} className="w-[240px] bg-white dark:bg-slate-800 rounded-2xl flex flex-col shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <div className={`${STAGE_COLORS[idx]} p-3 flex justify-between items-center`}>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-xs truncate">{stage}</h3>
                    <span className="text-white/60 text-[9px] font-medium">Etapa {idx + 1}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ml-2">
                    {stageClients.length}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50 dark:bg-slate-800/50 min-h-[160px] max-h-[calc(100vh-280px)]">
                  {stageClients.map((client) => (
                    <div key={client.id}
                      className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-[9px] font-bold text-teal-700 dark:text-teal-300">
                          {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-white truncate">{client.name}</h4>
                          <span className="text-[9px] text-slate-400">{client.days}d</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">{client.budget}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-semibold text-slate-600 dark:text-slate-300">{client.zone}</span>
                          <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded ${SCORE_COLOR(client.score)}`}>
                            <Target size={8} />{client.score}
                          </span>
                        </div>
                        {!isLastStage && (
                          <button onClick={() => moveClient(client.id)}
                            className="bg-teal-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-teal-700">
                            <ArrowRight size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {stageClients.length === 0 && (
                    <div className="flex items-center justify-center h-16 text-slate-300 dark:text-slate-600 text-xs font-medium">
                      Sin clientes
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

