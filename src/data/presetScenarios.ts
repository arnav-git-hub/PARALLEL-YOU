import { PresetScenario } from '../types/simulator';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'professor-extension',
    title: 'Late Night Extension Request',
    context: 'professor',
    description: 'Asking for 48 more hours at 11:42 PM the night before the final project is due.',
    message: "Hey Prof Miller, I know this is super late and the rubric says strict deadlines, but my code has some weird bugs and my group member didn't do their half of the writeup. Can I get an extension until Friday? If not I'll just turn in whatever runs.",
  },
  {
    id: 'manager-weekend-scope',
    title: 'Pushing Back on Weekend Work',
    context: 'manager',
    description: 'Responding to a Friday 6:30 PM Slack asking for an unexpected weekend demo deck.',
    message: "I saw your ping about the demo deck. Honestly I already have plans this entire weekend with family that I can't cancel. I feel like this keeps happening right before Friday cutoff. If this was top priority why wasn't it flagged during sprint planning on Tuesday?",
  },
  {
    id: 'recruiter-counteroffer',
    title: 'Following Up on Low Offer',
    context: 'recruiter',
    description: 'Countering an offer letter that came in 18% below your target band.',
    message: "Thanks for the offer letter. However, $85k is pretty insulting considering market rate for this role is at least $105k and I have another final round interview next week. Can you match $105k or is this non-negotiable? Otherwise I don't think it makes sense to continue.",
  },
  {
    id: 'friend-unpaid-trip',
    title: 'Splitting Unpaid Group Trip Costs',
    context: 'friend',
    description: 'Following up for the third time on an unpaid $320 Airbnb share from 2 weeks ago.',
    message: "Dude, are you ever going to Venmo me for the cabin trip? It's been over two weeks and everyone else paid instantly. My card bill is due on Monday and I'm tired of having to babysit this.",
  },
  {
    id: 'customer-angry-bug',
    title: 'De-escalating Angry Customer',
    context: 'customer',
    description: 'Replying to an angry customer threatening to churn over a platform sync delay.',
    message: "Look, as stated in section 4 of the SLA, data syncs can experience standard propagation delays during maintenance windows. We are working on it as fast as we can, so submitting multiple angry support tickets will only slow our engineers down.",
  },
];
