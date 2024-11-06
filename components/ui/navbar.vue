<template>
  <div class="navbar" :class="class">
    <div class="navbar-start">
      <slot name="start" />
    </div>
    <div class="navbar-center">
      <slot name="center" />
    </div>
    <div class="navbar-end">
      <slot name="end" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ class?: string }>()
</script>
