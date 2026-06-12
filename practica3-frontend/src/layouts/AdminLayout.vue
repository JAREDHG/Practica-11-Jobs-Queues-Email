<template>
  <div class="d-flex" style="min-height: 100vh; background-color: #f4f6f9;">
    <div class="bg-dark text-white shadow-lg flex-shrink-0" style="width: 260px;">
      <div class="p-4 border-bottom border-secondary">
        <h4 class="fw-bold mb-0">🛡️ Admin Console</h4>
        <small class="text-success fw-bold">● En línea</small>
      </div>
      
      <div class="p-4">
        <p class="text-muted mb-4 small text-uppercase fw-bold">Usuario Autenticado</p>
        <div class="d-flex align-items-center mb-4">
          <div class="bg-primary rounded-circle d-flex justify-content-center align-items-center me-3" style="width: 42px; height: 42px;">
            <span class="fw-bold fs-5">{{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A' }}</span>
          </div>
          <div>
            <h6 class="mb-0 text-truncate" style="max-width: 140px;">{{ auth.user?.name || 'Administrador' }}</h6>
            <small class="text-info">Rol: SuperAdmin</small>
          </div>
        </div>

        <p class="text-muted mb-2 small text-uppercase fw-bold">Navegación</p>
        <ul class="nav flex-column gap-2">
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link text-white rounded p-2 text-decoration-none d-block" exact-active-class="bg-primary shadow-sm">
              📊 Vista General
            </router-link>
          </li>
          
          <li class="nav-item mt-3 text-muted small text-uppercase fw-bold">Inventario</li>
          <li class="nav-item">
            <router-link to="/admin/crear" class="nav-link text-white rounded p-2 text-decoration-none d-block" exact-active-class="bg-primary shadow-sm">
              ➕ Crear Producto
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/editar" class="nav-link text-white rounded p-2 text-decoration-none d-block" exact-active-class="bg-primary shadow-sm">
              📝 Editar / Eliminar
            </router-link>
          </li>
        </ul>

        <div class="mt-5 pt-3 border-top border-secondary">
          <button @click="cerrarSesion" class="btn btn-outline-danger w-100 fw-bold">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <div class="flex-grow-1 p-5 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const cerrarSesion = () => {
  auth.logout()
  router.push('/login')
}
</script>