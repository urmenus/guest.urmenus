import { defineStore } from 'pinia'

export type UserHistory = {
  title: string
  slug: string
  cost: number
}

export type User = {
  firstName: string
  lastName: string
  email: string
  id: string
  isEmailVerified: boolean
  createdAt: string
  history: UserHistory[]
}

export const useUser = defineStore('UserPinia', () => {
  // const user = shallowRef<User | null>({
  //   firstName: 'Александр',
  //   lastName: 'Лядов',
  //   email: '69@milley.uno',
  //   id: 'sad_boy1223',
  //   isEmailVerified: false,
  //   createdAt: '2024-08-03T12:02:16.519Z',
  //   history: [
  //     { slug: 'headmen', title: 'Headmen', cost: 1566.54 },
  //     { slug: 'monopoly-moscow', title: 'Monopoly Moscow', cost: 2889.22 },
  //   ],
  // })
  const user = shallowRef<User | null>(null)

  const changeUser = (_user: Partial<User>, isLogout = false) => {
    if (isLogout) {
      user.value = null
      return navigateTo(NUXT_LINKS.INDEX)
    } else user.value = { ...user.value, ..._user } as User
  }

  const isUser = computed(() => !!user.value)

  return { user, changeUser, isUser }
})
