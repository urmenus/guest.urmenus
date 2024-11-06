<template>
  <ui-navbar class="top-0 sticky bg-base-100 z-[51]">
    <template #start>
      <button type="button" @click="toggleAside()" class="btn btn-ghost btn-square">
        <Icon name="bx:menu-alt-left" size="1.5rem" />
      </button>
    </template>
    <template #center>
      <p class="btn btn-ghost no-animation text-xl">{{ title }}</p>
    </template>
  </ui-navbar>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ title?: string }>(), { title: 'Menus' })

const { toggleAside } = useUnState()
</script>
