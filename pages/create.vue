<template>
  <div class="flex flex-col justify-between gap-4 py-3">
    <div class="flex gap-3">
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <UsersIcon size="1.5x" />
          Destinataires
        </div>
        <div
          class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground"
        >
          Tous
        </div>
        <span class="self-center">&middot;</span>
      </div>
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <ClockIcon size="1.5x" />
          Expiration
        </div>
        <div
          class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground"
        >
          Jamais
        </div>
      </div>
    </div>
    <div class="flex w-full gap-3">
      <input
        id="link"
        @keyup.enter="createLink()"
        class="w-full rounded-md bg-secondary/20 p-3 text-foreground outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        type="url"
        placeholder="https://wei.eirb.fr"
        v-model="link.url"
      />
      <button
        @click="createLink()"
        class="rounded-md bg-primary px-3 text-background transition-all duration-200 ease-in-out hover:bg-accent"
      >
        Générer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'

const authStore = useAuthStore()

const link = ref({
  url: '',
  expiresAt: null,
  createdBy: authStore.user?.user // Le CAS de l'utilisateur connecté
})

async function createLink() {
  if (!link.value.url) return

  await useFetch('/api/new', {
    method: 'POST',
    body: JSON.stringify(link.value),
    query: { token: authStore.token }
  })

  navigateTo('/links')
}
</script>
