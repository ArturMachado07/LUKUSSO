import api from './api'

export const subscriptionService = {
  async getPlans() {
    const response = await api.get('/subscriptions/plans')
    return response.data
  },

  async getMySubscription() {
    const response = await api.get('/subscriptions/my')
    return response.data
  },

  async changePlan(planId: string) {
    const response = await api.post('/subscriptions/change', { planId })
    return response.data
  },

  async cancelSubscription() {
    const response = await api.post('/subscriptions/cancel')
    return response.data
  },

  async getPaymentHistory() {
    const response = await api.get('/subscriptions/payments/history')
    return response.data
  },
}