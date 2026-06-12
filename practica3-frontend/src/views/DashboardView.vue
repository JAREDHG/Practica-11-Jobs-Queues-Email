<template>
  <div class="dashboard-container">
    <NavBar />

    <div class="dashboard-content">
      <h2>Panel de Administración</h2>
      
      <div class="user-profile-card" v-if="authStore.user">
        <h3>Información de la Sesión Active</h3>
        <p><strong>Nombre del Perfil:</strong> {{ authStore.user.name }}</p>
        <p><strong>Correo Electrónico:</strong> {{ authStore.user.email }}</p>
        <span class="badge-status">Token Bearer Activo</span>
      </div>

      <div class="separator"></div>

      <div class="productos-management-section">
        <h2>Gestión del Inventario de Productos</h2>
        <p class="security-notice">
          🔒 Esta sección completa de base de datos y operaciones CRUD se encuentra actualmente protegida mediante el middleware de Laravel Sanctum.
        </p>
        
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from '../plugins/axios'
import NavBar from '../components/NavBar.vue'

// Si deseas renderizar los componentes de tu práctica anterior aquí, impórtalos:
// import ProductosList from '../components/ProductosList.vue'
// import ProductoForm from '../components/ProductoForm.vue'

const authStore = useAuthStore()

onMounted(async () => {
  // Cuando la vista se monta, llamamos al endpoint /me para traer los datos del usuario
  try {
    const response = await axios.get('http://localhost:8000/api/me')
    authStore.user = response.data
  } catch (error) {
    console.error("Error al recuperar el perfil del usuario autenticado:", error)
  }
})
</script>

<style scoped>
.dashboard-content {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.user-profile-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  margin-top: 15px;
}
.user-profile-card h3 {
  margin-top: 0;
  color: #334155;
}
.badge-status {
  display: inline-block;
  background-color: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 10px;
}
.separator {
  margin: 30px 0;
  border-top: 1px solid #e2e8f0;
}
.security-notice {
  background-color: #eff6ff;
  color: #1e40af;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #3b82f6;
  font-size: 0.9rem;
}
</style>