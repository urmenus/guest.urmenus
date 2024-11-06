import { useSocket } from '@/stores/socket'

export default defineNuxtPlugin((nuxtApp) => {
  const NEST_URL = nuxtApp.$config.public.nestUrl
  // const { initUser } = useDatabase()
  // const { initPrimaryColor } = useVk()
  const { createConnection } = useSocket()
  // const { setAvatar } = useUser()

  nuxtApp.hook('vue:setup', () => {
    // bridge.send('VKWebAppGetUserInfo').then(({ id, last_name, first_name, photo_200 }) => {
    // const rand = Number.parseInt(sessionStorage.getItem('qwe') ?? '0')
    // const id = !rand ? 303315990 : 152486378
    // const first_name = !rand ? 'Александр' : 'Олег'
    // const last_name = !rand ? 'Лядов' : 'Майами'
    // const photo = [
    //   'https://sun3-3.userapi.com/s/v1/if2/VvLW6OJhwqH5fpT5zhP1Rg9aLC4yRUgdr5KX-c6WWusX5pZRUYMIQMSO7rrXIELSpg1FllOTWQn5kxHm82TKVqzo.jpg?quality',
    //   '95&crop',
    //   '0,507,1536,1536&as',
    //   '50x50,100x100,200x200,400x400&ava',
    //   '1&u',
    //   'zlAieUD1HrbcqSiVIdNW_Gn_14BCabP1OHC-vC9z93s&cs',
    //   '200x200',
    // ]
    // const photo_200 = photo.join('=')
    // setAvatar(photo_200)
    // const body: InitUserDto = { id, lastName: last_name, firstName: first_name }
    /*  */
    // initPrimaryColor()
    /*  */
    createConnection(NEST_URL, Math.floor(Number(new Date()) * Math.random()))
    // initUser(body).then((isReady) => {
    // if (isReady) {
    // bridge.send('VKWebAppInit')
    // }
    // })
    // })
  })
})
