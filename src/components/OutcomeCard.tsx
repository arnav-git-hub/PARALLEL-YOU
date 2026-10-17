import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Clock,
  Check,
  Copy,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
} from 'lucide-react';
import { FutureOutcome } from '../types/simulator';

interface OutcomeCardProps {
  outcome: FutureOutcome;
  contextLabel: string;
  isFocused?: boolean;
}

export const OutcomeCard: React.FC<OutcomeCardProps> = ({
  outcome,
  contextLabel,
  isFocused = false,
}) => {
  const [copied, setCopied] = useState(false);

  const isAsIs = outcome.id === 'send_as_is';
  const isSmarter = outcome.id === 'send_smarter';
  const isPause = outcome.id === 'pause_reflect';

  const handleCopy = async () => {
    if (!outcome.rewrittenMessage) return;
    try {
      await navigator.clipboard.writeText(outcome.rewrittenMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const getThemeColors = () => {
    if (isSmarter) {
      return {
        border: 'border-cyan-500/50 hover:border-cyan-400',
        glow: 'shadow-cyan-950/40',
        badgeBg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
        iconBg: 'bg-cyan-500/20 text-cyan-300',
        barColor: 'bg-cyan-400',
        riskTextColor: 'text-cyan-300',
      };
    }
    if (isPause) {
      return {
        border: 'border-amber-500/40 hover:border-amber-300',
        glow: 'shadow-amber-950/30',
        badgeBg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
        iconBg: 'bg-amber-500/20 text-amber-300',
        barColor: 'bg-amber-400',
        riskTextColor: 'text-amber-300',
      };
    }
    return {
      border: 'border-rose-500/40 hover:border-rose-300',
      glow: 'shadow-rose-950/30',
      badgeBg: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
      iconBg: 'bg-rose-500/20 text-rose-300',
      barColor: 'bg-rose-500',
      riskTextColor: 'text-rose-400',
    };
  };

  const colors = getThemeColors();

  return (
    <div
      className={`rounded-2xl bg-[#090d18] border p-5 sm:p-6 transition-all relative flex flex-col justify-between shadow-xl ${
        colors.border
      } ${colors.glow} ${isFocused ? 'ring-2 ring-violet-500/50' : ''}`}
    >
      <div>
        {/* Top bar with Branch ID and Risk Score */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border font-semibold ${colors.badgeBg}`}
          >
            {outcome.branchLabel}
          </span>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono uppercase">
                Heuristic Risk
              </span>
              <span className={`text-base font-bold font-mono ${colors.riskTextColor}`}>
                {outcome.riskScore}/100
              </span>
            </div>
            <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.barColor}`}
                style={{ width: `${outcome.riskScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="text-base font-display font-bold text-white mb-2 leading-snug">
          {outcome.scenarioTitle}
        </h3>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          {outcome.shortSummary}
        </p>

        {/* Potential Outcomes Grid */}
        <div className="space-y-2.5 mb-4">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Plausible Positive Outcome</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {outcome.potentialPositive}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Plausible Negative Outcome</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {outcome.potentialNegative}
            </p>
          </div>
        </div>

        {/* Specific Branch Custom Details */}
        {isSmarter && outcome.rewrittenMessage && (
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-cyan-300">
                Optimized Draft
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-cyan-300 hover:text-white flex items-center gap-1 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-700/50"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 line-clamp-3 italic">
              "{outcome.rewrittenMessage}"
            </p>
          </div>
        )}

        {isPause && outcome.reflectionQuestions && outcome.reflectionQuestions.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 mb-4">
            <span className="text-xs font-semibold text-amber-300 block mb-1.5">
              Self-Inquiry Checkpoints
            </span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              {outcome.reflectionQuestions.slice(0, 2).map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        {isAsIs && outcome.plausibleReactions && outcome.plausibleReactions.length > 0 && (
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 mb-4">
            <span className="text-xs font-semibold text-rose-300 block mb-1.5">
              Recipient Gut Reactions
            </span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              {outcome.plausibleReactions.slice(0, 2).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer: Uncertainty Note & Next Action */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="text-[11px] text-slate-400 mb-2.5 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
          <span>{outcome.uncertaintyNote}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-400 font-medium">Recommended Action:</span>
          <span className="text-white font-semibold text-right ml-2 line-clamp-1">
            {outcome.recommendedNextAction}
          </span>
        </div>
      </div>
    </div>
  );
};
