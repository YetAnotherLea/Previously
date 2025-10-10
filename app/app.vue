<template>
  <div>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Reset et styles globaux */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fefefe;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Boutons */
button, a.btn {
  background-color: #000000;
  color: #fff;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.button:hover,
.a.btn:hover {
  background-color: #374151;
}

/* Liens */
a {
  color: #2563eb;
  text-decoration: underline;
}

a:hover {
  color: #1d4ed8;
}

.nav-links a {
  text-decoration: none;
}

/* Grilles */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .flex-md-row {
    flex-direction: row !important;
  }
}

/* Cards */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.rounded {
  border-radius: 0.5rem;
}

/* Textes */
h1 {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.text-center {
  text-align: center;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-700 {
  color: #374151;
}

.text-red-600 {
  color: #dc2626;
}

/* Utilitaires */
.mt-4 { margin-top: 1rem; }
.mt-10 { margin-top: 2.5rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-6 { margin-left: 1.5rem; }

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.gap-6 {
  gap: 1.5rem;
}

.space-y-1 > * + * {
  margin-top: 0.25rem;
}

.inline-block {
  display: inline-block;
}

ul.list-disc {
  list-style-type: disc;
}
</style>