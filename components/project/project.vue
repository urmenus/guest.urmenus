<template>
  <div class="~pt-2 bg-base-200 rounded-t-2xl relative">
    <div class="~h-12 w-full sticky top-0">
      <nav role="tablist" class="tablist">
        <div
          @click.prevent="activeTab = cat.title"
          role="tab"
          class="m-1 h-8 text-base-content font-medium text-sm leading-8 px-4 grow-0 shrink-0 basis-auto"
          :class="[activeTab === cat.title ? 'text-opacity-100' : 'text-opacity-75']"
          v-for="cat in data.categories"
          :key="cat.id"
        >
          {{ cat.title }}
        </div>
      </nav>
      <div class="flex justify-end mr-6">
        <div class="flex flex-row items-center gap-2">
          <span class="label-text">Вид</span>
          <label class="swap swap-rotate">
            <input type="checkbox" v-model="isListOrGrid" />

            <Icon name="bx:align-justify" class="swap-on size-8" />
            <Icon name="bx:bxs-grid" class="swap-off size-8" />
          </label>
        </div>
      </div>
    </div>
    <section class="px-4">
      <template v-for="cat in data.categories" :key="cat.id">
        <div class="~flex ~mt-8">
          <h2 class="w-full font-medium text-2xl leading-7 pt-6 px-0 pb-2 relative">
            {{ cat.title }}
          </h2>
          <div :class="{ 'grid grid-cols-2 gap-4': !isListOrGrid }">
            <project-product-card
              v-for="prod in data.products.filter(({ categoryId }) => categoryId === cat.id)"
              :key="prod.id"
              :product="prod"
              :stop-list="data.stopList"
              v-model="isListOrGrid"
            />
          </div>
        </div>
      </template>
      <pre>data: {{ data }}</pre>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { Project } from '~/types'

const isListOrGrid = useStorage('is-list-or-grid', false)

const { data } = defineProps<{ data: Project }>()

const activeTab = ref<string>('')

onMounted(() => {
  activeTab.value = data.categories[0].title
})

// watch() {
//     viewCard(newValue) {
//       if (newValue === 'list') {
//         // Если выбрано "Список", то автоматически сбрасываем "Таблица"
//         this.viewCard = 'list';
//       } else {
//         // Если выбрано "Таблица", то автоматически сбрасываем "Список"
//         this.viewCard = 'table';
//       }
//     }
</script>

<style scoped>
.tablist {
  height: 3rem;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  user-select: none;
  &::after,
  &::before {
    content: ' ';
    display: block;
    width: 12px;
    height: 3rem;
    flex: 0 0 auto;
  }
}
</style>
