<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()

const movie = ref(null)

onMounted(async () => {
  const myHeaders = new Headers()
  myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)

  const res = await fetch(`https://api.betaseries.com/movies/movie?id=${route.params.id}`, {
    method: "GET",
    headers: myHeaders,
  })

  if (!res.ok) {
    console.error('Erreur API :', res.status)
    return
  }

  const result = await res.json()
  movie.value = result.movie
})
</script>

<template>
  <div class="container mx-auto p-4" v-if="movie">
    <nuxt-link to="/movies" class="text-blue-600 underline mb-4 inline-block">← Retour</nuxt-link>

    <div class="flex flex-col md:flex-row gap-6">
      <img
        v-if="movie.poster"
        :src="movie.poster"
        :alt="movie.title"
        class="w-64 h-auto rounded-lg shadow"
      />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ movie.title }}</h1>
        <p class="text-gray-700 mb-4">{{ movie.synopsis }}</p>

        <ul class="text-sm text-gray-600 space-y-1">
          <li><strong>Année :</strong> {{ movie.production_year }}</li>
          <li><strong>Genre :</strong> {{ movie.genres.join(', ') }}</li>
          <li><strong>Réalisateur :</strong> {{ movie.crew?.directors?.[0]?.name || 'Inconnu' }}</li>
          <li><strong>Langue :</strong> {{ movie.language }}</li>
          <li><strong>Durée :</strong> {{ Math.floor(movie.length / 60) }} min</li>
          <li><strong>Note moyenne :</strong> {{ movie.notes?.mean || 'Aucune' }}</li>
        </ul>

        <a
          v-if="movie.resource_url"
          :href="movie.resource_url"
          target="_blank"
          class="inline-block mt-4 text-blue-600 underline"
        >
          Voir sur BetaSeries
        </a>
      </div>
    </div>
  </div>

  <div v-else class="text-center mt-10 text-gray-500">Chargement...</div>
</template>
