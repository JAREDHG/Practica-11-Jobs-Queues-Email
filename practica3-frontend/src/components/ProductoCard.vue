<template>
  <div class="card">
    <h3>{{ producto.nombre }}</h3>
    <p>{{ producto.precio }}</p>
    <button data-test="btn-agregar" @click="$emit('agregar-carrito', producto)">
      Agregar
    </button>
  </div>
</template>

<script setup>
defineProps(['producto'])
defineEmits(['agregar-carrito'])
</script>