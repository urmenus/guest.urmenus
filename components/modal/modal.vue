<template>
  <transition @enter="toggleVisible" @leave="toggleVisible">
    <dialog
      class="modal modal-bottom sm:modal-middle"
      v-if="visible"
      @click="handleClose"
      @keydown.escape="handleClose"
    >
      <div class="modal-box" :class="{ 'pt-4': !header }" @click.stop="" @keydown.escape="handleClose">
        <div v-if="header">
          <slot name="header" />
        </div>
        <slot name="content" />

        <div class="modal-action" v-if="buttons">
          <slot name="buttons">
            <button class="btn btn-error" @click="handleClose">Cancel</button>
            <button class="btn btn-success" @click="handleProceed">Yes, Proceed</button>
          </slot>
        </div>
      </div>
    </dialog>
  </transition>
</template>

<script lang="ts" setup>
const modelValue = defineModel<boolean>({ required: false, default: false })

const { name } = withDefaults(defineProps<{ name?: string; header?: boolean; buttons?: boolean }>(), {
  header: true,
  buttons: true,
})

const { open, close, toggle, visible } = useModal(name)

const emit = defineEmits(['closed', 'proceed'])

defineExpose({ open, close, toggle, visible })

const handleClose = () => {
  close()
  emit('closed')
}

const handleProceed = () => {
  close()
  emit('proceed')
}

watch(
  modelValue,
  (value, oldValue) => {
    if (value !== oldValue) toggle(value)
  },
  { immediate: true }
)

watch(visible, (value) => (modelValue.value = value))

const toggleVisible = (el: Element, done: () => void) => {
  el.classList.toggle('modal-open')
  setTimeout(done, 200)
}
</script>
