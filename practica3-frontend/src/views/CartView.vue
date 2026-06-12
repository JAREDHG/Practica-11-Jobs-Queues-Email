<template>
  <div class="container my-5">
    <h2 class="fw-bold mb-4">Carrito de Compras</h2>

    <!-- Mensaje si el carrito está vacío -->
    <div v-if="carrito.items.length === 0" class="alert alert-info shadow-sm text-center py-5">
      <h4 class="mb-3">Tu carrito está vacío</h4>
      <p class="text-muted mb-4">¡Explora nuestro catálogo y agrega algunos productos!</p>
      <router-link to="/" class="btn btn-primary px-4">Ir al Catálogo</router-link>
    </div>

    <!-- Tabla del carrito -->
    <div v-else>
      <div class="card border-0 shadow-sm mb-4">
        <div class="table-responsive">
          <table class="table align-middle text-center mb-0">
            <thead class="table-light">
              <tr>
                <th class="text-start ps-4">Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carrito.items" :key="item.id">
                <td class="text-start ps-4 fw-semibold">{{ item.nombre }}</td>
                <td>${{ item.precio }}</td>
                
                <!-- Controles + / - para cambiar la cantidad -->
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <button @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)" class="btn btn-sm btn-outline-secondary px-2">-</button>
                    <span class="mx-3 fw-bold">{{ item.cantidad }}</span>
                    <button @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)" class="btn btn-sm btn-outline-secondary px-2">+</button>
                  </div>
                </td>
                
                <!-- Subtotal por producto -->
                <td class="fw-bold text-success">${{ item.precio * item.cantidad }}</td>
                
                <!-- Botón × para eliminar el producto -->
                <td>
                  <button @click="carrito.quitar(item.id)" class="btn btn-sm btn-danger rounded-circle p-2 lh-1">
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Resumen y Totales -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center bg-white p-4 rounded shadow-sm border">
        <div>
          <!-- Total general al pie de la lista -->
          <h3 class="mb-0 text-dark">Total: <span class="fw-bold text-primary">${{ carrito.totalPrecio }}</span></h3>
        </div>
        <div class="mt-3 mt-md-0 d-flex gap-2">
          <!-- Botón 'Vaciar carrito' con confirmación -->
          <button @click="confirmarVaciar" class="btn btn-outline-danger">
            Vaciar Carrito
          </button>
          
          <!-- Botón 'Finalizar compra' -->
          <button @click="finalizarCompra" class="btn btn-success px-4">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'
import { useRouter } from 'vue-router'

const carrito = useCarritoStore()
const router = useRouter()

const confirmarVaciar = () => {
  if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
    carrito.vaciar()
  }
}

const finalizarCompra = () => {
  alert('Procesando compra... ¡Gracias por tu pedido!')
  carrito.vaciar()
  router.push('/')
}
</script>