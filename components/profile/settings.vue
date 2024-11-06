<template>
  <div class="stats stats-vertical w-full shadow-lg">
    <div class="stat">
      <div class="stat-actions mt-0 col-start-2">
        <button class="btn btn-sm btn-square" :disabled="isSetting" @click.prevent="isSetting = true">
          <Icon name="bx:cog" size="1.125rem" />
        </button>
      </div>
    </div>
    <div class="stat relative select-none cursor-pointer" v-if="user">
      <div class="stat-title font-mono text-sm uppercase">Имя</div>
      <transition name="slide-up" mode="out-in">
        <div class="stat-value text-2xl" v-if="!isSetting">{{ user.firstName }}</div>
        <input
          v-model="firstName"
          v-else
          v-bind="firstNameAttrs"
          class="input input-sm input-bordered stat-value text-2xl -ml-3"
        />
      </transition>
      <div class="stat-desc text-error pt-1" v-if="errors.firstName">{{ errors.firstName }}</div>
    </div>
    <div class="stat relative select-none cursor-pointer" v-if="user">
      <div class="stat-title font-mono text-sm uppercase">Фамилия</div>
      <transition name="slide-up" mode="out-in">
        <div class="stat-value text-2xl" v-if="!isSetting">{{ user.lastName }}</div>
        <input
          v-model="lastName"
          v-else
          v-bind="lastNameAttrs"
          class="input input-sm input-bordered stat-value text-2xl -ml-3"
        />
      </transition>
      <div class="stat-desc text-error pt-1" v-if="errors.lastName">{{ errors.lastName }}</div>
    </div>
    <div class="stat relative select-none cursor-pointer" v-if="user">
      <div class="stat-title font-mono text-sm uppercase">Email</div>
      <transition name="slide-up" mode="out-in">
        <div
          class="stat-value text-xl"
          :class="{ 'underline decoration-wavy decoration-error underline-offset-[0.25rem]': !user.isEmailVerified }"
          v-if="!isSetting"
        >
          {{ user.email }}
        </div>
        <input
          v-model="email"
          v-else
          v-bind="emailAttrs"
          class="input input-sm input-bordered stat-value text-xl -ml-3"
        />
      </transition>
      <div class="stat-actions" v-if="!user.isEmailVerified">
        <client-only fallbackTag="button">
          <button
            class="btn btn-neutral btn-outline"
            :disabled="isSetting || !isAvailable"
            @click="sendEmailVerification"
          >
            Подтвердить почту
          </button>
          <template #fallback>
            <button class="btn btn-neutral btn-outline" disabled>Подтвердить почту</button>
          </template>
        </client-only>
      </div>
    </div>
    <div class="stat">
      <div class="stat-actions mt-0">
        <transition name="slide-up" mode="out-in">
          <button class="btn btn-error" v-if="!isSetting" @click.prevent="openModal">Выйти</button>
          <button
            class="btn btn-success w-[7.125rem]"
            :disabled="!meta.valid || isSubmitting"
            v-else
            @click.prevent="onChangeInfo"
          >
            <Icon v-if="isSubmitting" name="bx:loader-alt" size="1.125rem" class="animate-spin" />
            <span v-else>Сохранить</span>
          </button>
        </transition>
      </div>
    </div>

    <Modal title="logout" :buttons="{ enabled: true, position: 'between' }">
      <template #content>
        <p class="text-lg">Вы уверены, что хотите выйти?</p>
      </template>

      <template #buttons>
        <button class="btn btn-error" @click="closeModal">Нет</button>
        <button class="btn btn-success" @click="logout">Да, уверен</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
const isSetting = ref(false)

const { open: openModal, close: closeModal } = useModal('logout')

const { user } = storeToRefs(useUser())
const { changeUser } = useUser()

import { toTypedSchema } from '@vee-validate/valibot'
import { useNow, useStorage } from '@vueuse/core'
import { nonEmpty, object, pipe, regex, string, email as vEmail } from 'valibot'

const errorForm = (word: string) => `Пожалуйста, введите ${word === 'имя' ? `ваше ${word}` : `вашу ${word}`}.`

const { meta, handleSubmit, defineField, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      firstName: pipe(string(errorForm('имя')), regex(/^[^\d]*$/, 'Без цифр, пожалуйста.'), nonEmpty(errorForm('имя'))),
      lastName: pipe(
        string(errorForm('фамилию')),
        regex(/^[^\d]*$/, 'Без цифр, пожалуйста.'),
        nonEmpty(errorForm('фамилию'))
      ),
      email: pipe(
        string(errorForm('электронную почту')),
        nonEmpty(errorForm('электронную почту')),
        vEmail(errorForm('электронную почту'))
      ),
    })
  ),
  initialValues: {
    firstName: user.value!.firstName,
    lastName: user.value!.lastName,
    email: user.value!.email,
  },
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')

const onChangeInfo = handleSubmit(async (values) => {
  const q = new Promise((r) => setTimeout(r, 2000))
  changeUser({ ...values })
  await q
  isSetting.value = false
})

const logout = () => {
  closeModal()
  alert('logout')
  // changeUser({}, true)
}
const emailTimer = useStorage<number | undefined>('email:timer', undefined)
const isAvailable = computed(() => {
  if (!emailTimer.value) return true
  if (+useNow({ interval: 5000 }).value >= emailTimer.value) {
    emailTimer.value = undefined
  } else return false
})
const sendEmailVerification = () => {
  emailTimer.value = +new Date() + 9e5
  console.log('email sended')
}
</script>
