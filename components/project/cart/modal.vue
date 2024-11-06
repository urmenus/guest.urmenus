<template>
  <Modal :title="`product-${product.id}`">
    <template #header>
      <h3 class="font-semibold text-base leading-5 whitespace-pre-wrap">{{ product.title }}</h3>
    </template>

    <template #content>
      <label class="form-control">
        <div class="label">
          <span class="label-text">Комментарий</span>
        </div>
        <textarea
          ref="textarea"
          class="textarea textarea-bordered resize-none"
          v-model="input"
          placeholder="Будьте добры, подать перед напитками"
          maxlength="120"
        ></textarea>
        <client-only fallback-tag="div">
          <div class="label">
            <span class="label-text-alt"></span>
            <span class="label-text-alt">{{ input?.length ?? 0 }} / 120</span>
          </div>
        </client-only>
      </label>
    </template>

    <template #buttons>
      <button class="btn" @click="save">Сохранить</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { ProductCart } from '~/types'

const { product } = defineProps<{ product: ProductCart }>()
const { changeSmthOnProduct } = useCart()

const { close } = useModal(`product-${product.id}`)

const textarea = ref<HTMLTextAreaElement>()
const { input } = useTextareaAutosize({ element: textarea, input: product.comment })

const save = () => {
  const _product = { ...product }
  _product.comment = input.value

  changeSmthOnProduct(_product)
  close()
}
</script>
