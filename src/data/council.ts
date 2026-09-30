export interface Operative {
  id: string;
  code: string;
  name: string;
  role: string;
  departmentCategory: 'exec' | 'tech' | 'ops' | 'design';
  badge?: string;
  badgeColor?: string;
  status: string;
  quote: string;
  tilt: number;
  tapeColor: 'yellow' | 'pink' | 'lime';
  pinColor: string;
}

export const OPERATIVES_DATA: Operative[] = [
  {
    id: 'op-1',
    code: 'EXEC-01',
    name: 'Mayank Dantre',
    role: 'PRESIDENT',
    departmentCategory: 'exec',
    badge: 'COUNCIL HEAD',
    badgeColor: '#FFD84D',
    status: 'EXECUTIVE LEAD',
    quote: '"Architecting the future, empowering student builders."',
    tilt: 1.2,
    tapeColor: 'yellow',
    pinColor: '#FF334B'
  },
  {
    id: 'op-2',
    code: 'EXEC-02',
    name: 'Neha Hidduggi',
    role: 'SECRETARY',
    departmentCategory: 'exec',
    badge: 'SECRETARIAT',
    badgeColor: '#C6FF3D',
    status: 'OPERATIONAL GOVERNANCE',
    quote: '"Precision documentation, seamless council operations."',
    tilt: -1.6,
    tapeColor: 'pink',
    pinColor: '#0A0E17'
  },
  {
    id: 'op-3',
    code: 'EXEC-03',
    name: 'Ashitosh Waghmare',
    role: 'TREASURER',
    departmentCategory: 'exec',
    badge: 'FINANCE',
    badgeColor: '#FF4FA3',
    status: 'FISCAL ARCHITECT',
    quote: '"Fueling innovation, budgeting high-octane student hackathons."',
    tilt: 1.5,
    tapeColor: 'lime',
    pinColor: '#FFD84D'
  },
  {
    id: 'op-4',
    code: 'TECH-01',
    name: 'Zaki Shahpure',
    role: 'TECH LEAD',
    departmentCategory: 'tech',
    badge: 'ROOT ACCESS',
    badgeColor: '#FF4FA3',
    status: 'SYSTEMS & DEEP TECH',
    quote: '"Code speaks louder than credentials. Shipping at 3 AM."',
    tilt: -1.2,
    tapeColor: 'yellow',
    pinColor: '#C6FF3D'
  },
  {
    id: 'op-5',
    code: 'MGMT-01',
    name: 'Hardavi Mangar',
    role: 'MANAGEMENT LEAD',
    departmentCategory: 'ops',
    badge: 'DIRECTOR',
    badgeColor: '#FFD84D',
    status: 'STRATEGIC LOGISTICS',
    quote: '"Orchestrating 24-hour sprints with surgical precision."',
    tilt: 1.4,
    tapeColor: 'pink',
    pinColor: '#FF334B'
  },
  {
    id: 'op-6',
    code: 'PR-01',
    name: 'Payal Desale',
    role: 'PR LEAD',
    departmentCategory: 'ops',
    badge: 'OUTREACH',
    badgeColor: '#C6FF3D',
    status: 'PUBLIC RELATIONS',
    quote: '"Connecting student engineers with global tech networks."',
    tilt: -1.4,
    tapeColor: 'yellow',
    pinColor: '#0A0E17'
  },
  {
    id: 'op-7',
    code: 'DSGN-01',
    name: 'Shreya Dhamankar',
    role: 'DESIGN LEAD',
    departmentCategory: 'design',
    badge: 'CREATIVE',
    badgeColor: '#FF4FA3',
    status: 'UI/UX & IDENTITY',
    quote: '"Crafting artsy, human-first visual identities for tech."',
    tilt: 1.8,
    tapeColor: 'lime',
    pinColor: '#FFD84D'
  },
  {
    id: 'op-8',
    code: 'SOC-01',
    name: 'Yash Deshpande',
    role: 'SOCIAL MEDIA LEAD',
    departmentCategory: 'ops',
    badge: 'MEDIA',
    badgeColor: '#FFD84D',
    status: 'DIGITAL BROADCAST',
    quote: '"Amplifying breakthroughs and hackathon community momentum."',
    tilt: -1.5,
    tapeColor: 'pink',
    pinColor: '#FF334B'
  },
  {
    id: 'op-9',
    code: 'SPRT-01',
    name: 'Karunya',
    role: 'SPORT LEAD',
    departmentCategory: 'ops',
    badge: 'STAMINA',
    badgeColor: '#C6FF3D',
    status: 'CAMPUS AGILITY',
    quote: '"Endurance on the field, resilience at the terminal."',
    tilt: 1.1,
    tapeColor: 'yellow',
    pinColor: '#0A0E17'
  }
];
