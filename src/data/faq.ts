export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  tags: string[];
  tilt: number;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    number: 'Q1',
    question: 'What is CIPHER?',
    answer: 'CIPHER is the IT Students\' Executive Council of MIT Academy of Engineering (MITAOE), Alandi, Pune. We are focused on building and cultivating a robust technical culture through industry-grade events, national-level hackathons (like Velora 1.0), deep-tech workshops, and campus community initiatives.',
    tags: ['what-is-cipher', 'about', 'council', 'mitaoe', 'executive-council'],
    tilt: 0.3
  },
  {
    id: 'faq-2',
    number: 'Q2',
    question: 'Who can connect with CIPHER?',
    answer: 'Students, mentors, collaborators, and tech communities can connect for event updates, collaborations, mentorship, and participation opportunities. Whether you are an aspiring coder, researcher, or industry partner, our doors are open.',
    tags: ['connect', 'students', 'mentors', 'collaborators', 'community', 'network'],
    tilt: -0.4
  },
  {
    id: 'faq-3',
    number: 'Q3',
    question: 'How can I join CIPHER activities?',
    answer: 'Through open recruitment and event calls announced on our official social channels, and by actively participating in our hackathons, project drives, skill workshops, and collaborative open-source builds.',
    tags: ['join', 'activities', 'membership', 'workshops', 'hackathons', 'drives'],
    tilt: 0.2
  },
  {
    id: 'faq-4',
    number: 'Q4',
    question: 'Where do I get the latest updates?',
    answer: 'Instagram (@ciphermitaoe) is the fastest source for real-time announcements, registrations, and stories. LinkedIn carries our professional highlights, industry collaborations, and key academic and competitive milestones.',
    tags: ['updates', 'instagram', 'linkedin', 'announcements', 'social-media'],
    tilt: -0.3
  },
  {
    id: 'faq-5',
    number: 'Q5',
    question: 'Can we collaborate with CIPHER for events or outreach?',
    answer: 'Yes — CIPHER actively collaborates with student communities, collegiate clubs, alumni mentors, and industry tech partners for co-hosted events, technical masterclasses, hackathon tracks, and outreach initiatives.',
    tags: ['collaboration', 'partnerships', 'industry', 'outreach', 'sponsorship'],
    tilt: 0.4
  }
];
