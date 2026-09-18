<template>
  <div class="container">
    <div class="auth-section">
      <button v-if="!isAuthenticated" @click="startOAuth" class="btn-auth">
        Connexion
      </button>

      <div v-else class="index-main">
        <video src="/cc.webm" autoplay muted loop playsinline class="background" />
      </div>

      <h1 v-if="isAuthenticated" class="auth-message"></h1>
      <h1 v-else class="auth-message">Veuillez vous connecter.</h1>
    </div>

    <div v-if="isAuthenticated" class="content">
      <!-- Section Films Populaires -->
      <section class="popular-section">
        <h2 class="section-title">Films populaires</h2>
        <ul class="popular-grid">
          <li
            v-for="movie in popularMovies"
            :key="movie.id"
            class="content-card"
          >
            <NuxtLink :to="`/movies/${movie.id}`" class="content-link">
              <img
                v-if="movie.poster"
                :src="movie.poster"
                :alt="movie.title"
                class="content-poster"
              />
              <div v-else class="content-poster-placeholder">Pas d'image</div>
              <div class="content-info">
                <h3 class="content-title">{{ movie.title || "Titre inconnu" }}</h3>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <!-- Section Séries Populaires -->
      <section class="popular-section">
        <h2 class="section-title">Séries populaires</h2>
        <ul class="popular-grid">
          <li
            v-for="show in popularShows"
            :key="show.id"
            class="content-card"
          >
            <NuxtLink :to="`/shows/${show.id}`" class="content-link">
              <img
                v-if="show.images?.poster"
                :src="show.images.poster"
                :alt="show.title"
                class="show-poster"
              />
              <div v-else class="content-poster-placeholder">Pas d'image</div>
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

<script setup>
import { onMounted, ref } from "vue";
import { useAuth } from "../composables/useAuth";

const { startOAuth, logout, isAuthenticated, checkAuthStatus } = useAuth();
const config = useRuntimeConfig();
const popularMovies = ref([]);
const popularShows = ref([]);

onMounted(() => {
  checkAuthStatus();
  if (isAuthenticated.value) {
    fetchPopularMovies();
    fetchPopularShows();
  }
});

const fetchPopularMovies = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId);

    const res = await fetch("https://api.betaseries.com/movies/discover?type=popular", {
      method: "GET",
      headers: myHeaders
    });

    if (!res.ok) {
      console.error("Erreur API films populaires :", res.status);
      return;
    }

    const result = await res.json();
    popularMovies.value = (result.movies || []).slice(0, 5);
  } catch (error) {
    console.error("Erreur fetch films populaires:", error);
  }
};

const fetchPopularShows = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId);

    const res = await fetch("https://api.betaseries.com/shows/discover", {
      method: "GET",
      headers: myHeaders
    });

    if (!res.ok) {
      console.error("Erreur API séries populaires :", res.status);
      return;
    }

    const result = await res.json();
    popularShows.value = (result.shows || []).slice(0, 5);
  } catch (error) {
    console.error("Erreur fetch séries populaires:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.auth-section {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
}

.auth-message {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  object-fit: cover;
  z-index: -1;
}

.content {
  margin-top: 2rem;
}

.popular-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

.popular-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .popular-grid {
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

.content-poster {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.content-poster-placeholder {
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