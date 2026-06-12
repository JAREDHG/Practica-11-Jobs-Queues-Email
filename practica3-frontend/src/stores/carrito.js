import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    // Carga inicial desde localStorage para que no se pierda al recargar
    items: JSON.parse(localStorage.getItem('carrito') || '[]')
  }),

  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + i.cantidad, 0),
    totalPrecio: (state) => state.items.reduce((s, i) => s + i.precio * i.cantidad, 0),
    cantidadDeProducto: (state) => (id) => state.items.find(i => i.id === id)?.cantidad || 0,
  },

  actions: {
    agregar(producto) {
      // Verifica si el producto ya está en el carrito [cite: 42]
      const itemExistente = this.items.find(i => i.id === producto.id)
      
      if (itemExistente) {
        itemExistente.cantidad++ // Si existe, incrementa la cantidad
      } else {
        // Si no existe, lo agrega con cantidad 1
        this.items.push({ ...producto, cantidad: 1 })
      }
      this.guardarEnLocalStorage()
    },

    quitar(id) {
      // Filtra el arreglo dejando fuera el producto con el id seleccionado
      this.items = this.items.filter(i => i.id !== id)
      this.guardarEnLocalStorage()
    },

    cambiarCantidad(id, cantidad) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item.cantidad = cantidad
        // Elimina el producto del carrito si la cantidad llega a 0
        if (item.cantidad <= 0) {
          this.quitar(id)
        } else {
          this.guardarEnLocalStorage()
        }
      }
    },

    vaciar() {
      this.items = []
      this.guardarEnLocalStorage()
    },

    // Método auxiliar para no repetir código y cumplir con la persistencia
    guardarEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(this.items))
    }
  }
})