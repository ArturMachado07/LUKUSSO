import api from './api'

export const paymentService = {
  // Multicaixa Express
  async createMulticaixa(data: { planId: string; amount: number }) {
    const response = await api.post('/payments/multicaixa/create', data)
    return response.data
  },

  async confirmMulticaixa(reference: string) {
    const response = await api.post(`/payments/multicaixa/confirm/${reference}`)
    return response.data
  },

  async checkMulticaixaStatus(reference: string) {
    const response = await api.get(`/payments/multicaixa/status/${reference}`)
    return response.data
  },

  // PayPay Africa
  async createPayPay(data: { planId: string; amount: number; phoneNumber: string }) {
    const response = await api.post('/payments/paypay/create', data)
    return response.data
  },

  async confirmPayPay(reference: string) {
    const response = await api.post(`/payments/paypay/confirm/${reference}`)
    return response.data
  },
}