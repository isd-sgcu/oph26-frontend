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
  | 'dorm'

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
  id: FacultyType
  name: string
  majors: Major[]
  imagePath: string
  location: string
}

export interface Major {
  id: string
  name: string
  description: string
  fieldDescription: string
}

export const FACULTY_DATA: Faculty[] = [
  // คณะครุศาสตร์
  {
    id: 'edu',
    name: 'คณะครุศาสตร์',
    majors: [
      {
        id: 'edu1',
        name: 'ภาควิชานโยบาย การจัดการและความเป็นผู้นำทางการศึกษา',
        description:
          'เรียนเกี่ยวกับศาสตร์การพัฒนศึกษา บริหารการศึกษา นิเทศการศึกษา อุดมศึกษา ธุรกิจและอาชีวศึกษา ผลิตผู้สอนที่เน้นความเรืองปัญญาและคุณธรรม สร้าง เข้าร่วม  ชี้นำการเปลี่ยนแปลงในเครือข่ายทางการศึกษาในระดับชาติและนานาชาติ',
        fieldDescription:
          'ภาควิชาประกอบไปด้วย 6 สาขาวิชา ดังนี้ \n1. สาขาวิชาธุรกิจและอาชีวศึกษา\n2. สาขาวิชาพัฒนศึกษา\n3. สาขาวิชาอุดมศึกษา\n4. สาขาวิชาบริหารการศึกษา\n5. สาขาวิชานิเทศการศึกษา\n6. สาขาวิชาภาวะผู้นำการบริหารระบบการศึกษา (หลักสูตรนานาชาติ)',
      },
      {
        id: 'edu2',
        name: 'ภาควิชาหลักสูตรและการสอน',
        description:
          'เรียนเกี่ยวกับองค์ความรู้ และการสร้างนวัตกรรมที่ส่งเสริมหลักสูตรและการสอน ทั้งส่งเสริมให้ชุมชนมีความสัมพันธ์กับผู้เรียน ครู หลักสูตร และพัฒนาการสอน และนวัตกรรมให้ก้าวทันโลก',
        fieldDescription:
          '"ภาควิชาประกอบไปด้วย 9 สาขาวิชา ดังนี้ \n1. สาขาวิชาหลักสูตรและการสอน \n2. สาขาวิชาการศึกษาปฐมวัย\n3. สาขาวิชาประถมศึกษา\n4. สาขาวิชาการสอนภาษาไทย\n5. สาขาวิชาการศึกษาคณิตศาสตร์\n6. สาขาวิชาการศึกษาวิทยาศาสตร์\n7. สาขาวิชาการสอนสังคมศึกษา\n8. สาขาวิชาสุขศึกษาและพลศึกษา\n9. สาขาวิชาการสอนภาษาต่างประเทศ และ Teaching English as a Foreign Language (TEFL)"',
      },
      {
        id: 'edu3',
        name: 'ภาควิชาเทคโนโลยีและสื่อสารการศึกษา',
        description:
          'เรียนเกี่ยวกับการสร้างสรรค์ความรู้ในศาสร์ด้านเทคโนโลยีและสื่อสารการศึกษา บุกเบิกองค์ความรู้ใหม่ และสร้างนวัตกรรมด้านเทคโนโลยีและสื่อสารการศึกษาเพื่อประโยชน์ของสังคมไทยและสังคมโลก',
        fieldDescription: '-',
      },
      {
        id: 'edu4',
        name: 'ภาควิชาศิลปะ ดนตรีและนาฏศิลป์ศึกษา',
        description:
          'เรียนเกี่ยวกับศิลปศึกษาหรือดนตรีศึกษา การสร้างสรรค์การเรียนรู้แนวใหม่ สามารถเชื่อมโยงความรู้เพื่อพัฒนานวัตกรรมทางศิลปศึกษา',
        fieldDescription:
          '"ภาควิชาประกอบไปด้วย 2 สาขาวิชา ดังนี้ \n1. สาขาวิชาศิลปศึกษา\n2. สาขาวิชาดนตรีศึกษา"',
      },
      {
        id: 'edu5',
        name: 'ภาควิชาวิจัยและจิตวิทยาการศึกษา',
        description:
          'เรียนเกี่ยวกับการวิจัย การวัดและประเมินผลการศึกษา สถิติการศึกษา และจิตวิทยาการศึกษา เพื่อตอบสนองต่อการพัฒนานที่ยั่งยืนของประเทศ',
        fieldDescription: '-',
      },
      {
        id: 'edu6',
        name: 'ภาควิชาการศึกษาตลอดชีวิต',
        description:
          'เรียนเกี่ยวกับการศึกษาตลอดชีวิต การศึกษานอกระบบ และการศึกษาตามอัธยาศัย เพื่อให้ก้าวทันความเปลี่ยนแปลงของสังคมไทยและสังคมโลก สร้าง เผยแพร่และประยุกต์องค์ความรู้และงานวิจัย ต่อยอดองค์ความรู้ในระดับคณะ ระดับมหาวิทยาลัย และองค์กรทั้งในประเทศและต่างประเทศ',
        fieldDescription: '-',
      },
    ],
    imagePath: '/faculty/edu.webp',
    location: 'https://maps.app.goo.gl/v38UG7L3eFqTKWfy8',
  },
  // คณะจิตวิทยา
  {
    id: 'psy',
    name: 'คณะจิตวิทยา',
    majors: [
      {
        id: 'psy1',
        name: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาจิตวิทยา (B.Sc. in Psychology)',
        description:
          'เรียนจิตวิทยาในแขนงต่าง ๆ โดยกว้าง เน้นทักษะการคิดวิเคราะห์ แก้ไขปัญหา และค้นหาคำตอบอย่างเป็นวิทยศาสตร์ และการประยุกต์ความรู้จิตวิทยาเข้ากับความรู้อื่น ๆ และชีวิตประจำวัน',
        fieldDescription: '-',
      },
      {
        id: 'psy2',
        name: '*หลักสูตรนานาชาติ* JIPP (Joint International Psychology Program)',
        description:
          'หลักสูตรนานาชาติแบบ 2 ปริญญา หรือ Joint degree ร่วมมือกับ University of Queensland(UQ) ที่ประเทศออสเตรเลีย โดยจะได้รับปริญญาศิลปศาสตรบัณฑิต (สาขาจิตวิทยา) จาก UQ และปริญญาวิทยาศาสตรบัณฑิต (สาขาจิตวิทยา) จากจุฬาลงกรณ์มหาวิทยาลัย',
        fieldDescription: '-',
      },
    ],
    imagePath: '/faculty/psy.webp',
    location: 'https://maps.app.goo.gl/ULZ4goJU4S4iKGQ2A',
  },
  // คณะทันตแพทยศาสตร์
  {
    id: 'dent',
    name: 'คณะทันตแพทยศาสตร์',
    majors: [
      {
        id: 'dent1',
        name: 'หลักสูตรทันตแพทยศาสตรบัณฑิต (ท.บ.)',
        description:
          'หลักสูตร 6 ปีที่มุ่งเน้นให้นิสิตทันตแพทย์มีความรู้และทักษะในวิชาชีพทันตกรรม รวมทั้งศาสตร์ที่เกี่ยวข้องตามข้อกำหนดมาตรฐานวิชาชีพทันตกรรม ค้นคว้าติดตามความก้าวหน้าทางวิชาการและเทคโนโลยี มีคุณธรรม จริยธรรม เพื่อให้บริการการรักษาสุขภาพในช่องปากของประชาชนได้อย่างเหมาะสม',
        fieldDescription: '-',
      },
    ],
    imagePath: '/faculty/dent.webp',
    location: 'https://maps.app.goo.gl/dqZ8HhyHuQKy7ojU8',
  },
  // คณะนิติศาสตร์
  {
    id: 'law',
    name: 'คณะนิติศาสตร์',
    majors: [
      {
        id: 'law1',
        name: 'หลักสูตรนิติศาสตรบัณฑิต (น.บ.)',
        description:
          'เป็นหลักสูตรปริญญาตรีสำหรับผู้สำเร็จการศึกษามัธยมศึกษาปีที่ 6 หรือเทียบเท่า มีการแบ่งสาขาให้นิสิตเลือกเรียนตามความสนใจ 4 สาขา เพื่อให้เกิดความเชี่ยวชาญเฉพาะด้าน ได้แก่ สาขาวิชากฎหมายธุรกิจและภาษีอากร, กฎหมายแพ่งพาณิชย์และอาญา, กฎหมายมหาชน และกฎหมายระหว่างประเทศ',
        fieldDescription:
          '1. สาขาวิชากฎหมายธุรกิจและภาษีอากร\n2. สาขาวิชากฎหมายแพ่งพาณิชย์และอาญา\n3. สาขาวิชากฎหมายมหาชน\n4. สาขาวิชากฎหมายระหว่างประเทศ\n****ทั้งนี้ การเลือกสาขาวิชาดังกล่าวจะดำเนินการเมื่อนิสิตเรียนอยู่ในชั้นปีที่ 3 และลงทะเบียนเรียนในภาคการศึกษาปลาย อนึ่ง เมื่อสำเร็จการศึกษา นิสิตจะได้รับปริญญานิติศาสตรบัณฑิต โดยไม่มีการระบุสาขาไว้ในปริญญาบัตร',
      },
      {
        id: 'law2',
        name: 'Bachelor of Laws, experiential learning in Business and Tech Law (LLBel) (International Program)',
        description:
          'The LLBel Program at Chulalongkorn University equips students with legal, business, and technology expertise through experiential, cross-disciplinary learning. With global faculty, diverse peers, specialization tracks, and real-world practice, graduates are prepared for careers across law, business, and public service.',
        fieldDescription: '-',
      },
      {
        id: 'law3',
        name: 'หลักสูตรนิติศาสตรบัณฑิต ภาคบัณฑิต (น.บ.)',
        description:
          'ต่อยอดจากหลักสูตรนิติศาสตรบัณฑิต หลักสูตรเปิดรับนิสิตจบปริญญาตรี หรือเทียบเท่าในสาขาอื่นที่มิใช่นิติศาสตร์ โดยบัณฑิตที่จบจากหลักสูตรสามารถปฏิบัติงานได้หลากหลาย',
        fieldDescription:
          '"1. สาขาวิชากฎหมายธุรกิจและภาษีอากร \n2. สาขาวิชากฎหมายแพ่งพาณิชย์และอาญา \n3. สาขาวิชากฎหมายมหาชน\n4. สาขาวิชากฎหมายระหว่างประเทศ\n****ทั้งนี้ การเลือกสาขาวิชาดังกล่าวจะดำเนินการเมื่อนิสิตเรียนอยู่ในชั้นปีที่ 3 และลงทะเบียนเรียนในภาคการศึกษาปลาย อนึ่ง เมื่อสำเร็จการศึกษา นิสิตจะได้รับปริญญานิติศาสตรบัณฑิต โดยไม่มีการระบุสาขาไว้ในปริญญาบัตร"',
      },
    ],
    imagePath: '/faculty/law.webp',
    location:
      'https://www.google.com/maps/place/Faculty+of+Law,+Chulalongkorn+University/@13.7354035,100.5258816,17z/data=!3m1!4b1!4m6!3m5!1s0x30e29ed24512a467:0x99830f05cd376eab!8m2!3d13.7354035!4d100.5284565!16s%2Fg%2F122p31p6?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
  },
]
