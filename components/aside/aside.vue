<template>
  <div class="bg-base-100 min-h-full relative">
    <aside-menu @close="toggleAside(false)" v-model:user="user" />
    <div class="absolute inset-x-0 bottom-0 flex ~px-4 justify-center items-center flex-col gap-8">
      <aside-profile @close="toggleAside(false)" v-model:user="user" />
      <aside-theme-switcher />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { toggleAside } = useUnState()

const { user } = storeToRefs(useUser())
</script>
