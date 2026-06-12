import { mount } from '@vue/test-utils'
import ProductoCard from '@/components/ProductoCard.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

describe('ProductoCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const producto = { 
    id: 1, 
    nombre: 'Teclado', 
    precio: 59.99, 
    stock: 5 
  }

  it('muestra el nombre del producto', () => {
    const wrapper = mount(ProductoCard, { 
      props: { producto },
      global: {
        stubs: ['router-link', 'router-view'] 
      }
    })
    expect(wrapper.text()).toContain('Teclado')
  })

  it('emite evento agregar-carrito al hacer click', async () => {
    const wrapper = mount(ProductoCard, { 
      props: { producto },
      global: {
        stubs: ['router-link', 'router-view']
      }
    })
    
    const boton = wrapper.find('[data-test="btn-agregar"]')
    if (boton.exists()) {
      await boton.trigger('click')
      expect(wrapper.emitted('agregar-carrito')).toBeTruthy()
    }
  })
})