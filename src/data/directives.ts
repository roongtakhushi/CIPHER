export interface Directive {
  id: string;
  number: string;
  title: string;
  description: string;
  accentColor: string;
}

export const COUNCIL_VISION = {
  quote: "We don't just study technology. We architect the future.",
  visionStatement: "To establish CIPHER as a dynamic and innovative student-driven platform that nurtures technical excellence, leadership, and creativity, empowering students to become future-ready professionals capable of solving real-world challenges.",
  organization: "CIPHER — IT Students' Executive Council",
  institution: "Department of Information Technology, MIT Academy of Engineering (MITAOE), Alandi, Pune"
};

export const DIRECTIVES_DATA: Directive[] = [
  {
    id: 'd-1',
    number: '01',
    title: 'Promote a Culture of Innovation',
    description: 'Promote a culture of innovation through technical, co-curricular, and extracurricular activities that challenge conventional academic boundaries.',
    accentColor: '#C6FF3D'
  },
  {
    id: 'd-2',
    number: '02',
    title: 'Develop Essential Leadership & Ethics',
    description: 'Develop essential skills such as leadership, teamwork, entrepreneurship, and professional ethics among students.',
    accentColor: '#FF4FA3'
  },
  {
    id: 'd-3',
    number: '03',
    title: 'Master Emerging Technologies',
    description: 'Provide opportunities for students to explore emerging technologies and enhance their technical competencies through deep-tech workshops and symposiums.',
    accentColor: '#FFD84D'
  },
  {
    id: 'd-4',
    number: '04',
    title: 'Foster Collaboration & Creativity',
    description: 'Foster collaboration, creativity, and continuous learning within the student community to solve complex real-world challenges.',
    accentColor: '#C6FF3D'
  }
];
