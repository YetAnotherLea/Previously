import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  // Appel du callback sur le serveur de l'application
  const callbackPath = "/api/auth/oauth-callback";
  // Construction de l'URL complète et absolue de l'application
  const redirectUri = `${config.public.APP_BASE_URL}${callbackPath}`;

  // SCHÉMA: Utilisation du domaine d'authentification (www.betaseries.com)
  const baseUrl = `${config.public.betaseriesAuthBaseUrl}/authorize`;

  // Construction de l'URL complète avec les paramètres nécessaires
  const authUrl = `${baseUrl}?client_id=${
    config.public.betaseriesClientId
  }&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // Retour de l'URL vers le frontend pour la redirection
  return { url: authUrl };
});
