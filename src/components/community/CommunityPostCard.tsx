import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, Play, ChevronDown, ChevronUp, MoreHorizontal, Send, X } from 'lucide-react'
import { CommunityPost } from '@/types/community'
import { communityService } from '@/services/community'
import { useAuthStore } from '@/store'
import { getProfilePath } from '@/utils/profile'
import CommunityCommentSection from './CommunityCommentSection'
import toast from 'react-hot-toast'

interface CommunityPostCardProps {
  post: CommunityPost
  isAuthenticated: boolean
}

export default function CommunityPostCard({ post, isAuthenticated }: CommunityPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.likedBy.length > 0)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isSaved, setIsSaved] = useState(post.savedBy.length > 0)
  const [showComments, setShowComments] = useState(false)
  const [isFollowing, setIsFollowing] = useState(post.user.isFollowing || false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [expandedContent, setExpandedContent] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)
  const user = useAuthStore((state) => state.user)

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'agora'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return date.toLocaleDateString('pt-AO', { day: 'numeric', month: 'short' })
  }

  const getTypeIcon = () => {
    const icons: Record<string, string> = {
      release: '🎬',
      review: '⭐',
      news: '📰',
      event: '🏆',
      announcement: '📢',
      making_of: '🎥',
      behind_scenes: '🎬',
    }
    return icons[post.type] || '📝'
  }

  const getTypeLabel = () => {
    const labels: Record<string, string> = {
      release: 'Novo Lançamento',
      review: 'Crítica',
      news: 'Notícia',
      event: 'Evento',
      announcement: 'Comunicado',
      making_of: 'Making Of',
      behind_scenes: 'Bastidores',
      poll: 'Enquete',
      post: 'Publicação',
    }
    return labels[post.type] || 'Publicação'
  }

  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      cinema_angolano: 'bg-amber-500/20 text-amber-400',
      series: 'bg-blue-500/20 text-blue-400',
      filmes: 'bg-purple-500/20 text-purple-400',
      bastidores: 'bg-rose-500/20 text-rose-400',
      eventos: 'bg-green-500/20 text-green-400',
      noticias: 'bg-cyan-500/20 text-cyan-400',
      comunidade: 'bg-orange-500/20 text-orange-400',
      destaque: 'bg-yellow-500/20 text-yellow-400',
    }
    return colors[post.category] || 'bg-gray-500/20 text-gray-400'
  }

  const getCategoryLabel = () => {
    const labels: Record<string, string> = {
      cinema_angolano: 'Cinema Angolano',
      series: 'Séries',
      filmes: 'Filmes',
      bastidores: 'Bastidores',
      eventos: 'Eventos',
      noticias: 'Notícias',
      comunidade: 'Comunidade',
      destaque: 'Em Destaque',
    }
    return labels[post.category] || post.category
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para gostar')
      return
    }
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    
    try {
      const result = await communityService.toggleLike(post.id, user?.id || '')
      setIsLiked(result.liked)
      setLikeCount(result.likes)
    } catch {
      toast.error('Erro ao atualizar like')
    }
  }

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para guardar')
      return
    }
    setIsSaved(!isSaved)
    try {
      await communityService.toggleSave(post.id, user?.id || '')
      toast.success(isSaved ? 'Removido dos guardados' : 'Guardado com sucesso')
    } catch {
      toast.error('Erro ao guardar')
    }
  }

  const handleFollow = async () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para seguir')
      return
    }
    setIsFollowing(!isFollowing)
    try {
      const result = await communityService.toggleFollow(post.userId, user?.id || '')
      setIsFollowing(result.following)
      toast.success(result.following ? `A seguir ${post.user.name}` : `Deixaste de seguir ${post.user.name}`)
    } catch {
      toast.error('Erro ao seguir')
    }
  }

  const handleShare = async () => {
    if (typeof navigator.share !== 'undefined') {
      const shared = await communityService.shareViaWebAPI(post)
      if (shared) return
    }
    setShowShareMenu(!showShareMenu)
  }

  const handleShareLink = async (platform: string) => {
    const shareData = communityService.getShareData(post)
    
    if (platform === 'copy') {
      const copied = await communityService.copyLink(post)
      if (copied) {
        toast.success('Link copiado!')
      }
    } else {
      const link = shareData.shareLinks[platform as keyof typeof shareData.shareLinks]
      if (link) {
        window.open(link, '_blank', 'noopener,noreferrer')
      }
    }
    setShowShareMenu(false)
  }

  const handleWatchTrailer = () => {
    if (post.movieRef?.slug) {
      window.open(`/filme/${post.movieRef.slug}`, '_self')
    }
  }

  const contentIsLong = post.content.length > 300
  const displayContent = expandedContent || !contentIsLong ? post.content : post.content.slice(0, 300) + '...'
  const imagesToShow = showAllImages ? post.images : post.images?.slice(0, 3)
  const remainingImages = post.images ? post.images.length - 3 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-lukusso-gray rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-200"
    >
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link to={getProfilePath(post.userId, user?.id)} className="shrink-0">
              {post.user.avatar ? (
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-lukusso-gold/20 flex items-center justify-center ring-2 ring-gray-700">
                  <span className="text-lukusso-gold font-bold text-sm">
                    {post.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  to={getProfilePath(post.userId, user?.id)}
                  className="text-white font-semibold text-sm hover:text-lukusso-gold transition-colors truncate"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {post.user.name}
                </Link>

                {post.isOfficial && (
                  <span className="shrink-0 bg-lukusso-gold/20 text-lukusso-gold text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    ✓
                  </span>
                )}
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-500 text-xs shrink-0">{getTimeAgo(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor()}`}>
                  {getCategoryLabel()}
                </span>
                <span className="text-gray-500 text-xs">{getTypeIcon()} {getTypeLabel()}</span>
              </div>
            </div>
          </div>
          
          {isAuthenticated && user?.id !== post.userId && (
            <button
              onClick={handleFollow}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 ml-2 ${
                isFollowing
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-lukusso-gold text-lukusso-black hover:bg-lukusso-gold/90'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {isFollowing ? 'A Seguir' : 'Seguir'}
            </button>
          )}

        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {displayContent}
        </p>
        {contentIsLong && (
          <button
            onClick={() => setExpandedContent(!expandedContent)}
            className="text-lukusso-gold text-sm mt-1 hover:underline"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {expandedContent ? 'Mostrar menos' : 'Ler mais'}
          </button>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/comunidade?search=${encodeURIComponent(tag)}`}
                className="text-lukusso-gold/80 text-xs hover:text-lukusso-gold hover:underline"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Movie Reference */}
      {post.movieRef && (
        <Link
          to={`/filme/${post.movieRef.slug}`}
          className="mx-4 mb-3 bg-lukusso-gray-light rounded-lg overflow-hidden flex items-center gap-3 hover:bg-lukusso-gray-light/80 transition-colors group"
        >
          <div className="w-16 h-20 shrink-0">
            <img
              src={post.movieRef.poster}
              alt={post.movieRef.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-2">
            <p className="text-white text-sm font-semibold group-hover:text-lukusso-gold transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {post.movieRef.title}
            </p>
            <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ver na LUKUSSO →
            </p>
          </div>
        </Link>
      )}

      {/* Trailer Embed */}
      {post.trailer && (
        <div className="mx-4 mb-3">
          <div className="relative rounded-lg overflow-hidden bg-lukusso-black aspect-video group cursor-pointer" onClick={handleWatchTrailer}>
            <video
              src={post.trailer}
              className="w-full h-full object-cover opacity-80"
              muted
              loop
              playsInline
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-lukusso-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={28} className="text-lukusso-black ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video */}
      {post.video && !post.trailer && (
        <div className="mx-4 mb-3">
          <video
            src={post.video}
            controls
            className="w-full rounded-lg"
            poster={post.images?.[0]}
          />
        </div>
      )}

      {/* Image Gallery */}
      {post.images && post.images.length > 0 && !post.trailer && (
        <div className={`mx-4 mb-3 grid gap-2 ${
          post.images.length === 1 ? 'grid-cols-1' :
          post.images.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {imagesToShow?.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden bg-lukusso-black cursor-pointer group ${
                post.images!.length === 1 ? 'aspect-video' : 'aspect-square'
              }`}
              onClick={() => {/* TODO: Open lightbox */}}
            >
              <img
                src={image}
                alt={`${post.user.name} - imagem ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {!showAllImages && index === 2 && remainingImages > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">+{remainingImages}</span>
                </div>
              )}
            </div>
          ))}
          {post.images.length > 3 && !showAllImages && (
            <button
              onClick={() => setShowAllImages(true)}
              className="col-span-full text-center text-lukusso-gold text-sm py-1 hover:underline"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Ver todas as {post.images.length} imagens
            </button>
          )}
        </div>
      )}

      {/* Action Stats */}
      <div className="px-4 py-2 flex items-center gap-4 border-t border-gray-800">
        <div className="flex items-center gap-1 text-gray-500 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <Heart size={14} className="text-lukusso-red" fill={isLiked ? '#CC092F' : 'none'} />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <MessageCircle size={14} />
          <span>{post.commentCount}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <Share2 size={14} />
          <span>{post.shares}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
              isLiked
                ? 'text-lukusso-red bg-lukusso-red/10'
                : 'text-gray-400 hover:text-lukusso-red hover:bg-gray-700/50'
            }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Heart size={18} fill={isLiked ? '#CC092F' : 'none'} />
            Gosto
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Precisas de fazer login para comentar')
                return
              }
              setShowComments(!showComments)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
              showComments
                ? 'text-lukusso-gold bg-lukusso-gold/10'
                : 'text-gray-400 hover:text-lukusso-gold hover:bg-gray-700/50'
            }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <MessageCircle size={18} />
            Comentar
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? 'text-lukusso-gold'
                : 'text-gray-400 hover:text-lukusso-gold hover:bg-gray-700/50'
            }`}
            title="Guardar"
          >
            <Bookmark size={18} fill={isSaved ? '#D4AF37' : 'none'} />
          </button>

          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-gray-400 hover:text-lukusso-gold hover:bg-gray-700/50 transition-colors"
              title="Partilhar"
            >
              <Share2 size={18} />
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute bottom-full right-0 mb-2 bg-lukusso-gray border border-gray-700 rounded-xl shadow-2xl p-3 min-w-[200px] z-50"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleShareLink('copy')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <Share2 size={16} className="text-gray-400" />
                      Copiar Link
                    </button>
                    <button
                      onClick={() => handleShareLink('whatsapp')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-green-400 font-bold">WA</span>
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShareLink('facebook')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-blue-400 font-bold">f</span>
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShareLink('twitter')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sky-400 font-bold">X</span>
                      X (Twitter)
                    </button>
                    <button
                      onClick={() => handleShareLink('telegram')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-blue-300 font-bold">TG</span>
                      Telegram
                    </button>
                    <button
                      onClick={() => handleShareLink('email')}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-gray-400">✉</span>
                      Email
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-800"
          >
            <CommunityCommentSection post={post} isAuthenticated={isAuthenticated} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}