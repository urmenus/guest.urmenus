<template>
  <section class="text-center">
    <h1 class="text-lg">Здравствуй, дорогой Гость</h1>

    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form class="card-body" @submit.prevent="onSubmit">
        <div class="flex flex-col md:flex-row md:gap-4 mt-2">
          <ui-input
            name="firstName"
            type="text"
            label="Имя"
            placeholder="Рик"
            input-class="w-full"
            class="w-full"
            :args="{ autocomplete: 'given-name' }"
          />
          <ui-input
            name="lastName"
            type="text"
            label="Фамилия"
            placeholder="Санчез"
            input-class="w-full"
            class="w-full"
            :args="{ autocomplete: 'family-name' }"
          />
        </div>

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
              Зарегистрироваться
            </button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-ghost btn-outline btn-primary w-full pointer-events-none select-none">
              <span class="loading loading-ring w-10"></span>
            </button>
          </div>
          <p class="mt-4">
            У вас уже есть аккаунт?
            <nuxt-link :to="NUXT_LINKS.SIGN_IN" class="btn-link text-base-content">Войти</nuxt-link>.
          </p>
        </div>
        <div class="sm:text-center mt-2">
          <p class="text-xs sm:mx-auto sm:max-w-sm opacity-85">
            Продолжая, вы соглашаетесь с
            <span class="tooltip tooltip-bottom tooltip-primary" data-tip="whoa">
              <a class="underline cursor-pointer"> Условиями предоставления услуг</a>
            </span>
            и
            <span class="tooltip tooltip-top tooltip-primary" data-tip="whoa">
              <a class="underline cursor-pointer"> Политикой конфиденциальности</a></span
            >&nbsp;Menus.
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
      firstName: string('Пожалуйста, введите ваше имя.'),
      lastName: string('Пожалуйста, введите вашу фамилию.'),
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
    firstName: 'Пожалуйста, введите ваше имя.',
    lastName: 'Пожалуйста, введите вашу фамилию.',
    email: 'Пожалуйста, введите свой адрес электронной почты.',
    password: 'Пожалуйста, введите пароль.',
  },
})

const onSubmit = handleSubmit(async (values) => {
  console.log('values: ', values)
})
</script>
