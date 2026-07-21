export type PersonRole = 'director' | 'actor' | 'both'

export interface TalentAgent {
  name: string
  agency: string
  email?: string
  phone?: string
  website?: string
  location?: string
}

export interface Person {
  id: string
  slug: string
  name: string
  role: PersonRole
  photo: string
  bio: string
  birthYear?: number
  birthPlace?: string
  nationality?: string
  knownFor?: string[]
  awards?: string[]
  socials?: {
    instagram?: string
    twitter?: string
    imdb?: string
  }
  agent?: TalentAgent
  createdAt: string
}
