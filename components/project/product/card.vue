<template>
  <article
    class="card bg-base-100 py-0 shadow my-4"
    :class="[isListOrGrid ? 'card-side' : 'card-compact pt-4']"
    v-if="product.isVisible"
  >
    <NuxtPicture
      :src="product.image"
      :alt="product.title"
      sizes="135px"
      class="flex items-center justify-center flex-[0_0_auto]"
      :imgAttrs="{ class: 'flex-[0_0_auto]' }"
    />

    <div class="card-body">
      <h2 class="card-title font-medium text-lg leading-5">{{ product.title }}</h2>
      <p class="text-xs leading-4" v-if="isListOrGrid">{{ product.desc }}</p>
      <div class="card-actions">
        <button class="btn ~btn-neutral btn-primary btn-sm" disabled v-if="isInStopList">Будет позже</button>
        <button class="btn ~btn-neutral btn-primary btn-sm" @click="addProduct(product)" v-else>{{ price }}</button>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Product, StopList } from '~/types'

const { addProduct } = useCart()

const isListOrGrid = defineModel<boolean>({ required: true })

const { product, stopList } = defineProps<{
  product: Product
  stopList: StopList
}>()

const price = useCurrency(product.price)

const isInStopList = computed(() => {
  return (
    stopList.products.includes(product.id) ||
    stopList.ingredients.some((ingredient) => product.ingredients.includes(ingredient))
  )
})
</script>

<style></style>
