<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Connexion BetaSeries</h1>
    <p class="mb-6">
      Pour suivre l'application, connectez-vous avec votre compte BetaSeries.
    </p>
    <button
      @click="startOAuth"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Se connecter avec BetaSeries
    </button>
  </div>
</template>

<script setup>
import { useAuth } from "../../composables/useAuth";
const { startOAuth } = useAuth();
</script>
