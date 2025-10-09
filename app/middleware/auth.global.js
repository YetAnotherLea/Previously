import { useAuth } from "../../composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  const publicPaths = ["/", "/login", "/movies", "/shows"];
  const isPublicRoute = publicPaths.includes(to.path);

  if (isAuthenticated.value && to.path === "/login") {
    return navigateTo("/");
  }
});
