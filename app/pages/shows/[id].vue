<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()

const show = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const myHeaders = new Headers()
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)

    const res = await fetch(`https://api.betaseries.com/shows/display?id=${route.params.id}`, {
      method: "GET",
      headers: myHeaders,
    })

    if (!res.ok) throw new Error(`Erreur API : ${res.status}`)

    const result = await res.json()
    show.value = result.show
  } catch (err) {
    console.error(err)
    error.value = "Impossible de charger les informations de la série."
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <nuxt-link to="/shows" class="text-blue-600 underline mb-4 inline-block">← Retour</nuxt-link>

    <div v-if="loading" class="text-center text-gray-500 mt-10">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-600 mt-10">{{ error }}</div>

    <div v-else-if="show" class="flex flex-col md:flex-row gap-6">
      <img
        v-if="show.images?.poster"
        :src="show.images.poster"
        :alt="show.title"
        class="w-64 h-auto rounded-lg shadow"
      />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ show.title }}</h1>
        <p class="text-gray-700 mb-4">{{ show.description || "Aucune description disponible." }}</p>

        <ul class="text-sm text-gray-600 space-y-1">
          <li><strong>Création :</strong> {{ show.creation || 'Inconnue' }}</li>
          <li><strong>Langue :</strong> {{ show.language || 'N/A' }}</li>
          <li><strong>Chaîne :</strong> {{ show.network || 'Inconnue' }}</li>
          <li><strong>Statut :</strong> {{ show.status }}</li>
          <li><strong>Durée d’un épisode :</strong> {{ show.length }} min</li>
          <li><strong>Nombre de saisons :</strong> {{ show.seasons || show.seasons_details?.length || 'N/A' }}</li>
          <li><strong>Nombre total d’épisodes :</strong> {{ show.episodes || 'N/A' }}</li>
          <li><strong>Genres :</strong> {{ Object.values(show.genres).join(', ') || 'Aucun' }}</li>
          <li><strong>Note moyenne :</strong> {{ show.notes?.mean || 0 }}</li>
          <li><strong>Abonnés :</strong> {{ show.followers }}</li>
        </ul>

        <div v-if="show.seasons_details?.length" class="mt-4">
          <h2 class="font-semibold mb-1">Détails des saisons :</h2>
          <ul class="list-disc ml-6 text-sm text-gray-700">
            <li v-for="season in show.seasons_details" :key="season.number">
              Saison {{ season.number }} — {{ season.episodes }} épisodes
            </li>
          </ul>
        </div>

        <a
          v-if="show.resource_url"
          :href="show.resource_url"
          target="_blank"
          class="inline-block mt-4 text-blue-600 underline"
        >
          Voir sur BetaSeries
        </a>
      </div>
    </div>
  </div>
</template>
