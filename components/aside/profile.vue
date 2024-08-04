<template>
  <div>
    <div class="alert grid-flow-col cursor-pointer select-none" @click="toProfile" v-if="user">
      <div class="avatar placeholder">
        <div class="bg-neutral text-neutral-content rounded-full w-8">
          <span class="text-sm">{{ user.firstName[0] }}</span>
        </div>
      </div>
      <div>
        <h3 class="font-bold">{{ user.firstName }} {{ user.lastName }}</h3>
        <div
          class="text-xs decoration-wavy decoration-error underline-offset-[2.5px] font-mono"
          :class="{ underline: !user.isEmailVerified }"
        >
          {{ user.email }}
        </div>
      </div>
    </div>
    <!--  -->
    <!-- <ul class="menu shadow w-max rounded-box dropdown-content z-[1] bg-base-100">
        <li>
          <a href="" @click.prevent="changeUser({}, true)">Выйти</a>
        </li>
      </ul> -->

    <button @click="toLogin" class="btn btn-primary" v-else>
      Войти
      <Icon name="ph:sign-in" size="1.75rem" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])

const user = defineModel<User | null>('user', { default: null })

const toLogin = () => {
  navigateTo(NUXT_LINKS.SIGN_IN)
  emit('close')
}

const toProfile = () => {
  navigateTo(NUXT_LINKS.PROFILE)
  emit('close')
}
</script>

<style></style>
