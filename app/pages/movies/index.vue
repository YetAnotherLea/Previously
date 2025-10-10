<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuth } from "../../../composables/useAuth";
import SearchBar from "../../components/SearchBar.vue";

const { startOAuth, isAuthenticated, logout, checkAuthStatus } = useAuth();
const config = useRuntimeConfig();
const movies = ref([]);
const filteredMovies = ref([]);
const page = ref(1);
const searchActive = ref(false);
const currentSearchQuery = ref("");

onMounted(() => {
  checkAuthStatus();
  fetchMovies();
});

const fetchMovies = async (query = null, pageNum = 1) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId);

    let url = `https://api.betaseries.com/movies/search?page=${pageNum}`;
    if (query && query.length >= 2) {
      url = `https://api.betaseries.com/movies/search?title=${encodeURIComponent(
        query
      )}&page=${pageNum}`;
    }

    const res = await fetch(url, { method: "GET", headers: myHeaders });

    if (!res.ok) {
      console.error("Erreur API :", res.status);
      return;
    }

    const result = await res.json();
    if (query) {
      filteredMovies.value = result.movies || [];
      currentSearchQuery.value = query;
    } else {
      movies.value = result.movies || [];
      currentSearchQuery.value = "";
    }
    searchActive.value = !!query;
  } catch (error) {
    console.error("Erreur fetch:", error);
  }
};

const handleSearch = ({ query, results }) => {
  if (query) {
    page.value = 1;
    fetchMovies(query, 1);
  }
};

const handleClearSearch = () => {
  page.value = 1;
  fetchMovies();
};

watch(page, (newPage) => {
  if (!searchActive.value) {
    fetchMovies(null, newPage);
  } else if (currentSearchQuery.value) {
    fetchMovies(currentSearchQuery.value, newPage);
  }
});
</script>

<template>
  <div class="container">
    <SearchBar @search="handleSearch" @clear="handleClearSearch" />

    <div class="content">
      <h1>
        {{
          searchActive
            ? `Résultats pour "${currentSearchQuery}"`
            : "Liste des films"
        }}
      </h1>
      <ul class="movies-grid">
        <li
          v-for="movie in searchActive ? filteredMovies : movies"
          :key="movie.id"
          class="movie-card"
        >
          <NuxtLink :to="`/movies/${movie.id}`" class="movie-link">
            <img
              v-if="movie.poster"
              :src="movie.poster"
              :alt="movie.title"
              class="movie-poster"
            />
            <div v-else class="movie-poster-placeholder">Pas d'image</div>
            <div class="movie-info">
              <h3 class="movie-title">{{ movie.title || "Titre inconnu" }}</h3>
              <p class="movie-genre">{{ movie.genres?.[0] || "N/A" }}</p>
              <p class="movie-rating">{{ movie.notes?.mean || "N/A" }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <div
        v-if="movies.length === 0 && filteredMovies.length === 0"
        class="no-results"
      >
        Aucun résultat trouvé.
      </div>

      <div v-if="!searchActive" class="pagination">
        <UPagination v-model:page="page" :total="100" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.movie-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.movie-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.movie-poster {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.movie-poster-placeholder {
  width: 100%;
  height: 15rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.movie-info {
  padding: 0.75rem;
  text-align: center;
}

.movie-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  color: #111827;
}

.movie-genre,
.movie-rating {
  color: #4b5563;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.pagination :deep(button) {
  margin: 0 0.25rem;
}

.pagination :deep(button:first-child),
.pagination :deep(button:last-child) {
  margin: 0;
}

.pagination :deep(button:first-child) {
  margin-right: 1.5rem;
}

.pagination :deep(button:last-child) {
  margin-left: 1.5rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1.125rem;
}
</style>