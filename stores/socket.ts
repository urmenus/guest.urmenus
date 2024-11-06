import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
// import io from 'socket.io-client'

export const useSocket = defineStore('SocketPinia', () => {
  const socket = ref<Socket | null>(null)
  const isConnect = ref<boolean>(true)

  const createConnection = async (url: string, id: number) => {
    // socket.value = io(url, { withCredentials: false, auth: { id } })
    // socket.value.on('connect', () => {
    //   console.log('connect')
    //   isConnect.value = true
    // })
    // socket.value.on('disconnect', () => {
    //   isConnect.value = false
    // })
  }

  return { socket, isConnect, createConnection }
})
