import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Settings, CreditCard, History, LogOut, Play } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuthStore()

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

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-24 h-24 rounded-full bg-lukusso-gold flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={40} className="text-lukusso-black" />
              )}
            </div>
            <div>
              <h1
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {user.name}
              </h1>
              <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {user.email}
              </p>
              <div className="mt-2">
                <span className="bg-lukusso-gold text-lukusso-black px-3 py-1 rounded-full text-sm font-semibold">
                  {user.subscription?.plan?.name || 'Nenhum plano'}
                </span>
              </div>
            </div>
          </div>

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