import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, MessageCircle, Film, Calendar, Users, Send } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'
import { communityService } from '@/services/community'
import { CommunityPost } from '@/types/community'
import { isOwnProfile } from '@/utils/profile'
import toast from 'react-hot-toast'

export default function UserProfile() {
  const { userId } = useParams()
  const { user: currentUser, isAuthenticated } = useAuthStore()
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [isFollowing, setIsFollowing] = useState(false)

  const ownProfile = isOwnProfile(userId, currentUser?.id)

  // Mock user data - in real app would fetch from API
  const user = {
    id: userId || 'user-1',
    name: userId === 'user-2' ? 'Maria Santos' : userId === 'user-3' ? 'João Agostinho' : 'Utilizador',
    avatar: '',
    bio: userId === 'user-2' ? 'Cineasta angolana' : userId === 'user-3' ? 'Crítico de cinema' : 'Apaixonado por cinema angolano',
    isVerified: userId === 'user-1',
    followers: 234,
    following: 156,
    posts: 42,
  }

  useEffect(() => {
    if (ownProfile) return
    loadUserPosts()
  }, [userId, ownProfile])

  const loadUserPosts = async () => {
    try {
      const posts = await communityService.getPosts({})
      const filtered = posts.filter(p => p.userId === userId)
      setUserPosts(filtered)
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  // Own account always uses the main /profile page (not /profile/:id)
  if (ownProfile) {
    return <Navigate to="/profile" replace />
  }


  const handleFollow = async () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para seguir')
      return
    }
    setIsFollowing(!isFollowing)
    toast.success(isFollowing ? `Deixaste de seguir ${user.name}` : `A seguir ${user.name}`)
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      senderId: currentUser?.id || 'user-1',
      receiverId: userId,
      content: chatMessage,
      createdAt: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setChatMessage('')
    toast.success('Mensagem enviada!')
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link
            to="/comunidade"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Manrope, sans-serif' }}>Voltar</span>
          </Link>

          {/* Profile Header */}
          <div className="bg-lukusso-gray rounded-xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-lukusso-gold flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User size={40} className="text-lukusso-black" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {user.name}
                  </h1>
                  {user.isVerified && (
                    <span className="bg-lukusso-gold/20 text-lukusso-gold text-xs px-2 py-0.5 rounded-full font-semibold">
                      ✓ Verificado
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {user.bio}
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{user.posts}</p>
                    <p className="text-gray-500">Publicações</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{user.followers}</p>
                    <p className="text-gray-500">Seguidores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{user.following}</p>
                    <p className="text-gray-500">A Seguir</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {currentUser?.id !== userId && (
                  <>
                    <button
                      onClick={handleFollow}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        isFollowing
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-lukusso-gold text-lukusso-black hover:bg-lukusso-gold/90'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {isFollowing ? 'A Seguir' : 'Seguir'}
                    </button>
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="p-2 bg-lukusso-gray-light text-lukusso-gold rounded-lg hover:bg-gray-700 transition-colors"
                      title="Enviar mensagem"
                    >
                      <MessageCircle size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Chat Section */}
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-lukusso-gray rounded-xl p-6 mb-8"
            >
              <h2
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Mensagens
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Nenhuma mensagem ainda. Envia uma mensagem para começar!
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.senderId === currentUser?.id
                            ? 'bg-lukusso-gold text-lukusso-black'
                            : 'bg-lukusso-gray-light text-white'
                        }`}
                      >
                        <p style={{ fontFamily: 'Manrope, sans-serif' }}>{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.senderId === currentUser?.id ? 'text-lukusso-black/60' : 'text-gray-500'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escreve uma mensagem..."
                  className="flex-1 bg-lukusso-gray-light text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="p-2 bg-lukusso-gold text-lukusso-black rounded-lg hover:bg-lukusso-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* User Posts */}
          <div>
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Publicações
            </h2>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-lukusso-gray rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-700 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : userPosts.length === 0 ? (
              <div className="text-center py-12">
                <Film size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Este utilizador ainda não tem publicações</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-lukusso-gray rounded-xl p-6 hover:bg-lukusso-gray-light transition-colors cursor-pointer"
                    onClick={() => (window.location.href = `/comunidade/${post.id}`)}
                  >
                    <p className="text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {post.content.slice(0, 200)}
                      {post.content.length > 200 && '...'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{new Date(post.createdAt).toLocaleDateString('pt-AO')}</span>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.commentCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}