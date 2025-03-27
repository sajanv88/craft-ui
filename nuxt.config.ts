// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    keycloak: {
      sessionPassword: process.env.NUXT_KEYCLOAK_SESSION_PASSWORD
    }
  },
  imports: {
      autoImport: true,
  },
});