import axios from 'axios'
import { useAuthStore } from '../stores/auth' // 1. Importa tu store de auth

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

// 2. Función auxiliar para obtener los headers con el token
const getAuthHeaders = () => {
  const authStore = useAuthStore()
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${authStore.token}` // Aquí está la clave
    }
  }
}

export const getProductos = () => api.get('/productos')

export const createProducto = (data) => api.post('/productos', data, getAuthHeaders())

export const updateProducto = (id, data) => api.post(`/productos/${id}`, data, getAuthHeaders())

export const deleteProducto = (id) => {
    const authStore = useAuthStore()
    return api.delete(`/productos/${id}`, {
        headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
}