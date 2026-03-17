export type Achievement =
  | { variant: 'var1'; stat: number }
  | { variant: 'var2'; stat: string; top: number }
  | { variant: 'var3'; stat: string; faculty: string }
  | {
      variant: 'overall'
      stat: number
      miniCard1Faculty: string
      miniCard1Count: number
      miniCard2Rank: number
    }
  | {
      variant: 'collectedPieces'
      stat: number
      edu: number
      psy: number
      pharm: number
      dent: number
      commarts: number
      ahs: number
      faa: number
      vet: number
      law: number
      arch: number
      eng: number
      arts: number
      md: number
      sci: number
      econ: number
      polsci: number
      cbs: number
      spsc: number
      scii: number
      cusar: number
    }
