import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-10-08",
  modules: ["@nuxt/ui"],
  devtools: { enabled: true },
  runtimeConfig: {
    betaseriesClientSecret: process.env.BETASERIES_CLIENT_SECRET,
    public: {
      betaseriesClientId: process.env.NUXT_PUBLIC_BETASERIES_CLIENT_ID,
      betaseriesApiBaseUrl: "https://api.betaseries.com",
      betaseriesAuthBaseUrl: "https://www.betaseries.com",
      APP_BASE_URL: process.env.APP_BASE_URL,
    },
  },
});
