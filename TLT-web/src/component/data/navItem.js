export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Study Essentials', 
    href: '/study-essentials',
    subItems: [
      { name: 'Paid', href: '/study-Essentials' },
      { name: 'Unpaid', href: '/unpaid-study-essentials' },
      { name: 'Syllabus', href: '/syllabus' }
    ]
  },
  { name: 'Gallery', href: '/gallery' },
  { 
    name: 'Previous Year Paper', 
    href: '/previous-year'
  },
  { 
    name: 'Mock Test', 
    href: '',
    subItems: [
      { name: 'Subject Test', href: 'mockTest/subjectTest' },
      { name: 'Mini Mock', href: 'leaderboard' }
    ]
  },
  { 
    name: 'Register In', 
    href: '',
    subItems: [
      { name: 'Empowerment Batch', href: '/empowerment' },
      { name: 'Fast Track Batch', href: '/fastTrack' },
      { name: 'JET', href: 'jet/personalInfo' }
    ]
  }
];
