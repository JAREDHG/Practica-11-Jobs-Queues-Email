<template>
  <nav class="navbar">
    <div class="nav-brand">📦 Sistema de Catálogo</div>
    
    <div class="nav-user">
      <template v-if="authStore.isAuthenticated">
        <span class="user-name">Bienvenido, {{ authStore.user?.name || 'Usuario' }}</span>
        <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
      </template>

      <template v-else>
        <router-link to="/login" class="btn-login">Iniciar Sesión</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    await authStore.logout()
    // Redirigir al catálogo después de cerrar sesión
    router.push('/catalogo')
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  color: #f8fafc;
  padding: 15px 30px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.nav-brand {
  font-weight: bold;
  font-size: 1.2rem;
}
.user-name {
  margin-right: 15px;
  font-size: 0.95rem;
}
.btn-logout {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-logout:hover {
  background-color: #dc2626;
}
.btn-login {
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-login:hover {
  background-color: #2563eb;
}
</style>