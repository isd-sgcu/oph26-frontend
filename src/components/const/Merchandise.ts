type Variant = {
    id: number
    title: string
    detail: string
    thumbnail: string
    imgPath: string[]
}

type Merchandise = {
    itemId: string
    name: string
    price: number
    variant: [Variant, ...Variant[]]
    shopName: string
    shopUrl: string
}

export const MERCHANDISE: Merchandise[] = [
    {
        itemId: '1',
        name: 'กระเป๋าผ้า',
        price: 239,
        variant: [
            {
                id: 1,
                title: 'CHULA Day',
                detail: 'กระเป๋าผ้าแคนวาส CHULA Day ขนาด 14*16 นิ้ว ไอเทมสุดน่ารักเสริมโชคและกำลังใจในการสอบ',
                thumbnail: '/info/merchandise/thumbnail/1.png',
                imgPath: [
                    '/info/merchandise/pic/whitebag (1).png',
                    '/info/merchandise/pic/whitebag (2).png',
                    '/info/merchandise/pic/whitebag (3).png',
                    '/info/merchandise/pic/whitebag (4).png',
                    '/info/merchandise/pic/whitebag (5).png',
                ]
            },
            {
                id: 2,
                title: 'Carry-All Chula Edition',
                detail: 'ไอเทมลับเด็กเตรียมสอบ! กระเป๋า Carry-All Chula Edition เนื้อผ้าแคนวาส ขนาด 14*16 นิ้ว จุชีทติวได้เพียบ สะพายรับพลังจามจุรี มูให้สุดแล้วไปหยุดที่สอบติด',
                thumbnail: '/info/merchandise/thumbnail/2.png',
                imgPath: [
                    '/info/merchandise/pic/blackbag (1).png',
                    '/info/merchandise/pic/blackbag (2).png',
                    '/info/merchandise/pic/blackbag (3).png',
                    '/info/merchandise/pic/blackbag (4).png',
                    '/info/merchandise/pic/blackbag (5).png',
                ]
            }
        ],
        shopName: '',
        shopUrl: '',
    },
    {
        itemId: '2',
        name: 'การ์ดสายมู',
        price: 39,
        variant: [
            {
                id: 1,
                title: 'ยันต์น้องต่าย',
                detail: 'ไอเทมลับฉบับสายมู! การ์ดยันต์น้องต่าย พกไว้อุ่นใจ สอบติดชัวร์ ผลิตจากพลาสติก PET หนา 250 ไมครอน ขนาด 85.6 x 54 มิลลิเมตร แข็งแรง พกพาง่าย เสริมดวงน้องๆ ม.ปลายสู่รั้วจุฬาฯ',
                thumbnail: "/info/merchandise/thumbnail/3.png",
                imgPath: [
                    '/info/merchandise/pic/bunnycard (1).png',
                    '/info/merchandise/pic/bunnycard (2).png',
                    '/info/merchandise/pic/bunnycard (3).png',
                    '/info/merchandise/pic/bunnycard (4).png',
                    '/info/merchandise/pic/bunnycard (5).png',
                ]
            },
            {
                id: 2,
                title: 'All in!',
                detail: 'เทหมดหน้าตักเพื่อจุฬาฯ! การ์ด All in! ไอเทมนำโชคคู่ใจเด็กม.ปลาย ขนาด 85.6 x 54 มิลลิเมตร วัสดุพลาสติก PET หนา 250 ไมครอน ทนทาน พกพาง่าย ให้การสอบติดเป็นแจ็คพอตของน้องๆ!',
                thumbnail: "/info/merchandise/thumbnail/4.png",
                imgPath: [
                    '/info/merchandise/pic/allincard (1).png',
                    '/info/merchandise/pic/allincard (2).png',
                    '/info/merchandise/pic/allincard (3).png',
                    '/info/merchandise/pic/allincard (4).png',
                    '/info/merchandise/pic/allincard (5).png',
                ]
            },
            {
                id: 3,
                title: 'CU Vibe',
                detail: 'ไขประตูสู่รั้วจามจุรีด้วย การ์ด CU Vibe ขนาดพกพา 85.6 x 54 มิลลิเมตร ผลิตจากพลาสติก PET หนา 250 ไมครอน ไอเทมมูเตลูเสริมความมั่นใจ ให้น้องม.ปลายสอบติดชัวร์',
                thumbnail: "/info/merchandise/thumbnail/5.png",
                imgPath: [
                    '/info/merchandise/pic/vibecard (1).png',
                    '/info/merchandise/pic/vibecard (2).png',
                    '/info/merchandise/pic/vibecard (3).png',
                    '/info/merchandise/pic/vibecard (4).png',
                    '/info/merchandise/pic/vibecard (5).png',
                ]
            },
        ],
        shopName: '@......',
        shopUrl: '',
    },
    {
        itemId: '3',
        name: 'กำไลเชือกเทียน',
        price: 69,
        variant: [
            {
                id: 1,
                title: 'I Have Item',
                detail: 'กำไลเชือกเทียนถักมือสุดประณีต ของที่ระลึกสุดคิวท์จาก CU Open House 2026 ปรับขนาดได้ตั้งแต่ 16-30 ซม. (อาจคลาดเคลื่อนเล็กน้อยเพราะเป็นงานแฮนด์เมด) สินค้ามีหลายแบบให้เลือกนอกเหนือจากในภาพ มาเลือกแมทช์ความน่ารักในสไตล์ของคุณกลับบ้านกันเลย!',
                thumbnail: "/info/merchandise/thumbnail/6.png",
                imgPath: [
                    '/info/merchandise/pic/bracelet (1).png',
                    '/info/merchandise/pic/bracelet (2).png',
                    '/info/merchandise/pic/bracelet (3).png',
                    '/info/merchandise/pic/bracelet (4).png',
                    '/info/merchandise/pic/bracelet (5).png',
                ]
            },
        ],
        shopName: '@......',
        shopUrl: '',
    }
]

export const MERCHANDISE_MAP: Record<string, Merchandise> = Object.fromEntries(
  MERCHANDISE.map((m) => [m.itemId, m])
)

export function getMerchandiseById(itemId: string): Merchandise {
  const item = MERCHANDISE.find((m) => m.itemId === itemId)

  if (!item) {
    throw new Error(`Merchandise with id "${itemId}" not found`)
  }

  return item
}