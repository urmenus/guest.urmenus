export type Project = {
  id: string
  title: string
  slug: string
  address: string
  tables: Tables
  categories: Category[]
  products: Product[]
  stopList: StopList
  // promo: Promo[]
}

export type PromoTypes = 'gift' | 'discount' | 'gift+discount'

type PromoBase = {
  type: PromoTypes
  title: string
  code: string
  isActive: boolean
  stipulation: (cart: Cart) => boolean
}

// export type PromoCode = {
//   stipulation: (cart: Cart) => boolean
//   result: (cart: Cart) => void
// }

type PromoGift = PromoBase & {
  type: 'gift'
  result: (cart: Cart) => Product
}

type PromoDiscount = PromoBase & {
  type: 'discount'
  result: (percent: number, cart: Cart) => number
}

export type Promo = PromoGift | PromoDiscount

export type Tables = {
  max: number
  areTaken: number[]
}

export type StopList = {
  ingredients: string[]
  products: number[]
}

export type Category = {
  id: number
  title: string
}

type ProductBase = {
  id: number
  categoryId: number
  title: string
  desc: string
  ingredients: string[]
  image: string
  price: number
  isChangeable: boolean
  isVisible: boolean
  weight: {
    value: number
    type: 'kg' | 'g'
  }
}

export type ProductCart = Product & { count: number; comment?: string }

export type ProductWithVolume = ProductBase & {
  volume: {
    value: number
    type: 'l' | 'ml'
  }
  quantity?: undefined
}

export type ProductWithQuantity = ProductBase & {
  volume?: undefined
  quantity: number
}
export type Product = ProductWithVolume | ProductWithQuantity
