<template>
  <div>
    <div class="drawer">
      <input id="aside-drawer" type="checkbox" class="drawer-toggle" v-model="isDrawerOpen" />
      <div class="drawer-content">
        <main class="min-h-dvh flex flex-col">
          <Header />
          <div class="flex-1">
            <slot />
          </div>
          <div class="my-4 text-center">
            <span class="">
              По всем вопросам обращайтесь на почту <a href="mailto:menus@milley.uno" class="link">menus@milley.uno</a>
            </span>
          </div>
        </main>
      </div>
      <div class="drawer-side z-50">
        <div @click="isDrawerOpen = false" aria-label="close sidebar" class="drawer-overlay"></div>
        <Aside @close="isDrawerOpen = false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isDrawerOpen = useState('is-drawer-open', () => false)
</script>
