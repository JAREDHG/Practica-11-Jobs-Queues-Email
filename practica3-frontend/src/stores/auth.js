import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const permisos = ref({ crear: false, editar: false, eliminar: false })

  const isAuthenticated = computed(() => !!token.value)

  // Función de Login
  const login = async (credenciales) => {
    try {
      const respuesta = await axios.post('http://localhost:8000/api/login', credenciales)
      token.value = respuesta.data.token
      user.value = respuesta.data.user
      permisos.value = respuesta.data.permisos
      localStorage.setItem('token', token.value)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    permisos.value = { crear: false, editar: false, eliminar: false }
    localStorage.removeItem('token')
  }

  const fetchUser = async () => {
    try {
      const respuesta = await axios.get('http://localhost:8000/api/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      // Guardamos toda la data de la respuesta, no solo nombre y rol
      user.value = respuesta.data
      // Aseguramos que los permisos se actualicen
      permisos.value = respuesta.data.permisos
    } catch (error) {
      logout()
    }
  }

  return { user, token, permisos, isAuthenticated, login, logout, fetchUser }
})