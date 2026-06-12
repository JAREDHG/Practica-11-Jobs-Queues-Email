<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input type="email" v-model="form.email" class="form-control" required placeholder="admin@tienda.com">
        </div>
        
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input type="password" v-model="form.password" class="form-control" required placeholder="••••••••">
        </div>

        <button type="submit" class="btn btn-primary w-100 py-2 mt-2">Acceder al Sistema</button>
      </form>
      
      <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    // 1. Ejecutamos el login
    await authStore.login(form.value)
    
    // 2. IMPORTANTE: Cargamos el perfil y los permisos del servidor
    await authStore.fetchUser()
    
    // 3. Redirigimos al catálogo (o ruta pendiente)
    const redirectPath = route.query.redirect || '/catalogo'
    router.push(redirectPath)
    
  } catch (error) {
    errorMessage.value = 'Credenciales incorrectas. Intenta de nuevo.'
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8fafc;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>