<template>
  <div class="flex justify-between gap-4 py-3">
    <div class="flex w-full flex-col items-center gap-1 p-4" v-if="links.length === 0">
      <h1>Vous n'avez pas encore créé de liens</h1>
      <NuxtLink to="/create"
        class="text-sm text-accent underline transition-all duration-300 ease-linear hover:no-underline">
        Créer un lien protégé
      </NuxtLink>

    </div>
    <div class="flex w-full flex-col" v-else>
      <LinkCard :link="link" v-for="link in links" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SerializedLink } from '~/utils/Link'

definePageMeta({
  middleware: 'auth'
})

const links = ref<SerializedLink[]>([])

onMounted(() => {
  const authStore = useAuthStore()

  const res = await useFetch<{ statusCode: number; body: SerializedLink[] }>(
    `/api/links/${authStore.user?.user}`,
    {
      query: {
        token: token
      }
    res.data.value.body.forEach((link: unknown) => {
      links.value.push(link as SerializedLink)
    })
  }

  if (authStore.token) {
    fetchLinks(authStore.token)
  }
})
</script>
