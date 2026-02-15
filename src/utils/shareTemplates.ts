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
