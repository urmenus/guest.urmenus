<template>
  <div class="btm-nav z-50 md:mx-auto md:w-1/2 lg:w-1/4">
    <button @click="navigateTo(NUXT_LINKS.INDEX)">
      <Icon name="bx:home" size="1.33rem" />
      <span class="btm-nav-label">Главная</span>
    </button>
    <button class="active">
      <Icon name="bx:food-menu" size="1.33rem" />
      <span class="btm-nav-label">Меню</span>
    </button>
    <button>
      <Icon name="bx:cart-alt" size="1.33rem" />
      <span class="btm-nav-label">Корзина</span>
    </button>
  </div>
</template>

<script lang="ts" setup></script>
