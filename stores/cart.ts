import { defineStore } from 'pinia'
import type { Product, ProductCart } from '~/types'

export type Cart = {
  id: string
  products: ProductCart[]
}

export const useCart = defineStore('CartPinia', () => {
  const route = useRoute()
  const cart = reactive<Cart>({
    id: '',
    products: [
      // {
      //   id: 4,
      //   categoryId: 0,
      //   title: 'Кофе Карамельный капучино',
      //   desc: 'Если не шоколад, то карамель! А капучино с карамельным сиропом особенно хорош',
      //   ingredients: ['кофе', 'сахар', 'молоко', 'сироп: карамель'],
      //   image: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.avif',
      //   price: 169,
      //   weight: { value: 230, type: 'g' },
      //   volume: { value: 0.3, type: 'l' },
      //   count: 4,
      //   isChangeable: true,
      //   isVisible: true,
      // },
      // {
      //   id: 1,
      //   categoryId: 2,
      //   title: 'Фондан',
      //   desc: 'Четверо из пяти гостей говорят «Oh la la!», когда едят этот французский десерт с хрустящей корочкой и топленой шоколадной начинкой',
      //   ingredients: [],
      //   image: 'https://media.dodostatic.net/image/r:233x233/11EE7D61B85ADB349AAD5044EC2803AE.avif',
      //   price: 339,
      //   weight: { value: 160, type: 'g' },
      //   quantity: 2,
      //   count: 1,
      //   isChangeable: false,
      //   isVisible: true,
      // },
      // {
      //   id: 0,
      //   categoryId: 2,
      //   title: 'Чизкейк Нью-Йорк',
      //   desc: 'Мы перепробовали тысячу десертов и наконец нашли любимца гостей — нежнейший творожный чизкейк',
      //   ingredients: [],
      //   image: 'https://media.dodostatic.net/image/r:233x233/11EE79700C641CDFA7205D59209744E3.avif',
      //   price: 179,
      //   weight: { value: 100, type: 'g' },
      //   quantity: 1,
      //   count: 1,
      //   isChangeable: false,
      //   isVisible: true,
      // },
    ],
  })

  const count = computed(() => cart.products.reduce((prev, cur) => prev + 1 * cur.count, 0))
  const total = computed(() => cart.products.reduce((prev, cur) => prev + cur.price * cur.count, 0))
  const totalCurrency = useCurrency(total, { notation: 'standard' })

  const createId = (slug: string, table: number) => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    cart.id = `${slug}:${table}_${hour}:${minute}`
  }

  const addProduct = (product: Product) => {
    const id = cart.products.findIndex(({ id }) => id === product.id)
    if (id === -1) cart.products.push({ ...product, count: 1 })
    else cart.products[id].count += 1
  }

  const changeCount = (productId: number, value: -1 | 1) => {
    const id = cart.products.findIndex(({ id }) => id === productId)
    if (id === -1) return
    const count = cart.products[id].count
    if (value === -1 && count === 1) {
      removeProduct(productId)
      return
    }
    cart.products[id].count += value
  }

  const changeSmthOnProduct = (_product: Partial<ProductCart>) => {
    const id = cart.products.findIndex(({ id }) => id === _product.id)
    if (id === -1) return

    cart.products[id] = { ...cart.products[id], ..._product } as ProductCart
  }

  const removeProduct = (productId: number) => {
    cart.products = cart.products.filter(({ id }) => id !== productId)
  }
  const clearCart = () => {
    cart.id = ''
    cart.products = []
  }

  return {
    cart,
    count,
    total,
    totalCurrency,
    addProduct,
    removeProduct,
    changeCount,
    clearCart,
    changeSmthOnProduct,
    createId,
  }
})
