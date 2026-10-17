export type RecipientContext = 'professor' | 'recruiter' | 'manager' | 'friend' | 'customer' | 'other';

export interface RecipientProfile {
  id: RecipientContext;
  label: string;
  roleDescription: string;
  avatarIcon: string;
  commonBiases: string;
}

export interface FutureOutcome {
  id: 'send_as_is' | 'send_smarter' | 'pause_reflect';
  branchLabel: string;
  scenarioTitle: string;
  shortSummary: string;
  riskScore: number; // 0 to 100 heuristic
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'Critical Risk';
  uncertaintyNote: string;
  potentialPositive: string;
  potentialNegative: string;
  recommendedNextAction: string;
  // Specific fields
  rewrittenMessage?: string;
  whyConstructive?: string;
  keyChanges?: Array<{
    originalPhrase: string;
    revisedPhrase: string;
    rationale: string;
  }>;
  coolingOffStrategy?: string;
  whyWaitingHelps?: string;
  suggestedCooldownTime?: string;
  reflectionQuestions?: string[];
  plausibleReactions?: string[];
}

export interface RecipientPerspectives {
  recipientRole: string;
  generousInterpretation: string;
  criticalInterpretation: string;
  potentialMisunderstanding: string;
  powerDynamicConsideration: string;
}

export interface SimulationResult {
  id: string;
  timestamp: number;
  originalMessage: string;
  context: RecipientContext;
  contextLabel: string;
  customContext?: string;
  futures: {
    sendAsIs: FutureOutcome;
    sendSmarter: FutureOutcome;
    pauseReflect: FutureOutcome;
  };
  recipientPerspectives: RecipientPerspectives;
  isLiveSimulation: boolean;
  heuristicDisclaimer: string;
}

export interface PresetScenario {
  id: string;
  title: string;
  context: RecipientContext;
  description: string;
  message: string;
}
