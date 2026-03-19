import { FacultyType } from '@/components/const/faculty'

export function getFacultyLabel(faculty: FacultyType): {
  th: string
  en: string
} {
  switch (faculty) {
    case 'edu':
      return { th: 'คณะครุศาสตร์', en: 'Faculty of Education' }
    case 'psy':
      return { th: 'คณะจิตวิทยา', en: 'Faculty of Psychology' }
    case 'dent':
      return { th: 'คณะทันตแพทยศาสตร์', en: 'Faculty of Dentistry' }
    case 'law':
      return { th: 'คณะนิติศาสตร์', en: 'Faculty of Law' }
    case 'commarts':
      return { th: 'คณะนิเทศศาสตร์', en: 'Faculty of Communication Arts' }
    case 'cbs':
      return {
        th: 'คณะพาณิชยศาสตร์และการบัญชี',
        en: 'Faculty of Commerce and Accountancy',
      }
    case 'md':
      return { th: 'คณะแพทยศาสตร์', en: 'Faculty of Medicine' }
    case 'pharm':
      return { th: 'คณะเภสัชศาสตร์', en: 'Faculty of Pharmacy' }
    case 'polsci':
      return { th: 'คณะรัฐศาสตร์', en: 'Faculty of Political Science' }
    case 'sci':
      return { th: 'คณะวิทยาศาสตร์', en: 'Faculty of Science' }
    case 'spsc':
      return { th: 'คณะวิทยาศาสตร์การกีฬา', en: 'Faculty of Sports Science' }
    case 'eng':
      return { th: 'คณะวิศวกรรมศาสตร์', en: 'Faculty of Engineering' }
    case 'faa':
      return { th: 'คณะศิลปกรรมศาสตร์', en: 'Faculty of Fine and Applied Arts' }
    case 'econ':
      return { th: 'คณะเศรษฐศาสตร์', en: 'Faculty of Economics' }
    case 'arch':
      return { th: 'คณะสถาปัตยกรรมศาสตร์', en: 'Faculty of Architecture' }
    case 'ahs':
      return { th: 'คณะสหเวชศาสตร์', en: 'Faculty of Allied Health Sciences' }
    case 'vet':
      return { th: 'คณะสัตวแพทยศาสตร์', en: 'Faculty of Veterinary Science' }
    case 'arts':
      return { th: 'คณะอักษรศาสตร์', en: 'Faculty of Arts' }
    case 'scii':
      return {
        th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)',
        en: 'School of Integrated Innovation (BAScii)',
      }
    case 'cusar':
      return {
        th: 'สำนักวิชาทรัพยากรการเกษตร',
        en: 'School of Agricultural Resources',
      }
    case 'dorm':
      return { th: 'หอพักนิสิต', en: 'Student Dormitory' }
    default:
      return { th: '', en: '' }
  }
}
