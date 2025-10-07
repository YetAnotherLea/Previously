// nuxt.config.js
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    // Variables PRIVÉES
    betaseriesClientSecret: process.env.BETASERIES_CLIENT_SECRET,

    // Variables PUBLIQUES
    public: {
      betaseriesClientId: process.env.NUXT_PUBLIC_BETASERIES_CLIENT_ID,

      // NOTE: URL for API calls (token swap)
      betaseriesApiBaseUrl: "https://api.betaseries.com",

      // NOTE: URL for authorization page (www.betaseries.com)
      betaseriesAuthBaseUrl: "https://www.betaseries.com",

      // Full local callback address for the application
      APP_BASE_URL:
        process.env.NODE_ENV === "production"
          ? "https://adresse-de-lapplication.com"
          : "http://localhost:3000",
    },
  },
});
