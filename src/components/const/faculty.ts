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
    imagePath: '/info/faculty/edu.webp',
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
    imagePath: '/info/faculty/psy.webp',
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
    imagePath: '/info/faculty/dent.webp',
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
    imagePath: '/info/faculty/law.webp',
    location:
      'https://www.google.com/maps/place/Faculty+of+Law,+Chulalongkorn+University/@13.7354035,100.5258816,17z/data=!3m1!4b1!4m6!3m5!1s0x30e29ed24512a467:0x99830f05cd376eab!8m2!3d13.7354035!4d100.5284565!16s%2Fg%2F122p31p6?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
  },
  // คณะนิเทศศาสตร์
  {
    id: 'commarts',
    name: 'คณะนิเทศศาสตร์',
    majors: [
      {
        id: 'commarts1',
        name: 'ภาควิชาการประชาสัมพันธ์ (Public Relations)',
        description:
          'แบ่งออกเป็น 2 สาขาวิชา ได้แก่ การประชาสัมพันธ์ (Public Rlations) เเละการโฆษณาเเละการสื่อสารตราสินค้า (Advertising and Brand communications)',
        fieldDescription:
          '1. การประชาสัมพันธ์ (Public Relations) เรียนเกี่ยวกับทฤษฎี หลักการ และการปฏิบัติงานทางการประชาสัมพันธ์โดยทั่วไป และการประชาสัมพันธ์เพื่อส่งเสริมการตลาด แผนการประชาสัมพันธ์ การโน้มน้าวใจ การสร้างประชามติเพื่อประโยชน์ในงานสื่อสารสาธารณะ\n2. การโฆษณาและการสื่อสารตราสินค้า (Advertising and Brand Communications) เรียนเกี่ยวกับหลักการแนวคิดเกี่ยวกับการโฆษณา การสื่อสารการตลาดเชิงดิจิทัล พฤติกรรมผู้บริโภค การวางแผนสื่อ การรณรงค์ทางการโฆษณา การเขียนบทโฆษณา ภาพลักษณ์และชื่อเสียงองค์กรและตราสินค้า',
      },
      {
        id: 'commarts2',
        name: 'ภาควิชาการสื่อสารมวลชน (Mass Communication)',
        description:
          'เรียนภูมิทัศน์สื่อยุคปัจจุบัน แนวคิดทฤษฎีทางด้านสื่อสารมวลชน หลักการปฏิบัติด้านการออกแบบและผลิตสื่อ ความเข้าใจด้านสื่อมวลชนกับสังคมและวัฒนธรรม เน้นการเสริมสร้างการเรียนรู้ควบคู่ไปกับการปฏิบัติ บนพื้นฐานความรับผิดชอบต่อสังคม',
        fieldDescription:
          'การออกแบบและผลิตสื่อ (Media Design and Production) เรียนเกี่ยวกับแนวคิดสื่อสารศิลป์ กระบวนการออกแบบและผลิตสื่อบนจอ (On-screen Media) และสื่อเสียง (Audio Media)',
      },
      {
        id: 'commarts3',
        name: 'ภาควิชาวารสารสนเทศ (Journalism)',
        description:
          'มุ่งเน้นด้านวิทยาการข่าวสาร สื่อสิ่งพิมพ์ และสื่อสารสนเทศ ซึ่งครอบคลุมการแสวงหาข้อมูลข่าวสาร สืบค้นข้อเท็จจริง การเขียน การวิเคราะห์ และสื่อสาร ตลอดจนการจัดการและการผลิตสื่อสิ่งพิมพ์และการผลิตข้อมูลบนแพลตฟอร์มออนไลน์ทุกประเภท',
        fieldDescription:
          'วารสารสนเทศและสื่อใหม่ (Journalism, Information and New Media) เรียนเกี่ยวกับวิทยาการข้อมูลข่าวสาร การผลิตสื่อสารสนเทศบนแพลตฟอร์มต่าง ๆ การแสวงหาข้อมูลข่าวสาร สืบค้นข้อเท็จจริง การเขียน การวิเคราะห์ แนวคิดและหลักการกํากับดูแลสื่อ',
      },
      {
        id: 'commarts4',
        name: 'ภาควิชาวาทวิทยาและสื่อสารการแสดง (Speech Communication and Performing Arts)',
        description:
          'แบ่งออกเป็น 2 สาขาวิชา ได้แก่ วาทวิทยา (Speech) และ สื่อสารการแสดง (Performing Arts)',
        fieldDescription:
          '1. วาทวิทยา (Speech Communications) เรียนเกี่ยวกับองค์ประกอบและแนวคิดการสื่อสาร ทั้งภายในบุคคล ระหว่างบุคคล ภายในองค์กร กระบวนการและแนวทางการสร้างความสัมพันธ์ระหว่างบุคคล การโต้แย้ง การจัดการความขัดแย้ง วาทศาสตร์กับสังคม การเล่าเรื่อง การสัมภาษณ์ \n2. สื่อสารการแสดง (Performing Arts) เรียนเกี่ยวกับหลักการ แนวคิดด้านสุนทรียะ ปฏิบัติการด้านสื่อสารการแสดงที่ปรากฏบนเวที (Stage Production) และที่ปรากฏในสื่อ (Media Production) โดยเฉพาะอย่างยิ่งในสื่อโทรทัศน์ต่าง ๆ',
      },
      {
        id: 'commarts5',
        name: 'ภาควิชาการภาพยนตร์และภาพนิ่ง (Motion Pictures and Still Photography)',
        description:
          'มุ่งเน้นการให้ความรู้ที่เป็นศาสตร์ ไม่ว่าจะเป็นวิชาที่เกี่ยวกับทฤษฎี การวิจัย สุนทรียศาสตร์ การวางแผน การวิเคราะห์ และวิจารณ์ภาพยนตร์ ส่วนความรู้ด้านศิลปะ ได้แก่ การศึกษาในเชิงลึกของศิลปะการเขียนบทภาพยนตร์ การกำกับ การถ่ายทำภาพยนตร์ การตัดต่อ ตลอดจนศิลปะการถ่ายภาพนิ่ง',
        fieldDescription:
          'ศิลปะภาพยนตร์ (Cinematic Arts) เรียนเกี่ยวกับปฏิบัติการทางด้านสารและศิลปะภาพยนตร์และภาพนิ่ง ความเท่าทันความเปลี่ยนแปลงของบริบททางสังคมและวัฒนธรรม ทั้งในประเทศและระดับโลก และพัฒนาการที่ก้าวกระโดดของเทคโนโลยีการผลิตสื่อและการสื่อสาร',
      },
      {
        id: 'commarts6',
        name: '"หลักสูตรนานาชาติ สาขาการจัดการการสื่อสาร (BCM) B.A. (Communication Arts) in Communication Management"',
        description:
          'The program focuses on marketing communications, content creation, and management skills. Students will learn about branding, advertising, public relations, digital content, and the creative aspects of both brands and businesses. The program emphasizes how to strategically manage and communicate a brand’s message across various platforms.',
        fieldDescription:
          '1. การจัดการการสื่อสาร (Communication Management): มุ้งเน้นการสื่อสารเชิงกลยุทธ์ การสื่อสารการตลาด การจัดการเเละการสร้างแบรนด์ เเละการสร้างสรรค์คอนเทนต์อย่างมีคุณภาพ The program provides a well-rounded education in communication management, with a particular emphasis on branding, marketing, and business across various contexts.',
      },
    ],
    imagePath: '/info/faculty/commarts.webp',
    location: 'https://maps.app.goo.gl/nENwDBqJisD5Ztnq6',
  },
  // คณะพาณิชยศาสตร์และการบัญชี
  {
    id: 'cbs',
    name: 'คณะพาณิชยศาสตร์และการบัญชี',
    majors: [
      {
        id: 'cbs1',
        name: 'หลักสูตรบัญชีบัณฑิต',
        description:
          'เรียนรู้ด้านการบัญชีและเทคโนโลยีสารสนเทศสำหรับงานบัญชีและการบริหารธุรกิจ มุ่งสร้างนิสิตที่มีความรู้ความสามารถด้านบัญชีและเทคโนโลยีสารสนเทศอย่างลึกซึ้ง',
        fieldDescription: '-',
      },
      {
        id: 'cbs2',
        name: 'หลักสูตรบริหารธุรกิจบัณฑิต',
        description:
          'มุ่งสร้างนิสิตให้มีทักษะและความรู้ในการบริหารธุรกิจควบคู่ไปกับจริยธรรมและคุณจรรยาบรรณทางธุรกิจ เพื่อผลักดันความก้าวหน้าของสังคมธุรกิจทั้งในระดับประเทศและระดับนานาชาติ',
        fieldDescription:
          '1 การจัดการเพื่อเป็นผู้ประกอบการธุรกิจ (Entrepreneurial Management) \n2 ระบบสารสนเทศทางการจัดการ (Management Information Systems) \n3 การธนาคารและการเงิน (Banking and Finance) \n4 การตลาด (Marketing) \n5 การจัดการโลจิสติกส์ระหว่างประเทศ (International Logistics Management) \nนิสิตในหลักสูตรจะได้บูรณาการความรู้ในด้านต่าง ๆ เหล่านี้ เพื่อการวิเคราะห์ วางแผน ตัดสินใจ ในการดำเนินธุรกิจได้อย่างมีประสิทธิภาพ อีกทั้งหลักสูตรยังช่วยให้นิสิตได้รับประสบการณ์ในการบริหารธุรกิจทั้งทางตรงและทางอ้อม ส่งผลให้นิสิตสามารถนำความรู้ไปใช้ในการทำงานในสภาพแวดล้อมทางธุรกิจที่มีพลวัตสูงในโลกปัจจุบัน',
      },
      {
        id: 'cbs3',
        name: 'หลักสูตรสถิติศาสตรบัณฑิต',
        description:
          'มุ่งเน้นให้นิสิตมีทักษะ ความรู้ และมีคุณธรรม สามารถประกอบอาชีพและเรียนรู้ตลอดชีวิตได้ด้วยตนเอง หลักสูตรเน้นการสร้างนิสิตที่มีความรู้เชิงลึกด้านสถิติ การประกันภัย และเทคโนโลยีสารสนเทศสำหรับธุรกิจ รวมถึงความรู้เกี่ยวกับโลกธุรกิจ',
        fieldDescription:
          '1 สถิติและวิทยาการข้อมูล (Statistics and Data Science)\n2 การประกันภัย (Insurance)\n3 เทคโนโลยีสารสนเทศเพื่อธุรกิจ (Information Technology for Business)',
      },
      {
        id: 'cbs4',
        name: 'หลักสูตรบริหารธุรกิจบัณฑิต (หลักสูตรนานาชาติ) Bachelor of Business Administration (BBA) International Program',
        description:
          'The curricula provide students with extensive knowledge of international accounting practices, understanding of trade development and the diversity of culture, financial analysis for modern and competitive business management, as well as brand and marketing management in the current face-paced business environment.',
        fieldDescription:
          '1 สาขาวิชาการจัดการธุรกิจระหว่างประเทศ (International Business Management) มุ่งเน้นไปที่การทำความเข้าใจการพัฒนาธุรกิจการค้าภายใต้ความหลากหลายของวัฒนธรรมโลก ซึ่งแบ่งออกเป็น 3 แขนงวิชา คือ แขนงวิชาการจัดการธุรกิจดิจิทัล แขนงวิชาการวิเคราะห์การเงินและการลงทุน และ แขนงวิชาการจัดการแบรนด์และการตลาด หลักสูตรนี้ยังเน้นถึงวิธีการจัดการธุรกิจอย่างมีประสิทธิภาพ และสามารถแข่งขันได้ในโลกธุรกิจที่มีการเปลี่ยนแปลงตลอดเวลา \n2 สาขาวิชาการบัญชี (Accounting)  ให้ความรู้อย่างครอบคลุมเกี่ยวกับแนวทางปฏิบัติทางการบัญชีระหว่างประเทศสำหรับการจัดการธุรกิจสมัยใหม่',
      },
    ],
    imagePath: '/info/faculty/cbs.webp',
    location: 'https://maps.app.goo.gl/r8MfrgePqCJQKFSL8',
  },
  // คณะแพทยศาสตร์
  {
    id: 'md',
    name: 'คณะแพทยศาสตร์',
    majors: [
      {
        id: 'md1',
        name: 'หลักสูตรแพทยศาสตรบัณฑิต',
        description:
          'หลักสูตรปริญญาตรีวิชาชีพด้านการแพทย์ที่มุ่งผลิตบัณฑิตให้มีคุณธรรม จริยธรรม ความรู้ความสามารถในการประกอบวิชาชีพเวชกรรม ดูแลรักษาผู้ป่วยแบบองค์รวม และมีความเป็นผู้นำ เพื่อเป็นที่พึ่งของสังคม มีเนื้อหาครอบคลุมวิทยาศาสตร์การแพทย์ขั้นพื้นฐานและคลินิก พร้อมการฝึกปฏิบัติจริง เน้นทักษะการคิดวิเคราะห์และวิจัย โดยมีระยะเวลาเรียน 6 ปี',
        fieldDescription: '-',
      },
    ],
    imagePath: '/info/faculty/md.webp',
    location: 'https://maps.app.goo.gl/5qe8o1XU2Jxj7rPK8?g_st=ic',
  },
  // คณะเภสัชศาสตร์
  {
    id: 'pharm',
    name: '',
    majors: [
      {
        id: 'pharm1',
        name: 'หลักสูตรเภสัชศาสตรบัณฑิต',
        description:
          'หลักสูตรเภสัชศาสตร์บัณฑิต เป็นหลักสูตร 6 ปี เมื่อจบหลักสูตรแล้วจะได้รับปริญญาเภสัชศาสตร์บัณฑิต (ภบ.) หลักสูตรมีความมุ่งหมายที่จะเป็นหลักสูตรชั้นนำของประเทศและมีมาตรฐานระดับสากลในการผลิตบัณฑิตเภสัชศาสตร์ บัณฑิตจะได้รับความรู้ในด้านงานเภสัชกรรม แนวทางเภสัชกรรมที่ใช้ทำงาน และความเป็นวิชาชีพเภสัชกรรมและการเรียนรู้ตลอดชีวิต',
        fieldDescription:
          '1. สาขาวิชาการบริบาลทางเภสัชกรรม ทั้งสองสาขาวิชามีการจัดการเรียนการสอนในวิชาพื้นฐาน, วิชาเฉพาะกลุ่มวิชาชีพ และการฝึกปฏิบัติวิชาชีพ ตามประกาศกำหนดของสภาเภสัชกรรม โดยในสาขาวิชาการบริบาลทางเภสัชกรรมจะมีการเน้นในรายวิชาที่เกี่ยวข้องกับการปฏิบัติงานการบริบาลทางเภสัชกรรมเพื่อดูแลผู้ป่วย ครอบครัว ชุมชน และสังคม \n2. สาขาวิชาเภสัชกรรมอุตสาหการ ทั้งสองสาขาวิชามีการจัดการเรียนการสอนในวิชาพื้นฐาน, วิชาเฉพาะกลุ่มวิชาชีพ และการฝึกปฏิบัติวิชาชีพ ตามประกาศกำหนดของสภาเภสัชกรรม โดยในสาขาวิชาเภสัชกรรมอุตสาหการจะมีการเน้นในรายวิชาที่เกี่ยวข้องกับการผลิต การควบคุมและประกันคุณภาพเภสัชภัณฑ์ การวิจัยและพัฒนายาการคุ้มครองผู้บริโภคด้านยาและผลิตภัณฑ์สุขภาพ',
      },
    ],
    imagePath: '/info/faculty/pharm.webp',
    location: 'https://maps.app.goo.gl/tN1YCBJ75JMeaT6a7',
  },
  // คณะรัฐศาสตร์
  {},
  // คณะวิทยาศาสตร์
  {},
  // คณะวิทยาศาสตร์การกีฬา
  {},
  // คณะวิศวกรรมศาสตร์
  {},
  // คณะศิลปกรรมศาสตร์
  {},
  // คณะเศรษฐศาสตร์
  {},
  // คณะสถาปัตยกรรมศาสตร์
  {},
  // คณะสหเวชศาสตร์
  {},
  // คณะสัตวแพทยศาสตร์
  {},
  // คณะอักษรศาสตร์
  {},
  // สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย
  {},
  // คณะเกษตรศาสตร์บูรณาการ
  {},
  // หอพักนิสิตจุฬาลงกรณ์มหาวิทยาลัย
  {},
]
