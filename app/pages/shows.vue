<script setup>
import { onMounted } from "vue";
import { useAuth } from "../../composables/useAuth";
const { startOAuth, isAuthenticated, logout, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});

const config = useRuntimeConfig();

const { data: shows, error } = await useFetch(
  `${config.public.betaseriesApiBaseUrl}/shows/list`,
  {
    method: "GET",
    headers: {
      "X-BetaSeries-Key": config.public.betaseriesClientId,
    },
    transform: (response) => response.shows,
    lazy: true,
    server: true,
  }
);
</script>

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
    </div>

    <div>
      <h1 class="text-2xl font-bold mb-4">Liste des séries Populare</h1>

      <div v-if="error" class="text-red-500">
        Erreur lors du chargement des séries: {{ error?.message }}
      </div>

      <ul v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <li
          v-for="show in shows"
          :key="show.id"
          class="border rounded-lg shadow p-2 flex flex-col items-center text-center"
        >
          <img
            v-if="show.images.poster"
            :src="show.images.poster"
            :alt="show.title"
            class="w-40 h-60 object-cover rounded mb-2"
          />
          <div
            v-else
            class="w-40 h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm mb-2"
          >
            Pas d'image
          </div>
          <p class="font-semibold text-sm">
            {{ show.title || "Titre inconnu" }}
          </p>
          <p class="text-gray-600 text-sm">({{ show.production_year }})</p>
          <p class="text-gray-600 text-sm">
            {{ Object.values(show.genres).join(", ") }}
          </p>
          <p class="text-gray-600 text-sm">
            Note: {{ show.notes.mean.toFixed(2) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
