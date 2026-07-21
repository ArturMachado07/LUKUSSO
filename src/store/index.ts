import { create } from 'zustand'
import { User, Movie, Series, WatchHistory, Review, UserPreferences } from '@/types'

const storedUser = localStorage.getItem('user')
const defaultPreferences: UserPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  autoplay: true,
  profilePublic: false,
  activityVisible: true,
  language: 'pt',
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  updateUser: (data: Partial<User>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
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
    set({ user: mockUser, isAuthenticated: true, token: 'mock-token' })
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('user', JSON.stringify(mockUser))
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
    set({ user: mockUser, isAuthenticated: true, token: 'mock-token' })
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('user', JSON.stringify(mockUser))
  },
  updateUser: (data) => set((state) => {
    if (!state.user) return state
    const user = { ...state.user, ...data }
    localStorage.setItem('user', JSON.stringify(user))
    return { user }
  }),
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}))

interface ContentState {
  movies: Movie[]
  series: Series[]
  featuredMovie: Movie | null
  favorites: string[]
  watchHistory: WatchHistory[]
  reviews: Review[]
  preferences: UserPreferences
  setMovies: (movies: Movie[]) => void
  setSeries: (series: Series[]) => void
  setFeaturedMovie: (movie: Movie) => void
  toggleFavorite: (id: string) => void
  addToWatchHistory: (item: WatchHistory) => void
  removeFromWatchHistory: (id: string) => void
  clearWatchHistory: () => void
  saveReview: (review: Review) => void
  removeReview: (id: string) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

export const useContentStore = create<ContentState>((set) => ({
  movies: [],
  series: [],
  featuredMovie: null,
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  watchHistory: JSON.parse(localStorage.getItem('watchHistory') || '[]'),
  reviews: JSON.parse(localStorage.getItem('reviews') || '[]'),
  preferences: { ...defaultPreferences, ...JSON.parse(localStorage.getItem('preferences') || '{}') },
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
      const newHistory = [item, ...state.watchHistory.filter((h) => h.id !== item.id)].slice(0, 100)
      localStorage.setItem('watchHistory', JSON.stringify(newHistory))
      return { watchHistory: newHistory }
    }),
  removeFromWatchHistory: (id) => set((state) => {
    const watchHistory = state.watchHistory.filter((item) => item.id !== id)
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory))
    return { watchHistory }
  }),
  clearWatchHistory: () => {
    localStorage.setItem('watchHistory', '[]')
    set({ watchHistory: [] })
  },
  saveReview: (review) => set((state) => {
    const reviews = [review, ...state.reviews.filter((item) => !(item.userId === review.userId && item.movieId === review.movieId))]
    localStorage.setItem('reviews', JSON.stringify(reviews))
    return { reviews }
  }),
  removeReview: (id) => set((state) => {
    const reviews = state.reviews.filter((review) => review.id !== id)
    localStorage.setItem('reviews', JSON.stringify(reviews))
    return { reviews }
  }),
  updatePreferences: (data) => set((state) => {
    const preferences = { ...state.preferences, ...data }
    localStorage.setItem('preferences', JSON.stringify(preferences))
    return { preferences }
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