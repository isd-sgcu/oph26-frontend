export const ABBR_NAME_SIZE: Record<string, string> = {
  // EDU
  "ครุ": "text-7xl",
  "EDU": "text-7xl",

  // PSY
  "จิตวิทยา": "text-5xl",
  "PSY": "text-7xl",

  // DENT
  "ทันตะ": "text-7xl",
  "DENT": "text-7xl",

  // LAW
  "นิติ": "text-7xl",
  "LAW": "text-7xl",

  // COMMARTS
  "นิเทศ": "text-7xl",
  "COMMARTS": "text-3xl",

  // CBS
  "บัญชี/ บริหาร": "text-5xl",
  "CBS": "text-7xl",

  // MED
  "แพทย์": "text-7xl",
  "MED": "text-7xl",

  // PHARM
  "เภสัช": "text-7xl",
  "PHARM": "text-5xl",

  // POLSCI
  "รัฐศาสตร์": "text-5xl",
  "POLSCI": "text-5xl",

  // SCI
  "วิทย์": "text-7xl",
  "SCI": "text-7xl",

  // SPSC
  "วิทย์กีฬา": "text-5xl",
  "SPSC": "text-7xl",

  // ENG
  "วิศวะ": "text-7xl",
  "ENG": "text-7xl",

  // FAA
  "ศิลปกรรม": "text-5xl",
  "FAA": "text-7xl",

  // ECON
  "เศรษฐศาสตร์": "text-3xl",
  "ECON": "text-7xl",

  // ARCH
  "สถาปัตย์": "text-5xl",
  "ARCH": "text-7xl",

  // AHS
  "สหเวช": "text-7xl",
  "AHS": "text-7xl",

  // VET
  "สัตว แพทย์": "text-5xl",
  "VET": "text-7xl",

  // ARTS
  "อักษร": "text-7xl",
  "ARTS": "text-7xl",

  // BAScii
  "BAScii": "text-5xl",

  // CUSAR
  "เกษตร": "text-5xl",
  "CUSAR": "text-5xl",
}

export const getAbbrNameSize = (abbr: string) => {
  return ABBR_NAME_SIZE[abbr] ?? "text-5xl"
}

export const CANVAS_ABBR_FONT_SIZE: Record<string, number> = {
  // EDU
  "ครุ": 250,
  "EDU": 250,

  // PSY
  "จิตวิทยา": 160,
  "PSY": 250,

  // DENT
  "ทันตะ": 220,
  "DENT": 220,

  // LAW
  "นิติ": 250,
  "LAW": 250,

  // COMMARTS
  "นิเทศ": 250,
  "COMMARTS": 120,

  // CBS
  "บัญชี/บริหาร": 100,
  "CBS": 250,

  // MED
  "แพทย์": 220,
  "MED": 250,

  // PHARM
  "เภสัช": 220,
  "PHARM": 160,

  // POLSCI
  "รัฐศาสตร์": 130,
  "POLSCI": 160,

  // SCI
  "วิทย์": 250,
  "SCI": 250,

  // SPSC
  "วิทย์กีฬา": 160,
  "SPSC": 220,

  // ENG
  "วิศวะ": 250,
  "ENG": 250,

  // FAA
  "ศิลปกรรม": 130,
  "FAA": 250,

  // ECON
  "เศรษฐศาสตร์": 100,
  "ECON": 200,

  // ARCH
  "สถาปัตย์": 160,
  "ARCH": 200,

  // AHS
  "สหเวช": 200,
  "AHS": 250,

  // VET
  "สัตวแพทย์": 130,
  "VET": 250,

  // ARTS
  "อักษร": 220,
  "ARTS": 220,

  // BAScii
  "BAScii": 190,

  // CUSAR
  "เกษตร": 200,
  "CUSAR": 160,
}

export const getCanvasAbbrFontSize = (abbr: string) => {
  return CANVAS_ABBR_FONT_SIZE[abbr.trim()] ?? 220
}

export const ABBR_NAME_SIZE_OVERALL: Record<string, string> = {
  // EDU
  "ครุ": "text-4xl",
  "EDU": "text-4xl",

  // PSY
  "จิตวิทยา": "text-xl",
  "PSY": "text-4xl",

  // DENT
  "ทันตะ": "text-4xl",
  "DENT": "text-4xl",

  // LAW
  "นิติ": "text-4xl",
  "LAW": "text-4xl",

  // COMMARTS
  "นิเทศ": "text-4xl",
  "COMMARTS": "text-md",

  // CBS
  "บัญชี/บริหาร": "text-xl",
  "CBS": "text-4xl",

  // MED
  "แพทย์": "text-4xl",
  "MED": "text-4xl",

  // PHARM
  "เภสัช": "text-4xl",
  "PHARM": "text-2xl",

  // POLSCI
  "รัฐศาสตร์": "text-xl",
  "POLSCI": "text-2xl",

  // SCI
  "วิทย์": "text-4xl",
  "SCI": "text-4xl",

  // SPSC
  "วิทย์กีฬา": "text-2xl",
  "SPSC": "text-4xl",

  // ENG
  "วิศวะ": "text-4xl",
  "ENG": "text-4xl",

  // FAA
  "ศิลปกรรม": "text-xl",
  "FAA": "text-4xl",

  // ECON
  "เศรษฐศาสตร์": "text-md",
  "ECON": "text-4xl",

  // ARCH
  "สถาปัตย์": "text-xl",
  "ARCH": "text-3xl",

  // AHS
  "สหเวช": "text-3xl",
  "AHS": "text-4xl",

  // VET
  "สัตวแพทย์": "text-xl",
  "VET": "text-4xl",

  // ARTS
  "อักษร": "text-4xl",
  "ARTS": "text-4xl",

  // BAScii
  "BAScii": "text-3xl",

  // CUSAR
  "เกษตร": "text-3xl",
  "CUSAR": "text-2xl",
}

export const getAbbrNameSizeOverall = (abbr: string) => {
  return ABBR_NAME_SIZE_OVERALL[abbr.trim()] ?? "text-xl"
}

export const CANVAS_ABBR_SIZE_MINICARD: Record<string, number> = {
  // EDU
  "ครุ": 120,
  "EDU": 120,

  // PSY
  "จิตวิทยา": 95,
  "PSY": 120,

  // DENT
  "ทันตะ": 120,
  "DENT": 120,

  // LAW
  "นิติ": 120,
  "LAW": 120,

  // COMMARTS
  "นิเทศ": 120,
  "COMMARTS": 65,

  // CBS
  "บัญชี/บริหาร": 70,
  "CBS": 120,

  // MED
  "แพทย์": 120,
  "MED": 120,

  // PHARM
  "เภสัช": 120,
  "PHARM": 95,

  // POLSCI
  "รัฐศาสตร์": 85,
  "POLSCI": 95,

  // SCI
  "วิทย์": 120,
  "SCI": 120,

  // SPSC
  "วิทย์กีฬา": 95,
  "SPSC": 120,

  // ENG
  "วิศวะ": 120,
  "ENG": 120,

  // FAA
  "ศิลปกรรม": 85,
  "FAA": 120,

  // ECON
  "เศรษฐศาสตร์": 60,
  "ECON": 120,

  // ARCH
  "สถาปัตย์": 95,
  "ARCH": 120,

  // AHS
  "สหเวช": 120,
  "AHS": 120,

  // VET
  "สัตวแพทย์": 80,
  "VET": 120,

  // ARTS
  "อักษร": 120,
  "ARTS": 120,

  // BAScii
  "BAScii": 95,

  // CUSAR
  "เกษตร": 95,
  "CUSAR": 95,
}

export const getMiniCardFacultyFontSize = (abbr: string) => {
  return CANVAS_ABBR_SIZE_MINICARD[abbr.trim()] ?? 100
}