<template>
  <div class="search-container" ref="searchContainer">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un film ou une série..."
        class="search-input"
        @input="handleSearch"
        @keyup.enter="handleSearch"
      />
      <button
        @click="handleSearch"
        class="search-button"
        :disabled="!searchQuery"
      >
        <img :src="magnify" alt="Loupe" class="search-icon" />
      </button>
    </div>
    <div v-if="searchResults.length > 0 && showResults" class="search-results">
      <div class="results-header">
        <span>{{ searchResults.length }} résultat(s) trouvé(s)</span>
        <button @click="clearSearch" class="clear-results">Effacer</button>
      </div>
      <ul class="results-list">
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="result-item"
          @click="navigateToResult(result)"
        >
          <img
            v-if="result.poster || result.images?.poster"
            :src="result.poster || result.images.poster"
            :alt="result.title"
            class="result-image"
          />
          <div v-else class="result-image-placeholder">Pas d'image</div>
          <div class="result-info">
            <h4>{{ result.title }}</h4>
            <p class="result-type">{{ getResultType(result) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import magnify from "../../public/search.svg";

const router = useRouter();
const searchQuery = ref("");
const searchResults = ref([]);
const showResults = ref(false);
const debounceTimer = ref(null);
const searchContainer = ref(null);
const emit = defineEmits(["search", "clear"]);

const config = useRuntimeConfig();

const handleSearch = () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }

  debounceTimer.value = setTimeout(async () => {
    if (searchQuery.value.length >= 2) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId);

        const token = useCookie("betaseries_token").value;
        if (token) {
          myHeaders.append("Authorization", `Bearer ${token}`);
        }

        const res = await fetch(
          `https://api.betaseries.com/search/all?query=${encodeURIComponent(
            searchQuery.value
          )}`,
          { method: "GET", headers: myHeaders }
        );

        if (res.ok) {
          const result = await res.json();
          searchResults.value = result.movies?.concat(result.shows || []) || [];
          showResults.value = true;
          emit("search", {
            query: searchQuery.value,
            results: searchResults.value,
          });
        } else {
          searchResults.value = [];
          showResults.value = false;
        }
      } catch (error) {
        console.error("Erreur recherche:", error);
        searchResults.value = [];
        showResults.value = false;
      }
    } else {
      searchResults.value = [];
      showResults.value = false;
    }
  }, 300);
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
  showResults.value = false;
  emit("clear");
};

const navigateToResult = (result) => {
  if (result.type === "movie") {
    router.push(`/movies/${result.id}`);
  } else if (result.type === "show") {
    router.push(`/shows/${result.id}`);
  }
  clearSearch();
};

const getResultType = (result) => {
  if (result.type === "movie") return "Film";
  if (result.type === "show") return "Série";
  return "Contenu";
};

const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(searchQuery, (newVal) => {
  if (!newVal) {
    searchResults.value = [];
    showResults.value = false;
  }
});
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1rem;
}

.search-input-wrapper {
  display: flex;
  gap: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  font-size: 1rem;
  background: transparent;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  width: 44px;
}

.search-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.search-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 500;
}

.clear-results {
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.clear-results:hover {
  background: #f3f4f6;
}

.results-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.result-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f9fafb;
}

.result-item:hover {
  background: #f9fafb;
}

.result-item:last-child {
  border-bottom: none;
}

.result-image,
.result-image-placeholder {
  width: 50px;
  height: 75px;
  object-fit: cover;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

.result-image-placeholder {
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.75rem;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-type {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
