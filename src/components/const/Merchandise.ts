type Variant = {
    title: string
    imgPath: string[]
}

type Merchandise = {
    itemId: string
    thumbnail: string
    name: string
    price: number
    detail: string
    variant: [Variant, ...Variant[]]
    shopName: string
    shopUrl: string
}

export const MERCHANDISE: Merchandise[] = [
    {
        itemId: '1',
        thumbnail: '/info/merchandise/image1.png',
        name: 'item1',
        price: 0,
        detail: 'detail detail detail detail detail detail detail detail detail detail detail detail detail detail detail detail ',
        variant: [
            {
            title: 'var1',
            imgPath: ['/info/merchandise/image1.png','/info/merchandise/image2.png','/info/merchandise/image3.png','/info/merchandise/image4.png','/info/merchandise/image5.png']
            }
        ],
        shopName: '',
        shopUrl: '',
    },
    {
        itemId: '2',
        thumbnail: '',
        name: 'item2',
        price: 10,
        detail: 'detail detail detail detail detail detail detail detail detail detail detail detail detail detail detail detail ',
        variant: [
            {
            title: 'var1',
            imgPath: ['','','','','']
            },
            {
            title: 'var2',
            imgPath: ['','','','','']
            },
            {
            title: 'var3',
            imgPath: ['','','','','']
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