<template>
  <div class="flex justify-between sm:flex-row flex-col gap-4 border-b border-secondary/25 py-2">
    <div class="flex sm:flex-row flex-col items-start gap-2" v-if="authStore.isAuthenticated">
      <NuxtLink to="/links" class="flex items-center gap-2 rounded-md  py-2"
        :class="routeName === 'links' ? 'bg-accent text-card px-3' : 'text-accent px-0 sm:px-3'">
        <LinkIcon></LinkIcon>
        Mes liens
      </NuxtLink>
      <NuxtLink to="/create" class="flex items-center gap-2 rounded-md px-3 py-2"
        :class="routeName === 'create' ? 'bg-accent text-card px-3' : 'text-accent px-0 sm:px-3'">
        <PlusCircleIcon></PlusCircleIcon>
        Créer un nouveau lien
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2" v-if="authStore.isAuthenticated">
      <div class="flex w-fit gap-3 rounded-md bg-background px-3 py-2 text-foreground">
        {{ authStore.user?.attributes.nom_complet }}
      </div>
      <div
        class="flex w-fit cursor-pointer gap-3 rounded-md bg-background px-3 py-2 text-foreground hover:bg-accent hover:text-background"
        @click="authStore.logout()">
        <LogOutIcon></LogOutIcon>
      </div>
    </div>

    <div class="flex items-center gap-2" v-if="!authStore.isAuthenticated">
      <NuxtLink to="/" class="flex items-center gap-2 rounded-md px-3 py-2"
        :class="routeName === 'index' ? 'bg-accent text-card' : 'text-accent'">
        <LockIcon />
        Se connecter
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const routeName = computed(() => useRoute().name)

const authStore = useAuthStore()
</script>
