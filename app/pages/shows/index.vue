<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuth } from "../../../composables/useAuth";
import SearchBar from "../../components/SearchBar.vue";

const { startOAuth, isAuthenticated, logout, checkAuthStatus } = useAuth();
const config = useRuntimeConfig();
const shows = ref([]);
const filteredShows = ref([]);
const page = ref(1);
const searchActive = ref(false);
const currentSearchQuery = ref("");

onMounted(() => {
  checkAuthStatus();
  fetchShows();
});

const fetchShows = async (query = null, pageNum = 1) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId);

    let url = `https://api.betaseries.com/shows/search?page=${pageNum}`;
    if (query && query.length >= 2) {
      url = `https://api.betaseries.com/shows/search?title=${encodeURIComponent(
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
      filteredShows.value = result.shows || [];
      currentSearchQuery.value = query;
    } else {
      shows.value = result.shows || [];
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
    fetchShows(query, 1);
  }
};

const handleClearSearch = () => {
  page.value = 1;
  fetchShows();
};

watch(page, (newPage) => {
  if (!searchActive.value) {
    fetchShows(null, newPage);
  } else if (currentSearchQuery.value) {
    fetchShows(currentSearchQuery.value, newPage);
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
            : "Liste des séries"
        }}
      </h1>
      <ul class="shows-grid">
        <li
          v-for="show in searchActive ? filteredShows : shows"
          :key="show.id"
          class="show-card"
        >
          <NuxtLink :to="`/shows/${show.id}`" class="show-link">
            <img
              v-if="show.images?.poster"
              :src="show.images.poster"
              :alt="show.title"
              class="show-poster"
            />
            <div v-else class="show-poster-placeholder">Pas d'image</div>
            <div class="show-info">
              <h3 class="show-title">{{ show.title || "Titre inconnu" }}</h3>
              <p class="show-genre">
                {{
                  Object.keys(show.genres || {})
                    .slice(0, 2)
                    .join(", ") || "N/A"
                }}
              </p>
              <p class="show-rating">{{ show.notes?.mean || "N/A" }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <div
        v-if="shows.length === 0 && filteredShows.length === 0"
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
  margin-bottom: 2rem;
}

.btn-logout {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
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
  overflow: hidden;
  transition: all 0.3s ease;
}

.show-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.show-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.show-poster {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.show-poster-placeholder {
  width: 100%;
  height: 15rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.show-info {
  padding: 0.75rem;
  text-align: center;
}

.show-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  color: #111827;
}

.show-genre,
.show-rating {
  color: #4b5563;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1.125rem;
}
</style>