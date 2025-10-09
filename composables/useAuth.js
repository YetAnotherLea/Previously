import { ref } from "vue";

export const useAuth = () => {
  const token = useCookie("betaseries_token");
  const isAuthenticated = ref(!!token.value);

  // FUNCTIE ESENTIALA: Re-citeste cookie-ul setat de server (rezolva problema de UI)
  const checkAuthStatus = () => {
    isAuthenticated.value = !!useCookie("betaseries_token").value;
    if (!isAuthenticated.value) {
      navigateTo("/");
    }
  };

  const startOAuth = async () => {
    try {
      const { url } = await $fetch("/api/auth/oauth-start");
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation d'OAuth:", error);
      alert("Un problème est survenu lors de la connexion.");
    }
  };

  const logout = () => {
    token.value = null;
    isAuthenticated.value = false;
    navigateTo("/login");
  };

  return {
    isAuthenticated,
    startOAuth,
    logout,
    checkAuthStatus,
  };
};
