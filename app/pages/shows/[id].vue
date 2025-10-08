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
  <div class="container">
    <nuxt-link to="/shows" class="back-link">← Retour</nuxt-link>

    <div v-if="loading" class="message loading">Chargement...</div>
    <div v-else-if="error" class="message error">{{ error }}</div>

    <div v-else-if="show" class="show-details">
      <img
        v-if="show.images?.poster"
        :src="show.images.poster"
        :alt="show.title"
        class="show-poster"
      />

      <div class="show-info">
        <h1>{{ show.title }}</h1>
        <p class="description">{{ show.description || "Aucune description disponible." }}</p>

        <ul class="info-list">
          <li><strong>Création :</strong> {{ show.creation || 'Inconnue' }}</li>
          <li><strong>Langue :</strong> {{ show.language || 'N/A' }}</li>
          <li><strong>Chaîne :</strong> {{ show.network || 'Inconnue' }}</li>
          <li><strong>Statut :</strong> {{ show.status }}</li>
          <li><strong>Durée d'un épisode :</strong> {{ show.length }} min</li>
          <li><strong>Nombre de saisons :</strong> {{ show.seasons || show.seasons_details?.length || 'N/A' }}</li>
          <li><strong>Nombre total d'épisodes :</strong> {{ show.episodes || 'N/A' }}</li>
          <li><strong>Genres :</strong> {{ Object.values(show.genres).join(', ') || 'Aucun' }}</li>
          <li><strong>Note moyenne :</strong> {{ show.notes?.mean || 0 }}</li>
          <li><strong>Abonnés :</strong> {{ show.followers }}</li>
        </ul>

        <div v-if="show.seasons_details?.length" class="seasons-section">
          <h2>Détails des saisons :</h2>
          <ul class="seasons-list">
            <li v-for="season in show.seasons_details" :key="season.number">
              Saison {{ season.number }} — {{ season.episodes }} épisodes
            </li>
          </ul>
        </div>

        <a
          v-if="show.resource_url"
          :href="show.resource_url"
          target="_blank"
          class="external-link"
        >
          Voir sur BetaSeries
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #2563eb;
    text-decoration: underline;
}

.back-link:hover {
    color: #1d4ed8;
}

.message {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 1rem;
}

.message.loading {
    color: #6b7280;
}

.message.error {
    color: #dc2626;
}

.show-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
    .show-details {
        flex-direction: row;
    }
}

.show-poster {
    width: 16rem;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.show-info {
    flex: 1;
}

.show-info h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #111827;
}

.description {
    color: #374151;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.info-list {
    list-style: none;
    font-size: 0.875rem;
    color: #4b5563;
}

.info-list li {
    margin-bottom: 0.25rem;
}

.info-list strong {
    color: #111827;
}

.seasons-section {
    margin-top: 1rem;
}

.seasons-section h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #111827;
}

.seasons-list {
    list-style: disc;
    margin-left: 1.5rem;
    font-size: 0.875rem;
    color: #374151;
}

.seasons-list li {
    margin-bottom: 0.25rem;
}

.external-link {
    display: inline-block;
    margin-top: 1rem;
    color: #2563eb;
    text-decoration: underline;
}

.external-link:hover {
    color: #1d4ed8;
}
</style>