<template>
  <div class="container">
    <nav class="nav-links">
      <nuxt-link to="/movies">
        Films
      </nuxt-link>

      <nuxt-link to="/shows">
        Séries
      </nuxt-link>
    </nav>

    <div class="auth-section">
      <button
        v-if="!isAuthenticated"
        @click="startOAuth"
        class="btn-auth"
      >
        Connexion
      </button>

      <button
        v-else
        @click="logout"
        class="btn-logout"
      >
        Déconnexion
      </button>

      <h1 v-if="isAuthenticated" class="auth-message">
        Authentification Réussie!
      </h1>
      <h1 v-else class="auth-message">
        Veuillez vous connecter.
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";

const { startOAuth, logout, isAuthenticated, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.nav-links a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #eff6ff;
}

.auth-section {
  margin-top: 2rem;
  text-align: center;
}

.btn-auth,
.btn-logout {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-auth {
  background-color: #16a34a;
  color: white;
}

.btn-auth:hover {
  background-color: #15803d;
}

.btn-logout {
  background-color: #dc2626;
  color: white;
}

.btn-logout:hover {
  background-color: #b91c1c;
}

.auth-message {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}
</style>