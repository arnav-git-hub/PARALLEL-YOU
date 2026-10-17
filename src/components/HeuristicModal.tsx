import React from 'react';
import { X, ShieldAlert, CheckCircle2, GitBranch, Cpu, Lock } from 'lucide-react';

interface HeuristicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeuristicModal: React.FC<HeuristicModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0b0f1a] border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-white text-base">
              The Parallel You Heuristic Framework
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/40">
            <h4 className="font-semibold text-violet-300 mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Core Concept: Exploratory Decision Sandbox</span>
            </h4>
            <p>
              BEFORE YOU CLICK is an intentional countermeasure against digital impulsivity. Most communication regrets happen not because we lack eloquence, but because adrenaline compresses our decision horizon to milliseconds.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200">
              1. Heuristic Risk vs. Calibrated Probability
            </h5>
            <p className="text-slate-400">
              Risk scores (0–100) are explicitly heuristic indicators based on linguistic emotional triggers, tone abrasiveness, and role power imbalances. They are <strong>exploratory models</strong>, not deterministic scientific predictions. Human communication is inherently unpredictable.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200">
              2. User Agency Preservation
            </h5>
            <p className="text-slate-400">
              Parallel You will <em>never</em> automatically dispatch messages or rewrite your intent into sycophantic corporate fluff. "Send Smarter" preserves 100% of your authentic boundaries while removing destructive tone markers.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200">
              3. The "Pause & Reflect" Strategy
            </h5>
            <p className="text-slate-400">
              Neuroscience confirms that high-stakes text triggers the sympathetic nervous system. In over 80% of interpersonal friction cases, a simple 20-minute delay resets prefrontal executive control.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2 text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Data Storage:</strong> No personal communication drafts are logged or shared. Vault simulations are saved exclusively in your local browser storage.
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
