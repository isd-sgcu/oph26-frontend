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
  label: {
    th: string
    en: string
  }
}

export const FACULTIES: FacultyOption[] = [
  { value: 'edu', label: { th: 'คณะครุศาสตร์', en: 'Faculty of Education' } },
  { value: 'psy', label: { th: 'คณะจิตวิทยา', en: 'Faculty of Psychology' } },
  {
    value: 'dent',
    label: { th: 'คณะทันตแพทยศาสตร์', en: 'Faculty of Dentistry' },
  },
  { value: 'law', label: { th: 'คณะนิติศาสตร์', en: 'Faculty of Law' } },
  {
    value: 'commarts',
    label: { th: 'คณะนิเทศศาสตร์', en: 'Faculty of Communication Arts' },
  },
  {
    value: 'cbs',
    label: {
      th: 'คณะพาณิชยศาสตร์และการบัญชี',
      en: 'Faculty of Commerce and Accountancy',
    },
  },
  { value: 'md', label: { th: 'คณะแพทยศาสตร์', en: 'Faculty of Medicine' } },
  {
    value: 'pharm',
    label: { th: 'คณะเภสัชศาสตร์', en: 'Faculty of Pharmacy' },
  },
  {
    value: 'polsci',
    label: { th: 'คณะรัฐศาสตร์', en: 'Faculty of Political Science' },
  },
  { value: 'sci', label: { th: 'คณะวิทยาศาสตร์', en: 'Faculty of Science' } },
  {
    value: 'spsc',
    label: { th: 'คณะวิทยาศาสตร์การกีฬา', en: 'Faculty of Sports Science' },
  },
  {
    value: 'eng',
    label: { th: 'คณะวิศวกรรมศาสตร์', en: 'Faculty of Engineering' },
  },
  {
    value: 'faa',
    label: { th: 'คณะศิลปกรรมศาสตร์', en: 'Faculty of Fine and Applied Arts' },
  },
  {
    value: 'econ',
    label: { th: 'คณะเศรษฐศาสตร์', en: 'Faculty of Economics' },
  },
  {
    value: 'arch',
    label: { th: 'คณะสถาปัตยกรรมศาสตร์', en: 'Faculty of Architecture' },
  },
  {
    value: 'ahs',
    label: { th: 'คณะสหเวชศาสตร์', en: 'Faculty of Allied Health Sciences' },
  },
  {
    value: 'vet',
    label: { th: 'คณะสัตวแพทยศาสตร์', en: 'Faculty of Veterinary Medicine' },
  },
  { value: 'arts', label: { th: 'คณะอักษรศาสตร์', en: 'Faculty of Arts' } },
  {
    value: 'scii',
    label: {
      th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)',
      en: 'School of Integrated Innovation (BAScii)',
    },
  },
  {
    value: 'cusar',
    label: {
      th: 'สำนักวิชาทรัพยากรการเกษตร',
      en: 'School of Agricultural Resources',
    },
  },
]
