import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('AuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks() 
  })

  it('puede realizar login exitoso', async () => {
    const respuestaMock = {
      data: {
        token: 'fake-token',
        user: { name: 'Jared' }
      }
    }
    axios.post.mockResolvedValue(respuestaMock)

    const store = useAuthStore()
    await store.login({ email: 'test@test.com', password: 'password' })
    
    expect(store.user).toEqual({ name: 'Jared' })
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/login', expect.any(Object))
  })
})