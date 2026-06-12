<template>
  <div class="admin-container">
    <h2>Gestión de Inventario</h2>
    
    <ProductoForm :productoEditar="productoSeleccionado" @recargar="cargarProductos" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductoForm from '../../components/ProductoForm.vue' // Ajusta la ruta según donde esté
import axios from 'axios'

const route = useRoute()
const productoSeleccionado = ref(null)

const cargarProductos = () => {
  console.log("Acción de recarga completada")
}

onMounted(async () => {
  const id = route.params.id
  if (id && id !== ':id') {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/productos/${id}`)
      // Si usas Resource, es data.data. Si no usas, es solo data.
      productoSeleccionado.value = data.data || data 
    } catch (error) {
      console.error("Error al cargar el producto:", error)
    }
  }
})
</script>