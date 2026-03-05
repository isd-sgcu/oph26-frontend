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
  variant: 1 | 2 | 3 | 4 | 5 | 6
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
    variant: 3,
    label: { th: 'คณะทันตแพทยศาสตร์', en: 'Faculty of Dentistry' },
  },
  {
    value: 'law',
    variant: 4,
    label: { th: 'คณะนิติศาสตร์', en: 'Faculty of Law' },
  },
  {
    value: 'commarts',
    variant: 5,
    label: { th: 'คณะนิเทศศาสตร์', en: 'Faculty of Communication Arts' },
  },
  {
    value: 'cbs',
    variant: 6,
    label: {
      th: 'คณะพาณิชยศาสตร์และการบัญชี',
      en: 'Faculty of Commerce and Accountancy',
    },
  },
  {
    value: 'md',
    variant: 1,
    label: { th: 'คณะแพทยศาสตร์', en: 'Faculty of Medicine' },
  },
  {
    value: 'pharm',
    variant: 2,
    label: { th: 'คณะเภสัชศาสตร์', en: 'Faculty of Pharmacy' },
  },
  {
    value: 'polsci',
    variant: 3,
    label: { th: 'คณะรัฐศาสตร์', en: 'Faculty of Political Science' },
  },
  {
    value: 'sci',
    variant: 4,
    label: { th: 'คณะวิทยาศาสตร์', en: 'Faculty of Science' },
  },
  {
    value: 'spsc',
    variant: 5,
    label: { th: 'คณะวิทยาศาสตร์การกีฬา', en: 'Faculty of Sports Science' },
  },
  {
    value: 'eng',
    variant: 6,
    label: { th: 'คณะวิศวกรรมศาสตร์', en: 'Faculty of Engineering' },
  },
  {
    value: 'faa',
    variant: 1,
    label: { th: 'คณะศิลปกรรมศาสตร์', en: 'Faculty of Fine and Applied Arts' },
  },
  {
    value: 'econ',
    variant: 2,
    label: { th: 'คณะเศรษฐศาสตร์', en: 'Faculty of Economics' },
  },
  {
    value: 'arch',
    variant: 3,
    label: { th: 'คณะสถาปัตยกรรมศาสตร์', en: 'Faculty of Architecture' },
  },
  {
    value: 'ahs',
    variant: 4,
    label: { th: 'คณะสหเวชศาสตร์', en: 'Faculty of Allied Health Sciences' },
  },
  {
    value: 'vet',
    variant: 5,
    label: { th: 'คณะสัตวแพทยศาสตร์', en: 'Faculty of Veterinary Medicine' },
  },
  {
    value: 'arts',
    variant: 6,
    label: { th: 'คณะอักษรศาสตร์', en: 'Faculty of Arts' },
  },
  {
    value: 'scii',
    variant: 1,
    label: {
      th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)',
      en: 'School of Integrated Innovation (BAScii)',
    },
  },
  {
    value: 'cusar',
    variant: 2,
    label: {
      th: 'สำนักวิชาทรัพยากรการเกษตร',
      en: 'School of Agricultural Resources',
    },
  },
]

export interface Faculty {
  id: string
  name: string
  majors: Major[]
  imagePath?: string
}

export interface Major {
  id: string
  name: string
  description: string
  fieldDescription: string
  location: string
}

export const FACULTY_DATA: Faculty[] = []
