<template>
  <a :href="auth_redirect">
    <EirbConnect class="mt-3" />
  </a>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const props = defineProps<{
  cassis_redirect?: String; // must be a uid redirect
}>();

const redirect = (props.cassis_redirect) ? `?r=${props.cassis_redirect}` : "";
const auth_redirect = `${config.public.EIRB_AUTH_URL}/login?service_url=${config.public.BASE_URL}/login${redirect}`;
</script>
