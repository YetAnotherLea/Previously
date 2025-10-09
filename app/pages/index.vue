<template>
  <div class="container mx-auto p-4">
    <div class="space-x-4 mb-8">
      <nuxt-link
        to="/movies"
      >
        Films
      </nuxt-link>

      <nuxt-link
        to="/shows"
      >
        Séries
      </nuxt-link>
    </div>

    <button
      v-if="!isAuthenticated"
      @click="startOAuth"
    >
      Connexion
    </button>

    <button
      v-else
      @click="logout"
    >
      Déconnexion
    </button>

    <h1 v-if="isAuthenticated">
      Authentification Réussie!
    </h1>
    <h1 v-else>
      Veuillez vous connecter.
    </h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../../composables/useAuth";
const { startOAuth, logout, isAuthenticated, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});
</script>
