<template>
  <ul class="menu text-base-content w-80 flex px-4 justify-center pt-20">
    <li>
      <a href="" @click.prevent="toIndex">Главная</a>
    </li>
    <client-only>
      <li v-if="lastProject">
        <ul>
          <li class="menu-title">Последнее</li>
          <li>
            <a href="" @click.prevent="toSlug(lastProject ? lastProject.slug : '')">{{ lastProject.title }}</a>
          </li>
        </ul>
      </li>
    </client-only>
    <li v-if="user && user.history.length">
      <ul>
        <li class="menu-title">Ранее посещали</li>
        <li v-for="h in user.history" :key="h.slug">
          <a href="" class="break-words line-clamp-1 h-8" @click.prevent="toSlug(h.slug)">{{ h.title }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Project } from '@/types'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['close'])

const user = defineModel<User | null>('user', { default: null })

const lastProjectString = useStorage<Project | undefined>(`project:last`, undefined)
const lastProject = computed((): Project | undefined =>
  typeof lastProjectString.value === 'string' ? JSON.parse(lastProjectString.value) : undefined
)

const toIndex = () => {
  navigateTo(NUXT_LINKS.INDEX)
  emit('close')
}

const toSlug = (slug: string) => {
  navigateTo('/' + slug)
  emit('close')
}
</script>

<style></style>
