<template>
  <div role="tablist" class="tabs tabs-lifted">
    <ClientOnly>
      <button
        type="button"
        role="tab"
        v-for="t in themes"
        :key="t.theme"
        class="tab"
        :class="{ 'tab-active': $colorMode.preference == t.theme }"
        @click="$colorMode.preference = t.theme"
      >
        <Icon :name="t.icon" size="1.25rem" />
      </button>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const { $colorMode } = useNuxtApp()

const themes = [
  { theme: 'system', icon: 'bx:mobile' },
  { theme: 'dark', icon: 'bxs:moon' },
  { theme: 'light', icon: 'bxs:sun' },
]
</script>

<style></style>
