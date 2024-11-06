<template>
  <Teleport to="#teleports">
    <client-only>
      <div class="fixed bottom-5 right-5" v-if="count">
        <div class="indicator">
          <span class="indicator-item badge badge-outline right-2 bg-base-200">
            {{ count }}
          </span>
          <button class="btn btn-primary relative" @click="$emit('click')">
            <Icon name="bx:shopping-bag" size="2rem" />
            <project-cart-total-currency fixed :duration="1" />
            <div
              :class="{ 'animate-ping': animate }"
              class="bg-primary absolute inset-y-1 inset-x-6 -z-10 rounded-btn"
            ></div>
          </button>
        </div>
      </div>
    </client-only>
  </Teleport>
</template>

<script lang="ts" setup>
const { count } = storeToRefs(useCart())

defineEmits(['click'])

const animate = ref(false)

watchImmediate(count, async () => {
  animate.value = true
  await nextTick()
  setTimeout(() => {
    animate.value = false
  }, 1001)
})
</script>
