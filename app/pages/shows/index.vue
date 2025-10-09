<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const { startOAuth, isAuthenticated, logout, checkAuthStatus } = useAuth()
const config = useRuntimeConfig()
const shows = ref([])
const page = ref(1)

onMounted(() => {
  checkAuthStatus()
  fetchShows()
})

const fetchShows = async () => {
  const myHeaders = new Headers()
  myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)

  const res = await fetch(`https://api.betaseries.com/shows/search?page=${page.value}`, {
    method: "GET",
    headers: myHeaders,
  })

  if (!res.ok) {
    console.error('Erreur API :', res.status)
    return
  }

  const result = await res.json()
  shows.value = result.shows
}

watch(page, fetchShows)
</script>

<template>
  <div class="container">
    <nav class="nav-buttons">
      <nuxt-link to="/movies" class="btn-primary">
        Films
      </nuxt-link>

      <nuxt-link to="/shows" class="btn-primary">
        Séries
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

    <div class="content">
      <h1>Liste des séries</h1>
      <ul class="shows-grid">
        <li
          v-for="show in shows"
          :key="show.id"
          @click="$router.push(`/shows/${show.id}`)"
          class="show-card"
        >
          <img
            v-if="show.images.poster"
            :src="show.images.poster"
            :alt="show.title"
            class="show-poster"
          />
          <div v-else class="show-poster-placeholder">
            Pas d'image
          </div>
          <p class="show-title">{{ show.title || 'Titre inconnu' }}</p>
          <p class="show-genre">
            {{ Object.entries(show.genres).map(([value]) => `${value}`).join(', ') }}
          </p>
          <p class="show-rating">{{ show.notes.mean }}</p>
        </li>
      </ul>

      <div class="pagination">
        <UPagination v-model:page="page" :total="100" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-auth {
  background-color: #16a34a;
}

.btn-auth:hover {
  background-color: #15803d;
}

.btn-logout {
  background-color: #dc2626;
}

.btn-logout:hover {
  background-color: #b91c1c;
}

.content {
  margin-top: 2rem;
}

.shows-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .shows-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.show-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.show-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.show-poster {
  width: 10rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.show-poster-placeholder {
  width: 10rem;
  height: 15rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.show-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.show-genre {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.show-rating {
  color: #4b5563;
  font-size: 0.875rem;
}
</style>