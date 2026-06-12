// src/plugins/axios.js
import axios from 'axios'
import router from '../router' // Importamos el router para poder redirigir

// 1. Interceptor de Petición (Request)
// Antes de que cualquier petición salga hacia Laravel, revisamos si hay un token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    // Si hay token, lo pegamos en los Headers como tipo Bearer
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 2. Interceptor de Respuesta (Response)
// Si Laravel nos responde con un error de seguridad, actuamos en consecuencia
axios.interceptors.response.use(
  res => res,
  err => {
    // Si el error es 401 (No Autorizado), significa que el token caducó o no existe
    if (err.response?.status === 401) {
      // Borramos la basura local y mandamos al usuario de patitas a la calle (al login)
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default axios