import { CommunityPost, CommunityComment, CommunityCommentReply, CommunityFilter, CommunityStats, TrendingTopic, CommunityUser } from '@/types/community'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock Users
const mockUsers = [
  {
    id: 'user-1',
    name: 'LUKUSSO',
    avatar: '/logo-amarelo.svg',
    isVerified: true,
    isFollowing: true,
    bio: 'Plataforma de streaming angolana 🇦🇴'
  },
  {
    id: 'user-2',
    name: 'Maria Santos',
    avatar: '',
    isVerified: false,
    isFollowing: false,
    bio: 'Cineasta angolana'
  },
  {
    id: 'user-3',
    name: 'João Agostinho',
    avatar: '',
    isVerified: false,
    isFollowing: true,
    bio: 'Crítico de cinema'
  },
  {
    id: 'user-4',
    name: 'Ana Paula',
    avatar: '',
    isVerified: false,
    isFollowing: false,
    bio: 'Apaixonada por cinema angolano'
  },
  {
    id: 'user-5',
    name: 'Francisco Miguel',
    avatar: '',
    isVerified: true,
    isFollowing: false,
    bio: 'Realizador | Produtor'
  },
  {
    id: 'user-6',
    name: 'Helena Kianda',
    avatar: '',
    isVerified: false,
    isFollowing: false,
    bio: 'Jornalista cultural'
  },
]

// Mock Posts
const mockPosts: CommunityPost[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    user: mockUsers[0],
    content: '🎬 NOVO LANÇAMENTO: "Meu Semba" já disponível na LUKUSSO! Uma sinfonia urbana vibrante embalada pelos ritmos da poesia rap. Não percas esta obra-prima do cinema angolano.\n\nDisponível agora em Full HD. #LUKUSSO #MeuSemba #CinemaAngolano',
    images: ['/Meu_Semba_cover.jpg'],
    trailer: '/meu-semba-trailer.mp4',
    movieRef: {
      id: '1',
      title: 'Meu Semba',
      poster: '/Meu_Semba_cover.jpg',
      slug: 'meu-semba'
    },
    type: 'release',
    category: 'cinema_angolano',
    tags: ['lançamento', 'meu-semba', 'cinema-angolano', 'destaque'],
    likes: 234,
    likedBy: ['user-2', 'user-3', 'user-4', 'user-5'],
    comments: [],
    commentCount: 12,
    shares: 45,
    savedBy: ['user-3', 'user-4'],
    isOfficial: true,
    isFeatured: true,
    isTrending: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'post-2',
    userId: 'user-5',
    user: mockUsers[4],
    content: 'Muito feliz em ver o cinema angolano a crescer! O lançamento do "Meu Semba" marca uma nova era para a nossa indústria. Parabéns a toda a equipa! 🇦🇴🎬\n\nQuem já viu? O que acharam?',
    images: ['/capa1_home.jpeg'],
    type: 'post',
    category: 'comunidade',
    tags: ['cinema-angolano', 'meu-semba'],
    likes: 89,
    likedBy: ['user-1', 'user-2', 'user-3'],
    comments: [],
    commentCount: 8,
    shares: 12,
    savedBy: [],
    isOfficial: false,
    isFeatured: false,
    isTrending: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'post-3',
    userId: 'user-1',
    user: mockUsers[0],
    content: '📽️ BASTIDORES: Como foi feito "A Ilha dos Cães"\n\nVamos aos bastidores deste grande clássico do terror angolano realizado por Jorge António. Descobre como as paisagens naturais de Angola se transformaram no cenário perfeito para este filme icónico.\n\nDisponível na LUKUSSO.',
    images: ['/A_ilha_dos_cães_cover.jpg', '/capa2_home.jpg'],
    video: '/ilha-caes-trailer.mp4',
    movieRef: {
      id: '2',
      title: 'A Ilha dos Cães',
      poster: '/A_ilha_dos_cães_cover.jpg',
      slug: 'a-ilha-dos-caes'
    },
    type: 'behind_scenes',
    category: 'bastidores',
    tags: ['bastidores', 'ilha-dos-caes', 'jorge-antonio', 'making-of'],
    likes: 156,
    likedBy: ['user-2', 'user-4', 'user-6'],
    comments: [],
    commentCount: 6,
    shares: 28,
    savedBy: ['user-6'],
    isOfficial: true,
    isFeatured: true,
    isTrending: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 'post-4',
    userId: 'user-2',
    user: mockUsers[1],
    content: 'Acabei de ver "Njinga Rainha de Angola" pela primeira vez. Que obra-prima! A Lesliana Pereira está simplesmente fenomenal no papel da rainha. Um filme que todo angolano devia ver. 🇦🇴👏🏾\n\nNota: ⭐⭐⭐⭐⭐',
    images: ['/Njinga_rainha_angola_cover.jpg'],
    movieRef: {
      id: '4',
      title: 'Njinga Rainha de Angola',
      poster: '/Njinga_rainha_angola_cover.jpg',
      slug: 'njinga-rainha-de-angola'
    },
    type: 'review',
    category: 'filmes',
    tags: ['review', 'njinga', 'cinema-angolano'],
    likes: 67,
    likedBy: ['user-1', 'user-3', 'user-5', 'user-6'],
    comments: [],
    commentCount: 4,
    shares: 9,
    savedBy: ['user-3'],
    isOfficial: false,
    isFeatured: false,
    isTrending: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString()
  },
  {
    id: 'post-5',
    userId: 'user-1',
    user: mockUsers[0],
    content: '📢 NOVIDADE LUKUSSO: Em breve na plataforma!\n\nTemos o prazer de anunciar que estamos a trabalhar em conteúdos exclusivos para celebrar a cultura angolana. Fiquem atentos às novidades!\n\nO que gostariam de ver no LUKUSSO? Deixem as vossas sugestões nos comentários! 👇',
    type: 'announcement',
    category: 'noticias',
    tags: ['novidades', 'lukusso', 'platform'],
    likes: 312,
    likedBy: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
    comments: [],
    commentCount: 24,
    shares: 56,
    savedBy: ['user-4', 'user-6'],
    isOfficial: true,
    isFeatured: true,
    isTrending: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString()
  },
  {
    id: 'post-6',
    userId: 'user-3',
    user: mockUsers[2],
    content: 'A minha recomendação de hoje: "O Miradouro da Lua" (1993) do Jorge António. Um filme subestimado que merece ser redescoberto. A fotografia é deslumbrante e a história emociona do início ao fim.\n\nDisponível na LUKUSSO. Imperdível! 🎬✨',
    images: ['/O_Miradouro_da_Lua.jpg'],
    movieRef: {
      id: '3',
      title: 'O Miradouro da Lua',
      poster: '/O_Miradouro_da_Lua.jpg',
      slug: 'o-miradouro-da-lua'
    },
    type: 'review',
    category: 'cinema_angolano',
    tags: ['recomendação', 'miradouro-da-lua', 'classico'],
    likes: 45,
    likedBy: ['user-1', 'user-4'],
    comments: [],
    commentCount: 3,
    shares: 7,
    savedBy: [],
    isOfficial: false,
    isFeatured: false,
    isTrending: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString()
  },
  {
    id: 'post-7',
    userId: 'user-6',
    user: mockUsers[5],
    content: '🎥 ENTREVISTA: O futuro do cinema angolano\n\nTive o privilégio de entrevistar alguns dos realizadores mais promissores de Angola. Eles partilharam as suas visões, desafios e sonhos para a indústria cinematográfica nacional.\n\nLeiam a entrevista completa nos comentários!',
    images: ['/capa6.jpg', '/capa7.jpeg', '/capa8.jpeg'],
    type: 'news',
    category: 'noticias',
    tags: ['entrevista', 'cinema-angolano', 'realizadores'],
    likes: 78,
    likedBy: ['user-1', 'user-2', 'user-5'],
    comments: [],
    commentCount: 10,
    shares: 34,
    savedBy: ['user-5'],
    isOfficial: false,
    isFeatured: false,
    isTrending: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 900).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 900).toISOString()
  },
  {
    id: 'post-8',
    userId: 'user-4',
    user: mockUsers[3],
    content: 'Alguém mais está viciado em "Santana"? Que filme de ação incrível! O Maradona Dias dos Santos mandou muito bem na realização. Mal posso esperar por mais filmes assim! 🔥🇦🇴\n\n#Santana #AçãoAngolana #LUKUSSO',
    images: ['/Santana_cover.webp'],
    movieRef: {
      id: '5',
      title: 'Santana',
      poster: '/Santana_cover.webp',
      slug: 'santana'
    },
    type: 'post',
    category: 'comunidade',
    tags: ['santana', 'ação', 'recomendação'],
    likes: 34,
    likedBy: ['user-3', 'user-6'],
    comments: [],
    commentCount: 2,
    shares: 4,
    savedBy: [],
    isOfficial: false,
    isFeatured: false,
    isTrending: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 1200).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1200).toISOString()
  },
  {
    id: 'post-9',
    userId: 'user-1',
    user: mockUsers[0],
    content: '🎬 MAKING OF: Os bastidores da rodagem de "Santana" \n\nVamos mostrar-te como foram feitas as cenas de ação deste incrível filme angolano. Preparação, ensaios e muita dedicação! 💪\n\nJá viste o filme na LUKUSSO? Conta-nos o que achaste!',
    video: '/santana-trailer.mp4',
    movieRef: {
      id: '5',
      title: 'Santana',
      poster: '/Santana_cover.webp',
      slug: 'santana'
    },
    type: 'making_of',
    category: 'bastidores',
    tags: ['making-of', 'santana', 'bastidores'],
    likes: 123,
    likedBy: ['user-2', 'user-4', 'user-5', 'user-6'],
    comments: [],
    commentCount: 7,
    shares: 18,
    savedBy: ['user-2'],
    isOfficial: true,
    isFeatured: true,
    isTrending: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString()
  },
  {
    id: 'post-10',
    userId: 'user-1',
    user: mockUsers[0],
    content: '🏆 EVENTO: Festival de Cinema Angolano 2026\n\nA LUKUSSO orgulha-se de ser parceira oficial do Festival de Cinema Angolano 2026! Fiquem atentos para mais detalhes sobre submissões, datas e convidados especiais.\n\nVamos celebrar o melhor do cinema nacional! 🇦🇴🎬✨',
    images: ['/capa1_home.jpeg'],
    type: 'event',
    category: 'eventos',
    tags: ['festival', 'cinema-angolano', 'evento', '2026'],
    likes: 189,
    likedBy: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
    comments: [],
    commentCount: 15,
    shares: 42,
    savedBy: ['user-5', 'user-6'],
    isOfficial: true,
    isFeatured: true,
    isTrending: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 1800).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1800).toISOString()
  }
]

// Add some mock comments to first post
mockPosts[0].comments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    userId: 'user-2',
    user: mockUsers[1],
    content: 'Já vi e é simplesmente espetacular! A fotografia está deslumbrante. Recomendo a todos! 👏🏾',
    likes: 12,
    likedBy: ['user-1', 'user-3'],
    replies: [
      {
        id: 'reply-1',
        commentId: 'comment-1',
        userId: 'user-1',
        user: mockUsers[0],
        content: 'Ficamos felizes que gostaste, Maria! Obrigado pelo apoio 🙏',
        likes: 8,
        likedBy: ['user-2'],
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
      },
      {
        id: 'reply-2',
        commentId: 'comment-1',
        userId: 'user-3',
        user: mockUsers[2],
        content: 'Concordo plenamente! Um marco para o cinema angolano.',
        likes: 5,
        likedBy: ['user-2'],
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      }
    ],
    replyCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString()
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    userId: 'user-4',
    user: mockUsers[3],
    content: 'Quando é que vai estar disponível para download offline?',
    likes: 3,
    likedBy: [],
    replies: [
      {
        id: 'reply-3',
        commentId: 'comment-2',
        userId: 'user-1',
        user: mockUsers[0],
        content: 'Olá Ana! A funcionalidade de download offline estará disponível em breve. Fica atenta às novidades! 🎬',
        likes: 6,
        likedBy: ['user-4'],
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      }
    ],
    replyCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString()
  }
]

// Mock comments for post-5
mockPosts[4].comments = [
  {
    id: 'comment-3',
    postId: 'post-5',
    userId: 'user-3',
    user: mockUsers[2],
    content: 'Sugiro mais documentários sobre a história de Angola! 🇦🇴',
    likes: 15,
    likedBy: ['user-1', 'user-4', 'user-6'],
    replies: [],
    replyCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 460).toISOString()
  },
  {
    id: 'comment-4',
    postId: 'post-5',
    userId: 'user-5',
    user: mockUsers[4],
    content: 'Séries originais angolanas! Temos tanto talento para explorar.',
    likes: 11,
    likedBy: ['user-1', 'user-3'],
    replies: [],
    replyCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 440).toISOString()
  }
]

// Mock trending topics
const mockTrendingTopics: TrendingTopic[] = [
  { id: 'trend-1', name: 'Meu Semba', postCount: 156, category: 'cinema_angolano' },
  { id: 'trend-2', name: 'Cinema Angolano', postCount: 234, category: 'cinema_angolano' },
  { id: 'trend-3', name: 'Njinga Rainha', postCount: 89, category: 'filmes' },
  { id: 'trend-4', name: 'Festival 2026', postCount: 67, category: 'eventos' },
  { id: 'trend-5', name: 'Bastidores', postCount: 45, category: 'bastidores' },
  { id: 'trend-6', name: 'LUKUSSO', postCount: 312, category: 'noticias' },
]

// Local storage keys
const STORAGE_KEYS = {
  likes: 'community_likes',
  comments: 'community_comments',
  saves: 'community_saves',
  follows: 'community_follows',
}

const getLocalData = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

const setLocalData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export interface CreatePostParams {
  userId: string
  userName: string
  userAvatar: string
  content: string
  category: CommunityPost['category']
  type: CommunityPost['type']
  images?: string[]
  video?: string
  tags?: string[]
}

class CommunityService {
  private async apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      })
      if (!response.ok) throw new Error('API request failed')
      return response.json()
    } catch {
      throw new Error('API not available, use mock data')
    }
  }

  private enrichWithLocalData(posts: CommunityPost[]): CommunityPost[] {
    const savedLikes = getLocalData(STORAGE_KEYS.likes) || {}
    const savedComments = getLocalData(STORAGE_KEYS.comments) || []
    const savedSaves = getLocalData(STORAGE_KEYS.saves) || []
    const savedFollows = getLocalData(STORAGE_KEYS.follows) || {}

    return posts.map(post => ({
      ...post,
      likedBy: savedLikes[post.id] || post.likedBy,
      likes: (savedLikes[post.id] || post.likedBy).length,
      comments: [
        ...post.comments,
        ...savedComments.filter((c: CommunityComment) => c.postId === post.id),
      ],
      commentCount: post.commentCount + savedComments.filter((c: CommunityComment) => c.postId === post.id).length,
      savedBy: savedSaves[post.id] || post.savedBy,
      user: {
        ...post.user,
        isFollowing: savedFollows[post.userId] !== undefined ? savedFollows[post.userId] : post.user.isFollowing,
      },
    }))
  }

  private updateUserDataInPosts(posts: CommunityPost[]): CommunityPost[] {
    // Try to get current user from localStorage
    try {
      const userData = localStorage.getItem('user')
      if (!userData) return posts
      
      const currentUser = JSON.parse(userData)
      
      return posts.map(post => {
        // If this post belongs to the current user, update their info
        if (post.userId === currentUser.id) {
          return {
            ...post,
            user: {
              ...post.user,
              name: currentUser.name || post.user.name,
              avatar: currentUser.avatar || post.user.avatar,
            }
          }
        }
        return post
      })
    } catch {
      return posts
    }
  }

  // Local storage key for user-created posts
  private readonly STORAGE_KEY_USER_POSTS = 'community_user_posts'

  private getUserPosts(): CommunityPost[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_USER_POSTS) || '[]')
    } catch {
      return []
    }
  }

  private saveUserPosts(posts: CommunityPost[]) {
    localStorage.setItem(this.STORAGE_KEY_USER_POSTS, JSON.stringify(posts))
  }

  // Create Post
  async createPost(params: CreatePostParams): Promise<CommunityPost> {
    await delay(500)

    const newPost: CommunityPost = {
      id: `user-post-${Date.now()}`,
      userId: params.userId,
      user: {
        id: params.userId,
        name: params.userName,
        avatar: params.userAvatar,
        isVerified: false,
        isFollowing: false,
      },
      content: params.content,
      images: params.images,
      video: params.video,
      type: params.type,
      category: params.category,
      tags: params.tags || [],
      likes: 0,
      likedBy: [],
      comments: [],
      commentCount: 0,
      shares: 0,
      savedBy: [],
      isOfficial: false,
      isFeatured: false,
      isTrending: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      return await this.apiCall('/community/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
      })
    } catch {
      // Save to local storage
      const userPosts = this.getUserPosts()
      userPosts.unshift(newPost)
      this.saveUserPosts(userPosts)
      return newPost
    }
  }

  // Posts
  async getPosts(filter?: CommunityFilter): Promise<CommunityPost[]> {
    await delay(300)
    
    try {
      return await this.apiCall(`/community/posts?${new URLSearchParams(filter as any)}`)
    } catch {
      // Combine mock posts with user-created posts
      const userPosts = this.getUserPosts()
      let filtered = [...userPosts, ...mockPosts]

      if (filter?.category) {
        filtered = filtered.filter(p => p.category === filter.category)
      }
      if (filter?.type) {
        filtered = filtered.filter(p => p.type === filter.type)
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase()
        filtered = filtered.filter(p =>
          p.content.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
      }

      switch (filter?.sort) {
        case 'trending':
          filtered.sort((a, b) => b.likes - a.likes)
          break
        case 'popular':
          filtered.sort((a, b) => (b.likes + b.commentCount + b.shares) - (a.likes + a.commentCount + a.shares))
          break
        default:
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }

      const postsWithUpdatedUser = this.updateUserDataInPosts(this.enrichWithLocalData(filtered))
      return postsWithUpdatedUser
    }
  }

  async getFeaturedPosts(): Promise<CommunityPost[]> {
    await delay(200)
    try {
      return await this.apiCall('/community/posts/featured')
    } catch {
      return this.updateUserDataInPosts(this.enrichWithLocalData(mockPosts.filter(p => p.isFeatured)))
    }
  }

  async getTrendingPosts(): Promise<CommunityPost[]> {
    await delay(200)
    try {
      return await this.apiCall('/community/posts/trending')
    } catch {
      return this.updateUserDataInPosts(this.enrichWithLocalData(mockPosts.filter(p => p.isTrending)))
    }
  }

  async getPostById(id: string): Promise<CommunityPost | null> {
    await delay(200)
    try {
      return await this.apiCall(`/community/posts/${id}`)
    } catch {
      const post = mockPosts.find(p => p.id === id)
      const enriched = post ? this.enrichWithLocalData([post])[0] : null
      return enriched ? this.updateUserDataInPosts([enriched])[0] : null
    }
  }

  // Likes
  async toggleLike(postId: string, userId: string): Promise<{ liked: boolean; likes: number }> {
    await delay(100)
    try {
      return await this.apiCall(`/community/posts/${postId}/like`, { method: 'POST' })
    } catch {
      const savedLikes = getLocalData(STORAGE_KEYS.likes) || {}
      const postLikes = savedLikes[postId] || mockPosts.find(p => p.id === postId)?.likedBy || []
      
      const index = postLikes.indexOf(userId)
      let liked: boolean
      if (index >= 0) {
        postLikes.splice(index, 1)
        liked = false
      } else {
        postLikes.push(userId)
        liked = true
      }
      
      savedLikes[postId] = postLikes
      setLocalData(STORAGE_KEYS.likes, savedLikes)
      
      return { liked, likes: postLikes.length }
    }
  }

  // Comments
  async addComment(postId: string, userId: string, user: CommunityUser, content: string): Promise<CommunityComment> {
    await delay(200)
    try {
      return await this.apiCall(`/community/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ userId, content }),
      })
    } catch {
      const newComment: CommunityComment = {
        id: `comment-${Date.now()}`,
        postId,
        userId,
        user,
        content,
        likes: 0,
        likedBy: [],
        replies: [],
        replyCount: 0,
        createdAt: new Date().toISOString(),
      }
      
      const savedComments = getLocalData(STORAGE_KEYS.comments) || []
      savedComments.push(newComment)
      setLocalData(STORAGE_KEYS.comments, savedComments)
      
      return newComment
    }
  }

  async addReply(commentId: string, userId: string, user: CommunityUser, content: string): Promise<CommunityCommentReply> {
    await delay(200)
    try {
      return await this.apiCall(`/community/comments/${commentId}/replies`, {
        method: 'POST',
        body: JSON.stringify({ userId, content }),
      })
    } catch {
      const newReply: CommunityCommentReply = {
        id: `reply-${Date.now()}`,
        commentId,
        userId,
        user,
        content,
        likes: 0,
        likedBy: [],
        createdAt: new Date().toISOString(),
      }
      
      return newReply
    }
  }

  async likeComment(commentId: string, userId: string): Promise<{ liked: boolean; likes: number }> {
    await delay(100)
    return { liked: true, likes: 1 }
  }

  // Saves
  async toggleSave(postId: string, userId: string): Promise<{ saved: boolean }> {
    await delay(100)
    try {
      return await this.apiCall(`/community/posts/${postId}/save`, { method: 'POST' })
    } catch {
      const savedSaves = getLocalData(STORAGE_KEYS.saves) || {}
      const postSaves = savedSaves[postId] || mockPosts.find(p => p.id === postId)?.savedBy || []
      
      const index = postSaves.indexOf(userId)
      if (index >= 0) {
        postSaves.splice(index, 1)
      } else {
        postSaves.push(userId)
      }
      
      savedSaves[postId] = postSaves
      setLocalData(STORAGE_KEYS.saves, savedSaves)
      
      return { saved: index < 0 }
    }
  }

  // Follow
  async toggleFollow(targetUserId: string, userId: string): Promise<{ following: boolean }> {
    await delay(100)
    try {
      return await this.apiCall(`/community/users/${targetUserId}/follow`, { method: 'POST' })
    } catch {
      const savedFollows = getLocalData(STORAGE_KEYS.follows) || {}
      const current = savedFollows[targetUserId]
      savedFollows[targetUserId] = current === undefined ? true : !current
      setLocalData(STORAGE_KEYS.follows, savedFollows)
      return { following: savedFollows[targetUserId] }
    }
  }

  // Stats
  async getStats(): Promise<CommunityStats> {
    await delay(200)
    try {
      return await this.apiCall('/community/stats')
    } catch {
      return {
        totalPosts: 2347,
        totalUsers: 15234,
        trendingNow: 12,
        newToday: 45,
      }
    }
  }

  async getTrendingTopics(): Promise<TrendingTopic[]> {
    await delay(200)
    try {
      return await this.apiCall('/community/trending')
    } catch {
      return mockTrendingTopics
    }
  }

  async getSuggestedUsers(): Promise<CommunityUser[]> {
    await delay(200)
    try {
      return await this.apiCall('/community/users/suggested')
    } catch {
      const savedFollows = getLocalData(STORAGE_KEYS.follows) || {}
      return mockUsers.filter(u => !savedFollows[u.id] && !u.isFollowing).slice(0, 3)
    }
  }

  // Share
  getShareData(post: CommunityPost) {
    const url = `${window.location.origin}/comunidade/${post.id}`
    const text = `${post.content.slice(0, 100)}...`
    
    return {
      url,
      text,
      title: `LUKUSSO - ${post.user.name}`,
      shareLinks: {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        email: `mailto:?subject=${encodeURIComponent('LUKUSSO - ' + post.user.name)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
      },
    }
  }

  async shareViaWebAPI(post: CommunityPost): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share(this.getShareData(post))
        return true
      } catch {
        return false
      }
    }
    return false
  }

  async copyLink(post: CommunityPost): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(this.getShareData(post).url)
      return true
    } catch {
      return false
    }
  }
}

export const communityService = new CommunityService()