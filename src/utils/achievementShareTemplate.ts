import logoUrl from '/logo.svg'
import shareTemplate3 from '/background/shareTemplate3.svg'
import shareTemplate4 from '/background/shareTemplate4.svg'
import shareTemplate5 from '/background/shareTemplate5.svg'
import lockedUrl from '/game/locked.svg'

function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"]
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
    '400 110px "IBM Plex Sans Thai"'
  ]

  await Promise.all(fonts.map(f => document.fonts.load(f)))
  await document.fonts.ready

  // Small delay to ensure layout flush
  await new Promise(resolve => requestAnimationFrame(() => resolve(null)))
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
        description2: 'เป็นภาพครบ'
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

    const [bg] = await Promise.all([
        loadImage(shareTemplate5),
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
    // Rank
    ctx.font = '500 65px "IBM Plex Sans Thai"'
    const rankText = lang === 0
        ? `${localizedText.th.rank}`
        : `${localizedText.en.rank}`
    ctx.fillText(rankText, canvas.width / 2, 550)

    // description
    ctx.font = '500 60px "IBM Plex Sans Thai"'
    const descriptionText = lang === 0
        ? `${localizedText.th.description}`
        : `${localizedText.en.description}`
    ctx.fillText(descriptionText, canvas.width / 2, 1500)

    // description2
    const description2Text = lang === 0
        ? `${localizedText.th.description2}`
        : `${localizedText.en.description2}`
    ctx.fillText(description2Text, canvas.width / 2, 1600)

    // rank number
    ctx.fillStyle = '#FFFFFF' // text color

    if (rank > 99 && rank <= 999 && lang === 1) {
        ctx.font = '600 200px "IBM Plex Sans Thai"' // weight + size + family
    } else if (rank > 999) {
        if (lang === 1) ctx.font = '600 150px "IBM Plex Sans Thai"' // weight + size + family
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

    const rankTextWithOrdinal = lang === 0
        ? `${rank}`
        : `${getOrdinal(rank)}`
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
        description2: 'จากทั้งหมด'
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

    const [bg] = await Promise.all([
        loadImage(shareTemplate5),
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
    // Rank
    ctx.font = '500 65px "IBM Plex Sans Thai"'
    const rankText = lang === 0
        ? `${localizedText.th.start}`
        : `${localizedText.en.start}`
    ctx.fillText(rankText, canvas.width / 2, 550)

    // description
    ctx.font = '500 60px "IBM Plex Sans Thai"'
    const descriptionText = lang === 0
        ? localizedText.th.description.replace('{{}}', String(percentile))
        : localizedText.en.description.replace('{{}}', String(percentile))
    ctx.fillText(descriptionText, canvas.width / 2, 1500)

    // description2
    const description2Text = lang === 0
        ? `${localizedText.th.description2}`
        : `${localizedText.en.description2}`
    ctx.fillText(description2Text, canvas.width / 2, 1600)

    // rank number
    ctx.fillStyle = '#FFFFFF' // text color
    ctx.font = '600 250px "IBM Plex Sans Thai"' // weight + size + family
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
        description: 'กำลังตามหาเพื่อนคณะ{{}}',
        description2: 'เช่นเดียวกับฉัน',
        },
        en: {
        start: 'There are',
        description: 'others finding {{}}',
        description2: 'friends like me.',
        },
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('Canvas not supported')

    canvas.width = 1080
    canvas.height = 1920

    const [bg] = await Promise.all([
        loadImage(shareTemplate5),
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
    // Rank
    ctx.font = '500 65px "IBM Plex Sans Thai"'
    const rankText = lang === 0
        ? `${localizedText.th.start}`
        : `${localizedText.en.start}`
    ctx.fillText(rankText, canvas.width / 2, 550)

    // description
    ctx.font = '500 60px "IBM Plex Sans Thai"'
    const descriptionText = lang === 0
        ? localizedText.th.description.replace('{{}}', String(faculty))
        : localizedText.en.description.replace('{{}}', String(faculty))
    ctx.fillText(descriptionText, canvas.width / 2, 1500)

    // description2
    const description2Text = lang === 0
        ? `${localizedText.th.description2}`
        : `${localizedText.en.description2}`
    ctx.fillText(description2Text, canvas.width / 2, 1600)

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
    const rankText = lang === 0
        ? `${localizedText.th.start}`
        : `${localizedText.en.start}`
    ctx.fillText(rankText, canvas.width / 2, 470)

    // minicard1 head
    ctx.font = '500 55px "IBM Plex Sans Thai"'
    const minicard1startText = lang === 0
        ? localizedText.th.miniCard1desc
        : localizedText.en.miniCard1desc
    ctx.fillText(minicard1startText, canvas.width / 4, 1200)

    // minicard2 head
    ctx.font = '500 55px "IBM Plex Sans Thai"'
    const minicard2startText = lang === 0
        ? localizedText.th.miniCard2desc
        : localizedText.en.miniCard2desc
    ctx.fillText(minicard2startText, 3 * canvas.width / 4, 1200)

    // minicard1 end
    ctx.font = '400 50px "IBM Plex Sans Thai"'
    const minicard1endText = lang === 0
        ? `${localizedText.th.miniCard1desc2.replace('{{}}', String(miniCard1Count))}`
        : `${localizedText.en.miniCard1desc2.replace('{{}}', String(miniCard1Count))}`
    ctx.fillText(minicard1endText, canvas.width / 4 , 1730)

    // minicard2 end
    const minicard2endText = lang === 0
        ? `${localizedText.th.miniCard2desc2}`
        : `${localizedText.en.miniCard2desc2}`
    ctx.fillText(minicard2endText, 3 * canvas.width / 4, 1730)

    // minicard1 faculty
    ctx.fillStyle = '#F481B4'
    ctx.font = '400 120px "IBM Plex Sans Thai"'
    ctx.fillText(miniCard1Faculty, canvas.width / 4, 1500)

    // minicard2 rank    ctx.fillStyle = '#F481B4'
    if (miniCard2Rank > 0 && miniCard2Rank <= 999) {
        ctx.font = '400 120px "IBM Plex Sans Thai"'
        const rankTextWithOrdinal = lang === 0
            ? `${miniCard2Rank}`
            : `${getOrdinal(miniCard2Rank)}`
        ctx.fillText(rankTextWithOrdinal, 3 * canvas.width / 4, 1500)
    } else if (miniCard2Rank > 999) { 
        ctx.font = '400 100px "IBM Plex Sans Thai"'
        const rankTextWithOrdinal = lang === 0
            ? `${miniCard2Rank}`
            : `${getOrdinal(miniCard2Rank)}`
        ctx.fillText(rankTextWithOrdinal, 3 * canvas.width / 4, 1500)
    } else {
        ctx.drawImage(locked, 3 * canvas.width / 4 - 70, 1400, 120, 150)
    }

    // piece/ชิ้น
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '400 50px "IBM Plex Sans Thai"'
    const pieceText = lang === 0
        ? 'ชิ้น'
        : (collected > 1 ? 'pieces' : 'piece')
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

export async function achievementShareCollectedPieces(
    name: string,
    facultyCounts: Record<string, number>,
    lang: 0 | 1 // 0 = th, 1 = en
) {

}