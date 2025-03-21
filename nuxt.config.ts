// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: `${__dirname}/components/ui`,
  },
  runtimeConfig: {
    keycloak: {
      sessionPassword: ""
    }
  },
  imports: {
      autoImport: true,
  }
});
