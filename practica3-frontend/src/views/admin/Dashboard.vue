<template>
  <div class="p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-dark m-0">Vista General del Sistema</h2>
      <span class="badge bg-primary px-3 py-2 fs-6 shadow-sm">Token Activo</span>
    </div>

    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card p-3 shadow-sm border-0 bg-light">
          <h6 class="text-muted">Total Productos</h6>
          <h3 class="fw-bold">{{ productos.length }}</h3>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 shadow-sm border-0 bg-light">
          <h6 class="text-muted">Valor Inventario</h6>
          <h3 class="fw-bold text-primary">${{ valorTotal.toFixed(2) }}</h3>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 shadow-sm border-0 bg-light">
          <h6 class="text-muted">Stock Bajo (< 5)</h6>
          <h3 class="fw-bold text-danger">{{ stockBajoCount }}</h3>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">Últimos Eventos Registrados</h6>
      </div>
      <div class="card-body p-0">
        <ul class="list-group list-group-flush">
          <li class="list-group-item p-3">Ingreso autorizado al panel protegido por Vue Router.</li>
          <li class="list-group-item p-3">Validación de token Bearer (Sanctum) completada.</li>
          <li class="list-group-item p-3">Conexión exitosa a la API de Productos.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProductos } from '../../services/productoService'

const productos = ref([])

// Cargar productos
onMounted(async () => {
  try {
    const { data } = await getProductos()
    productos.value = data.data || data
  } catch (error) {
    console.error("Error al cargar datos:", error)
  }
})

// Métrica 1: Valor total del inventario (precio * stock)
const valorTotal = computed(() => {
  return productos.value.reduce((total, p) => total + (parseFloat(p.precio) * p.stock), 0)
})

// Métrica 2: Conteo de productos con poco stock
const stockBajoCount = computed(() => {
  return productos.value.filter(p => p.stock < 5).length
})
</script>