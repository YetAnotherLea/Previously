<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const { startOAuth, isAuthenticated, logout, checkAuthStatus } = useAuth()
const config = useRuntimeConfig()
const movies = ref([])
const page = ref(1)

onMounted(() => {
  checkAuthStatus()
  fetchMovies()
})

const fetchMovies = async () => {
  const myHeaders = new Headers()
  myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)

  const res = await fetch(`https://api.betaseries.com/movies/search?page=${page.value}`, {
    method: "GET",
    headers: myHeaders,
  })

  if (!res.ok) {
    console.error('Erreur API :', res.status)
    return
  }

  const result = await res.json()
  movies.value = result.movies
}

watch(page, fetchMovies)
</script>

<template>
  <div v-if="checkAuthStatus" class="container">
    <div class="content">
      <h1>Liste des films</h1>
      <ul class="movies-grid">
        <li
          v-for="movie in movies"
          :key="movie.id"
          @click="$router.push(`/movies/${movie.id}`)"
          class="movie-card"
        >
          <img
            v-if="movie.poster"
            :src="movie.poster"
            :alt="movie.title"
            class="movie-poster"
          />
          <div v-else class="movie-poster-placeholder">
            Pas d'image
          </div>
          <p class="movie-title">{{ movie.title || 'Titre inconnu' }}</p>
          <p class="movie-genre">{{ movie.genres[0] }}</p>
          <p class="movie-rating">{{ movie.notes.mean }}</p>
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

.movies-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.movie-card {
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

.movie-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.movie-poster {
  width: 10rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.movie-poster-placeholder {
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

.movie-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.movie-genre {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.movie-rating {
  color: #4b5563;
  font-size: 0.875rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>