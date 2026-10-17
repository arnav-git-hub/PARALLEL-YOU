import React from 'react';
import { SimulationResult } from '../types/simulator';
import { Layers, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ComparisonMatrixProps {
  result: SimulationResult;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ result }) => {
  const { sendAsIs, sendSmarter, pauseReflect } = result.futures;

  return (
    <div className="bg-[#090d18] border border-slate-800/80 rounded-2xl p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden">
      <div className="pb-4 border-b border-slate-800/80 flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Parallel Matrix: 3-Way Trajectory Comparison</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Holistic cross-dimensional evaluation of friction, delay, and relational leverage.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3">Dimension</th>
              <th className="py-3 px-3 text-rose-300">Branch 1: Send As-Is</th>
              <th className="py-3 px-3 text-cyan-300">Branch 2: Send Smarter</th>
              <th className="py-3 px-3 text-amber-300">Branch 3: Pause & Reflect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-400">Heuristic Risk Score</td>
              <td className="py-3 px-3 font-mono font-bold text-rose-400">
                {sendAsIs.riskScore}/100 ({sendAsIs.riskCategory})
              </td>
              <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                {sendSmarter.riskScore}/100 ({sendSmarter.riskCategory})
              </td>
              <td className="py-3 px-3 font-mono font-bold text-amber-300">
                {pauseReflect.riskScore}/100 ({pauseReflect.riskCategory})
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-400">Emotional Friction</td>
              <td className="py-3 px-3 text-rose-300">
                High · Puts recipient on immediate defensive footing
              </td>
              <td className="py-3 px-3 text-cyan-300">
                Minimal · Replaces hostility with professional firmness
              </td>
              <td className="py-3 px-3 text-amber-300">
                Zero immediate friction · Dissipates current adrenaline
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-400">Personal Boundary Protection</td>
              <td className="py-3 px-3 text-slate-300">
                Aggressive assertion · High collateral damage
              </td>
              <td className="py-3 px-3 text-emerald-300 font-medium">
                100% Protected · Preserves boundaries diplomatically
              </td>
              <td className="py-3 px-3 text-slate-300">
                Preserved · Postpones boundary statement temporarily
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-400">Time to Resolution</td>
              <td className="py-3 px-3 text-slate-300">
                Immediate send · High probability of lengthy follow-up repair
              </td>
              <td className="py-3 px-3 text-cyan-300">
                Fast resolution · Proactive next steps proposed
              </td>
              <td className="py-3 px-3 text-amber-300">
                Delayed by {pauseReflect.suggestedCooldownTime}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-400">Strategic Next Action</td>
              <td className="py-3 px-3 text-slate-300">
                {sendAsIs.recommendedNextAction}
              </td>
              <td className="py-3 px-3 text-cyan-300 font-medium">
                {sendSmarter.recommendedNextAction}
              </td>
              <td className="py-3 px-3 text-amber-300">
                {pauseReflect.recommendedNextAction}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
