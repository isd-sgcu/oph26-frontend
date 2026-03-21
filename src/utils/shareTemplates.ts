export async function processWatermarkTemplate(
  blobUrl: string,
  logoUrl: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const baseImg = new Image()
    baseImg.src = blobUrl

    baseImg.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) return reject('Canvas not supported')

      // Set canvas size equal to image
      canvas.width = baseImg.width
      canvas.height = baseImg.height

      // Clip to rounded rect so everything (image, gradient, logo)
      // will have rounded corners
      const radius = Math.min(40, canvas.width * 0.04, canvas.height * 0.04)

      // Draw shadow shape behind the rounded image (so shadow renders
      // outside the clipped area)
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 5
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 5
      ctx.beginPath()
      roundRect(ctx, 0, 0, canvas.width, canvas.height, radius)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.restore()

      // Clip and draw image
      ctx.save()
      ctx.beginPath()
      roundRect(ctx, 0, 0, canvas.width, canvas.height, radius)
      ctx.clip()

      // 1️⃣ Draw original image
      ctx.drawImage(baseImg, 0, 0)

      // 2️⃣ Create pink gradient from bottom
      const gradientHeight = canvas.height * 0.2

      const gradient = ctx.createLinearGradient(
        0,
        canvas.height - gradientHeight,
        0,
        canvas.height
      )

      gradient.addColorStop(0, 'rgba(255, 105, 180, 0)') // transparent
      gradient.addColorStop(1, 'rgba(246, 172, 210, 0.85)') // pink

      ctx.fillStyle = gradient
      ctx.fillRect(
        0,
        canvas.height - gradientHeight,
        canvas.width,
        gradientHeight
      )

      // 3️⃣ Load logo
      const logo = new Image()
      logo.src = logoUrl

      logo.onload = () => {
        const logoWidth = canvas.width * 0.2
        const logoHeight = (logo.height / logo.width) * logoWidth

        const padding = canvas.width * 0.02

        ctx.drawImage(
          logo,
          canvas.width - logoWidth - padding,
          canvas.height - logoHeight - padding,
          logoWidth,
          logoHeight
        )

        // 4️⃣ Export
        ctx.restore()
        resolve(canvas.toDataURL('image/png'))
      }

      logo.onerror = reject
    }

    baseImg.onerror = reject
  })
}

async function ensureFontsLoaded() {
  const fonts = [
    'bold 80px "IBM Plex Sans Thai"',
    '600 60px "IBM Plex Sans Thai"',
    '500 65px "IBM Plex Sans Thai"',
    '500 50px "IBM Plex Sans Thai"',
  ]

  await Promise.all(fonts.map((f) => document.fonts.load(f)))
  await document.fonts.ready

  // Small delay to ensure layout flush
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
}

export async function processFramedTemplate(
  capturedBase64: string,
  username: string,
  userData: string,
  bgUrl: string,
  logoUrl: string,
  lang: number // 0 = th, 1 = en
): Promise<string> {
  const localizedText = {
    th: {
      missingPieces: 'Missing pieces',
      collected: 'เก็บได้',
      faculty: 'คณะ',
    },
    en: {
      missingPieces: 'Missing pieces',
      collected: 'Collected',
      faculty: 'Faculty',
    },
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 540
  canvas.height = 960

  // Helper to load image
  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  // 1️⃣ Load everything first
  const [bg, mapImg, logo] = await Promise.all([
    loadImage(bgUrl),
    loadImage(capturedBase64),
    loadImage(logoUrl),
  ])

  // 2️⃣ Draw background
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  // 3️⃣ Draw rounded map
  const mapWidth = 450
  const mapHeight = 450
  const mapX = (canvas.width - mapWidth) / 2
  const mapY = 310

  // Draw shadow shape first
  ctx.save()

  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 5
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 5

  ctx.beginPath()
  roundRect(ctx, mapX, mapY, mapWidth, mapHeight, 40)
  ctx.fillStyle = 'white' // required to render shadow
  ctx.fill()

  ctx.restore()

  //Clip and draw image (without shadow)
  ctx.save()
  ctx.beginPath()
  roundRect(ctx, mapX, mapY, mapWidth, mapHeight, 40)
  ctx.clip()

  ctx.drawImage(mapImg, mapX, mapY, mapWidth, mapHeight)

  ctx.restore()

  // 4️⃣ Wait for font
  await ensureFontsLoaded()

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Name
  ctx.font = 'bold 40px "IBM Plex Sans Thai"'
  ctx.fillText(username, canvas.width / 2, 185)

  // Count
  ctx.fillText(userData, canvas.width / 2 - 25, 810)

  // /20 text
  ctx.font = '600 30px "IBM Plex Sans Thai"'
  ctx.fillText('/20', canvas.width / 2 + 25, 812)

  // Missing pieces text
  ctx.fillStyle = '#000000'
  ctx.font = '500 32px "IBM Plex Sans Thai"'
  ctx.fillText(
    localizedText[lang === 0 ? 'th' : 'en'].missingPieces,
    canvas.width / 2,
    275
  )

  // collected
  ctx.font = '500 25px "IBM Plex Sans Thai"'
  ctx.fillText(
    localizedText[lang === 0 ? 'th' : 'en'].collected,
    canvas.width * 0.25,
    810
  )

  // faculty
  ctx.fillText(
    localizedText[lang === 0 ? 'th' : 'en'].faculty,
    canvas.width * 0.75,
    810
  )

  // 5️⃣ Draw logo
  const logoWidth = logo.width * 0.125
  const logoHeight = (logo.height / logo.width) * logoWidth

  ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 45, logoWidth, logoHeight)

  return canvas.toDataURL('image/png')
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
}
