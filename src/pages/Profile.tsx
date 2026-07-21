import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Settings, CreditCard, History, LogOut, Play, Camera, Save, X, Edit3, FileText, Heart, MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'
import { communityService } from '@/services/community'
import { CommunityPost } from '@/types/community'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [bio, setBio] = useState((user as any)?.bio || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2>
          <Link to="/login" className="btn-primary">
            Entrar
          </Link>
        </div>
      </div>
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem muito grande. Máximo 5MB.')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Formato inválido. Usa JPG ou PNG.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setAvatar(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('O nome é obrigatório')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Email inválido')
      return
    }

    updateUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar,
    })

    toast.success('Perfil atualizado com sucesso!')
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setAvatar(user.avatar)
    setBio((user as any)?.bio || '')
    setIsEditing(false)
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
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-lukusso-gold flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-lukusso-black" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-lukusso-gold text-lukusso-black rounded-full hover:scale-110 transition-transform"
                  title="Alterar foto"
                >
                  <Camera size={16} />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    className="w-full bg-lukusso-gray-light text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Biografia (opcional)"
                    rows={2}
                    className="w-full bg-lukusso-gray-light text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold resize-none"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
              ) : (
                <>
                  <h1
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {user.name}
                  </h1>
                  {(user as any)?.bio && (
                    <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {(user as any).bio}
                    </p>
                  )}
                </>
              )}
              <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {user.email}
              </p>
              <div className="mt-2">
                <span className="bg-lukusso-gold text-lukusso-black px-3 py-1 rounded-full text-sm font-semibold">
                  {user.subscription?.plan?.name || 'Nenhum plano'}
                </span>
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 bg-lukusso-gold text-lukusso-black rounded-lg hover:bg-lukusso-gold/90 transition-colors"
                    title="Guardar"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    title="Cancelar"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-lukusso-gray text-lukusso-gold rounded-lg hover:bg-lukusso-gray-light transition-colors"
                  title="Editar perfil"
                >
                  <Edit3 size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-lukusso-gray rounded-xl p-6 mb-8"
            >
              <h2
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Editar Perfil
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Biografia</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold resize-none"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Subscription Info */}
          <div className="bg-lukusso-gray rounded-xl p-6 mb-8">
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Minha Subscrição
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Plano Actual</p>
                <p className="text-white font-semibold text-lg">{user.subscription?.plan?.name || 'Nenhum plano'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Data de Renovação</p>
                <p className="text-white font-semibold text-lg">
                  {user.subscription ? new Date(user.subscription.endDate).toLocaleDateString('pt-AO') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Estado</p>
                <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Activo
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Link to="/subscription" className="btn-primary">
                <CreditCard size={20} />
                Alterar Plano
              </Link>
            </div>
          </div>

          {/* My Publications Section */}
          <MyPublicationsSection />

          {/* Menu Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/my-list"
              className="bg-lukusso-gray hover:bg-lukusso-gray-light transition-colors p-6 rounded-xl flex items-center gap-4"
            >
              <Play className="text-lukusso-gold" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Minha Lista
                </h3>
                <p className="text-gray-400 text-sm">Filmes e séries guardados</p>
              </div>
            </Link>

            <Link
              to="/subscription"
              className="bg-lukusso-gray hover:bg-lukusso-gray-light transition-colors p-6 rounded-xl flex items-center gap-4"
            >
              <CreditCard className="text-lukusso-gold" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Subscrição
                </h3>
                <p className="text-gray-400 text-sm">Gerir plano e pagamentos</p>
              </div>
            </Link>

            <Link
              to="/profile/history"
              className="bg-lukusso-gray hover:bg-lukusso-gray-light transition-colors p-6 rounded-xl flex items-center gap-4"
            >
              <History className="text-lukusso-gold" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Histórico
                </h3>
                <p className="text-gray-400 text-sm">O que já assististe</p>
              </div>
            </Link>

            <Link
              to="/profile/settings"
              className="bg-lukusso-gray hover:bg-lukusso-gray-light transition-colors p-6 rounded-xl flex items-center gap-4"
            >
              <Settings className="text-lukusso-gold" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Definições
                </h3>
                <p className="text-gray-400 text-sm">Conta e preferências</p>
              </div>
            </Link>
          </div>

  {/* Logout */}
  <div className="mt-8 text-center">
    <button
      onClick={() => {
        logout()
        window.location.href = '/'
      }}
      className="inline-flex items-center gap-2 text-lukusso-red hover:text-red-400 transition-colors"
    >
      <LogOut size={20} />
      <span style={{ fontFamily: 'Manrope, sans-serif' }}>Sair da Conta</span>
    </button>
  </div>
        </motion.div>
      </div>
    </div>
  )
}

function MyPublicationsSection() {
  const { user } = useAuthStore()
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUserPosts()
  }, [])

  const loadUserPosts = async () => {
    try {
      const posts = await communityService.getPosts({})
      const filtered = posts.filter(p => p.userId === user?.id)
      setUserPosts(filtered)
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-lukusso-gray rounded-xl p-6 mb-8">
        <h2
          className="text-2xl font-bold text-white mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Minhas Publicações
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-lukusso-gray-light rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-full mb-2" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-lukusso-gray rounded-xl p-6 mb-8">
      <h2
        className="text-2xl font-bold text-white mb-4"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        Minhas Publicações
      </h2>
      {userPosts.length === 0 ? (
        <div className="text-center py-12">
          <FileText size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Ainda não tens publicações</p>
          <Link
            to="/comunidade"
            className="text-lukusso-gold hover:underline text-sm"
          >
            Visita a comunidade para criar a primeira
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-lukusso-gray-light rounded-lg p-4 hover:bg-lukusso-gray transition-colors cursor-pointer"
              onClick={() => (window.location.href = `/comunidade/${post.id}`)}
            >
              <p className="text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {post.content.slice(0, 150)}
                {post.content.length > 150 && '...'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{new Date(post.createdAt).toLocaleDateString('pt-AO')}</span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {post.commentCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
