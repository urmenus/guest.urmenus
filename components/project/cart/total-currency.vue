<template>
  <span>{{ totalCurrency }}</span>
</template>

<script lang="ts" setup>
const { fixed, duration } = withDefaults(defineProps<{ fixed?: boolean; duration?: number }>(), {
  fixed: false,
  duration: 0.5,
})
const { total } = storeToRefs(useCart())
const { $gsap } = useNuxtApp()

const tweened = reactive({ total: 0 })

const totalCurrency = useCurrency(
  toRef(() => tweened.total),
  {
    notation: 'standard',
    trailingZeroDisplay: fixed ? 'stripIfInteger' : 'auto',
  }
)

watchImmediate(total, (n) => {
  $gsap.to(tweened, { duration, total: Number(n) || 0 })
})
</script>
