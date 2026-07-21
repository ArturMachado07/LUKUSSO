import { useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Users, DollarSign, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react'
import Header from '@/components/Header'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Utilizadores', value: '1.234', icon: Users, color: 'text-blue-400' },
    { label: 'Receita Mensal', value: '2.5M Kz', icon: DollarSign, color: 'text-green-400' },
    { label: 'Filmes Activos', value: '456', icon: Film, color: 'text-lukusso-gold' },
    { label: 'Subscrições', value: '892', icon: TrendingUp, color: 'text-purple-400' },
  ]

  const movies = [
    { id: '1', title: 'O Último Canto do Galo', year: 2024, views: '12.5K' },
    { id: '2', title: 'Luanda, Cidade do Futuro', year: 2024, views: '8.3K' },
    { id: '3', title: 'Kizomba: A Dança do Coração', year: 2023, views: '15.2K' },
  ]

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Painel Administrativo
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Gerir conteúdo, utilizadores e subscrições
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-700">
            {['dashboard', 'movies', 'users', 'payments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-lukusso-gold border-b-2 border-lukusso-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {tab === 'dashboard' && 'Dashboard'}
                {tab === 'movies' && 'Filmes'}
                {tab === 'users' && 'Utilizadores'}
                {tab === 'payments' && 'Pagamentos'}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-lukusso-gray rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={stat.color} size={32} />
                      </div>
                      <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {stat.label}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Recent Activity */}
              <div className="bg-lukusso-gray rounded-xl p-6">
                <h3
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Actividade Recente
                </h3>
                <div className="space-y-4">
                  {['Novo utilizador registado: João Silva', 'Pagamento confirmado: 3.500 Kz', 'Filme adicionado: Nova produção'].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-lukusso-gray-light rounded-lg">
                      <div className="w-2 h-2 bg-lukusso-gold rounded-full"></div>
                      <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Movies Tab */}
          {activeTab === 'movies' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Filmes e Séries
                </h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  Adicionar
                </button>
              </div>

              <div className="bg-lukusso-gray rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-lukusso-gray-light">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Título
                      </th>
                      <th className="text-left p-4 text-gray-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Ano
                      </th>
                      <th className="text-left p-4 text-gray-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Visualizações
                      </th>
                      <th className="text-left p-4 text-gray-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Acções
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => (
                      <tr key={movie.id} className="border-t border-gray-700 hover:bg-lukusso-gray-light/50">
                        <td className="p-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {movie.title}
                        </td>
                        <td className="p-4 text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {movie.year}
                        </td>
                        <td className="p-4 text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {movie.views}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-lukusso-gold hover:bg-lukusso-gold/10 rounded">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-lukusso-red hover:bg-lukusso-red/10 rounded">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-lukusso-gray rounded-xl p-12 text-center">
              <Users size={64} className="text-gray-600 mx-auto mb-4" />
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Gestão de Utilizadores
              </h3>
              <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Lista completa de utilizadores com filtros e acções
              </p>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-lukusso-gray rounded-xl p-12 text-center">
              <DollarSign size={64} className="text-gray-600 mx-auto mb-4" />
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Gestão de Pagamentos
              </h3>
              <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Histórico de transacções e gestão de subscrições
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}