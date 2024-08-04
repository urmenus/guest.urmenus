export default defineNuxtRouteMiddleware((to, from) => {
  const { isUser } = storeToRefs(useUser())

  if (!isUser) return navigateTo('/')
})
