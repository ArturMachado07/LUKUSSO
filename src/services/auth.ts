import api from './api'

export const authService = {
  async register(data: { name: string; email: string; password: string; phone?: string }) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  async refreshToken(refreshToken: string) {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },

  async getProfile() {
    const response = await api.get('/auth/profile')
    return response.data
  },
}