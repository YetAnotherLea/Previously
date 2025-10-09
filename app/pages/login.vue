<script setup>
import { useAuth } from "../composables/useAuth";

const { startOAuth } = useAuth();
</script>

<template>
  <div class="container">
    <div class="login-card">
      <h1>Connexion BetaSeries</h1>
      <p class="login-description">
        Pour suivre l'application, connectez-vous avec votre compte BetaSeries.
      </p>
      <button @click="startOAuth" class="btn-login">
        Se connecter avec BetaSeries
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.login-card {
  max-width: 500px;
  margin: 3rem auto;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-card h1 {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
}

.login-description {
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
}

.btn-login {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  font-size: 1rem;
}

.btn-login:hover {
  background-color: #1d4ed8;
}
</style>