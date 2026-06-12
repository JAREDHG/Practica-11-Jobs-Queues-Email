<template>
  <div class="container mt-5" v-if="producto">
    <button @click="volver" class="btn btn-secondary mb-4">← Volver al catálogo</button>
    
    <div class="card shadow">
      <div class="card-body">
        <div class="d-flex flex-row">
          <div class="flex-shrink-0" style="width: 40%; padding-right: 20px;">
            <img :src="producto.imagen_url" :alt="producto.nombre" class="img-fluid rounded" />
          </div>

          <div class="flex-grow-1">
            <h2 class="card-title fw-bold">{{ producto.nombre }}</h2>
            <p class="card-text fs-5 text-muted">{{ producto.descripcion }}</p>
            <h3 class="text-success">${{ producto.precio }}</h3>
            <p class="mt-3"><strong>Stock disponible:</strong> {{ producto.stock }}</p>

            <div class="mt-4 pt-3 border-top d-flex gap-2">
              <button v-can="'editar'" class="btn btn-warning" @click="editar">
                Editar Producto
              </button>
              <button v-can="'eliminar'" class="btn btn-danger" @click="eliminar">
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const props = defineProps(['id'])
const router = useRouter()
const auth = useAuthStore()
const producto = ref(null)

const volver = () => router.back()

const editar = () => {
  // Lógica de navegación a vista de edición
  router.push(`/productos/${props.id}/editar`)
}

const eliminar = async () => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    try {
      await axios.delete(`http://localhost:8000/api/productos/${props.id}`)
      router.push('/catalogo')
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }
}

onMounted(async () => {
  try {
    const respuesta = await axios.get(`http://localhost:8000/api/productos/${props.id}`)
    producto.value = respuesta.data.data || respuesta.data
  } catch (error) {
    console.error('Error al cargar el producto:', error)
  }
})
</script>