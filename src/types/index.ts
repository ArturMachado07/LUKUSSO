export interface Movie {
  id: string
  title: string
  description: string
  poster: string
  banner: string
  trailer: string
  videoUrl: string
  director: string
  cast: string[]
  year: number
  country: string
  language: string
  subtitles: string[]
  duration: number
  category: string
  rating: number
  featured: boolean
  createdAt: string
}

export interface Series {
  id: string
  title: string
  description: string
  poster: string
  banner: string
  trailer: string
  director: string
  cast: string[]
  year: number
  country: string
  language: string
  subtitles: string[]
  categories: string[]
  rating: number
  seasons: Season[]
  featured: boolean
  createdAt: string
}

export interface Season {
  id: string
  seriesId: string
  seasonNumber: number
  episodes: Episode[]
}

export interface Episode {
  id: string
  seasonId: string
  episodeNumber: number
  title: string
  description: string
  duration: number
  videoUrl: string
  thumbnail: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role?: 'user' | 'admin'
  subscription?: Subscription
  createdAt: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  plan: Plan
  status: 'active' | 'inactive' | 'cancelled' | 'expired'
  startDate: string
  endDate: string
  autoRenew: boolean
}

export interface Plan {
  id: string
  name: string
  price: number
  currency: string
  features: string[]
  maxDevices: number
  maxQuality: string
  popular?: boolean
}

export interface Payment {
  id: string
  userId: string
  subscriptionId: string
  amount: number
  method: 'multicaixa' | 'paypay' | 'other'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  reference: string
  paidAt?: string
  createdAt: string
}

export interface WatchHistory {
  id: string
  userId: string
  movieId?: string
  seriesId?: string
  episodeId?: string
  progress: number
  duration: number
  watchedAt: string
}

export interface Favorite {
  id: string
  userId: string
  movieId?: string
  seriesId?: string
  createdAt: string
}

export interface Review {
  id: string
  userId: string
  user: User
  movieId?: string
  seriesId?: string
  rating: number
  comment: string
  createdAt: string
}