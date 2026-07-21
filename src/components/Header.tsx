import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store'
import { useContentStore } from '@/store'
import { CATEGORIES } from '@/utils/constants'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const { movies, series } = useContentStore()
  const categoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { name: 'Início', path: '/home' },
    { name: 'Filmes', path: '/home' },
    { name: 'Séries', path: '/home' },
    { name: 'Comunidade', path: '/comunidade' },
    { name: 'Minha Lista', path: '/my-list' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-lukusso-black/95 backdrop-blur-custom shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <motion.img
              src="/logo-amarelo.svg"
              alt="LUKUSSO"
              whileHover={{ scale: 1.05 }}
              className="h-12 w-auto"
            />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm text-gray-300 hover:text-lukusso-gold transition-colors duration-200"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dropdown Categorias */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-lukusso-gold transition-colors duration-200"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Categorias
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-lukusso-gray rounded-lg shadow-xl py-2 min-w-[200px] z-50"
                  >
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category}
                        to={`/search?category=${encodeURIComponent(category)}`}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-lukusso-gold hover:bg-lukusso-gray-light transition-colors"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Direita */}
          <div className="flex items-center gap-4">
            {/* Busca */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-300 hover:text-lukusso-gold transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Notificações */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-gray-300 hover:text-lukusso-gold transition-colors relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-lukusso-red rounded-full"></span>
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-lukusso-gray rounded-lg shadow-xl p-4 z-50"
                    >
                      <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Notificações
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-lukusso-gray-light rounded-lg">
                          <p className="text-sm text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Bem-vindo ao LUKUSSO!
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Agora há pouco</p>
                        </div>
                        <div className="p-3 bg-lukusso-gray-light rounded-lg">
                          <p className="text-sm text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Novo filme disponível: Meu Semba
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Hoje</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Perfil */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-lukusso-gold transition-colors">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-lukusso-gold flex items-center justify-center">
                      <User size={16} className="text-lukusso-black" />
                    </div>
                  )}
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary text-sm">
                Entrar
              </Link>
            )}

            {/* Menu Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barra de Busca */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                        setIsSearchOpen(false)
                        setSearchQuery('')
                      }
                    }}
                    placeholder="Pesquisar filmes, séries, actores..."
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {searchQuery.trim() && (
                  <div className="mt-2 bg-lukusso-gray rounded-lg p-2 max-h-96 overflow-y-auto">
                    {(() => {
                      const lowerQuery = searchQuery.toLowerCase()
                      const filteredMovies = movies.filter(
                        (movie) =>
                          movie.title.toLowerCase().includes(lowerQuery) ||
                          movie.director.toLowerCase().includes(lowerQuery) ||
                          movie.cast.some((actor) => actor.toLowerCase().includes(lowerQuery))
                      )

                      const filteredSeries = series.filter(
                        (s) =>
                          s.title.toLowerCase().includes(lowerQuery) ||
                          s.director.toLowerCase().includes(lowerQuery)
                      )

                      const allResults = [...filteredMovies, ...filteredSeries]

                      if (allResults.length === 0) {
                        return (
                          <p className="text-gray-400 text-sm p-4 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Nenhum resultado encontrado
                          </p>
                        )
                      }

                      return (
                        <div className="space-y-2">
                          {allResults.slice(0, 8).map((item) => (
                            <Link
                              key={item.id}
                              to={`/movie/${item.id}`}
                              onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery('')
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-lukusso-gray-light rounded-lg transition-colors"
                            >
                              <img
                                src={item.poster}
                                alt={item.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  {item.title}
                                </p>
                                <p className="text-gray-400 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  {item.year} • {'category' in item ? item.category : item.categories?.[0]}
                                </p>
                              </div>
                            </Link>
                          ))}
                          {allResults.length > 8 && (
                            <Link
                              to={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                              onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery('')
                              }}
                              className="block text-center text-lukusso-gold text-sm py-2 hover:underline"
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              Ver todos os {allResults.length} resultados
                            </Link>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-64 bg-lukusso-gray shadow-2xl md:hidden"
          >
            <div className="p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mb-6 text-gray-300 hover:text-white"
              >
                <X size={24} />
              </button>

              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-lukusso-gold transition-colors py-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Categorias no Mobile */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Categorias
                  </p>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to={`/search?category=${encodeURIComponent(category)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-lukusso-gold transition-colors py-1.5 text-sm pl-2"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-lukusso-gold transition-colors py-2"
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-left text-gray-300 hover:text-white transition-colors py-2"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary text-center mt-4"
                  >
                    Entrar
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}