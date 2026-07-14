import { create } from 'zustand'
import { User, Movie, Series, Subscription } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (email: string, password: string) => {
    // TODO: Implement API call
    const mockUser: User = {
      id: '1',
      name: 'Utilizador Teste',
      email,
      phone: '+244 923 456 789',
      avatar: '/default-avatar.png',
      subscription: {
        id: '1',
        userId: '1',
        planId: 'premium',
        plan: {
          id: 'premium',
          name: 'LUKUSSO PREMIUM',
          price: 3500,
          currency: 'AOA',
          features: ['Full HD', '3 dispositivos', 'Conteúdos exclusivos'],
          maxDevices: 3,
          maxQuality: '1080p',
          popular: true,
        },
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true,
      },
      createdAt: new Date().toISOString(),
    }
    set({ user: mockUser, isAuthenticated: true })
    localStorage.setItem('token', 'mock-token')
  },
  register: async (name: string, email: string, password: string) => {
    // TODO: Implement API call
    const mockUser: User = {
      id: '1',
      name,
      email,
      phone: '',
      avatar: '/default-avatar.png',
      subscription: {
        id: '1',
        userId: '1',
        planId: 'start',
        plan: {
          id: 'start',
          name: 'LUKUSSO START',
          price: 1500,
          currency: 'AOA',
          features: ['HD', '1 dispositivo', 'Catálogo básico'],
          maxDevices: 1,
          maxQuality: '720p',
        },
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: false,
      },
      createdAt: new Date().toISOString(),
    }
    set({ user: mockUser, isAuthenticated: true })
    localStorage.setItem('token', 'mock-token')
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
    localStorage.removeItem('token')
  },
}))

interface ContentState {
  movies: Movie[]
  series: Series[]
  featuredMovie: Movie | null
  favorites: string[]
  watchHistory: any[]
  setMovies: (movies: Movie[]) => void
  setSeries: (series: Series[]) => void
  setFeaturedMovie: (movie: Movie) => void
  toggleFavorite: (id: string) => void
  addToWatchHistory: (item: any) => void
}

export const useContentStore = create<ContentState>((set) => ({
  movies: [],
  series: [],
  featuredMovie: null,
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  watchHistory: JSON.parse(localStorage.getItem('watchHistory') || '[]'),
  setMovies: (movies) => set({ movies }),
  setSeries: (series) => set({ series }),
  setFeaturedMovie: (featuredMovie) => set({ featuredMovie }),
  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    }),
  addToWatchHistory: (item) =>
    set((state) => {
      const newHistory = [item, ...state.watchHistory.filter((h) => h.id !== item.id)].slice(0, 50)
      localStorage.setItem('watchHistory', JSON.stringify(newHistory))
      return { watchHistory: newHistory }
    }),
}))

interface UIState {
  isLoading: boolean
  sidebarOpen: boolean
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  sidebarOpen: false,
  setLoading: (isLoading) => set({ isLoading }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))