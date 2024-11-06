<template>
  <div class="m-4">
    <div class="px-2 text-center">
      <h1 class="text-xl text-pretty">{{ title }} приветствует вас</h1>
      <p>Пожалуйста, выберите стол, за которым вы сидите</p>
    </div>

    <!--  -->
    <div class="flex flex-col items-center mt-4">
      <div class="join">
        <label class="select select-bordered flex items-center gap-2 join-item relative">
          <input
            type="number"
            placeholder="1"
            class="outline-0 grow no-arrow w-9"
            list="suggest"
            v-model="takenTable"
          />

          <datalist id="suggest">
            <option v-for="t in tablesMax ?? []" :disabled="disabledTables.includes(t)" :key="t" :value="t">
              {{ t }}
            </option>
          </datalist>
          <div class="label absolute -bottom-8 left-0" v-show="disabledTables.includes(takenTable ?? 0)">
            <span class="label-text-alt text-error">Столик уже занят</span>
          </div>
        </label>

        <button
          class="btn join-item rounded-r-full"
          :disabled="!takenTable || disabledTables.includes(takenTable ?? 0)"
          @click="$emit('take')"
        >
          Выбрать
        </button>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<script lang="ts" setup>
import type { Tables } from '~/types'

const { tables } = defineProps<{ title: string; tables: Tables }>()

defineEmits(['take'])
const takenTable = defineModel<number | undefined>('takenTable', { required: true })

const tablesMax = computed(() => tables.max)
const disabledTables = computed(() => tables.areTaken)
</script>

<style></style>
