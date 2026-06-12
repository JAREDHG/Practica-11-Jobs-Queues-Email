<template>
  <div class="p-4">
    <h2>Gestión: Editar o Eliminar</h2>
    
    <ProductoForm 
      v-if="productoSeleccionado"
      :producto-editar="productoSeleccionado" 
      @recargar="obtenerProductos" 
      @limpiar-edicion="productoSeleccionado = null" 
    />

    <hr>

    <table class="table">
      <tbody>
        <tr v-for="prod in productos" :key="prod.id">
          <td>{{ prod.nombre }}</td>
          <td>
            <button @click="productoSeleccionado = prod" class="btn btn-warning">Editar</button>
            <button @click="eliminar(prod.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductoForm from '../../components/ProductoForm.vue'
import { getProductos, deleteProducto } from '../../services/productoService'

const productos = ref([])
const productoSeleccionado = ref(null)

const obtenerProductos = async () => {
  const { data } = await getProductos()
  productos.value = data.data
}

const eliminar = async (id) => {
  if (confirm('¿Eliminar producto?')) {
    await deleteProducto(id)
    obtenerProductos()
  }
}

onMounted(obtenerProductos)
</script>