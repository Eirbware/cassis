// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      EIRB_AUTH_URL: process.env.EIRB_AUTH_URL,
    }
  },
  modules: [
    'nuxt-mongoose',
    '@nuxtjs/google-fonts',
    'nuxt-feather-icons',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models'
  },
  googleFonts: {
    families: {
      Unbounded: true,
      Inter: true
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
