<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth";

const { checkAuthStatus, isAuthenticated } = useAuth();
const config = useRuntimeConfig();
const token = useCookie("betaseries_token");

const user = ref(null);
const movies = ref([]);
const shows = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(() => {
  checkAuthStatus();
  if (isAuthenticated.value) {
    fetchAll();
  }
});

const makeHeaders = () => {
  const headers = new Headers();
  headers.append("X-BetaSeries-Key", config.public.betaseriesClientId);
  headers.append("X-BetaSeries-Token", token.value);
  return headers;
};

const fetchAll = async () => {
  loading.value = true;
  error.value = null;
  try {
    await Promise.all([fetchUserInfos(), fetchMovies(), fetchShows()]);
  } catch (e) {
    error.value = "Une erreur est survenue lors du chargement du profil.";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const fetchUserInfos = async () => {
  const res = await fetch("https://api.betaseries.com/members/infos", {
    method: "GET",
    headers: makeHeaders(),
  });
  if (!res.ok) throw new Error("Erreur /members/infos : " + res.status);
  const result = await res.json();
  user.value = result.member;
};

const fetchMovies = async () => {
    const res = await fetch("https://api.betaseries.com/movies/member?state=1", {    method: "GET",
    headers: makeHeaders(),
  });
  if (!res.ok) throw new Error("Erreur /movies/member : " + res.status);
  const result = await res.json();
  movies.value = (result.movies || []);
};

const fetchShows = async () => {
  const res = await fetch("https://api.betaseries.com/shows/member?status=current", {
    method: "GET",
    headers: makeHeaders(),
  });
  if (!res.ok) throw new Error("Erreur /shows/member : " + res.status);
  const result = await res.json();
  shows.value = (result.shows || []);
};
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading">Chargement du profil...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="user">
      <!-- En-tête profil -->
      <div class="profile-header">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.login"
          class="avatar"
        />
        <div class="profile-info">
          <h1 class="username">{{ user.login }}</h1>
          <div class="stats">
            <div class="stat">
              <span class="stat-value">{{ user.stats?.movies || 0 }}</span>
              <span class="stat-label">Films vus</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ user.stats?.episodes || 0 }}</span>
              <span class="stat-label">Épisodes vus</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Films vus -->
      <section class="section">
        <h2 class="section-title">Films vus</h2>
        <p v-if="movies.length === 0" class="empty">Aucun film enregistré.</p>
        <ul v-else class="grid">
          <li v-for="movie in movies" :key="movie.id" class="content-card">
            <NuxtLink :to="`/movies/${movie.id}`" class="content-link">
              <img
                v-if="movie.poster"
                :src="movie.poster"
                :alt="movie.title"
                class="poster"
              />
              <div v-else class="poster-placeholder">Pas d'image</div>
              <div class="content-info">
                <h3 class="content-title">{{ movie.title || "Titre inconnu" }}</h3>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <!-- Séries suivies -->
      <section class="section">
        <h2 class="section-title">Séries suivies</h2>
        <p v-if="shows.length === 0" class="empty">Aucune série enregistrée.</p>
        <ul v-else class="grid">
          <li v-for="show in shows" :key="show.id" class="content-card">
            <NuxtLink :to="`/shows/${show.id}`" class="content-link">
              <img
                v-if="show.images?.poster"
                :src="show.images.poster"
                :alt="show.title"
                class="poster"
              />
              <div v-else class="poster-placeholder">Pas d'image</div>
              <div class="content-info">
                <h3 class="content-title">{{ show.title || "Titre inconnu" }}</h3>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.loading,
.error,
.empty {
  text-align: center;
  margin-top: 3rem;
  color: #6b7280;
}

.error {
  color: #ef4444;
}

/* Profil header */
.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.username {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Sections */
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

/* Grid */
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.content-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.content-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.content-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.poster {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.poster-placeholder {
  width: 100%;
  height: 15rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.content-info {
  padding: 0.75rem;
  text-align: center;
}

.content-title {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.3;
  color: #111827;
}
</style>