/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  Sparkles,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Layers,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';
import { Header } from './components/Header';
import { MessageInputCard } from './components/MessageInputCard';
import { BranchingTimeline } from './components/BranchingTimeline';
import { OutcomeCard } from './components/OutcomeCard';
import { RegretReplay } from './components/RegretReplay';
import { TheOtherSide } from './components/TheOtherSide';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { HistoryDrawer } from './components/HistoryDrawer';
import { HeuristicModal } from './components/HeuristicModal';
import {
  RecipientContext,
  SimulationResult,
  PresetScenario,
} from './types/simulator';
import { runSimulation } from './services/simulationService';
import { PRESET_SCENARIOS } from './data/presetScenarios';

const LOCAL_STORAGE_KEY = 'parallel_you_vault_v1';

export default function App() {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState<RecipientContext>('manager');
  const [customContext, setCustomContext] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active view states
  const [activeBranchId, setActiveBranchId] = useState<
    'send_as_is' | 'send_smarter' | 'pause_reflect' | 'all'
  >('all');
  const [activeTabSection, setActiveTabSection] = useState<'timeline' | 'replay' | 'otherside' | 'matrix'>(
    'timeline'
  );

  // Vault & Modals
  const [savedSimulations, setSavedSimulations] = useState<SimulationResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Load vault from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedSimulations(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load local history', e);
    }
  }, []);

  // Save vault to localStorage
  const saveSimulationToVault = (sim: SimulationResult) => {
    setSavedSimulations((prev) => {
      const exists = prev.some((item) => item.id === sim.id);
      if (exists) return prev;
      const updated = [sim, ...prev].slice(0, 30);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  const deleteSimulationFromVault = (id: string) => {
    setSavedSimulations((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to delete from localStorage', e);
      }
      return updated;
    });
  };

  const clearAllVault = () => {
    setSavedSimulations([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Handlers
  const handleSimulate = async () => {
    if (!message.trim()) return;
    setIsSimulating(true);
    setErrorMsg(null);

    try {
      const result = await runSimulation(message, context, customContext);
      setSimulationResult(result);
      setActiveBranchId('all');
      setActiveTabSection('timeline');
    } catch (err: any) {
      setErrorMsg(err.message || 'Simulation encountered an unexpected issue.');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setMessage(preset.message);
    setContext(preset.context);
    setCustomContext('');
    setErrorMsg(null);
  };

  const handleReset = () => {
    setMessage('');
    setSimulationResult(null);
    setErrorMsg(null);
    setActiveBranchId('all');
    setActiveTabSection('timeline');
  };

  const isCurrentSaved = simulationResult
    ? savedSimulations.some((item) => item.id === simulationResult.id)
    : false;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-violet-600/30 selection:text-violet-200">
      {/* App Header */}
      <Header
        onReset={handleReset}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        historyCount={savedSimulations.length}
        hasActiveResult={!!simulationResult}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 text-xs font-mono tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>AI Decision Simulator & Heuristic Sandbox</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            One message.{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Three futures.
            </span>{' '}
            Choose yours.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Explore the possible consequences before you press send.
          </p>
        </div>

        {/* Input Card */}
        <section aria-label="Message Input and Context Configuration">
          <MessageInputCard
            message={message}
            setMessage={setMessage}
            context={context}
            setContext={setContext}
            customContext={customContext}
            setCustomContext={setCustomContext}
            isSimulating={isSimulating}
            onSimulate={handleSimulate}
            onSelectPreset={handleSelectPreset}
          />
        </section>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <div className="flex-1">{errorMsg}</div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-rose-400 hover:text-white text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Simulation Output Section */}
        {simulationResult && (
          <div className="space-y-6 pt-4 animate-in fade-in duration-500">
            {/* Status & Heuristic Disclaimer Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white">
                  Trajectory Simulation Generated for {simulationResult.contextLabel}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">
                  {simulationResult.isLiveSimulation
                    ? 'Generated via Gemini Engine'
                    : 'Generated via Calibrated Heuristic Engine'}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Heuristic estimate · Not deterministic probability</span>
              </div>
            </div>

            {/* Navigation Tabs for Analysis Modes */}
            <div className="flex items-center gap-1 p-1.5 bg-[#090d18] border border-slate-800 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTabSection('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTabSection === 'timeline'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Future Simulator (Branching Paths)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabSection('replay')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTabSection === 'replay'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Regret Replay (Diff & Copy)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabSection('otherside')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTabSection === 'otherside'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-300" />
                <span>The Other Side (Recipient Lens)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabSection('matrix')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTabSection === 'matrix'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-300" />
                <span>Parallel Matrix</span>
              </button>
            </div>

            {/* Tab 1: Branching Timeline & Detailed Cards */}
            {activeTabSection === 'timeline' && (
              <div className="space-y-6">
                <BranchingTimeline
                  result={simulationResult}
                  activeBranchId={activeBranchId}
                  setActiveBranchId={setActiveBranchId}
                />

                {/* 3 Outcome Cards Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      {activeBranchId === 'all'
                        ? 'Detailed Outcome Breakdown (3 Parallel Futures)'
                        : `Focused Branch: ${
                            activeBranchId === 'send_as_is'
                              ? 'Send As-Is'
                              : activeBranchId === 'send_smarter'
                              ? 'Send Smarter'
                              : 'Pause & Reflect'
                          }`}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Evaluated across risk, positive upside, negative downside, & next action
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {(activeBranchId === 'all' || activeBranchId === 'send_as_is') && (
                      <div className={activeBranchId !== 'all' ? 'md:col-span-3' : ''}>
                        <OutcomeCard
                          outcome={simulationResult.futures.sendAsIs}
                          contextLabel={simulationResult.contextLabel}
                          isFocused={activeBranchId === 'send_as_is'}
                        />
                      </div>
                    )}

                    {(activeBranchId === 'all' || activeBranchId === 'send_smarter') && (
                      <div className={activeBranchId !== 'all' ? 'md:col-span-3' : ''}>
                        <OutcomeCard
                          outcome={simulationResult.futures.sendSmarter}
                          contextLabel={simulationResult.contextLabel}
                          isFocused={activeBranchId === 'send_smarter'}
                        />
                      </div>
                    )}

                    {(activeBranchId === 'all' || activeBranchId === 'pause_reflect') && (
                      <div className={activeBranchId !== 'all' ? 'md:col-span-3' : ''}>
                        <OutcomeCard
                          outcome={simulationResult.futures.pauseReflect}
                          contextLabel={simulationResult.contextLabel}
                          isFocused={activeBranchId === 'pause_reflect'}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick bridge to Regret Replay */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Ready to refine your message?</strong> Inspect phrase-by-phrase changes or copy the polished alternative in Regret Replay.
                  </div>
                  <button
                    onClick={() => setActiveTabSection('replay')}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Open Regret Replay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Regret Replay */}
            {activeTabSection === 'replay' && (
              <RegretReplay
                result={simulationResult}
                onSaveToVault={() => saveSimulationToVault(simulationResult)}
                isSaved={isCurrentSaved}
              />
            )}

            {/* Tab 3: The Other Side */}
            {activeTabSection === 'otherside' && (
              <TheOtherSide
                perspectives={simulationResult.recipientPerspectives}
                contextLabel={simulationResult.contextLabel}
              />
            )}

            {/* Tab 4: Parallel Matrix */}
            {activeTabSection === 'matrix' && (
              <ComparisonMatrix result={simulationResult} />
            )}
          </div>
        )}

        {/* Informational Zero-State Feature Cards when no simulation has been run yet */}
        {!simulationResult && (
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-violet-400 font-semibold mb-1 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>1. Future Simulator</span>
              </div>
              <p>
                Calculates three diverging outcomes before you hit enter: direct transmission, strategic reframe, or cooling-off postponement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>2. Regret Replay</span>
              </div>
              <p>
                Side-by-side diff highlighting changed phrasing. Preserves your authentic intent and boundaries while removing destructive triggers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>3. The Other Side</span>
              </div>
              <p>
                Reveals how the recipient reads your words under cognitive stress, time pressure, and institutional power dynamics.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090e] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">BEFORE YOU CLICK: PARALLEL YOU</span>
            <span>·</span>
            <span>Exploratory Decision Sandbox</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Heuristic consequence modeling · Preserves human agency & confidentiality
          </div>
        </div>
      </footer>

      {/* Vault History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedSimulations={savedSimulations}
        onLoadSimulation={(sim) => {
          setSimulationResult(sim);
          setMessage(sim.originalMessage);
          setContext(sim.context);
          if (sim.customContext) setCustomContext(sim.customContext);
          setActiveTabSection('timeline');
        }}
        onDeleteSimulation={deleteSimulationFromVault}
        onClearAll={clearAllVault}
      />

      {/* About & Heuristic Framework Modal */}
      <HeuristicModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
