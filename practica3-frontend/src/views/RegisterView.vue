<template>
  <div class="auth-container">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label>Nombre:</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Contraseña:</label>
        <input v-model="form.password" type="password" required />
      </div>
      <div>
        <label>Confirmar Contraseña:</label>
        <input v-model="form.password_confirmation" type="password" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  try {
    await authStore.register(form.value)
  } catch (error) {
    console.error("Error en el registro:", error)
    
    // Si Laravel nos manda un 422, sacamos el mensaje exacto
    if (error.response && error.response.status === 422) {
      const erroresLaravel = error.response.data.errors
      // Convierte los errores en texto y los muestra en una alerta
      alert("Error de Validación:\n" + JSON.stringify(erroresLaravel, null, 2))
    } else {
      alert("Error del servidor (500). Revisa la terminal de Laravel.")
    }
  }
}
</script>