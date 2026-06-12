import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Navbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza correctamente', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: ['router-link', 'router-view']
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contiene un enlace', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: ['router-link']
      }
    })
    expect(wrapper.findComponent({ name: 'RouterLink' }).exists() || wrapper.find('a').exists()).toBe(true)
  })
})