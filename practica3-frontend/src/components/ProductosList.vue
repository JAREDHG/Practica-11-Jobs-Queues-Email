<template>
  <div>
    <h2>Gestión de Productos</h2>
    
    <ProductoForm 
      :productoEditar="productoSeleccionado" 
      @recargar="cargarLista" 
      @limpiar-edicion="productoSeleccionado = null" 
    />

    <table class="tabla-productos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>${{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <button @click="editar(producto)" class="btn-editar">Editar</button>
            <button @click="eliminar(producto.id)" class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
        <tr v-if="productos.length === 0">
          <td colspan="6" class="text-center">No hay productos disponibles.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductoForm from './ProductoForm.vue'
import { getProductos, deleteProducto } from '../services/productoService'

const productos = ref([])
const productoSeleccionado = ref(null)

// Cargar la lista al iniciar el componente
onMounted(() => {
  cargarLista()
})

const cargarLista = async () => {
  try {
    const respuesta = await getProductos()
    productos.value = respuesta.data
  } catch (error) {
    console.error("Error al cargar los productos:", error)
  }
}

const editar = (producto) => {
  // Pasamos una copia del producto para evitar mutar el estado directamente
  productoSeleccionado.value = { ...producto } 
}

const eliminar = async (id) => {
  // Confirmación nativa del navegador antes de borrar
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    try {
      await deleteProducto(id)
      cargarLista() // Recargar la tabla tras eliminar
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      alert("Hubo un error al eliminar.")
    }
  }
}
</script>

<style scoped>
.tabla-productos { width: 100%; border-collapse: collapse; margin-top: 20px; }
.tabla-productos th, .tabla-productos td { border: 1px solid #ddd; padding: 12px; text-align: left; }
.tabla-productos th { background-color: #f2f2f2; }
.btn-editar { background-color: #2196F3; color: white; border: none; padding: 6px 12px; cursor: pointer; margin-right: 5px; }
.btn-eliminar { background-color: #f44336; color: white; border: none; padding: 6px 12px; cursor: pointer; }
.text-center { text-align: center; }
</style>    