<template>
  <div>
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
    <NuxtLayout>
      <NuxtPage
        :page-key="($route) => $route.fullPath"
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} | Menus` : 'Menus'),
})
const { changeUser } = useUser()

onMounted(() => {
  const q = localStorage.getItem('QWE') ?? ''
  if (q !== '')
    changeUser({
      firstName: 'Александр',
      lastName: 'Лядов',
      email: '69@milley.uno',
      id: 'sad_boy1223',
      isEmailVerified: false,
      createdAt: '2024-08-03T12:02:16.519Z',
      history: [
        { slug: 'headmen', title: 'Headmen', cost: 1566.54 },
        { slug: 'monopoly-moscow', title: 'Monopoly Moscow', cost: 2889.22 },
      ],
    })
})
</script>

<style>
.qwe {
  border: 1px solid salmon;
}
.qwe2 > * {
  border: 1px solid salmon;
}
.qwe3 * {
  border: 1px solid salmon;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.05rem);
}
</style>
