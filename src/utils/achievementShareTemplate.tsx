import logoUrl from '/logo/cu-journey.webp'
import shareTemplate3 from '/background/shareTemplate3.svg'
import shareTemplate4 from '/background/shareTemplate4.svg'
import shareTemplate5 from '/background/shareTemplate5.svg'
import lockedUrl from '/game/locked.svg'
import { CollectedPiecesProps } from '@/components/game/achievement/AchievementCard'
import { PieceVariant, JIGSAW_PATH } from '@/components/game/Piece'
import {
  getCanvasAbbrFontSize,
  getMiniCardFacultyFontSize,
} from './achievementSizeHelper'

function getOrdinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// Helper to load image
const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

async function ensureFontsLoaded() {
  const fonts = [
    'bold 80px "IBM Plex Sans Thai"',
    '600 60px "IBM Plex Sans Thai"',
    '500 65px "IBM Plex Sans Thai"',
    '500 50px "IBM Plex Sans Thai"',
    '500 55px "IBM Plex Sans Thai"',
    '400 50px "IBM Plex Sans Thai"',
    '400 110px "IBM Plex Sans Thai"',
    '500 14px "IBM Plex Sans Thai"',
  ]

  await Promise.all(fonts.map((f) => document.fonts.load(f)))
  await document.fonts.ready

  // Small delay to ensure layout flush
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
}

export async function achievementShare1(
  name: string,
  rank: number,
  lang: 0 | 1 // 0 = th, 1 = en
) {
  const localizedText = {
    th: {
      rank: 'เป็นคนที่',
      description: 'ที่เก็บจิ๊กซอว์มาประกอบ',
      description2: 'เป็นภาพครบ',
    },
    en: {
      rank: 'is the',
      description: 'to collect all pieces and',
      description2: 'complete the puzzle',
    },
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 1080
  canvas.height = 1920

  const [bg] = await Promise.all([loadImage(shareTemplate5)])

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // 4️⃣ Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 80px "IBM Plex Sans Thai"'
  ctx.fillText(name, canvas.width / 2, 370)

  ctx.fillStyle = '#000000'
  // Rank
  ctx.font = '500 65px "IBM Plex Sans Thai"'
  const rankText =
    lang === 0 ? `${localizedText.th.rank}` : `${localizedText.en.rank}`
  ctx.fillText(rankText, canvas.width / 2, 550)

  // description
  ctx.font = '500 60px "IBM Plex Sans Thai"'
  const descriptionText =
    lang === 0
      ? `${localizedText.th.description}`
      : `${localizedText.en.description}`
  ctx.fillText(descriptionText, canvas.width / 2, 1500)

  // description2
  const description2Text =
    lang === 0
      ? `${localizedText.th.description2}`
      : `${localizedText.en.description2}`
  ctx.fillText(description2Text, canvas.width / 2, 1600)

  // rank number
  ctx.fillStyle = '#FFFFFF' // text color

  if (rank > 99 && rank <= 999 && lang === 1) {
    ctx.font = '600 200px "IBM Plex Sans Thai"' // weight + size + family
  } else if (rank > 999) {
    if (lang === 1)
      ctx.font = '600 150px "IBM Plex Sans Thai"' // weight + size + family
    else ctx.font = '600 200px "IBM Plex Sans Thai"' // weight + size + family
  } else {
    ctx.font = '600 250px "IBM Plex Sans Thai"' // weight + size + family
  }
  ctx.textAlign = 'center' // optional depending on layout
  ctx.textBaseline = 'middle'

  // text shadow
  ctx.shadowColor = '#CA2791'
  ctx.shadowBlur = 40
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10

  const rankTextWithOrdinal = lang === 0 ? `${rank}` : `${getOrdinal(rank)}`
  ctx.fillText(rankTextWithOrdinal, canvas.width / 2, 1030)

  return canvas.toDataURL('image/png')
}

export async function achievementShare2(
  name: string,
  faculty: string,
  percentile: number,
  lang: 0 | 1 // 0 = th, 1 = en
) {
  const localizedText = {
    th: {
      start: 'มีเพื่อนคณะ',
      description: 'สูงเป็น {{}}% แรก',
      description2: 'จากทั้งหมด',
    },
    en: {
      start: 'have friends from',
      description: 'in the top {{}}% with the',
      description2: 'most friends from this faculty.',
    },
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 1080
  canvas.height = 1920

  const [bg] = await Promise.all([loadImage(shareTemplate5)])

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // 4️⃣ Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 80px "IBM Plex Sans Thai"'
  ctx.fillText(name, canvas.width / 2, 370)

  ctx.fillStyle = '#000000'
  // Start
  ctx.font = '500 65px "IBM Plex Sans Thai"'
  const startText =
    lang === 0 ? `${localizedText.th.start}` : `${localizedText.en.start}`
  ctx.fillText(startText, canvas.width / 2, 550)

  // description
  ctx.font = '500 60px "IBM Plex Sans Thai"'
  const descriptionText =
    lang === 0
      ? localizedText.th.description.replace('{{}}', String(percentile))
      : localizedText.en.description.replace('{{}}', String(percentile))
  ctx.fillText(descriptionText, canvas.width / 2, 1500)

  // description2
  const description2Text =
    lang === 0
      ? `${localizedText.th.description2}`
      : `${localizedText.en.description2}`
  ctx.fillText(description2Text, canvas.width / 2, 1600)

  // faculty
  const fontSize = getCanvasAbbrFontSize(faculty)

  ctx.fillStyle = '#FFFFFF' // text color
  ctx.font = `600 ${fontSize}px "IBM Plex Sans Thai"`
  ctx.textAlign = 'center' // optional depending on layout
  ctx.textBaseline = 'middle'

  // text shadow
  ctx.shadowColor = '#CA2791'
  ctx.shadowBlur = 40
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10

  ctx.fillText(faculty, canvas.width / 2, 1030)

  return canvas.toDataURL('image/png')
}

export async function achievementShare3(
  name: string,
  percent: string,
  faculty: string,
  lang: 0 | 1 // 0 = th, 1 = en
) {
  const localizedText = {
    th: {
      start: 'มีคนจำนวน',
      description: 'กำลังตามหาเพื่อน',
      description2: 'เช่นเดียวกับฉัน',
    },
    en: {
      start: 'There are',
      description: 'others finding friends from',
      description2: 'like me.',
    },
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 1080
  canvas.height = 1920

  const [bg] = await Promise.all([loadImage(shareTemplate5)])

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // 4️⃣ Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 80px "IBM Plex Sans Thai"'
  ctx.fillText(name, canvas.width / 2, 370)

  ctx.fillStyle = '#000000'
  // Rank
  ctx.font = '500 65px "IBM Plex Sans Thai"'
  const rankText =
    lang === 0 ? `${localizedText.th.start}` : `${localizedText.en.start}`
  ctx.fillText(rankText, canvas.width / 2, 550)

  // faculty
  ctx.font = '500 60px "IBM Plex Sans Thai"'
  if (faculty === 'นวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย (BAScii)') {
    // description
    ctx.font = '500 60px "IBM Plex Sans Thai"'
    const descriptionText =
      lang === 0 ? localizedText.th.description : localizedText.en.description
    ctx.fillText(descriptionText, canvas.width / 2, 1450)

    const faculty1 = 'สถาบันนวัตกรรมบูรณาการ'
    const faculty2 = 'แห่งจุฬาลงกรณ์มหาวิทยาลัย'
    ctx.fillText(faculty1, canvas.width / 2, 1550)
    ctx.fillText(faculty2, canvas.width / 2, 1650)

    // description2
    const description2Text =
      lang === 0
        ? `${localizedText.th.description2}`
        : `${localizedText.en.description2}`
    ctx.fillText(description2Text, canvas.width / 2, 1750)
  } else {
    // description
    ctx.font = '500 60px "IBM Plex Sans Thai"'
    const descriptionText =
      lang === 0 ? localizedText.th.description : localizedText.en.description
    ctx.fillText(descriptionText, canvas.width / 2, 1500)

    if (faculty === 'School of Integrated Innovation (BAScii)')
      faculty = 'School of Integrated Innovation'
    if (!lang) faculty = 'คณะ' + faculty
    ctx.fillText(faculty, canvas.width / 2, 1600)

    // description2
    const description2Text =
      lang === 0
        ? `${localizedText.th.description2}`
        : `${localizedText.en.description2}`
    ctx.fillText(description2Text, canvas.width / 2, 1700)
  }

  // rank number
  ctx.fillStyle = '#FFFFFF' // text color
  ctx.font = '600 200px "IBM Plex Sans Thai"' // weight + size + family
  ctx.textAlign = 'center' // optional depending on layout
  ctx.textBaseline = 'middle'

  // text shadow
  ctx.shadowColor = '#CA2791'
  ctx.shadowBlur = 40
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10

  ctx.fillText(percent + '%', canvas.width / 2, 1030)

  return canvas.toDataURL('image/png')
}

export async function achievementShareOverall(
  name: string,
  collected: number,
  miniCard1Faculty: string,
  miniCard1Count: number,
  miniCard2Rank: number,
  lang: 0 | 1 // 0 = th, 1 = en
) {
  const localizedText = {
    th: {
      start: 'เก็บชิ้นส่วนไป',
      miniCard1desc: 'คณะที่เก็บได้มากสุด',
      miniCard1desc2: 'จำนวน {{}} ชิ้น',
      miniCard2desc: 'คุณเป็นคนที่',
      miniCard2desc2: 'ที่เก็บครบ',
    },
    en: {
      start: 'have collected',
      miniCard1desc: 'Most collected',
      miniCard1desc2: '{{}} pieces',
      miniCard2desc: 'You are the',
      miniCard2desc2: 'to complete',
    },
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 1080
  canvas.height = 1920

  const [bg, logo, locked] = await Promise.all([
    loadImage(shareTemplate3),
    loadImage(logoUrl),
    loadImage(lockedUrl),
  ])

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // 4️⃣ Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 80px "IBM Plex Sans Thai"'
  ctx.fillText(name, canvas.width / 2, 370)

  ctx.fillStyle = '#000000'
  // Start
  ctx.font = '500 60px "IBM Plex Sans Thai"'
  const rankText =
    lang === 0 ? `${localizedText.th.start}` : `${localizedText.en.start}`
  ctx.fillText(rankText, canvas.width / 2, 470)

  // minicard1 head
  ctx.font = '500 55px "IBM Plex Sans Thai"'
  const minicard1startText =
    lang === 0 ? localizedText.th.miniCard1desc : localizedText.en.miniCard1desc
  ctx.fillText(minicard1startText, canvas.width / 4, 1200)

  // minicard2 head
  ctx.font = '500 55px "IBM Plex Sans Thai"'
  const minicard2startText =
    lang === 0 ? localizedText.th.miniCard2desc : localizedText.en.miniCard2desc
  ctx.fillText(minicard2startText, (3 * canvas.width) / 4, 1200)

  // minicard1 end
  ctx.font = '400 50px "IBM Plex Sans Thai"'
  const minicard1endText =
    lang === 0
      ? `${localizedText.th.miniCard1desc2.replace('{{}}', String(miniCard1Count))}`
      : `${localizedText.en.miniCard1desc2.replace('{{}}', String(miniCard1Count))}`
  ctx.fillText(minicard1endText, canvas.width / 4, 1730)

  // minicard2 end
  const minicard2endText =
    lang === 0
      ? `${localizedText.th.miniCard2desc2}`
      : `${localizedText.en.miniCard2desc2}`
  ctx.fillText(minicard2endText, (3 * canvas.width) / 4, 1730)

  // minicard1 faculty
  const fontSize = getMiniCardFacultyFontSize(miniCard1Faculty)

  ctx.fillStyle = '#F481B4'
  ctx.font = `400 ${fontSize}px "IBM Plex Sans Thai"`
  ctx.fillText(miniCard1Faculty, canvas.width / 4 + 10, 1500)

  // minicard2 rank
  if (miniCard2Rank > 0 && miniCard2Rank <= 999) {
    ctx.font = '400 120px "IBM Plex Sans Thai"'
    const rankTextWithOrdinal =
      lang === 0 ? `${miniCard2Rank}` : `${getOrdinal(miniCard2Rank)}`
    ctx.fillText(rankTextWithOrdinal, (3 * canvas.width) / 4, 1500)
  } else if (miniCard2Rank > 999) {
    ctx.font = '400 100px "IBM Plex Sans Thai"'
    const rankTextWithOrdinal =
      lang === 0 ? `${miniCard2Rank}` : `${getOrdinal(miniCard2Rank)}`
    ctx.fillText(rankTextWithOrdinal, (3 * canvas.width) / 4, 1500)
  } else {
    ctx.drawImage(locked, (3 * canvas.width) / 4 - 70, 1400, 120, 150)
  }

  // piece/ชิ้น
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '400 50px "IBM Plex Sans Thai"'
  const pieceText = lang === 0 ? 'ชิ้น' : collected > 1 ? 'pieces' : 'piece'
  ctx.fillText(pieceText, canvas.width / 2, 950)

  // collected
  ctx.font = '600 200px "IBM Plex Sans Thai"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = '#CA2791'
  ctx.shadowBlur = 40
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10

  ctx.fillText(String(collected), canvas.width / 2, 850)

  ctx.shadowColor = 'transparent'

  const logoWidth = logo.width * 0.25
  const logoHeight = (logo.height / logo.width) * logoWidth

  ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 90, logoWidth, logoHeight)

  return canvas.toDataURL('image/png')
}

type FacultyKey = keyof Omit<CollectedPiecesProps, 'variant' | 'stat'>

const facultyVariants: Record<FacultyKey, PieceVariant> = {
  edu: 1,
  psy: 2,
  pharm: 1,
  dent: 5,
  commarts: 4,
  ahs: 6,
  faa: 2,
  vet: 1,
  law: 5,
  arch: 2,
  eng: 4,
  arts: 6,
  md: 1,
  sci: 2,
  econ: 4,
  polsci: 1,
  cbs: 6,
  spsc: 2,
  scii: 1,
  cusar: 5,
}

export async function achievementShareCollectedPieces(
  name: string,
  facultyCounts: CollectedPiecesProps,
  lang: 0 | 1 // 0 = th, 1 = en
) {
  const localizedText = {
    th: {
      start: 'บันทึกการเก็บชิ้นส่วน',
    },
    en: {
      start: 'Pieces Collection',
    },
  }

  // for (const i in facultyCounts) {
  //   // skip non-faculty keys
  //   if (i === 'variant' || i === 'stat') continue;

  //   // tell TS this is a faculty key
  //   const key = i as FacultyKey;
  //   facultyCounts[key] = 999;
  // }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 540
  canvas.height = 960

  const [bg, logo] = await Promise.all([
    loadImage(shareTemplate4),
    loadImage(logoUrl),
  ])

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 40px "IBM Plex Sans Thai"'
  ctx.fillText(name, canvas.width / 2, 185)

  ctx.fillStyle = '#000000'
  // Start
  ctx.font = '500 30px "IBM Plex Sans Thai"'
  const rankText =
    lang === 0 ? `${localizedText.th.start}` : `${localizedText.en.start}`
  ctx.fillText(rankText, canvas.width / 2, 235)

  // Draw pieces in a grid
  const gridCols = 4
  const gridSpacingX = 115
  const gridSpacingY = 125
  const startX = 35
  const startY = 250

  const facultyKeys = Object.keys(facultyVariants) as FacultyKey[]
  for (let i = 0; i < facultyKeys.length; i++) {
    const facultyKey = facultyKeys[i]
    const variant = facultyVariants[facultyKey]
    const count = facultyCounts[facultyKey]

    await drawPiece({
      ctx,
      x: startX + (i % gridCols) * gridSpacingX,
      y: startY + Math.floor(i / gridCols) * gridSpacingY,
      size: 85,
      imgPath: `/faculty/${facultyKey}.webp`,
      variant,
      count,
    })
  }

  // Label
  if (lang) {
    addEnglishText(ctx)
  } else {
    addThaiText(ctx)
  }

  // Logo
  const logoWidth = logo.width * 0.125
  const logoHeight = (logo.height / logo.width) * logoWidth

  ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 45, logoWidth, logoHeight)

  return canvas.toDataURL('image/png')
}

interface DrawPieceParams {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  size: number
  imgPath: string
  variant: PieceVariant
  count: number
}

async function drawPiece({
  ctx,
  x,
  y,
  size,
  imgPath,
  variant,
  count,
}: DrawPieceParams) {
  const path = new Path2D(JIGSAW_PATH[variant])
  const img = await loadImage(imgPath)

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 100, size / 100)
  ctx.translate(20, 20)

  // --- SHADOW ---
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.25)' // lighter shadow
  ctx.shadowBlur = 6 // reasonable blur
  ctx.shadowOffsetX = 4
  ctx.shadowOffsetY = 4
  ctx.fillStyle = 'white' // fill is required to show shadow

  ctx.fill(path) // shadow will be drawn here
  ctx.restore()

  // --- CLIP AND DRAW IMAGE ---
  ctx.save()
  ctx.clip(path)

  if (count === 0) {
    ctx.filter = 'grayscale(100%) brightness(0.75) opacity(90%)'
  }

  ctx.drawImage(img, 0, 0, 100, 100)

  ctx.filter = 'none'
  ctx.restore()

  // --- COUNT BADGE ---
  if (count > 1) {
    ctx.save()
    ctx.scale(size / 100, size / 100)
    ctx.translate(16, -16)

    const gradient = ctx.createLinearGradient(0, 0, 0, 50)
    gradient.addColorStop(0, '#fafae6')
    gradient.addColorStop(1, '#ffd285')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(90, 25, 25, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#000'
    ctx.font = '600 25px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(count > 99 ? '99+' : String(count), 90, 25)

    ctx.restore()
  }

  ctx.restore()
}

interface LabelPosition {
  label: string
  x: number
  y: number
}

async function addThaiText(ctx: CanvasRenderingContext2D) {
  // Example positions for each piece — adjust x/y to match your grid
  const thaiLabels: LabelPosition[] = [
    { label: 'ครุศาสตร์', x: 95, y: 360 },
    { label: 'จิตวิทยา', x: 210, y: 360 },
    { label: 'เภสัชศาสตร์', x: 325, y: 360 },
    { label: 'ทันตแพทยศาสตร์', x: 440, y: 360 },

    { label: 'นิเทศศาสตร์', x: 95, y: 485 },
    { label: 'สหเวชศาสตร์', x: 210, y: 485 },
    { label: 'ศิลปกรรมศาสตร์', x: 325, y: 485 },
    { label: 'สัตวแพทยศาสตร์', x: 440, y: 485 },

    { label: 'นิติศาสตร์', x: 95, y: 610 },
    { label: 'สถาปัตยกรรมศาสตร์', x: 205, y: 610 },
    { label: 'วิศวกรรมศาสตร์', x: 325, y: 610 },
    { label: 'อักษรศาสตร์', x: 440, y: 610 },

    { label: 'แพทยศาสตร์', x: 95, y: 735 },
    { label: 'วิทยาศาสตร์', x: 210, y: 735 },
    { label: 'เศรษฐศาสตร์', x: 325, y: 735 },
    { label: 'รัฐศาสตร์', x: 440, y: 735 },

    { label: 'พาณิชยศาสตร์', x: 95, y: 855 },
    { label: 'วิทยาศาสตร์', x: 210, y: 855 },
    { label: 'เกษตรศาสตร์', x: 325, y: 855 },
    { label: 'สถาบันนวัตกรรม', x: 440, y: 855 },

    { label: 'และการบัญชี', x: 95, y: 870 },
    { label: 'การกีฬา', x: 210, y: 870 },
    { label: 'บูรณาการ', x: 325, y: 870 },
    { label: 'บูรณาการ', x: 440, y: 870 },
  ]

  ctx.fillStyle = '#000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = '500 14px "IBM Plex Sans Thai"'

  for (const { label, x, y } of thaiLabels) {
    const lines = label.split('\n')
    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * 18) // 18 = line height
    })
  }
}

async function addEnglishText(ctx: CanvasRenderingContext2D) {
  // Example positions for each piece — same positions as Thai labels
  const englishLabels: LabelPosition[] = [
    { label: 'Education', x: 95, y: 360 },
    { label: 'Psychology', x: 210, y: 360 },
    { label: 'Pharmacy', x: 325, y: 360 },
    { label: 'Dentistry', x: 440, y: 360 },

    { label: 'Communication\nArts', x: 95, y: 485 },
    { label: 'Applied Health\nSciences', x: 210, y: 485 },
    { label: 'Fine and\nApplied Arts', x: 325, y: 485 },
    { label: 'Veterinary\nMedicine', x: 440, y: 485 },

    { label: 'Law', x: 95, y: 610 },
    { label: 'Architecture', x: 210, y: 610 },
    { label: 'Engineering', x: 325, y: 610 },
    { label: 'Arts', x: 440, y: 610 },

    { label: 'Medicine', x: 95, y: 735 },
    { label: 'Science', x: 210, y: 735 },
    { label: 'Economics', x: 325, y: 735 },
    { label: 'Political Science', x: 440, y: 735 },

    { label: 'Commerce and\nAccountancy', x: 95, y: 855 },
    { label: 'Sports\nScience', x: 210, y: 855 },
    { label: 'Agricultural\nResources', x: 325, y: 855 },
    { label: 'Integrated\nInnovation', x: 440, y: 855 },
  ]

  ctx.fillStyle = '#000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = '500 14px "IBM Plex Sans Thai"'

  for (const { label, x, y } of englishLabels) {
    const lines = label.split('\n')
    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * 18) // 18 = line height
    })
  }
}
