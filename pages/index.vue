<template>
  <section class="m-4">
    <div class="text-center">
      <h1 class="text-xl">Добро пожаловать</h1>
      <p>Для начала работы, вам следует выбрать заведение в котором вы находитесь</p>
    </div>

    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form class="card-body" @submit.prevent="search">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Введите <strong>название</strong> или специальное <strong>id</strong></span>
          </label>
          <input v-model="slug" ref="input" v-bind="inputAttrs" />
        </div>
        <div class="form-control mt-6 mx-auto">
          <button class="btn btn-primary btn-wide" type="submit">Далее</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue'

const slug = useState('searchBySlug', () => '')
const input = ref<HTMLInputElement>()
const inputAttrs = computed(
  (): InputHTMLAttributes => ({
    type: 'text',
    placeholder: 'marmelad-surgut',
    class: 'input input-bordered',
    required: true,
  })
)

const search = () => {
  if (slug.value) return navigateTo('/' + slug.value)
}

onMounted(() => {
  if (input.value) input.value.focus()
})
</script>
