<template>
  <div class="navbar relative z-[51]" :class="[isDrawerOpen ? 'bg-base-100' : 'bg-base-100']">
    <div class="navbar-start">
      <button type="button" @click="isDrawerOpen = !isDrawerOpen" class="btn btn-ghost btn-square">
        <Icon name="bx:menu-alt-left" size="1.5rem" />
      </button>
    </div>
    <div class="navbar-center">
      <p class="btn btn-ghost no-animation text-xl">{{ title }}</p>
    </div>
    <div class="navbar-end"></div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ title?: string }>(), { title: 'Menus' })

const isDrawerOpen = useState('is-drawer-open', () => false)
</script>
