export interface CommunityPost {
  id: string
  userId: string
  user: CommunityUser
  content: string
  images?: string[]
  video?: string
  trailer?: string
  movieRef?: {
    id: string
    title: string
    poster: string
    slug: string
  }
  type: 'post' | 'review' | 'news' | 'event' | 'poll' | 'announcement' | 'making_of' | 'behind_scenes' | 'release'
  category: 'cinema_angolano' | 'series' | 'filmes' | 'bastidores' | 'eventos' | 'noticias' | 'comunidade' | 'destaque'
  tags: string[]
  likes: number
  likedBy: string[]
  comments: CommunityComment[]
  commentCount: number
  shares: number
  savedBy: string[]
  isOfficial: boolean
  isFeatured: boolean
  isTrending: boolean
  createdAt: string
  updatedAt: string
}

export interface CommunityUser {
  id: string
  name: string
  avatar: string
  isVerified: boolean
  isFollowing?: boolean
  bio?: string
}

export interface CommunityComment {
  id: string
  postId: string
  userId: string
  user: CommunityUser
  content: string
  likes: number
  likedBy: string[]
  replies: CommunityCommentReply[]
  replyCount: number
  createdAt: string
}

export interface CommunityCommentReply {
  id: string
  commentId: string
  userId: string
  user: CommunityUser
  content: string
  likes: number
  likedBy: string[]
  createdAt: string
}

export interface CommunityFilter {
  category?: string
  type?: string
  sort?: 'recent' | 'trending' | 'popular'
  search?: string
}

export interface CommunityStats {
  totalPosts: number
  totalUsers: number
  trendingNow: number
  newToday: number
}

export interface TrendingTopic {
  id: string
  name: string
  postCount: number
  category: string
}