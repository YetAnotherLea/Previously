<template>
  <nav class="nav-links">
      <nuxt-link to="/">
          <img :src="logo" alt="Logo" class="logo" />
      </nuxt-link>

      <nuxt-link to="/movies">
        Films
      </nuxt-link>

      <nuxt-link to="/shows">
        Séries
      </nuxt-link>

      <nuxt-link to="/profile">
        Profil
      </nuxt-link>

      <button 
        v-if="!isAuthenticated"
        @click="startOAuth" 
        class="btn-primary btn-auth"
      >
        Connexion
      </button>

      <button 
        v-else
        @click="logout" 
        class="btn-primary btn-logout"
      >
        Déconnexion
      </button>
    </nav>
</template>

<script setup>
import logo from "../../public/logoPreviously.png";
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";

const { startOAuth, logout, isAuthenticated, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});
</script>

<style scoped>
.nav-links {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;
}

.logo {
  height: 32px;
  width: auto;
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links a {
  color: #000000;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.nav-links a:hover {
  color: #000000;
}

.nav-links a.router-link-active {
  font-weight: 700;
}

.btn-auth,
.btn-logout {
  margin-left: auto;
  background-color: #000000;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

.btn-auth:hover,
.btn-logout:hover {
  background-color: #374151;
}

@media (min-width: 768px) {
  .nav-links {
    gap: 2rem;
    padding: 1rem 2rem;
    flex-wrap: nowrap;
  }
  
  .logo {
    height: 40px;
  }
  
  .nav-links a {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  .btn-auth,
  .btn-logout {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>
