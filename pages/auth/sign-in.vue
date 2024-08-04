<template>
  <section class="text-center">
    <h1 class="text-lg">Здравствуй, дорогой Гость</h1>

    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form class="card-body" @submit.prevent="onSubmit">
        <ui-input
          name="email"
          type="email"
          label="Email"
          placeholder="rick_sanchez@gg.uno"
          :args="{ autocomplete: 'email' }"
        />
        <ui-input
          name="password"
          :type="isHidePasswd ? 'text' : 'password'"
          label="Пароль"
          :placeholder="isHidePasswd ? 'MoRty=Bastard?' : '**************'"
          :args="{ autocomplete: 'current-password' }"
        >
          <template #label>
            <nuxt-link :to="NUXT_LINKS.REPASS" class="label-text-alt link link-hover"> Забыли пароль? </nuxt-link>
          </template>

          <template #default>
            <span class="absolute right-3 top-12" @click="isHidePasswd = !isHidePasswd">
              <Icon
                :name="isHidePasswd ? 'bx:show' : 'bx:hide'"
                size="1.3rem"
                class="hover:text-opacity-100 cursor-pointer text-base-content"
                :class="{ 'text-opacity-50': !isHidePasswd }"
              />
            </span>
          </template>
        </ui-input>

        <div class="form-control mt-6">
          <div
            class="tooltip-bottom tooltip-base-200"
            :class="{ tooltip: !meta.valid }"
            data-tip="Заполните поля"
            v-if="!isSubmitting"
          >
            <button
              type="submit"
              class="btn btn-ghost btn-outline btn-primary w-full"
              :class="{ 'btn-disabled': !meta.valid }"
            >
              Войти
            </button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-ghost btn-outline btn-primary w-full pointer-events-none select-none">
              <span class="loading loading-ring w-10"></span>
            </button>
          </div>
          <p class="mt-4">
            У вас еще нет аккаунта?
            <nuxt-link :to="NUXT_LINKS.SIGN_UP" class="btn-link text-base-content">Зарегистрироваться</nuxt-link>.
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const isHidePasswd = ref(false)

import { toTypedSchema } from '@vee-validate/valibot'
import { email, minLength, nonEmpty, object, pipe, string } from 'valibot'

const { meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: pipe(
        string(),
        nonEmpty('Пожалуйста, введите свой адрес электронной почты.'),
        email('Пожалуйста, введите свой адрес электронной почты.')
      ),
      password: pipe(
        string('Пожалуйста, введите пароль.'),
        minLength(6, 'Ваш пароль должен состоять из 6 и более символов')
      ),
    })
  ),
  initialErrors: {
    email: 'Пожалуйста, введите свой адрес электронной почты.',
    password: 'Пожалуйста, введите пароль.',
  },
})

const onSubmit = handleSubmit(async (values) => {
  console.log('values: ', values)
})
</script>
