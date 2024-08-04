<template>
  <div class="bg-base-100 min-h-full relative">
    <aside-menu @close="$emit('close')" v-model:user="user" />
    <div class="absolute inset-x-0 bottom-0 flex ~px-4 justify-center items-center flex-col gap-8">
      <aside-profile @close="$emit('close')" v-model:user="user" />
      <aside-theme-switcher />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])

const { user } = storeToRefs(useUser())
</script>

<style></style>
