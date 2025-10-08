<script setup>

const startOAuth = async () => {
  try {
    // 1. Appelons une fonction Nuxt serveur pour construire l'URL de connexion
    const { url } = await $fetch("/api/auth/oauth-start");

    // 2. Redirection de l'utilisateur vers BetaSeries
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation d'OAuth:", error);
    alert("Un probl me est survenu lors de la connexion.");
  }
};

import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const movies = ref([])


onMounted(async () => {
    const myHeaders = new Headers()
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)

    const res = await fetch("https://api.betaseries.com/movies/search?page=10", {
        method: "GET",
        headers: myHeaders,
    })

    if (!res.ok) {
        console.error('Erreur API :', res.status)
        return
    }

    const result = await res.json()
    movies.value = result.movies
})
</script>

<template>
    <div class="container mx-auto p-4">
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

        <!-- Bouton réel avec action JS -->
        <button
        @click="startOAuth"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
        Connexion
        </button>
    </div>

    <div>
        <h1>Liste des films</h1>
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <li
                v-for="movie in movies"
                :key="movie.id"
                @click="$router.push(`/movies/${movie.id}`)"
                class="border rounded-lg shadow p-2 flex flex-col items-center text-center"
            >
                <img
                v-if="movie.poster"
                :src="movie.poster"
                :alt="movie.title"
                class="w-40 h-60 object-cover rounded mb-2"
                />
                <div v-else class="w-40 h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm mb-2">
                Pas d'image
                </div>
                <p class="font-semibold text-sm">{{ movie.title || 'Titre inconnu' }}</p>
                <p class="text-gray-600 text-sm">{{ movie.genres[0] }}</p>
                <p class="text-gray-600 text-sm">{{ movie.notes.mean }}</p>
            </li>
        </ul>
    </div>
</template>
