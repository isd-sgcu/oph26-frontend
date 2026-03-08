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
  abbrLabel: {
    th: string
    en: string
  }
}

export const FACULTIES: FacultyOption[] = [
  {
    value: 'edu',
    variant: 1,
    label: { th: 'คณะครุศาสตร์', en: 'Faculty of Education' },
    abbrLabel: { th: 'ครุ', en: 'EDU' }
  },
  {
    value: 'psy',
    variant: 2,
    label: { th: 'คณะจิตวิทยา', en: 'Faculty of Psychology' },
    abbrLabel: { th: 'จิตวิทยา', en: 'PSY' }
  },
  {
    value: 'dent',
    variant: 4,
    label: { th: 'คณะทันตแพทยศาสตร์', en: 'Faculty of Dentistry' },
    abbrLabel: { th: 'ทันตะ', en: 'DENT' }
  },
  {
    value: 'law',
    variant: 5,
    label: { th: 'คณะนิติศาสตร์', en: 'Faculty of Law' },
    abbrLabel: { th: 'นิติ', en: 'LAW' }
  },
  {
    value: 'commarts',
    variant: 6,
    label: { th: 'คณะนิเทศศาสตร์', en: 'Faculty of Communication Arts' },
    abbrLabel: { th: 'นิเทศ', en: 'COMMARTS' } //--------------------en
  },
  {
    value: 'cbs',
    variant: 1,
    label: {
      th: 'คณะพาณิชยศาสตร์และการบัญชี',
      en: 'Faculty of Commerce and Accountancy',
    },
    abbrLabel: { th: 'บัญชี/บริหาร', en: 'CBS' }
  },
  {
    value: 'md',
    variant: 2,
    label: { th: 'คณะแพทยศาสตร์', en: 'Faculty of Medicine' },
    abbrLabel: { th: 'แพทย์', en: 'MED' }
  },
  {
    value: 'pharm',
    variant: 4,
    label: { th: 'คณะเภสัชศาสตร์', en: 'Faculty of Pharmacy' },
    abbrLabel: { th: 'เภสัช', en: 'PHARM' }
  },
  {
    value: 'polsci',
    variant: 5,
    label: { th: 'คณะรัฐศาสตร์', en: 'Faculty of Political Science' },
    abbrLabel: { th: 'รัฐศาสตร์', en: 'POLSCI' }
  },
  {
    value: 'sci',
    variant: 6,
    label: { th: 'คณะวิทยาศาสตร์', en: 'Faculty of Science' },
    abbrLabel: { th: 'วิทย์', en: 'SCI' }
  },
  {
    value: 'spsc',
    variant: 1,
    label: { th: 'คณะวิทยาศาสตร์การกีฬา', en: 'Faculty of Sports Science' },
    abbrLabel: { th: 'วิทย์กีฬา', en: 'SPSC' }
  },
  {
    value: 'eng',
    variant: 2,
    label: { th: 'คณะวิศวกรรมศาสตร์', en: 'Faculty of Engineering' },
    abbrLabel: { th: 'วิศวะ', en: 'ENG' }
  },
  {
    value: 'faa',
    variant: 4,
    label: { th: 'คณะศิลปกรรมศาสตร์', en: 'Faculty of Fine and Applied Arts' },
    abbrLabel: { th: 'ศิลปกรรม', en: 'FAA' } //------------------th
  },
  {
    value: 'econ',
    variant: 5,
    label: { th: 'คณะเศรษฐศาสตร์', en: 'Faculty of Economics' },
    abbrLabel: { th: 'เศรษฐศาสตร์', en: 'ECON' }
  },
  {
    value: 'arch',
    variant: 6,
    label: { th: 'คณะสถาปัตยกรรมศาสตร์', en: 'Faculty of Architecture' },
    abbrLabel: { th: 'สถาปัตย์', en: 'ARCH' }
  },
  {
    value: 'ahs',
    variant: 1,
    label: { th: 'คณะสหเวชศาสตร์', en: 'Faculty of Allied Health Sciences' },
    abbrLabel: { th: 'สหเวช', en: 'AHS' }
  },
  {
    value: 'vet',
    variant: 2,
    label: { th: 'คณะสัตวแพทยศาสตร์', en: 'Faculty of Veterinary Medicine' },
    abbrLabel: { th: 'สัตวแพทย์', en: 'VET' } //--------------th
  },
  {
    value: 'arts',
    variant: 4,
    label: { th: 'คณะอักษรศาสตร์', en: 'Faculty of Arts' },
    abbrLabel: { th: 'อักษร', en: 'ARTS' }
  },
  {
    value: 'scii',
    variant: 5,
    label: {
      th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)', //-------------
      en: 'School of Integrated Innovation (BAScii)',
    },
    abbrLabel: { th: 'BAScii', en: 'BAScii' }
  },
  {
    value: 'cusar',
    variant: 6,
    label: {
      th: 'สำนักวิชาทรัพยากรการเกษตร',
      en: 'School of Agricultural Resources',
    },
    abbrLabel: { th: 'เกษตร', en: 'CUSAR' }
  },
]

export const FACULTY_MAP: Record<FacultyType, FacultyOption> = Object.fromEntries(
  FACULTIES.map((f) => [f.value, f])
) as Record<FacultyType, FacultyOption>