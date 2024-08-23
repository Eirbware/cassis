<template>
  <div class="mt-4"></div>
</template>

<script setup lang="ts">
const token = useRoute().query.token
const r = useRoute().query.r

const authStore = useAuthStore()

if (authStore.isAuthenticated) {
  authStore.logout()
}

const login = async (token: string) => {
  const user = await $fetch('/api/auth/verify', {
    query: {
      token
    }
  })

  if (user) {
    authStore.login(token, user)

    // If logged from /r/[uid], redirect to [uid]
    if (r) {
      const resolvedUrl = await $fetch('/api/r/' + r, {
        query: {
          token: authStore.token,
        }
      })

      console.log(resolvedUrl)

      if (resolvedUrl.statusCode === 200) {
        navigateTo(resolvedUrl.url, { external: true });
        return;  // Needed to prevent concurrency issues with the other navigateTo
      }
    }

    navigateTo('/create');

  }
}

if (token) {
  login(token as string)
}
</script>
