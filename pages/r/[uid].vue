<template>
  <div>
    <div class="flex justify-between gap-4 py-3">
      <div class="flex flex-col gap-2">
        <h2 class="text-lg text-accent">Veuillez vous connecter pour accéder à ce lien</h2>
        <p class="max-w-3xl text-sm">
          CASSIS permet de protéger et restreindre l'accès à vos liens. Pour accéder à ce lien,
          veuillez vous connecter à l'aide de votre compte CAS Bordeaux INP par EirbConnect
        </p>
        <LoginComponent :cassis_redirect="uid" />
      </div>
      <img
        class="hidden sm:flex"
        src="/undraw/undraw_authentication_re_svpt 2.svg"
        alt="authentification_draw"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const { uid } = useRoute().params

const pending = ref(true)

type ResolvedUrl = {
  url: string
}

const resolvedUrl: ResolvedUrl = await $fetch('/api/r/' + uid, {
  query: {
    token: authStore.token
  }
})

if (resolvedUrl.url) {
  navigateTo(resolvedUrl.url, { external: true })
}
pending.value = false
</script>
