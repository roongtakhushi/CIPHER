export interface TimelineMilestone {
  hour: string;
  title: string;
  desc: string;
}

export const VELORA_HACKATHON_INFO = {
  title: 'VELORA 1.0 — Dare to Compete',
  subtitle: 'A 24-hour national-level hackathon powered by CIPHER x IEEE',
  format: '24-Hour Hackathon',
  teamSize: '2–5 Members',
  finalRoundDate: '11 April 2026',
  registrationsCount: '250+',
  unstopUrl: 'https://unstop.com/p/velora-10-dare-to-compete-24-hour-national-level-hackathon-mit-academy-of-engineering-mitaoe-pune-maharashtra-1659315',
  eventSiteUrl: 'https://velora-cipher.vercel.app/',
  tracks: [
    { name: 'Cybersecurity', color: '#FF334B', desc: 'Offensive defense, zero-trust, cryptography & threat mitigation.' },
    { name: 'Agentic AI / AI-ML', color: '#C6FF3D', desc: 'Autonomous multi-agent swarms, LLM reasoning, neural pipelines.' },
    { name: 'Web3 / Blockchain', color: '#FFD84D', desc: 'Smart contracts, decentralized protocols, DeFi & token engineering.' },
    { name: 'FinTech', color: '#FF4FA3', desc: 'Algorithmic trading, micro-payments, fraud detection & ledger tooling.' },
    { name: 'EdTech', color: '#C6FF3D', desc: 'Adaptive learning environments, gamification & smart campus systems.' },
    { name: 'MedTech', color: '#FF334B', desc: 'Healthcare diagnostics, clinical workflow automation & telemetry.' },
    { name: 'Open Innovation', color: '#FFD84D', desc: 'Radical interdisciplinary solutions addressing grand challenges.' },
  ],
  rounds: [
    {
      round: 'ROUND 1',
      title: 'Submission Stage',
      deadline: '5 April 2026 • 11:59 PM',
      desc: 'Submit a comprehensive PPT deck + 5–6 minute idea presentation video. Evaluation conducted online or offline based on team preference.',
      status: 'PHASE 1',
      accent: '#FFD84D'
    },
    {
      round: 'ROUND 2',
      title: 'The Final Round (24hr Sprint)',
      deadline: '11 April 2026',
      desc: 'Shortlisted teams converge for the high-octane 24-hour in-person hackathon sprint. Build prototypes, test live, and pitch to jury.',
      status: 'FLAGSHIP FINALE',
      accent: '#C6FF3D'
    }
  ]
};

export const VELORA_TIMELINE: TimelineMilestone[] = [
  { hour: '00:00', title: 'HACKATHON KICKOFF', desc: 'Keynote by CIPHER x IEEE, Problem Statements & Architecture Lock' },
  { hour: '06:00', title: 'FIRST COMMITS', desc: 'Repositories Initialized & Core Logic Pipelines Running' },
  { hour: '12:00', title: 'MIDNIGHT MENTOR CHECK', desc: 'Industry Evaluator Triage, Bug Squashing & Red Bull Restock' },
  { hour: '18:00', title: 'INTEGRATION CRUNCH', desc: 'Integration Tests, Docker Containerization & Demo Rehearsals' },
  { hour: '24:00', title: 'JURY EVALUATION', desc: 'Live Prototype Demos, IEEE Benchmarking & Cash Bounty Ceremony' },
];

export interface SupportingEvent {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  format: string;
  duration: string;
  tilt: number;
  tapeColor: 'yellow' | 'pink' | 'lime';
}

export const SUPPORTING_EVENTS: SupportingEvent[] = [
  {
    id: 'round-1',
    category: 'STAGE 01 • SUBMISSION',
    categoryColor: '#FFD84D',
    title: 'ROUND 1: PPT & PRESENTATION',
    description: 'Submit your PPT deck and a 5-6 minute recorded idea presentation by 5 April 2026, 11:59 PM. Online or offline evaluation format.',
    format: 'PPT + 5-6 MIN VIDEO',
    duration: 'DEADLINE: 5 APR 2026',
    tilt: 1.2,
    tapeColor: 'yellow'
  },
  {
    id: 'round-2',
    category: 'STAGE 02 • FINALE',
    categoryColor: '#C6FF3D',
    title: 'ROUND 2: 24HR GRAND FINALE',
    description: '11 April 2026. Top shortlisted teams enter the high-stakes 24-hour hackathon arena powered by CIPHER x IEEE at MITAOE campus.',
    format: '24HR IN-PERSON SPRINT',
    duration: 'DATE: 11 APR 2026',
    tilt: -1.5,
    tapeColor: 'pink'
  },
  {
    id: 'tracks-showcase',
    category: '7 SPECIALIZED TRACKS',
    categoryColor: '#FF4FA3',
    title: 'INNOVATION DOMAINS',
    description: 'Cybersecurity, Agentic AI/AI-ML, Web3 & Blockchain, FinTech, EdTech, MedTech, and Open Innovation. Cash prizes and bounties await.',
    format: 'TEAM SIZE: 2–5',
    duration: '250+ TEAMS COMPETING',
    tilt: 1.6,
    tapeColor: 'lime'
  }
];
