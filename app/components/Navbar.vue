<template>
  <nav class="nav-links">
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
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";

const { startOAuth, logout, isAuthenticated, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});
</script>
