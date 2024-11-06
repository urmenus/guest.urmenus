<template>
  <div>
    <h1>Temp page</h1>
    <input type="number" class="input input-bordered" v-model="qwe" />
    {{ totalCurrency }}
  </div>
</template>

<script lang="ts" setup>
const qwe = ref(20.2)

const totalCurrency = useCurrency(qwe, { notation: 'standard', trailingZeroDisplay: 'stripIfInteger' })
</script>

<style></style>
