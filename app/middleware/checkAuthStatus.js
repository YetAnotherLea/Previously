import { useAuth } from "../../composables/useAuth";
const { checkAuthStatus } = useAuth();

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  checkAuthStatus();
  if (!isAuthenticated.value) return navigateTo("/login", checkAuthStatus);
});
