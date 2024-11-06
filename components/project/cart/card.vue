<template>
  <article class="container-grid px-4 py-3 mb-2 border-b-8 border-base-200 last:border-b-0">
    <div class="figure">
      <NuxtPicture
        :src="product.image"
        :alt="product.title"
        sizes="138px"
        class="size-16 flex-[0_0_auto] ml-0 mr-4 my-0"
        :imgAttrs="{ title: product.title, class: 'w-full object-contain' }"
      />
    </div>
    <div class="info">
      <div class="stat-value font-semibold text-base leading-5 whitespace-pre-wrap">
        {{ product.title }}
      </div>
      <ClientOnly fallback-tag="div">
        <div class="stat-desc">{{ info }}</div>
      </ClientOnly>
      <div class="stat-desc whitespace-pre-wrap">{{ product.comment }}</div>
    </div>
    <div class="close">
      <button class="btn btn-circle btn-xs btn-ghost" @click="removeProduct(product.id)">
        <Icon name="bx:x" size="1.25rem" />
      </button>
    </div>
    <div class="info_action border-t pt-3 flex items-center justify-between">
      <div class="stat-value font-semibold text-base leading-5">{{ price }}</div>
      <div class="flex items-center">
        <button class="btn btn-link btn-xs no-underline" v-if="product.isChangeable" @click="open">Изменить</button>
        <div class="join">
          <button class="btn btn-sm join-item" @click="changeCount(product.id, -1)">
            <Icon name="bx:minus" size="1.25rem" />
          </button>
          <div class="btn btn-sm no-animation join-item">
            {{ product.count }}
          </div>
          <button class="btn btn-sm join-item" @click="changeCount(product.id, 1)">
            <Icon name="bx:plus" size="1.25rem" />
          </button>
        </div>
      </div>
    </div>
    <ProjectCartModal v-if="product.isChangeable" :product="product" />
  </article>
</template>

<script lang="ts" setup>
import type { ProductCart } from '~/types'
const { product } = defineProps<{ product: ProductCart }>()

const { changeCount, removeProduct } = useCart()
const { t } = useI18n()

const price = computed(() => useCurrency(product.price).value)

const info = computed(() => {
  const unitWeight = product.weight.type
  const weight = t(`units.${unitWeight}[3]`, { n: product.weight.value })

  if (product.volume) {
    let unit = product.volume.type
    const volume = t(`units.${unit}[3]`, { n: product.volume.value })

    return `${volume}, ${weight}`
  } else if (product.quantity) {
    const quantity = t(`units.pieces[3]`, { n: product.quantity })
    return `${quantity}, ${weight}`
  }
  return '...'
})

const { open } = useModal(`product-${product.id}`)
</script>

<style scoped>
.container-grid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 64px repeat(2, 1fr) 24px;
  grid-template-rows: 1fr min-content;
  gap: 0px 1rem;
  grid-auto-flow: row;
  grid-template-areas:
    'figure info info close'
    'info_action info_action info_action info_action';
}

.figure {
  grid-area: figure;
}

.info {
  grid-area: info;
}

.close {
  grid-area: close;
}

.info_action {
  grid-area: info_action;
}
</style>
