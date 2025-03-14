// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-openid-connect"
  ],
  shadcn: {
    prefix: "",
    componentDir: `${__dirname}/components/ui`,
  },
  runtimeConfig: {
    openidConnect: {
      op: {
        issuer: '',
        clientId: '',
        clientSecret: '',
        callbackUrl: ''
      },
      config: {
        cookieFlags: {
          access_token: {
            httpOnly: true,
            secure: false
          }
        }
      }
    }
  },
  openidConnect: {
    addPlugin: true,
    op: {
      issuer: "https://auth.dev.sajankumarv.tech/realms/dev",
      clientId: "craft-api",
      scope: "openid,email,profile".split(","),
      clientSecret: "",
      callbackUrl: "/app",
    },
    config: {
      debug: true,
      response_type: 'code',
      secret: 'oidc._sessionid',
      cookie: { loginName: '' },
      cookiePrefix: 'oidc._',
      cookieEncrypt: true,
      cookieEncryptKey: 'bfnuxt9c2470cb477d907b1e0917oidc', //Todo: Inject via env later
      cookieEncryptIV: 'ab83667c72eec9e4', // Todo: Inject via env later
      cookieEncryptALGO: 'aes-256-cbc',
      cookieMaxAge: 24 * 60 * 60, //  default one day
      cookieFlags: {
        access_token: {
          httpOnly: true,
          secure: false
        }
      }
    }
  }
});
