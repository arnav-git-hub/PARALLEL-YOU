import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  HeartHandshake,
  Users,
  Sparkles,
  Zap,
  Trash2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { RecipientContext, PresetScenario } from '../types/simulator';
import { PRESET_SCENARIOS } from '../data/presetScenarios';

interface MessageInputCardProps {
  message: string;
  setMessage: (msg: string) => void;
  context: RecipientContext;
  setContext: (ctx: RecipientContext) => void;
  customContext: string;
  setCustomContext: (text: string) => void;
  isSimulating: boolean;
  onSimulate: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
}

const CONTEXT_OPTIONS: Array<{
  id: RecipientContext;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'professor',
    label: 'Professor',
    subtitle: 'Academic deadlines & grades',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'manager',
    label: 'Manager',
    subtitle: 'Scope, burnout & deadlines',
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    subtitle: 'Offers, leverage & follow-ups',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 'friend',
    label: 'Friend',
    subtitle: 'Money, boundaries & group chat',
    icon: <HeartHandshake className="w-4 h-4" />,
  },
  {
    id: 'customer',
    label: 'Customer',
    subtitle: 'Churn risk, escalations & SLAs',
    icon: <Users className="w-4 h-4" />,
  },
];

export const MessageInputCard: React.FC<MessageInputCardProps> = ({
  message,
  setMessage,
  context,
  setContext,
  customContext,
  setCustomContext,
  isSimulating,
  onSimulate,
  onSelectPreset,
}) => {
  const [showCustomContext, setShowCustomContext] = useState(context === 'other');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPresetId(preset.id);
    onSelectPreset(preset);
  };

  const charCount = message.length;
  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-[#0b0f19] border border-slate-800/90 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background ambient glow lines */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Preset Demos Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instant Demo Scenarios</span>
          </label>
          <span className="text-[11px] text-slate-500">Pick a dilemma to test immediately</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-violet-950/40 border-violet-500/60 text-white shadow-sm shadow-violet-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="font-medium truncate w-full group-hover:text-cyan-300 transition-colors">
                  {preset.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 capitalize flex items-center justify-between w-full">
                  <span>{preset.context}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Selection Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Recipient Lens (Who are you sending this to?)
          </label>
          <button
            type="button"
            onClick={() => {
              setShowCustomContext(!showCustomContext);
              if (!showCustomContext) setContext('other');
            }}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
          >
            {showCustomContext ? 'Hide Custom Role' : '+ Custom recipient role'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {CONTEXT_OPTIONS.map((opt) => {
            const active = context === opt.id && !showCustomContext;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setContext(opt.id);
                  setShowCustomContext(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                  active
                    ? 'bg-gradient-to-r from-violet-950/70 to-indigo-950/70 border-violet-500/70 text-white shadow-md shadow-violet-950/50'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    active ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {opt.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate leading-none">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">{opt.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {showCustomContext && (
          <div className="mt-3 p-3 bg-slate-900/80 border border-violet-500/40 rounded-xl flex items-center gap-3">
            <span className="text-xs text-violet-300 font-medium whitespace-nowrap">
              Custom Recipient Role:
            </span>
            <input
              type="text"
              value={customContext}
              onChange={(e) => {
                setCustomContext(e.target.value);
                setContext('other');
              }}
              placeholder="e.g., Venture Capitalist, Landlord, Estranged Co-founder..."
              className="w-full bg-[#07090e] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}
      </div>

      {/* Message Textarea */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="message-draft" className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Your Raw Draft Message
          </label>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>{wordCount} words</span>
            <span aria-hidden="true">·</span>
            <span>{charCount} characters</span>
            {message && (
              <button
                type="button"
                onClick={() => {
                  setMessage('');
                  setSelectedPresetId(null);
                }}
                className="text-slate-500 hover:text-rose-400 transition-colors ml-1 p-0.5"
                title="Clear draft"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <textarea
          id="message-draft"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Paste or write the sensitive message you are hesitating to send... (e.g. asking for an extension, demanding a refund, pushing back on scope, or salary negotiation)"
          className="w-full bg-[#080b13] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-all font-sans leading-relaxed resize-y"
        />
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Branch analysis computes 3 parallel consequences before transmission</span>
        </div>

        <button
          type="button"
          onClick={onSimulate}
          disabled={isSimulating || !message.trim()}
          className={`w-full sm:w-auto px-7 py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg ${
            isSimulating || !message.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
              : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white hover:shadow-violet-500/30 hover:scale-[1.01] active:scale-[0.99] border border-violet-400/30'
          }`}
        >
          {isSimulating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Simulating Alternate Futures...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
              <span>Simulate My Futures</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
