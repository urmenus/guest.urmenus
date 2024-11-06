<template>
  <div>
    <div class="drawer">
      <input id="aside-drawer" type="checkbox" class="drawer-toggle" v-model="isAsideOpen" />
      <div class="drawer-content">
        <main class="min-h-dvh flex flex-col">
          <Header />
          <div class="flex-1">
            <slot />
          </div>
          <div class="my-4 text-center">
            <span class="">
              По всем вопросам обращайтесь на почту <a href="mailto:help@urmenus.ru" class="link">help@urmenus.ru</a>
            </span>
          </div>
        </main>
      </div>
      <div class="drawer-side z-50">
        <div @click="toggleAside(false)" aria-label="close sidebar" class="drawer-overlay"></div>
        <Aside />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isAsideOpen, toggleAside } = useUnState()
</script>
