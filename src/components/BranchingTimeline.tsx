import React from 'react';
import {
  Send,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { SimulationResult, FutureOutcome } from '../types/simulator';

interface BranchingTimelineProps {
  result: SimulationResult;
  activeBranchId: 'send_as_is' | 'send_smarter' | 'pause_reflect' | 'all';
  setActiveBranchId: (id: 'send_as_is' | 'send_smarter' | 'pause_reflect' | 'all') => void;
}

export const BranchingTimeline: React.FC<BranchingTimelineProps> = ({
  result,
  activeBranchId,
  setActiveBranchId,
}) => {
  const { sendAsIs, sendSmarter, pauseReflect } = result.futures;

  return (
    <div className="bg-[#090d18] border border-slate-800/80 rounded-2xl p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls for timeline view */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-white tracking-tight">
              Branching Decision Timelines
            </h2>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
              3 Trajectories
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulated divergence for {result.contextLabel} context. Click a branch to inspect deep causal chain.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveBranchId('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeBranchId === 'all'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 3 Futures
          </button>
          <button
            type="button"
            onClick={() => setActiveBranchId('send_as_is')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeBranchId === 'send_as_is'
                ? 'bg-rose-950 border border-rose-500/60 text-rose-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            As-Is
          </button>
          <button
            type="button"
            onClick={() => setActiveBranchId('send_smarter')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeBranchId === 'send_smarter'
                ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Smarter
          </button>
          <button
            type="button"
            onClick={() => setActiveBranchId('pause_reflect')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeBranchId === 'pause_reflect'
                ? 'bg-amber-950 border border-amber-500/60 text-amber-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pause
          </button>
        </div>
      </div>

      {/* Interactive Branching Graph Node Map */}
      <div className="py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Origin / Root Node: 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 relative group shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>ORIGIN POINT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">Unsent Message Draft</h3>
              <p className="text-xs text-slate-400 line-clamp-3 italic mb-3">
                "{result.originalMessage}"
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300 font-medium flex items-center justify-between">
                <span>Context: {result.contextLabel}</span>
                <span className="text-slate-500 font-mono">T = 0s</span>
              </div>
            </div>
          </div>

          {/* Branch Connectors & Cards: 9 columns */}
          <div className="lg:col-span-9 space-y-3.5">
            {/* Branch 1: Send As-Is */}
            <div
              onClick={() => setActiveBranchId('send_as_is')}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                activeBranchId === 'send_as_is' || activeBranchId === 'all'
                  ? 'bg-slate-900/90 border-rose-500/40 hover:border-rose-400 shadow-md shadow-rose-950/20'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        Future 1 // Send As-Is
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {sendAsIs.riskCategory}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {sendAsIs.scenarioTitle}
                    </div>
                  </div>
                </div>

                {/* Risk Badge */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Heuristic Risk
                    </div>
                    <div className="text-base font-bold font-mono text-rose-400">
                      {sendAsIs.riskScore}/100
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-700"
                      style={{ width: `${sendAsIs.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {sendAsIs.shortSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div className="flex items-start gap-1.5 text-slate-400">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Risk:</strong>{' '}
                    {sendAsIs.potentialNegative}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Action:</strong>{' '}
                    {sendAsIs.recommendedNextAction}
                  </span>
                </div>
              </div>
            </div>

            {/* Branch 2: Send Smarter (Recommended) */}
            <div
              onClick={() => setActiveBranchId('send_smarter')}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                activeBranchId === 'send_smarter' || activeBranchId === 'all'
                  ? 'bg-slate-900/90 border-cyan-500/60 hover:border-cyan-400 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                        Future 2 // Send Smarter
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                        Recommended Path
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {sendSmarter.scenarioTitle}
                    </div>
                  </div>
                </div>

                {/* Risk Badge */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Heuristic Risk
                    </div>
                    <div className="text-base font-bold font-mono text-cyan-300">
                      {sendSmarter.riskScore}/100
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${sendSmarter.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {sendSmarter.shortSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div className="flex items-start gap-1.5 text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Constructive Upside:</strong>{' '}
                    {sendSmarter.potentialPositive}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Preserves Intent:</strong>{' '}
                    {sendSmarter.whyConstructive}
                  </span>
                </div>
              </div>
            </div>

            {/* Branch 3: Pause & Reflect */}
            <div
              onClick={() => setActiveBranchId('pause_reflect')}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                activeBranchId === 'pause_reflect' || activeBranchId === 'all'
                  ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400 shadow-md shadow-amber-950/20'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Future 3 // Pause & Reflect
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Cooling-off Strategy
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {pauseReflect.scenarioTitle}
                    </div>
                  </div>
                </div>

                {/* Risk Badge */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Heuristic Risk
                    </div>
                    <div className="text-base font-bold font-mono text-amber-300">
                      {pauseReflect.riskScore}/100
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${pauseReflect.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {pauseReflect.shortSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div className="flex items-start gap-1.5 text-slate-400">
                  <Hourglass className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Recommended Window:</strong>{' '}
                    {pauseReflect.suggestedCooldownTime}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-medium">Cooling Strategy:</strong>{' '}
                    {pauseReflect.coolingOffStrategy}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
