import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { CommunityPost, CommunityComment, CommunityCommentReply } from '@/types/community'
import { communityService } from '@/services/community'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

interface CommunityCommentSectionProps {
  post: CommunityPost
  isAuthenticated: boolean
}

export default function CommunityCommentSection({ post, isAuthenticated }: CommunityCommentSectionProps) {
  const [comments, setComments] = useState<CommunityComment[]>(post.comments || [])
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [expandedReplies, setExpandedReplies] = useState<string[]>([])
  const [likedComments, setLikedComments] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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

  const handleSubmitComment = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Precisas de fazer login para comentar')
      return
    }
    if (!newComment.trim()) return

    const commentUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      isVerified: false,
    }

    try {
      const newCommentObj = await communityService.addComment(post.id, user.id, commentUser, newComment.trim())
      setComments(prev => [...prev, newCommentObj])
      setNewComment('')
      toast.success('Comentário adicionado!')
    } catch {
      toast.error('Erro ao adicionar comentário')
    }
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!isAuthenticated || !user) return
    if (!replyContent.trim()) return

    const replyUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      isVerified: false,
    }

    try {
      const newReply = await communityService.addReply(commentId, user.id, replyUser, replyContent.trim())
      
      setComments(prev => prev.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply],
            replyCount: c.replyCount + 1,
          }
        }
        return c
      }))
      
      setReplyContent('')
      setReplyTo(null)
      toast.success('Resposta adicionada!')
    } catch {
      toast.error('Erro ao responder')
    }
  }

  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login')
      return
    }
    
    setLikedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )

    try {
      const result = await communityService.likeComment(commentId, user?.id || '')
      if (!result.liked) {
        setLikedComments(prev => prev.filter(id => id !== commentId))
      }
    } catch {
      toast.error('Erro ao dar like')
    }
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      action()
    }
  }

  return (
    <div className="p-4 bg-lukusso-black/50">
      <h4
        className="text-white font-semibold text-sm mb-4"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        Comentários ({comments.length + post.commentCount - post.comments.length || comments.length})
      </h4>

      {/* New Comment Input */}
      {isAuthenticated && (
        <div className="flex items-start gap-3 mb-6">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-lukusso-gold/20 flex items-center justify-center shrink-0">
              <span className="text-lukusso-gold font-bold text-xs">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSubmitComment)}
              placeholder="Escreve um comentário..."
              className="w-full bg-lukusso-gray-light text-white px-4 py-2.5 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lukusso-gold/50 text-sm min-h-[40px] max-h-[120px]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              rows={2}
            />
            {newComment.trim() && (
              <button
                onClick={handleSubmitComment}
                className="mt-2 flex items-center gap-2 text-sm text-lukusso-gold hover:text-lukusso-gold/80 transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Send size={16} />
                Publicar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Comment */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-lukusso-gold/20 flex items-center justify-center shrink-0 ring-1 ring-gray-700">
                {comment.user.avatar ? (
                  <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-lukusso-gold font-bold text-xs">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-lukusso-gray-light rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-white font-semibold text-xs"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {comment.user.name}
                    </span>
                    {comment.user.isVerified && (
                      <span className="bg-lukusso-gold/20 text-lukusso-gold text-[10px] px-1 rounded-full">
                        ✓
                      </span>
                    )}
                    <span className="text-gray-500 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px]">{getTimeAgo(comment.createdAt)}</span>
                  </div>
                  <p
                    className="text-gray-200 text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-1 ml-2">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      likedComments.includes(comment.id)
                        ? 'text-lukusso-red'
                        : 'text-gray-500 hover:text-lukusso-red'
                    }`}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <Heart size={12} fill={likedComments.includes(comment.id) ? '#CC092F' : 'none'} />
                    {comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}
                  </button>
                  {isAuthenticated && (
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="text-xs text-gray-500 hover:text-lukusso-gold transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Responder
                    </button>
                  )}
                </div>

                {/* Reply Input */}
                <AnimatePresence>
                  {replyTo === comment.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 ml-2 overflow-hidden"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-lukusso-gold/20 flex items-center justify-center shrink-0">
                          <span className="text-lukusso-gold font-bold text-[10px]">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, () => handleSubmitReply(comment.id))}
                            placeholder="Escreve uma resposta..."
                            className="w-full bg-lukusso-gray-light text-white px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-lukusso-gold/50"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                            autoFocus
                          />
                          {replyContent.trim() && (
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              className="mt-1 text-xs text-lukusso-gold hover:underline"
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              Responder
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-2 ml-2">
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="flex items-center gap-1 text-xs text-lukusso-gold hover:underline mb-2"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {expandedReplies.includes(comment.id) ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {comment.replyCount} {comment.replyCount === 1 ? 'resposta' : 'respostas'}
                    </button>

                    <AnimatePresence>
                      {expandedReplies.includes(comment.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-3 overflow-hidden pl-2 border-l-2 border-gray-700"
                        >
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-lukusso-gold/20 flex items-center justify-center shrink-0 ring-1 ring-gray-700">
                                {reply.user.avatar ? (
                                  <img src={reply.user.avatar} alt={reply.user.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                  <span className="text-lukusso-gold font-bold text-[10px]">
                                    {reply.user.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="bg-lukusso-gray-light rounded-lg px-3 py-2">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span
                                      className="text-white font-semibold text-xs"
                                      style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                      {reply.user.name}
                                    </span>
                                    <span className="text-gray-500 text-[10px]">•</span>
                                    <span className="text-gray-500 text-[10px]">{getTimeAgo(reply.createdAt)}</span>
                                  </div>
                                  <p
                                    className="text-gray-300 text-xs"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                  >
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}