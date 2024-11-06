export const useUnState = () => {
  const isAsideOpen = useState('is-drawer-open', () => false)
  const toggleAside = (value?: boolean) => {
    if (typeof value === 'undefined') isAsideOpen.value = !isAsideOpen.value
    else isAsideOpen.value = value
  }

  const isCartOpen = useState('is-cart-open', () => false)
  const toggleCart = (value?: boolean) => {
    if (typeof value === 'undefined') isCartOpen.value = !isCartOpen.value
    else isCartOpen.value = value
  }

  return { isAsideOpen, toggleAside, isCartOpen, toggleCart }
}
