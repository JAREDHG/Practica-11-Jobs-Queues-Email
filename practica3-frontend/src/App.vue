<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">Mi Tienda SPA</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Catálogo</router-link>
            </li>
          </ul>
          
          <div class="d-flex align-items-center gap-3">
            <div class="bg-white px-2 py-1 rounded">
              <CartIcon />
            </div>

            <div v-if="authStore.isAuthenticated" class="text-white d-flex align-items-center">
              <span class="me-3">Hola, {{ authStore.user?.name }}</span>
              <button @click="handleLogout" class="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
            </div>
            <router-link v-else to="/login" class="btn btn-primary btn-sm">
              Iniciar Sesión
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import CartIcon from './components/CartIcon.vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  if (confirm('¿Estás seguro de cerrar sesión?')) {
    await authStore.logout()
    router.push('/')
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
html, body, #app { margin: 0; padding: 0; min-height: 100vh; background-color: #f8fafc; }
</style>