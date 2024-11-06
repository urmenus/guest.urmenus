<template>
  <div class="pt-1">
    <div class="max-w-full px-4 flex flex-col gap-4">
      <profile-stat />

      <profile-settings />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
