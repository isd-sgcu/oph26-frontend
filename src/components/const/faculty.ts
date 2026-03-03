export type FacultyType =
  | 'edu'
  | 'psy'
  | 'dent'
  | 'law'
  | 'commarts'
  | 'cbs'
  | 'md'
  | 'pharm'
  | 'polsci'
  | 'sci'
  | 'spsc'
  | 'eng'
  | 'faa'
  | 'econ'
  | 'arch'
  | 'ahs'
  | 'vet'
  | 'arts'
  | 'scii'
  | 'cusar'

export interface FacultyOption {
  value: FacultyType
  variant: 1 | 2 | 4 | 5 | 6
  label: {
    th: string
    en: string
  }
}

export const FACULTIES: FacultyOption[] = [
  {
    value: 'edu',
    variant: 1,
    label: { th: 'คณะครุศาสตร์', en: 'Faculty of Education' },
  },
  {
    value: 'psy',
    variant: 2,
    label: { th: 'คณะจิตวิทยา', en: 'Faculty of Psychology' },
  },
  {
    value: 'dent',
    variant: 4,
    label: { th: 'คณะทันตแพทยศาสตร์', en: 'Faculty of Dentistry' },
  },
  {
    value: 'law',
    variant: 5,
    label: { th: 'คณะนิติศาสตร์', en: 'Faculty of Law' },
  },
  {
    value: 'commarts',
    variant: 6,
    label: { th: 'คณะนิเทศศาสตร์', en: 'Faculty of Communication Arts' },
  },
  {
    value: 'cbs',
    variant: 1,
    label: {
      th: 'คณะพาณิชยศาสตร์และการบัญชี',
      en: 'Faculty of Commerce and Accountancy',
    },
  },
  {
    value: 'md',
    variant: 2,
    label: { th: 'คณะแพทยศาสตร์', en: 'Faculty of Medicine' },
  },
  {
    value: 'pharm',
    variant: 4,
    label: { th: 'คณะเภสัชศาสตร์', en: 'Faculty of Pharmacy' },
  },
  {
    value: 'polsci',
    variant: 5,
    label: { th: 'คณะรัฐศาสตร์', en: 'Faculty of Political Science' },
  },
  {
    value: 'sci',
    variant: 6,
    label: { th: 'คณะวิทยาศาสตร์', en: 'Faculty of Science' },
  },
  {
    value: 'spsc',
    variant: 1,
    label: { th: 'คณะวิทยาศาสตร์การกีฬา', en: 'Faculty of Sports Science' },
  },
  {
    value: 'eng',
    variant: 2,
    label: { th: 'คณะวิศวกรรมศาสตร์', en: 'Faculty of Engineering' },
  },
  {
    value: 'faa',
    variant: 4,
    label: { th: 'คณะศิลปกรรมศาสตร์', en: 'Faculty of Fine and Applied Arts' },
  },
  {
    value: 'econ',
    variant: 5,
    label: { th: 'คณะเศรษฐศาสตร์', en: 'Faculty of Economics' },
  },
  {
    value: 'arch',
    variant: 6,
    label: { th: 'คณะสถาปัตยกรรมศาสตร์', en: 'Faculty of Architecture' },
  },
  {
    value: 'ahs',
    variant: 1,
    label: { th: 'คณะสหเวชศาสตร์', en: 'Faculty of Allied Health Sciences' },
  },
  {
    value: 'vet',
    variant: 2,
    label: { th: 'คณะสัตวแพทยศาสตร์', en: 'Faculty of Veterinary Medicine' },
  },
  {
    value: 'arts',
    variant: 4,
    label: { th: 'คณะอักษรศาสตร์', en: 'Faculty of Arts' },
  },
  {
    value: 'scii',
    variant: 5,
    label: {
      th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)',
      en: 'School of Integrated Innovation (BAScii)',
    },
  },
  {
    value: 'cusar',
    variant: 6,
    label: {
      th: 'สำนักวิชาทรัพยากรการเกษตร',
      en: 'School of Agricultural Resources',
    },
  },
]
