<template>
  <div class="drawer drawer-end">
    <input id="cart-drawer" type="checkbox" class="drawer-toggle" v-model="isCartOpen" />
    <div class="drawer-content">
      <div>
        <Header :title="data?.title" />
        <transition name="page" mode="out-in">
          <div v-if="!data" class="flex h-full">
            <Vue3Lottie :animationData="animationData" class="grayscale" />
          </div>
          <project v-else-if="takenTable && isTaken" :data="data" />
          <project-take-table
            v-else
            :title="title"
            :tables="data.tables"
            @take="isTaken = true"
            v-model:takenTable="takenTable"
          />
        </transition>
      </div>
      <project-cart-button @click="toggleCart(true)" />
    </div>
    <div class="drawer-side z-[52]">
      <!-- <div @click="drawer = false" aria-label="close sidebar" class="drawer-overlay"></div> -->
      <project-cart @close="toggleCart(false)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import animationData from 'assets/animation.json'
import { Vue3Lottie } from 'vue3-lottie'

const slug = useRouteParams('title', '', { transform: String, mode: 'push' })

const { isCartOpen, toggleCart } = useUnState()
const { createId } = useCart()

const takenTable = ref<number>(2)
const isTaken = ref(false)

const { data } = useAsyncData(
  `project:${slug.value}`,
  () =>
    $fetch(`/api/project/${slug.value}`, {
      method: 'GET',
      onResponse: ({ response }) => {
        if (response.status === 200) {
          const { slug, title } = response._data
          localStorage.setItem('project:last', JSON.stringify({ title, slug }))
        }
      },
    }),
  { server: false, lazy: true }
)

const title = computed(() => (data.value ? data.value.title : ''))

useHead({ title: title.value })
definePageMeta({ layout: 'project' })

watch(
  isTaken,
  (val) => {
    if (val) createId(slug.value, takenTable.value)
  },
  { immediate: true }
)
</script>

<style></style>
