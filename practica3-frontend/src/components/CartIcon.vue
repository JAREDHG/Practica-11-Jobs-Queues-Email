<template>
  <router-link to="/carrito" class="text-decoration-none text-dark">
    <span class="cart-icon position-relative fs-4">
      🛒
      <span 
        v-if="carrito.totalItems > 0" 
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
        style="font-size: 0.5em;"
      >
        {{ carrito.totalItems }}
      </span>
    </span>
  </router-link>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'

// Instanciamos el store para que el template pueda acceder a carrito.totalItems
const carrito = useCarritoStore()
</script>

<style scoped>
.cart-icon {
  cursor: pointer;
}
</style>