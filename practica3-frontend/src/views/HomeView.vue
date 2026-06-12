<template>
  <div class="container mt-5">
    <div class="p-5 text-center bg-light rounded-3 shadow-sm mb-5">
      <h1 class="display-4 fw-bold">Bienvenido a TechStore</h1>
      <p class="lead">Navegación SPA ultrarrápida impulsada por Vue Router.</p>
      <router-link to="/catalogo" class="btn btn-primary btn-lg mt-3">
        Ver Catálogo Completo
      </router-link>
    </div>

    <h2 class="mb-4">Últimos Productos</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="producto in productosDestacados" :key="producto.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre }}</h5>
            <p class="card-text text-muted">${{ producto.precio }}</p>
            <router-link :to="`/catalogo/${producto.id}`" class="btn btn-outline-secondary btn-sm">
              Ver Detalles
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productosDestacados = ref([])

onMounted(async () => {
  try {
    const respuesta = await axios.get('http://127.0.0.1:8000/api/productos')
    
    // Vamos a imprimir qué recibimos exactamente en la consola
    console.log('Respuesta completa:', respuesta.data)
    
    // Si tu API devuelve { "data": [...] }, debemos acceder así:
    const listaProductos = Array.isArray(respuesta.data) ? respuesta.data : respuesta.data.data
    
    productosDestacados.value = listaProductos.slice(0, 3)
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
})
</script>