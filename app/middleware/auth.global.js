export default defineNuxtRouteMiddleware((to, from) => {
  // NOTE: Le token est stocké comme un cookie HTTP-Only.
  // Il ne peut pas être lu directement depuis ici (frontend).
  // Nous allons utiliser Pinia ou un composant pour exposer l'état d'authentification,
  // qui n'appelle pas une route du serveur pour vérifier le token.

  // Pour simplifier, nous vérifions si le token est dans la session (un pas que nous devrons ajouter)
  // Ensuite, plus simplement : nous forçons l'utilisateur à se reconnecter si il n'est pas sur la page de connexion et s'il n'y a pas de session active.

  const publicRoutes = ["/login"];
  const isPublic = publicRoutes.includes(to.path);

  // NOTE: Supposons que nous avons un composant `useAuth` qui vérifie l'état
  // const auth = useAuth(); // À créer plus tard

  if (!isPublic /* && !auth.isAuthenticated */) {
    // Pour l'instant, nous ne vérifions que le token local. Nous allons raffiner cela à l'étape 2.
    // Si l'utilisateur n'est pas authentifié et qu'il essaye d'accéder à une route protégée, nous le redirigeons
    // return navigateTo('/login');
  }
});
