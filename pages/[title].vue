<template>
  <div>
    <Header :title="data?.title" />
    <div class="m-4">
      <pre>{{ data }}</pre>
      <pre>{{ error?.statusMessage }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
const slug = useRouteParams('title', '', { transform: String })

const { data, error } = await useAsyncData(
  `project:${slug.value}`,
  () =>
    $fetch(`/api/project/${slug.value}`, {
      method: 'GET',
      onResponse: ({ response }) => {
        localStorage.setItem('project:last', JSON.stringify(response._data))
      },
    }),
  { server: false, lazy: true }
)

const title = computed(() => (data.value ? data.value.title : undefined))

useHead({ title: title.value })
definePageMeta({ layout: 'project' })
</script>

<style></style>
