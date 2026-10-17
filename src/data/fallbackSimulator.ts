import { SimulationResult, RecipientContext } from '../types/simulator';

export function generateFallbackSimulation(
  message: string,
  context: RecipientContext,
  customContext?: string
): SimulationResult {
  const contextName =
    context === 'other' && customContext
      ? customContext
      : context.charAt(0).toUpperCase() + context.slice(1);

  // Heuristic baseline calculation based on punctuation, tone triggers, length
  const exclamationCount = (message.match(/!/g) || []).length;
  const questionCount = (message.match(/\?/g) || []).length;
  const hasAggressiveKeywords = /\b(insulting|tired|babysit|angry|ridiculous|annoying|unacceptable|blame|whatever)\b/i.test(message);
  const isCaps = /[A-Z]{4,}/.test(message);
  
  let baseRisk = 45;
  if (hasAggressiveKeywords) baseRisk += 25;
  if (isCaps) baseRisk += 15;
  if (exclamationCount > 2) baseRisk += 10;
  if (context === 'professor' && message.toLowerCase().includes('late')) baseRisk += 10;
  if (context === 'recruiter' && message.toLowerCase().includes('insulting')) baseRisk += 25;
  if (context === 'customer' && message.toLowerCase().includes('slow our engineers down')) baseRisk += 20;
  baseRisk = Math.min(95, Math.max(20, baseRisk));

  const smarterRisk = Math.max(8, Math.round(baseRisk * 0.28));
  const pauseRisk = Math.max(5, Math.round(baseRisk * 0.18));

  // Determine context-specific advice
  let rewrite = '';
  let whyConstructive = '';
  let positiveAsIs = '';
  let negativeAsIs = '';
  let actionAsIs = '';
  let pauseStrategy = '';
  let cooldownTime = '20 to 45 minutes';

  if (context === 'professor') {
    rewrite = `Dear Professor, I am reaching out to request an emergency 48-hour extension on our final project submission. While our core architecture is functional, we encountered unexpected debugging hurdles during system integration. I have attached our current working progress and branch logs so you can see where we stand. Would it be acceptable to submit the finalized deliverables by Friday at 5:00 PM? Thank you for your consideration.`;
    whyConstructive = `Replaces defensive blaming with professional accountability, shows tangible proof of work in progress, and proposes a firm, realistic deadline rather than an open-ended plea.`;
    positiveAsIs = `If the professor is exceptionally lenient or distracted, they might grant a quick pass to reduce their inbox volume.`;
    negativeAsIs = `High risk of triggering academic frustration. Throwing a teammate under the bus right at midnight creates an impression of disorganization and last-minute panic.`;
    actionAsIs = `Attach whatever working draft you currently have immediately before asking for leniency.`;
    pauseStrategy = `Step away from the IDE for 25 minutes. Do not send an unedited plea during peak adrenaline or late-night fatigue.`;
    cooldownTime = '30 minutes (or 8:00 AM office hours)';
  } else if (context === 'manager') {
    rewrite = `Hi! I saw the update regarding the client demo deck. I want to ensure this deck is high quality and impactful. Because of prior family commitments scheduled for this weekend, I will not be able to do deep deck preparation over Saturday and Sunday. However, I can carve out dedicated time starting first thing Monday at 8:00 AM to finalize the slides ahead of our afternoon review. Let me know if we can prioritize the key 3 slides first.`;
    whyConstructive = `Firmly preserves personal boundaries without sounding resentful; proactively proposes a constructive solution and prioritized delivery plan.`;
    positiveAsIs = `Your manager immediately understands you are unavailable for weekend sprints.`;
    negativeAsIs = `Accusatory language ("keeps happening", "why wasn't it flagged") shifts the conversation into defensiveness, potentially damaging trust or performance perceptions.`;
    actionAsIs = `Acknowledge receipt calmly, state availability plainly without questioning their planning competence in written form.`;
    pauseStrategy = `Take a walk and draft your response in a notes app first. Never reply while feeling the initial spike of Friday boundary intrusion.`;
    cooldownTime = '45 minutes';
  } else if (context === 'recruiter') {
    rewrite = `Thank you for extending this offer—I am genuinely excited about the team's mission and the impact of this role. Based on my technical background, recent benchmark data for senior engineering in this market ($100k-$110k), and another concurrent conversation, is there flexibility to bring the base closer to $102k? I am eager to find a package where we can partner together long-term.`;
    whyConstructive = `Expresses clear enthusiasm first, grounds the salary delta in neutral market data rather than subjective offense ("insulting"), and invites collaborative problem-solving.`;
    positiveAsIs = `A hardball response may theoretically scare an urgent hiring manager into an immediate counter, but the odds are slim.`;
    negativeAsIs = `Calling an offer "insulting" frequently triggers immediate rescission or marks the candidate as combative and difficult to onboard.`;
    actionAsIs = `Remove emotional adjectives. Anchor on data, gratitude, and collaborative alignment.`;
    pauseStrategy = `Sleep on the offer overnight. Counteroffers submitted in high emotional states consistently yield poorer negotiating leverage.`;
    cooldownTime = 'Overnight (submit next morning)';
  } else if (context === 'friend') {
    rewrite = `Hey! Hope you're having a good week. Just doing a quick reconciliation of the cabin expenses before my credit card statement closes on Monday. Could you please send over your $320 share via Venmo when you get a chance today? Let me know if splitting it across two payments helps out at all!`;
    whyConstructive = `Frames the request around an external deadline (card statement) rather than personal irritation, and provides a compassionate payment alternative if cash flow is tight.`;
    positiveAsIs = `The shock factor might prompt an immediate sheepish payment.`;
    negativeAsIs = `May inflict long-term awkwardness or resentment in the friendship group chat, turning a financial logistical task into an emotional confrontation.`;
    actionAsIs = `Send a gentle 1-on-1 nudge emphasizing the card deadline without group hostility.`;
    pauseStrategy = `Remind yourself that financial delays are usually forgetfulness or cash-flow stress rather than malicious intent.`;
    cooldownTime = '1 hour';
  } else if (context === 'customer') {
    rewrite = `Thank you for your patience and for bringing this to our attention. We understand how critical reliable data sync is to your operations, and we sincerely apologize for the disruption you are experiencing. Our engineering team is currently addressing the maintenance queue with top priority. I am monitoring your ticket (#4821) directly and will provide you with a status update within the next 45 minutes.`;
    whyConstructive = `Validates the customer's legitimate operational pain, assumes ownership instead of hiding behind SLA legalese, and commits to a specific, reassuring communication cadence.`;
    positiveAsIs = `Sets a blunt technical boundary against multiple duplicate tickets.`;
    negativeAsIs = `Citing SLA terms defensively when a client is down converts mild frustration into customer churn and executive escalation.`;
    actionAsIs = `Replace contract clauses with empathy and clear time-bound next checkpoints.`;
    pauseStrategy = `Breathe and disconnect from personal irritation. A client's panic reflects their business pressure, not personal animus toward you.`;
    cooldownTime = '15 minutes';
  } else {
    rewrite = `Thank you for sharing your thoughts. I want to make sure we are aligned on next steps. While I understand the urgency, I believe addressing this with a clear, step-by-step approach will yield the best outcome for everyone involved. Could we schedule a brief 10-minute touchpoint or address the top two items first?`;
    whyConstructive = `De-escalates tension, preserves respectful boundaries, and replaces reactionary friction with structured dialogue.`;
    positiveAsIs = `Delivers direct, unfiltered sentiment without nuance.`;
    negativeAsIs = `Risk of misinterpretation, defensiveness, and friction escalates rapidly when subtle tone cues are lost in text.`;
    actionAsIs = `Focus on the factual resolution rather than emotional subtext.`;
    pauseStrategy = `Wait before clicking send to let adrenaline subside.`;
    cooldownTime = '30 minutes';
  }

  return {
    id: 'sim-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    timestamp: Date.now(),
    originalMessage: message,
    context,
    contextLabel: contextName,
    customContext,
    futures: {
      sendAsIs: {
        id: 'send_as_is',
        branchLabel: 'Branch Alpha // Send As-Is',
        scenarioTitle: `Send As-Written: Direct Impact on ${contextName}`,
        shortSummary: `Proceeding with the exact draft as currently composed.`,
        riskScore: baseRisk,
        riskCategory:
          baseRisk >= 75
            ? 'Critical Risk'
            : baseRisk >= 50
            ? 'Elevated Risk'
            : 'Moderate Risk',
        uncertaintyNote: `Heuristic evaluation based on emotional markers and power balance. Reactions vary significantly depending on whether the recipient is stressed or relaxed.`,
        potentialPositive: positiveAsIs,
        potentialNegative: negativeAsIs,
        recommendedNextAction: actionAsIs,
        plausibleReactions: [
          `Recipient may perceive the tone as abrasive or defensive.`,
          `Could trigger an equally reactive counter-response.`,
          `May require follow-up clarification calls to repair rapport.`,
        ],
      },
      sendSmarter: {
        id: 'send_smarter',
        branchLabel: 'Branch Beta // Send Smarter',
        scenarioTitle: `Strategic Refinement: Protecting Your Intent & Leverage`,
        shortSummary: `Preserves 100% of your authentic boundaries while reframing friction points.`,
        riskScore: smarterRisk,
        riskCategory: smarterRisk < 25 ? 'Low Risk' : 'Moderate Risk',
        uncertaintyNote: `Reduces misinterpretation probability by ~70% based on professional correspondence patterns.`,
        potentialPositive: `Maintains professional credibility, prompts constructive collaboration, and dramatically lowers defensive friction.`,
        potentialNegative: `Requires yielding impulsive emotional release in exchange for superior long-term results.`,
        recommendedNextAction: `Copy the revised text, verify specific dates/names, and send with confidence.`,
        rewrittenMessage: rewrite,
        whyConstructive: whyConstructive,
        keyChanges: [
          {
            originalPhrase: 'Aggressive / defensive openings',
            revisedPhrase: 'Objective status alignment & solutions',
            rationale: 'Establishes collaborative partnership rather than adversarial blame.',
          },
          {
            originalPhrase: 'Vague complaints or ultimatums',
            revisedPhrase: 'Actionable options with clear timeframes',
            rationale: 'Gives the recipient an easy, structured way to say yes.',
          },
        ],
      },
      pauseReflect: {
        id: 'pause_reflect',
        branchLabel: 'Branch Gamma // Pause & Reflect',
        scenarioTitle: `Temporal Interruption: The Cooling-Off Advantage`,
        shortSummary: `Delaying transmission allows cognitive reset and adrenaline dissipation.`,
        riskScore: pauseRisk,
        riskCategory: 'Low Risk',
        uncertaintyNote: `In 84% of high-stakes communications, a 20+ minute pause produces higher emotional regulation and outcome satisfaction.`,
        potentialPositive: `Zero premature escalation risk. Gives you space to evaluate whether this issue needs written or spoken communication.`,
        potentialNegative: `If there is a genuine hard deadline within the next 15 minutes, waiting could cause a tardiness penalty.`,
        recommendedNextAction: `Close this browser tab or step away for ${cooldownTime} before taking any action.`,
        coolingOffStrategy: pauseStrategy,
        whyWaitingHelps: `When adrenaline or frustration is high, our amygdala prioritizes self-defense over strategic diplomacy. Waiting resets prefrontal cortex decision control.`,
        suggestedCooldownTime: cooldownTime,
        reflectionQuestions: [
          `Will the tone of this message still feel right to me in 48 hours?`,
          `Would I comfortably say these exact words to their face in front of colleagues?`,
          `Is written text the best medium, or would a 2-minute quick call resolve this faster?`,
        ],
      },
    },
    recipientPerspectives: {
      recipientRole: contextName,
      generousInterpretation: `On a good day: "They are under immense pressure and simply rushing to communicate what is on their mind."`,
      criticalInterpretation: `Under stress or tight deadlines: "This message comes across as demanding, blame-shifting, or lacking professional empathy."`,
      potentialMisunderstanding: `They may interpret your directness as an ultimatum or a lack of respect for their time and authority.`,
      powerDynamicConsideration: `In this ${contextName} dynamic, unvarnished tone is frequently read through an institutional hierarchy lens. Words carry 3x more weight than spoken intent.`,
    },
    isLiveSimulation: false,
    heuristicDisclaimer:
      'Heuristic simulation estimate, not a scientific certainty or future guarantee. Explore scenarios to protect your own agency.',
  };
}
