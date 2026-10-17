import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { SimulationResult } from '../types/simulator';

interface RegretReplayProps {
  result: SimulationResult;
  onSaveToVault: () => void;
  isSaved: boolean;
}

export const RegretReplay: React.FC<RegretReplayProps> = ({
  result,
  onSaveToVault,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);
  const sendSmarter = result.futures.sendSmarter;
  const improvedText = sendSmarter.rewrittenMessage || '';

  const handleCopy = async () => {
    if (!improvedText) return;
    try {
      await navigator.clipboard.writeText(improvedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="bg-[#090d18] border border-slate-800/80 rounded-2xl p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Regret Replay: Original vs. Smarter Transmission</span>
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
              Diff Analysis
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Preserve your exact boundaries and intent while purging friction points that undermine your credibility.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onSaveToVault}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
              isSaved
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{isSaved ? 'Saved to Vault' : 'Save Simulation'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950/40"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Improved Draft</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-6">
        {/* Left Column: Original Draft */}
        <div className="flex flex-col rounded-xl bg-slate-950/80 border border-rose-950/80 overflow-hidden">
          <div className="px-4 py-2.5 bg-rose-950/30 border-b border-rose-900/30 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Original Draft (Risk: {result.futures.sendAsIs.riskScore}/100)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Impulsive / Raw</span>
          </div>

          <div className="p-4 flex-1">
            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
              {result.originalMessage}
            </p>
          </div>

          <div className="p-3 bg-rose-950/20 border-t border-rose-900/20 text-xs text-rose-300/90 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <span>
              Risk factor: {result.futures.sendAsIs.potentialNegative}
            </span>
          </div>
        </div>

        {/* Right Column: Smarter Draft */}
        <div className="flex flex-col rounded-xl bg-slate-950/80 border border-cyan-500/40 overflow-hidden ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-950/20">
          <div className="px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-800/40 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Smarter Rewrite (Risk: {sendSmarter.riskScore}/100)
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Strategic Alignment</span>
          </div>

          <div className="p-4 flex-1">
            <p className="text-sm text-slate-100 whitespace-pre-wrap leading-relaxed font-sans font-medium">
              {improvedText}
            </p>
          </div>

          <div className="p-3 bg-cyan-950/30 border-t border-cyan-800/30 text-xs text-cyan-200 flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              {sendSmarter.whyConstructive}
            </span>
          </div>
        </div>
      </div>

      {/* Key Changes Breakdown Table */}
      {sendSmarter.keyChanges && sendSmarter.keyChanges.length > 0 && (
        <div className="mt-2 pt-5 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Tone Shift & Boundary Preservation Mechanics
          </h4>
          <div className="space-y-2">
            {sendSmarter.keyChanges.map((change, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs items-center"
              >
                <div className="md:col-span-4 text-rose-300 line-through decoration-rose-500/60 font-mono">
                  "{change.originalPhrase}"
                </div>
                <div className="md:col-span-1 flex justify-center text-slate-500 hidden md:flex">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="md:col-span-4 text-cyan-300 font-medium">
                  "{change.revisedPhrase}"
                </div>
                <div className="md:col-span-3 text-slate-400 text-[11px]">
                  {change.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
