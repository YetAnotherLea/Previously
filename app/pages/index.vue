<template>
  <div class="container mx-auto p-4">
    <nuxt-link
      to="/movies"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block text-center"
    >
      Films
    </nuxt-link>

    <nuxt-link
      to="/shows"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block text-center"
    >
      Séries
    </nuxt-link>

    <button
      @click="startOAuth"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Connexion
    </button>
  </div>
</template>

<script setup>
const startOAuth = async () => {
  try {
    const { url } = await $fetch("/api/auth/oauth-start");
    if (url) window.location.href = url;
  } catch (error) {
    console.error("Erreur lors de l'initialisation d'OAuth:", error);
    alert("Un problème est survenu lors de la connexion.");
  }
};
</script>
