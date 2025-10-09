import { useAuth, checkAuthStatus } from "../../composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  checkAuthStatus();
  if (!isAuthenticated.value) return navigateTo("/login", checkAuthStatus);
});
