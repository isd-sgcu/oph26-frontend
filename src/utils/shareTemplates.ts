export async function processWatermarkTemplate(
  base64Image: string,
  logoUrl: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const baseImg = new Image()
    baseImg.src = base64Image

    baseImg.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) return reject('Canvas not supported')

      // Set canvas size equal to image
      canvas.width = baseImg.width
      canvas.height = baseImg.height

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

      gradient.addColorStop(0, 'rgba(255, 105, 180, 0)')   // transparent
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
        resolve(canvas.toDataURL('image/png'))
      }

      logo.onerror = reject
    }

    baseImg.onerror = reject
  })
}

export async function processFramedTemplate(
  capturedBase64: string,
  username: string,
  userData: string,
  bgUrl: string,
  logoUrl: string
): Promise<string> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  canvas.width = 1080
  canvas.height = 1920

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
  const mapWidth = 800
  const mapHeight = 800
  const mapX = (canvas.width - mapWidth) / 2
  const mapY = 620

  ctx.save()
  ctx.beginPath()
  roundRect(ctx, mapX, mapY, mapWidth, mapHeight, 40)
  ctx.clip()
  ctx.drawImage(mapImg, mapX, mapY, mapWidth, mapHeight)
  ctx.restore()

  // 4️⃣ Wait for font
  await document.fonts.load('bold 60px "IBM Plex Sans Thai"')
  await document.fonts.load('40px "IBM Plex Sans Thai"')

  ctx.fillStyle = '#f481b4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = 'bold 60px "IBM Plex Sans Thai"'
  ctx.fillText(username, canvas.width / 2, 300)

  ctx.font = '60px "IBM Plex Sans Thai"'
  ctx.fillText('Missing pieces', canvas.width / 2, 500)

  ctx.font = '40px "IBM Plex Sans Thai"'
  ctx.fillText(`collected ${userData} items`, canvas.width / 2, 1250)

  // 5️⃣ Draw logo
  const logoWidth = logo.width * 1.2
  const logoHeight = (logo.height / logo.width) * logoWidth

  ctx.drawImage(
    logo,
    (canvas.width - logoWidth) / 2,
    90,
    logoWidth,
    logoHeight
  )

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
