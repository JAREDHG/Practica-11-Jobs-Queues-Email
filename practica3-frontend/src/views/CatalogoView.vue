<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Catálogo de Productos</h2>
      <button v-can="'crear'" class="btn btn-success" @click="irACrear">
        + Nuevo Producto
      </button>
    </div>
    
    <div class="row">
      <div class="col-md-3">
        <FiltrosPanel :filtros="filtros" />
      </div>

      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="producto in resultado.data" :key="producto.id">
            <div class="card h-100 shadow-sm">
              <img :src="producto.imagen_url || '/img/placeholder.png'" class="card-img-top" style="height: 200px; object-fit: cover;" />
              <div class="card-body">
                <h5 class="card-title">{{ producto.nombre }}</h5>
                <p class="text-muted small mb-1">{{ producto.categoria?.nombre || 'Sin categoría' }}</p>
                <p class="card-text">${{ producto.precio }}</p>
                
                <div class="d-flex gap-2">
                  <button class="btn btn-primary btn-sm" @click="carrito.agregar(producto)">Agregar</button>
                  
                  <button v-can="'editar'" class="btn btn-warning btn-sm" @click="irAEditar(producto.id)">
                    Editar
                  </button>
                  <button v-can="'eliminar'" class="btn btn-danger btn-sm" @click="eliminarProducto(producto.id)">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginacionNav :meta="resultado.meta" @cambio-pagina="filtros.pagina = $event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useCarritoStore } from '../stores/carrito'
import { useFiltros } from '../composables/useFiltros'
import { useAuthStore } from '../stores/auth'
import FiltrosPanel from '../components/FiltrosPanel.vue'
import PaginacionNav from '../components/PaginacionNav.vue'

const route = useRoute()
const router = useRouter()
const carrito = useCarritoStore()
const auth = useAuthStore()
const { filtros } = useFiltros()
const resultado = ref({ data: [], meta: {} })

// Debug: Ver qué permisos llegan
onMounted(() => {
  console.log("Permisos actuales en Store:", auth.permisos);
});

const cargarProductos = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/productos', {
      params: { ...filtros }
    })
    resultado.value = data
  } catch (error) {
    console.error('Error al cargar:', error)
  }
}

const irAEditar = (id) => router.push({
  name: 'EditarProducto',
  params: {id: id}
})
const irACrear = () => router.push('/admin/crear')

const eliminarProducto = async (id) => {
  if (confirm('¿Estás seguro?')) {
    await axios.delete(`http://localhost:8000/api/productos/${id}`)
    cargarProductos()
  }
}

watch(() => route.query, cargarProductos, { immediate: true })
</script>