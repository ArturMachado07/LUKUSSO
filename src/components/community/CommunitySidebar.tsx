import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Users, MessageCircle, Flame, Hash, UserPlus } from 'lucide-react'
import { CommunityStats, TrendingTopic, CommunityUser } from '@/types/community'
import { communityService } from '@/services/community'
import { useAuthStore } from '@/store'
import { getProfilePath } from '@/utils/profile'
import toast from 'react-hot-toast'

export default function CommunitySidebar() {
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [suggestedUsers, setSuggestedUsers] = useState<CommunityUser[]>([])
  const [following, setFollowing] = useState<string[]>([])
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    loadSidebarData()
  }, [])

  const loadSidebarData = async () => {
    try {
      const [statsData, topicsData, usersData] = await Promise.all([
        communityService.getStats(),
        communityService.getTrendingTopics(),
        communityService.getSuggestedUsers(),
      ])
      setStats(statsData)
      setTrendingTopics(topicsData)
      setSuggestedUsers(usersData)
    } catch {
      // Silently fail
    }
  }

  const handleFollow = async (targetUserId: string, userName: string) => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para seguir')
      return
    }
    
    setFollowing(prev => [...prev, targetUserId])
    try {
      const result = await communityService.toggleFollow(targetUserId, user?.id || '')
      if (!result.following) {
        setFollowing(prev => prev.filter(id => id !== targetUserId))
      }
      toast.success(result.following ? `A seguir ${userName}` : `Deixaste de seguir ${userName}`)
    } catch {
      setFollowing(prev => prev.filter(id => id !== targetUserId))
      toast.error('Erro ao seguir')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-lukusso-gray rounded-xl border border-gray-800 p-4"
        >
          <h3
            className="text-white font-semibold text-sm mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Flame size={16} className="text-lukusso-gold" />
            Comunidade
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-lukusso-gold">{stats.totalPosts.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Publicações</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-lukusso-gold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Utilizadores</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-lukusso-gold">{stats.trendingNow}</p>
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Tendências</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-lukusso-gold">{stats.newToday}</p>
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Hoje</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-lukusso-gray rounded-xl border border-gray-800 p-4"
      >
        <h3
          className="text-white font-semibold text-sm mb-4 flex items-center gap-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <TrendingUp size={16} className="text-lukusso-gold" />
          Tendências
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.id}
              to={`/comunidade?search=${encodeURIComponent(topic.name)}`}
              className="flex items-center gap-3 group"
            >
              <span className="text-gray-600 text-sm font-bold w-5">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-white text-sm font-semibold group-hover:text-lukusso-gold transition-colors truncate"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <Hash size={12} className="inline text-gray-500" />
                  {topic.name}
                </p>
                <p className="text-gray-500 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {topic.postCount} publicações
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Suggested Users */}
      {suggestedUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-lukusso-gray rounded-xl border border-gray-800 p-4"
        >
          <h3
            className="text-white font-semibold text-sm mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Users size={16} className="text-lukusso-gold" />
            Sugestões
          </h3>
          <div className="space-y-3">
            {suggestedUsers.map((suggestedUser) => (
              <div key={suggestedUser.id} className="flex items-center gap-3">
                <Link to={getProfilePath(suggestedUser.id, user?.id)} className="shrink-0">
                  {suggestedUser.avatar ? (
                    <img
                      src={suggestedUser.avatar}
                      alt={suggestedUser.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-lukusso-gold/20 flex items-center justify-center ring-2 ring-gray-700">
                      <span className="text-lukusso-gold font-bold text-sm">
                        {suggestedUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={getProfilePath(suggestedUser.id, user?.id)}
                    className="text-white text-sm font-semibold hover:text-lukusso-gold transition-colors truncate block"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {suggestedUser.name}
                  </Link>

                  {suggestedUser.bio && (
                    <p className="text-gray-500 text-xs truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {suggestedUser.bio}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleFollow(suggestedUser.id, suggestedUser.name)}
                  disabled={following.includes(suggestedUser.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 ${
                    following.includes(suggestedUser.id)
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-lukusso-gold text-lukusso-black hover:bg-lukusso-gold/90'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {following.includes(suggestedUser.id) ? 'Seguindo' : 'Seguir'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-lukusso-gray rounded-xl border border-gray-800 p-4"
      >
        <h3
          className="text-white font-semibold text-sm mb-4 flex items-center gap-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <MessageCircle size={16} className="text-lukusso-gold" />
          Categorias
        </h3>
        <div className="space-y-2">
          {[
            { key: 'cinema_angolano', label: 'Cinema Angolano', color: 'bg-amber-500/20 text-amber-400' },
            { key: 'series', label: 'Séries', color: 'bg-blue-500/20 text-blue-400' },
            { key: 'filmes', label: 'Filmes', color: 'bg-purple-500/20 text-purple-400' },
            { key: 'bastidores', label: 'Bastidores', color: 'bg-rose-500/20 text-rose-400' },
            { key: 'eventos', label: 'Eventos', color: 'bg-green-500/20 text-green-400' },
            { key: 'noticias', label: 'Notícias', color: 'bg-cyan-500/20 text-cyan-400' },
            { key: 'comunidade', label: 'Comunidade', color: 'bg-orange-500/20 text-orange-400' },
          ].map((cat) => (
            <Link
              key={cat.key}
              to={`/comunidade?category=${cat.key}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-700/50 ${cat.color}`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {cat.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}