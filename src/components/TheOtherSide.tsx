import React, { useState } from 'react';
import {
  Eye,
  Smile,
  Frown,
  AlertOctagon,
  Scale,
  Info,
  ChevronRight,
} from 'lucide-react';
import { RecipientPerspectives } from '../types/simulator';

interface TheOtherSideProps {
  perspectives: RecipientPerspectives;
  contextLabel: string;
}

export const TheOtherSide: React.FC<TheOtherSideProps> = ({
  perspectives,
  contextLabel,
}) => {
  const [activeTab, setActiveTab] = useState<'generous' | 'critical' | 'misunderstanding' | 'power'>('critical');

  return (
    <div className="bg-[#090d18] border border-slate-800/80 rounded-2xl p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pb-5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
              <Eye className="w-5 h-5 text-violet-400" />
              <span>The Other Side: Recipient Perspective Simulator</span>
            </h2>
            <span className="text-[11px] font-mono text-violet-400 bg-violet-950/40 border border-violet-500/30 px-2 py-0.5 rounded">
              {contextLabel} Lens
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            How your tone lands across different cognitive and emotional states of the recipient.
          </p>
        </div>

        {/* Disclaimer reminder */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 max-w-xs">
          <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>Heuristic psychological archetypes, never claiming mind-reading.</span>
        </div>
      </div>

      {/* Lens Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-5">
        <button
          type="button"
          onClick={() => setActiveTab('critical')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeTab === 'critical'
              ? 'bg-rose-950/40 border-rose-500/60 text-white shadow-md shadow-rose-950/30'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-rose-400">
            <Frown className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Under Stress</span>
          </div>
          <div className="text-[11px] text-slate-300 line-clamp-1">
            Overwhelmed inbox reading
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('generous')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeTab === 'generous'
              ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-md shadow-emerald-950/30'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
            <Smile className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Generous Lens</span>
          </div>
          <div className="text-[11px] text-slate-300 line-clamp-1">
            Empathetic, calm reading
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('misunderstanding')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeTab === 'misunderstanding'
              ? 'bg-amber-950/40 border-amber-500/60 text-white shadow-md shadow-amber-950/30'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-amber-400">
            <AlertOctagon className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Subtext Trap</span>
          </div>
          <div className="text-[11px] text-slate-300 line-clamp-1">
            Unintended hidden meanings
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('power')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeTab === 'power'
              ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-md shadow-cyan-950/30'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <Scale className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Power Dynamic</span>
          </div>
          <div className="text-[11px] text-slate-300 line-clamp-1">
            Hierarchy & role expectations
          </div>
        </button>
      </div>

      {/* Active Perspective Content Card */}
      <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 relative">
        {activeTab === 'critical' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Frown className="w-4 h-4" />
              <span>When the {contextLabel} is exhausted or pressed for time</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed italic bg-rose-950/20 p-4 rounded-lg border border-rose-900/30">
              {perspectives.criticalInterpretation}
            </p>
            <p className="text-xs text-slate-400">
              When recipients scan emails between meetings on mobile, they process text via emotional threat detection rather than nuanced charity.
            </p>
          </div>
        )}

        {activeTab === 'generous' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Smile className="w-4 h-4" />
              <span>When the {contextLabel} is relaxed and supportive</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed italic bg-emerald-950/20 p-4 rounded-lg border border-emerald-900/30">
              {perspectives.generousInterpretation}
            </p>
            <p className="text-xs text-slate-400">
              A charitable reading recognizes you are doing your best, but banking on the recipient having a perfect day is a fragile communication strategy.
            </p>
          </div>
        )}

        {activeTab === 'misunderstanding' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>Potential Subconscious Misunderstanding</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-amber-950/20 p-4 rounded-lg border border-amber-900/30">
              {perspectives.potentialMisunderstanding}
            </p>
            <p className="text-xs text-slate-400">
              Written text lacks facial expressions, micro-intonation, and posture. What you meant as direct clarity is often read as cold defiance.
            </p>
          </div>
        )}

        {activeTab === 'power' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Institutional Dynamic & Leverage Balance</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-cyan-950/20 p-4 rounded-lg border border-cyan-900/30">
              {perspectives.powerDynamicConsideration}
            </p>
            <p className="text-xs text-slate-400">
              Power imbalances magnify word choices. The party with less structural leverage absorbs a 3x higher friction penalty for ambiguous tone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
