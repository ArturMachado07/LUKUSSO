import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, MessageCircle, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'
import { communityService } from '@/services/community'
import { CommunityPost } from '@/types/community'
import toast from 'react-hot-toast'

export default function CommunityPostView() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user: currentUser } = useAuthStore()
  const [post, setPost] = useState<CommunityPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    loadPost()
  }, [postId])

  const loadPost = async () => {
    if (!postId) return
    try {
      const posts = await communityService.getPosts({})
      const foundPost = posts.find(p => p.id === postId)
      if (foundPost) {
        setPost(foundPost)
      } else {
        toast.error('Publicação não encontrada')
        navigate('/comunidade')
      }
    } catch {
      toast.error('Erro ao carregar publicação')
      navigate('/comunidade')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para curtir')
      return
    }
    if (post) {
      setPost({ ...post, likes: post.likes + 1 })
      toast.success('Curtido!')
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copiado para a área de transferência!')
  }

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index)
    setShowImageViewer(true)
  }

  const nextImage = () => {
  if (!post?.images?.length) return

  const imageCount = post.images.length

  setCurrentImageIndex((prev: number) => (prev + 1) % imageCount)
}

  const prevImage = () => {
  if (!post?.images?.length) return

  const imageCount = post.images.length

  setCurrentImageIndex((prev: number) => (prev - 1 + imageCount) % imageCount)
}

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lukusso-black pt-20">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-lukusso-gray rounded-xl p-6 animate-pulse">
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
              <div className="h-64 bg-gray-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-lukusso-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Publicação não encontrada</p>
          <Link to="/comunidade" className="btn-primary">
            Voltar à Comunidade
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Manrope, sans-serif' }}>Voltar</span>
          </button>

          {/* Post Content */}
          <div className="bg-lukusso-gray rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-lukusso-gold flex items-center justify-center overflow-hidden">
                {post.user?.avatar ? (
                  <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lukusso-black font-bold text-sm">
                    {post.user?.name?.[0] || 'U'}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {post.user?.name || 'Utilizador'}
                </h3>
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {new Date(post.createdAt).toLocaleDateString('pt-AO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <p className="text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {post.content}
            </p>

            {/* Images Grid */}
            {post.images && post.images.length > 0 && (
              <div className="mb-4">
                {post.images.length === 1 ? (
                  <img
                    src={post.images[0]}
                    alt=""
                    className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImageViewer(0)}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {post.images.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageViewer(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-700">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-400 hover:text-lukusso-gold transition-colors"
              >
                <Heart size={18} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>{post.likes}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle size={18} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>{post.commentCount}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-400 hover:text-lukusso-gold transition-colors ml-auto"
              >
                <Share2 size={18} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>Partilhar</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-lukusso-gray rounded-xl p-6">
            <h3
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Comentários
            </h3>
            <p className="text-gray-400 text-center py-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Funcionalidade de comentários em desenvolvimento
            </p>
          </div>
        </motion.div>
      </div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {showImageViewer && post && post.images && post.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageViewer(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageViewer(false)}
                className="absolute top-4 right-4 text-white hover:text-lukusso-gold z-10"
              >
                <X size={24} />
              </button>

              {post.images!.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-lukusso-gold z-10"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-lukusso-gold z-10"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <img
                src={post.images![currentImageIndex]}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />

              {post.images!.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} / {post.images!.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}