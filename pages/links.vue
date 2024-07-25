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
      <LinkCard :link="link" v-for="link in links" @edited="fetchLinks()" @removed="fetchLinks()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SerializedLink } from '~/utils/Link'

definePageMeta({
  middleware: 'auth'
})

const links = ref<SerializedLink[]>([])

const authStore = useAuthStore()

async function fetchLinks() {
  const res = await useFetch<{ statusCode: number; body: SerializedLink[] }>(
    `/api/links/${authStore.user?.user}`,
    {
      query: {
        token: authStore.token
      }
    }
  )

  if (res.data.value) {
    links.value.splice(0)

    res.data.value.body.forEach((link: unknown) => {
      links.value.push(link as SerializedLink)
    })
  }
}

onMounted(() => {
  if (authStore.token) {
    fetchLinks()
  }
})
</script>
