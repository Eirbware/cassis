<template>
  <div class="flex w-full flex-col gap-3 border-b border-secondary/35 py-4">
    <!-- <h1 class="text-accent">{{ shortUrl }}</h1> -->
    <div class="flex gap-3 rounded-lg bg-secondary/20 p-2 flex-wrap">
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <UsersIcon size="1.5x" />
          Destinataires
        </div>
        <div class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground">
          Tous
        </div>
      </div>
      <span class="self-center">&middot;</span>
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <ClockIcon size="1.5x" />
          Expiration
        </div>
        <div class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground">
          Jamais
        </div>
      </div>
      <span class="self-center">&middot;</span>
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <EyeIcon size="1.5x" />
          Visité
        </div>
        <div class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground">
          {{ link.visited }} fois
        </div>
      </div>
      <span class="self-center">&middot;</span>
      <div class="flex items-stretch gap-3">
        <div class="flex w-fit gap-3 rounded-md bg-primary px-3 py-2 text-sm text-background">
          <CalendarIcon size="1.5x" />
          Créé
        </div>
        <div class="flex w-fit cursor-not-allowed gap-3 rounded-md bg-background px-3 py-2 text-sm text-foreground">
          Le {{ new Date(link.createdAt.split('T')[0]).toLocaleDateString() }}
          à
          {{ getFormattedHours(link.createdAt) }}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <img :src="qrcode" alt="QR Code" class="h-28 object-contain" />
      <div class="flex flex-col gap-2">
        <div v-if="!editing" class="flex gap-2">
          <a :href="link.url" target="_blank">{{ link.url }}</a>
          <button @click="editing = !editing">
            <EditIcon />
          </button>
        </div>
        <div v-else class="flex gap-2">
          <input type="url" v-model="editedURL" />
          <button @click="editURL()">
            <CheckIcon />
          </button>
          <button @click="editing = false">
            <XIcon />
          </button>
        </div>
        <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

import type { SerializedLink } from '~/utils/Link'

const props = defineProps<{
  link: SerializedLink
}>()

const emit = defineEmits<{
  edited: []
}>()

const editing = ref(false)
const editedURL = ref(props.link.url)

const authStore = useAuthStore()

async function editURL() {
  if (editedURL.value !== props.link.url) {
    await useFetch('/api/edit', {
      method: 'POST',
      body: JSON.stringify({ ...props.link, url: editedURL.value }),
      query: { token: authStore.token }
    })

    emit('edited')
  }

  editing.value = false
}

const shortUrl = computed(() => {
  return `${config.public.BASE_URL}/r/${props.link.uid}`
})

import { useQRCode } from '@vueuse/integrations/useQRCode'

// `qrcode` will be a ref of data URL
const qrcode = useQRCode(shortUrl)

const getFormattedHours = (date: string) => {
  const hours = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()

  function addZero(i: number) {
    if (i < 10) {
      return '0' + i
    }
    return i
  }

  return `${addZero(hours)}h${addZero(minutes)}`
}
</script>
