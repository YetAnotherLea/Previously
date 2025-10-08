<template>
  <div class="container mx-auto p-4">
    <div class="space-x-4 mb-8">
      <nuxt-link
        to="/movies"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block text-center"
      >
        Films
      </nuxt-link>

      <nuxt-link
        to="/shows"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block text-center"
      >
        Séries
      </nuxt-link>
    </div>

    <button
      v-if="!isAuthenticated"
      @click="startOAuth"
      class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Connexion
    </button>

    <button
      v-else
      @click="logout"
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Déconnexion
    </button>

    <h1 v-if="isAuthenticated" class="text-3xl font-bold mt-8 text-green-700">
      Authentification Réussie!
    </h1>
    <h1 v-else class="text-3xl font-bold mt-8 text-yellow-600">
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
