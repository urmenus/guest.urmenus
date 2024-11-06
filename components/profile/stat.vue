<template>
  <div class="stats stats-vertical w-full shadow-lg">
    <div
      class="stat relative ~border-black/25 select-none cursor-pointer"
      @click="stat.isClickAllowed ? (isFull = !isFull) : null"
      v-for="stat in stats"
      :key="stat.title"
    >
      <div class="stat-figure" v-if="stat.icon">
        <Icon :name="stat.icon" size="2rem" />
      </div>
      <div class="stat-title font-mono text-sm uppercase">{{ stat.title }}</div>
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-desc" v-if="stat.desc">{{ stat.desc }}</div>
      <div class="absolute top-1 right-1 opacity-40" v-if="stat.isClickAllowed">
        <Icon name="ph:fingerprint-thin" size="1.25rem" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type StatProfile = {
  title: string
  value: number | string
  desc?: string
  icon?: string
  isClickAllowed: boolean
}

const isFull = ref(false)
const { user } = storeToRefs(useUser())

const stats = computed((): StatProfile[] => {
  const cost = user.value?.history.reduce((total, { cost }) => total + cost, 0) ?? 0
  const formattedCost = useCurrency(cost, {
    notation: isFull.value ? 'standard' : 'compact',
  })

  return [
    {
      title: 'Посетили заведений',
      value: user.value?.history.length ?? 0,
      desc: '',
      icon: 'bx:walk',
      isClickAllowed: false,
    },
    {
      title: 'Потратили',
      value: formattedCost.value,
      desc: '',
      icon: 'ph:money-wavy-duotone',
      isClickAllowed: true,
    },
  ]
})
</script>
