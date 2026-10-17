import React from 'react';
import { X, Trash2, ArrowUpRight, History, Calendar, CheckCircle } from 'lucide-react';
import { SimulationResult } from '../types/simulator';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedSimulations: SimulationResult[];
  onLoadSimulation: (sim: SimulationResult) => void;
  onDeleteSimulation: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedSimulations,
  onLoadSimulation,
  onDeleteSimulation,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0a0e1a] border-l border-slate-800 h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-violet-400" />
            <h3 className="font-display font-bold text-white text-base">Simulation Vault</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
              {savedSimulations.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedSimulations.length === 0 ? (
            <div className="text-center py-16 px-4 text-slate-500">
              <History className="w-10 h-10 mx-auto text-slate-700 mb-3" />
              <p className="text-sm font-medium text-slate-400">Vault is empty</p>
              <p className="text-xs mt-1 text-slate-500 max-w-xs mx-auto">
                Simulate a message and click "Save Simulation" to keep it stored locally in your browser.
              </p>
            </div>
          ) : (
            savedSimulations.map((sim) => {
              const dateStr = new Date(sim.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={sim.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                      {sim.contextLabel}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 italic mb-3">
                    "{sim.originalMessage}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-400 font-mono font-medium">
                        As-Is: {sim.futures.sendAsIs.riskScore}%
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-cyan-300 font-mono font-medium">
                        Smarter: {sim.futures.sendSmarter.riskScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          onLoadSimulation(sim);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded bg-violet-600/80 hover:bg-violet-600 text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>Replay</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteSimulation(sim.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                        title="Delete from vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {savedSimulations.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-[#090c15] flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Stored locally in browser (no cloud sync)
            </span>
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium"
            >
              Clear Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
