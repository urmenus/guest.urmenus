<template>
  <div>
    <div class="drawer">
      <input id="aside-drawer" type="checkbox" class="drawer-toggle" v-model="isAsideOpen" />
      <div class="drawer-content">
        <main class="min-h-dvh">
          <slot />
        </main>
      </div>
      <div class="drawer-side z-50">
        <div @click="isAsideOpen = false" aria-label="close sidebar" class="drawer-overlay"></div>
        <Aside />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isAsideOpen = useState('is-drawer-open', () => false)
</script>
