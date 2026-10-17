import {
  SimulationResult,
  RecipientContext,
  FutureOutcome,
} from '../types/simulator';
import { generateFallbackSimulation } from '../data/fallbackSimulator';

export async function runSimulation(
  message: string,
  context: RecipientContext,
  customContext?: string
): Promise<SimulationResult> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Please enter a message to simulate.');
  }

  try {
    const res = await fetch('/api/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: trimmed,
        context,
        customContext,
      }),
    });

    if (!res.ok) {
      console.warn('Server API returned non-OK status, falling back to local simulation engine');
      return generateFallbackSimulation(trimmed, context, customContext);
    }

    const payload = await res.json();

    if (payload.isLiveSimulation && payload.data) {
      const d = payload.data;
      const contextLabel =
        context === 'other' && customContext
          ? customContext
          : context.charAt(0).toUpperCase() + context.slice(1);

      const sendAsIsOutcome: FutureOutcome = {
        id: 'send_as_is',
        branchLabel: 'Branch Alpha // Send As-Is',
        scenarioTitle: d.sendAsIs.scenarioTitle || 'Send As-Written',
        shortSummary: d.sendAsIs.shortSummary || 'Direct transmission of current draft',
        riskScore: Math.min(100, Math.max(0, d.sendAsIs.riskScore ?? 65)),
        riskCategory: d.sendAsIs.riskCategory || 'Elevated Risk',
        uncertaintyNote:
          d.sendAsIs.uncertaintyNote ||
          'Heuristic estimate based on tone markers and interpersonal dynamics.',
        potentialPositive: d.sendAsIs.potentialPositive,
        potentialNegative: d.sendAsIs.potentialNegative,
        recommendedNextAction: d.sendAsIs.recommendedNextAction,
        plausibleReactions: d.sendAsIs.plausibleReactions || [
          'Direct reaction depending on recipient emotional state',
        ],
      };

      const sendSmarterOutcome: FutureOutcome = {
        id: 'send_smarter',
        branchLabel: 'Branch Beta // Send Smarter',
        scenarioTitle: d.sendSmarter.scenarioTitle || 'Refined Alignment',
        shortSummary: d.sendSmarter.shortSummary || 'Preserving intent while removing friction',
        riskScore: Math.min(100, Math.max(0, d.sendSmarter.riskScore ?? 18)),
        riskCategory: d.sendSmarter.riskCategory || 'Low Risk',
        uncertaintyNote:
          d.sendSmarter.uncertaintyNote ||
          'Heuristic estimate based on de-escalation communication patterns.',
        potentialPositive: d.sendSmarter.potentialPositive,
        potentialNegative: d.sendSmarter.potentialNegative,
        recommendedNextAction: d.sendSmarter.recommendedNextAction,
        rewrittenMessage: d.sendSmarter.rewrittenMessage,
        whyConstructive: d.sendSmarter.whyConstructive,
        keyChanges: d.sendSmarter.keyChanges || [],
      };

      const pauseReflectOutcome: FutureOutcome = {
        id: 'pause_reflect',
        branchLabel: 'Branch Gamma // Pause & Reflect',
        scenarioTitle: d.pauseReflect.scenarioTitle || 'Cooling-Off Strategy',
        shortSummary: d.pauseReflect.shortSummary || 'Temporary transmission delay',
        riskScore: Math.min(100, Math.max(0, d.pauseReflect.riskScore ?? 10)),
        riskCategory: d.pauseReflect.riskCategory || 'Low Risk',
        uncertaintyNote:
          d.pauseReflect.uncertaintyNote ||
          'Heuristic estimate; waiting allows emotional baseline reset.',
        potentialPositive: d.pauseReflect.potentialPositive,
        potentialNegative: d.pauseReflect.potentialNegative,
        recommendedNextAction: d.pauseReflect.recommendedNextAction,
        coolingOffStrategy: d.pauseReflect.coolingOffStrategy,
        whyWaitingHelps: d.pauseReflect.whyWaitingHelps,
        suggestedCooldownTime: d.pauseReflect.suggestedCooldownTime || '30 minutes',
        reflectionQuestions: d.pauseReflect.reflectionQuestions || [],
      };

      return {
        id: 'sim-' + Date.now(),
        timestamp: Date.now(),
        originalMessage: trimmed,
        context,
        contextLabel,
        customContext,
        futures: {
          sendAsIs: sendAsIsOutcome,
          sendSmarter: sendSmarterOutcome,
          pauseReflect: pauseReflectOutcome,
        },
        recipientPerspectives: {
          recipientRole: d.recipientPerspectives.recipientRole || contextLabel,
          generousInterpretation: d.recipientPerspectives.generousInterpretation,
          criticalInterpretation: d.recipientPerspectives.criticalInterpretation,
          potentialMisunderstanding: d.recipientPerspectives.potentialMisunderstanding,
          powerDynamicConsideration: d.recipientPerspectives.powerDynamicConsideration,
        },
        isLiveSimulation: true,
        heuristicDisclaimer:
          'Simulated heuristic scenarios powered by Gemini. These are hypothetical alternatives designed to preserve user agency, not guaranteed predictions.',
      };
    }

    // Server indicated fallback or no live data
    return generateFallbackSimulation(trimmed, context, customContext);
  } catch (err) {
    console.error('Simulation client error, activating fallback generator:', err);
    return generateFallbackSimulation(trimmed, context, customContext);
  }
}
