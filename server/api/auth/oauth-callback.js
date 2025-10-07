import { defineEventHandler, getQuery, sendRedirect, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const authCode = query.code;

  if (!authCode) {
    return sendRedirect(event, "/login?error=auth_failed", 302);
  }

  // Redefinim redirectUri absolut
  const callbackPath = "/api/auth/oauth-callback";
  const redirectUri = `${config.public.APP_BASE_URL}${callbackPath}`;

  // SCHÉMA: Utilisation du domaine d'API (api.betaseries.com)
  const tokenUrl = `${config.public.betaseriesApiBaseUrl}/oauth/access_token`;

  try {
    // Échange du code d'autorisation contre le jeton d'accès
    // Utilisation de $fetch natif Nuxt/h3 pour les requêtes server-side
    const response = await $fetch(tokenUrl, {
      method: "POST",
      body: {
        client_id: config.public.betaseriesClientId,
        client_secret: config.betaseriesClientSecret, // Informations privées
        code: authCode,
        redirect_uri: redirectUri, // Doit correspondre!
      },
    });

    const accessToken = response.access_token;

    if (accessToken) {
      // SUCCÈS: Stockage du jeton d'accès comme cookie HTTP-Only
      setCookie(event, "betaseries_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: "/",
      });

      // Redirection de l'utilisateur vers la page principale
      return sendRedirect(event, "/", 302);
    }
  } catch (error) {
    console.error("Erreur lors de l'obtention du jeton d'accès:", error);
    return sendRedirect(event, "/login?error=token_exchange_failed", 302);
  }
});
