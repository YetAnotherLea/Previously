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
  <div class="container" v-if="movie">
    <nuxt-link to="/movies" class="back-link">← Retour</nuxt-link>

    <div class="movie-details">
      <img
        v-if="movie.poster"
        :src="movie.poster"
        :alt="movie.title"
        class="movie-poster"
      />

      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p class="synopsis">{{ movie.synopsis }}</p>

        <ul class="info-list">
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
          class="external-link"
        >
          Voir sur BetaSeries
        </a>
      </div>
    </div>
  </div>

  <div v-else class="loading">Chargement...</div>
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

.movie-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
    .movie-details {
        flex-direction: row;
    }
}

.movie-poster {
  max-width: 16rem;
  max-height: 24rem;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 2px;
}

.movie-info {
    flex: 1;
}

.movie-info h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #111827;
}

.synopsis {
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

.external-link {
    display: inline-block;
    margin-top: 1rem;
    color: #2563eb;
    text-decoration: underline;
}

.external-link:hover {
    color: #1d4ed8;
}

.loading {
    text-align: center;
    margin-top: 2.5rem;
    color: #6b7280;
}
</style>