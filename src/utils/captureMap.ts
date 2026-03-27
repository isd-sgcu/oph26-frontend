import { PieceCountType } from '@/contexts/GameContext'

type CaptureResult = {
  img: string
  img2: string
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/png')
  )
}

const missingPieceImages: Record<number, HTMLImageElement> = {}

async function loadMissingPieces() {
  const variants = [1, 2, 4, 5, 6]

  await Promise.all(
    variants.map(async (v) => {
      const img = await loadImage(`/game/piece/blank${v}.png`)
      missingPieceImages[v] = img
    })
  )
}

export async function captureGameMap(
  collectedPieces: PieceCountType
): Promise<CaptureResult> {
  const size = 1024

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = size
  canvas.height = size

  const bg = await loadImage('/game/game_map.webp')

  // ---------- IMAGE 1 ----------
  ctx.clearRect(0, 0, size, size)
  ctx.drawImage(bg, 0, 0, size, size)

  await loadMissingPieces()

  drawJigsaw(ctx, collectedPieces)

  const blob1 = await toBlob(canvas)
  const img = URL.createObjectURL(blob1)

  // ---------- IMAGE 2 ----------

  drawBadges(ctx, collectedPieces)

  const blob2 = await toBlob(canvas)
  const img2 = URL.createObjectURL(blob2)

  return { img, img2 }
}

type FacultyKey = keyof PieceCountType

type Variant = 1 | 2 | 4 | 5 | 6

type FacultyConfig = {
  x: number
  y: number
  size: number
  variant: Variant
}

type VariantScale = {
  x: number
  y: number
}

export const PIECE_CONFIG: Record<FacultyKey, FacultyConfig> = {
  cusar: { x: 255, y: 500, size: 80, variant: 6 },
  spsc: { x: 415, y: 580, size: 80, variant: 1 },
  psy: { x: 620, y: 360, size: 80, variant: 2 },
  ahs: { x: 605, y: 580, size: 75, variant: 1 },

  pharm: { x: 975, y: 562, size: 80, variant: 4 },
  dent: { x: 1200, y: 420, size: 80, variant: 4 },
  vet: { x: 1385, y: 560, size: 80, variant: 2 },

  scii: { x: 680, y: 735, size: 80, variant: 5 },

  arch: { x: 1000, y: 860, size: 90, variant: 6 },
  faa: { x: 1250, y: 885, size: 80, variant: 4 },
  arts: { x: 1390, y: 810, size: 80, variant: 4 },

  edu: { x: 680, y: 1260, size: 80, variant: 1 },
  commarts: { x: 640, y: 1420, size: 90, variant: 6 },
  law: { x: 715, y: 1550, size: 80, variant: 5 },

  sci: { x: 950, y: 1270, size: 80, variant: 6 },
  eng: { x: 1252, y: 1270, size: 80, variant: 2 },
  cbs: { x: 975, y: 1585, size: 80, variant: 1 },
  polsci: { x: 1255, y: 1430, size: 80, variant: 5 },
  econ: { x: 1290, y: 1580, size: 80, variant: 5 },

  md: { x: 1660, y: 1395, size: 80, variant: 2 },
}

type BadgeConfig = {
  offsetX: number
  offsetY: number
  size?: number
}

export const BADGE_CONFIG: Record<keyof PieceCountType, BadgeConfig> = {
  cusar: { offsetX: 0, offsetY: -100 },
  spsc: { offsetX: 40, offsetY: -100 },
  psy: { offsetX: 80, offsetY: -20 },
  ahs: { offsetX: 100, offsetY: -70 },

  pharm: { offsetX: 80, offsetY: -60 },
  dent: { offsetX: 60, offsetY: -80 },
  vet: { offsetX: 40, offsetY: -60 },

  scii: { offsetX: -130, offsetY: -30 },

  arch: { offsetX: 30, offsetY: -70 },
  faa: { offsetX: 0, offsetY: -110 },
  arts: { offsetX: 70, offsetY: -70 },

  edu: { offsetX: 90, offsetY: -80 },
  commarts: { offsetX: 110, offsetY: -50 },
  law: { offsetX: -70, offsetY: -50 },

  sci: { offsetX: 50, offsetY: -90 },
  eng: { offsetX: 100, offsetY: -60 },
  cbs: { offsetX: 90, offsetY: -80 },
  polsci: { offsetX: 90, offsetY: -70 },
  econ: { offsetX: 100, offsetY: -70 },

  md: { offsetX: 80, offsetY: -80 },
}

function drawJigsaw(
  ctx: CanvasRenderingContext2D,
  collectedPieces: PieceCountType
) {
  const canvasSize = 1024
  const baseSize = 2000
  const scale = canvasSize / baseSize

  const variantScale: Record<Variant, VariantScale> = {
    1: { x: 1.1, y: 1 },
    2: { x: 1.3, y: 1 },
    4: { x: 1.1, y: 1.1 },
    5: { x: 1, y: 1.3 },
    6: { x: 1, y: 1.1 },
  }

  Object.entries(PIECE_CONFIG).forEach(([faculty, config]) => {
    const count = collectedPieces[faculty as keyof PieceCountType]
    const scaleConfig = variantScale[config.variant] ?? { x: 1, y: 1 }

    if (count > 0) return

    const img = missingPieceImages[config.variant]
    if (!img) return

    const x = config.x * scale
    const y = config.y * scale

    const width = config.size * scale * scaleConfig.x
    const height = config.size * scale * scaleConfig.y

    ctx.drawImage(img, x - width / 2, y - height / 2, width, height)
  })
}

function drawBadges(
  ctx: CanvasRenderingContext2D,
  collectedPieces: PieceCountType
) {
  const canvasSize = 1024
  const baseSize = 2000
  const scale = canvasSize / baseSize

  Object.entries(PIECE_CONFIG).forEach(([faculty, config]) => {
    const count = collectedPieces[faculty as keyof PieceCountType]
    if (count <= 1) return

    const badge = BADGE_CONFIG[faculty as keyof PieceCountType]
    if (!badge) return

    const baseX = config.x * scale
    const baseY = config.y * scale

    const x = baseX + badge.offsetX * scale
    const y = baseY + badge.offsetY * scale

    ctx.save()

    const gradient = ctx.createLinearGradient(x, y - 20, x, y + 20)
    gradient.addColorStop(0, '#fafae6')
    gradient.addColorStop(1, '#ffd285')

    ctx.fillStyle = gradient

    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#000'
    ctx.font = '400 20px "IBM Plex Sans Thai"'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const text = count > 99 ? '99+' : String(count)
    ctx.fillText(text, x, y)

    ctx.restore()
  })
}
