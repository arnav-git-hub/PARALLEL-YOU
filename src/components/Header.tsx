import React from 'react';
import { GitBranch, History, RotateCcw, HelpCircle, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenHistory: () => void;
  onOpenAbout: () => void;
  historyCount: number;
  hasActiveResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenHistory,
  onOpenAbout,
  historyCount,
  hasActiveResult,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-violet-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#090c15] rounded-[7px] flex items-center justify-center text-cyan-400">
              <GitBranch className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-white">
                BEFORE YOU CLICK
              </span>
              <span className="text-[11px] font-mono tracking-wider text-violet-400 border border-violet-500/30 bg-violet-950/40 px-1.5 py-0.5 rounded">
                PARALLEL YOU
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Cognitive Decision Simulator for High-Stakes Messages
            </p>
          </div>
        </div>

        {/* Right utility actions */}
        <div className="flex items-center gap-2">
          {hasActiveResult && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-md transition-colors"
              title="Reset simulation and start fresh"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">New Simulation</span>
            </button>
          )}

          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-md transition-colors relative"
            title="Saved message simulations"
          >
            <History className="w-3.5 h-3.5 text-violet-400" />
            <span>Vault</span>
            {historyCount > 0 && (
              <span className="bg-violet-500 text-white text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAbout}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md transition-colors"
            title="Heuristic methodology and privacy guide"
            aria-label="About heuristic framework"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
