<template>
  <div class="bg-base-200 text-base-content min-h-full w-full">
    <ui-navbar>
      <template #start>
        <button type="button" class="btn btn-ghost btn-square" @click="$emit('close')">
          <Icon name="bx:x" size="1.5rem" />
        </button>
      </template>
      <template #center>
        <p class="btn btn-ghost no-animation text-xl">Корзина</p>
      </template>
    </ui-navbar>
    <div class="~p-4 pt-0">
      <h2 class="mt-2 mb-1 text-2xl leading-7 font-medium px-4">{{ info }} на <project-cart-total-currency fixed /></h2>

      <div class="bg-base-100 rounded-box w-full">
        <template v-for="product in products" :key="product.id">
          <project-cart-card :product="product" />
        </template>
      </div>

      <div class="">
        <teleport to="#teleports">
          <transition name="slide-up">
            <div
              class="fixed bottom-0 inset-x-0 z-[52] bg-base-100 flex justify-between items-center px-4 py-3"
              v-show="isCartOpen && !targetIsVisible"
            >
              <button class="btn no-animation btn-ghost text-lg leading-4">
                <project-cart-total-currency fixed />
              </button>
              <button type="button" class="btn btn-primary">
                <span>К оформлению</span>
                <Icon name="bx:chevron-right" size="1.5rem" />
              </button>
            </div>
          </transition>
        </teleport>
        <div class="" ref="target">
          <section class="">
            <div class="">
              <div class="flex justify-between">
                <span> {{ info }}</span>
                <project-cart-total-currency fixed />
              </div>
            </div>
            <div class="">
              Сумма заказа<span>{{ totalCurrency }}</span>
            </div>
            <button type="button"></button>
          </section>
        </div>
      </div>

      <!-- <pre>{{ products[0] }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const { count, cart, totalCurrency } = storeToRefs(useCart())

const { isCartOpen } = useUnState()

const { t } = useI18n()
const { $pluralization } = useNuxtApp()
defineEmits(['close'])

const products = computed(() => cart.value.products)
const info = computed(() => {
  return t(`goodsOn[${$pluralization(count.value)}]`, { n: count.value })
})

const target = ref(null)
const targetIsVisible = useElementVisibility(target)
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
