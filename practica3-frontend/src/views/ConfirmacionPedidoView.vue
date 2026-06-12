<template>
  <div class="container my-5">
    <h2 class="fw-bold">Confirmación de Pedido</h2>
    <p>Estamos procesando tu orden #{{ id }}</p>
    
    <PedidoEstado :pedidoId="id" />
  </div>
</template>

<script setup>
import PedidoEstado from '../components/PedidoEstado.vue'
import { defineProps } from 'vue'

// Recibimos el id de la URL
defineProps(['id'])
</script>