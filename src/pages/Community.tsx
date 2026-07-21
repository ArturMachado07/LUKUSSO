import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, TrendingUp, Clock, Flame, ChevronDown, X, RefreshCw, Users, Plus, Edit3 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CommunityPostCard from '@/components/community/CommunityPostCard'
import CommunitySidebar from '@/components/community/CommunitySidebar'
import CreatePostModal from '@/components/community/CreatePostModal'
import { CommunityPost, CommunityFilter } from '@/types/community'
import { communityService } from '@/services/community'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

const CATEGORY_OPTIONS = [
  { value: '', label: 'Todas as Categorias' },
  { value: 'destaque', label: 'Em Destaque' },
  { value: 'cinema_angolano', label: 'Cinema Angolano' },
  { value: 'series', label: 'Séries' },
  { value: 'filmes', label: 'Filmes' },
  { value: 'bastidores', label: 'Bastidores' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'noticias', label: 'Notícias' },
  { value: 'comunidade', label: 'Comunidade' },
]

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recentes', icon: Clock },
  { value: 'trending', label: 'Tendências', icon: Flame },
  { value: 'popular', label: 'Populares', icon: TrendingUp },
]

const POSTS_PER_PAGE = 10

export default function Community() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeSort, setActiveSort] = useState<string>(searchParams.get('sort') || 'recent')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { isAuthenticated } = useAuthStore()

  const loadPosts = useCallback(async (pageNum: number, replace: boolean = false) => {
    try {
      if (pageNum === 1) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }
      setError(null)

      const filter: CommunityFilter = {
        sort: activeSort as 'recent' | 'trending' | 'popular',
      }

      if (activeCategory) filter.category = activeCategory
      if (searchQuery) filter.search = searchQuery

      const data = await communityService.getPosts(filter)

      if (replace) {
        setPosts(data.slice(0, POSTS_PER_PAGE))
      } else {
        setPosts(prev => [...prev, ...data.slice(0, POSTS_PER_PAGE)])
      }

      setHasMore(data.length > POSTS_PER_PAGE)
    } catch (err) {
      setError('Erro ao carregar publicações. Tenta novamente.')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [activeCategory, activeSort, searchQuery])

  const loadFeatured = useCallback(async () => {
    try {
      const data = await communityService.getFeaturedPosts()
      setFeaturedPosts(data.slice(0, 3))
    } catch {
      // Silently fail
    }
  }, [])

  useEffect(() => {
    loadPosts(1, true)
    loadFeatured()
  }, [loadPosts, loadFeatured])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, isLoadingMore])

  useEffect(() => {
    if (page > 1) {
      loadPosts(page)
    }
  }, [page, loadPosts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (activeCategory) params.set('category', activeCategory)
    if (activeSort !== 'recent') params.set('sort', activeSort)
    setSearchParams(params)
    setPage(1)
    loadPosts(1, true)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
    setPage(1)
  }

  const handleSortChange = (sort: string) => {
    setActiveSort(sort)
    setShowSortMenu(false)
    const params = new URLSearchParams(searchParams)
    if (sort !== 'recent') {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }
    setSearchParams(params)
    setPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('')
    setActiveSort('recent')
    setSearchParams(new URLSearchParams())
    setPage(1)
  }

  const hasActiveFilters = searchQuery || activeCategory || activeSort !== 'recent'

  const ActiveSortIcon = SORT_OPTIONS.find(o => o.value === activeSort)?.icon || Clock

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-20 pb-8 bg-gradient-to-b from-lukusso-gray to-lukusso-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Nossa <span className="text-lukusso-gold">Comunidade</span>
            </h1>
            <p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Descobre, partilha e conecta-te com apaixonados pelo cinema angolano
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar na comunidade..."
                className="w-full bg-lukusso-gray-light text-white pl-12 pr-12 py-3.5 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lukusso-gold/50 focus:border-lukusso-gold text-sm transition-all"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSearchParams(new URLSearchParams())
                    setPage(1)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.form>

          {/* Create Post Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Precisas de fazer login para publicar')
                  return
                }
                setShowCreateModal(true)
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-lukusso-gold text-lukusso-black font-semibold rounded-xl hover:bg-lukusso-gold/90 transition-all hover:scale-105 active:scale-95 text-sm shadow-lg shadow-lukusso-gold/20"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <Plus size={20} />
              Criar Publicação
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-lukusso-gray rounded-xl border border-gray-800 p-4">
                <h3
                  className="text-white font-semibold text-sm mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Categorias
                </h3>
                <div className="space-y-1">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.value
                          ? 'bg-lukusso-gold/10 text-lukusso-gold font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="flex-1 min-w-0">
            {/* Filters Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile Category Filter */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-lukusso-gray rounded-lg border border-gray-700 text-gray-300 text-sm hover:border-gray-600 transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <Filter size={16} />
                    {activeCategory ? CATEGORY_OPTIONS.find(c => c.value === activeCategory)?.label : 'Categorias'}
                    <ChevronDown size={14} />
                  </button>

                  <AnimatePresence>
                    {showMobileFilters && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-4 right-4 mt-2 bg-lukusso-gray border border-gray-700 rounded-xl shadow-2xl p-3 z-50"
                      >
                        <div className="space-y-1">
                          {CATEGORY_OPTIONS.map((cat) => (
                            <button
                              key={cat.value}
                              onClick={() => {
                                handleCategoryChange(cat.value)
                                setShowMobileFilters(false)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                activeCategory === cat.value
                                  ? 'bg-lukusso-gold/10 text-lukusso-gold font-semibold'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                              }`}
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-lukusso-gray rounded-lg border border-gray-700 text-gray-300 text-sm hover:border-gray-600 transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <ActiveSortIcon size={16} />
                    {SORT_OPTIONS.find(o => o.value === activeSort)?.label}
                    <ChevronDown size={14} />
                  </button>

                  <AnimatePresence>
                    {showSortMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-lukusso-gray border border-gray-700 rounded-xl shadow-2xl p-2 min-w-[180px] z-50"
                      >
                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              activeSort === option.value
                                ? 'bg-lukusso-gold/10 text-lukusso-gold font-semibold'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            <option.icon size={16} />
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Active Filters & Refresh */}
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <X size={14} />
                    Limpar filtros
                  </button>
                )}
                <button
                  onClick={() => loadPosts(1, true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  title="Actualizar"
                >
                  <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-lukusso-red/10 border border-lukusso-red/20 rounded-xl p-6 text-center mb-6"
              >
                <p className="text-lukusso-red mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{error}</p>
                <button
                  onClick={() => loadPosts(1, true)}
                  className="btn-primary text-sm"
                >
                  Tentar novamente
                </button>
              </motion.div>
            )}

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-lukusso-gray rounded-xl border border-gray-800 p-6 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-32 mb-2" />
                        <div className="h-3 bg-gray-700 rounded w-24" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-700 rounded w-full" />
                      <div className="h-3 bg-gray-700 rounded w-3/4" />
                      <div className="h-3 bg-gray-700 rounded w-1/2" />
                    </div>
                    <div className="h-48 bg-gray-700 rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            {/* Posts Feed */}
            {!isLoading && !error && (
              <>
                {featuredPosts.length > 0 && (
                  <div className="mb-8">
                    <h2
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <Flame size={20} className="text-lukusso-gold" />
                      Em Destaque
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {featuredPosts.map((post) => (
                        <div
                          key={post.id}
                          className="relative bg-gradient-to-br from-lukusso-gray to-lukusso-gray-light rounded-xl border border-lukusso-gold/20 overflow-hidden group cursor-pointer"
                          onClick={() => window.location.href = `/comunidade/${post.id}`}
                        >
                          {post.images?.[0] && (
                            <div className="h-32 overflow-hidden">
                              <img
                                src={post.images[0]}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-lukusso-gray via-transparent to-transparent" />
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-lukusso-gold/20 text-lukusso-gold text-xs px-2 py-0.5 rounded-full font-semibold">
                                ★ Destaque
                              </span>
                            </div>
                            <p className="text-white text-sm font-semibold line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {post.content.slice(0, 100)}...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {posts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <Users size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Nenhuma publicação encontrada
                    </h3>
                    <p
                      className="text-gray-400 mb-6"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {hasActiveFilters
                        ? 'Tenta ajustar os filtros ou limpar a pesquisa'
                        : 'Ainda não há publicações na comunidade'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="btn-primary"
                      >
                        Limpar filtros
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {posts.map((post) => (
                        <motion.div
                          key={post.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <CommunityPostCard post={post} isAuthenticated={isAuthenticated} />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Infinite Scroll Trigger */}
                    <div ref={loaderRef} className="py-8 flex justify-center">
                      {isLoadingMore && (
                        <div className="flex items-center gap-3 text-gray-400">
                          <RefreshCw size={20} className="animate-spin" />
                          <span style={{ fontFamily: 'Manrope, sans-serif' }}>A carregar mais publicações...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden xl:block w-80 shrink-0">
            <div className="sticky top-24">
              <CommunitySidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={(newPost) => {
          setPosts(prev => [newPost, ...prev])
        }}
      />

      <Footer />
    </div>
  )
}