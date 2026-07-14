import api from './api'

export const movieService = {
  async getMovies(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    const response = await api.get('/movies', { params })
    return response.data
  },

  async getFeatured() {
    const response = await api.get('/movies/featured')
    return response.data
  },

  async getMovie(id: string) {
    const response = await api.get(`/movies/${id}`)
    return response.data
  },

  async getSeries() {
    const response = await api.get('/movies/series/all')
    return response.data
  },

  async getSeriesById(id: string) {
    const response = await api.get(`/movies/series/${id}`)
    return response.data
  },

  async getCategories() {
    const response = await api.get('/movies/categories')
    return response.data
  },
}