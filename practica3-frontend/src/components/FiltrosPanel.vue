<template>
  <div class="card p-3 shadow-sm mb-4">
    <h5 class="fw-bold">Filtros</h5>
    <input v-model.lazy="filtros.busqueda" class="form-control mb-2" placeholder="Buscar por nombre...">
    
    <select v-model="filtros.categoria_id" class="form-select mb-2">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
    </select>

    <div class="d-flex gap-2 mb-2">
      <input v-model="filtros.precio_min" type="number" class="form-control" placeholder="Precio Min">
      <input v-model="filtros.precio_max" type="number" class="form-control" placeholder="Precio Max">
    </div>

    <button class="btn btn-danger w-100" @click="limpiarFiltros">Limpiar Filtros</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({ filtros: Object })
const categorias = ref([])

onMounted(async () => {
  const { data } = await axios.get('http://localhost:8000/api/categorias')
  categorias.value = data.data
})

const limpiarFiltros = () => {
  Object.keys(props.filtros).forEach(key => props.filtros[key] = '')
  props.filtros.pagina = 1
}
</script>