import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Início', path: '/home' },
    { name: 'Filmes', path: '/home' },
    { name: 'Séries', path: '/home' },
    { name: 'Documentários', path: '/home' },
    { name: 'Angola', path: '/home' },
    { name: 'África', path: '/home' },
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
              <button className="p-2 text-gray-300 hover:text-lukusso-gold transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-lukusso-red rounded-full"></span>
              </button>
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
                    placeholder="Pesquisar filmes, séries, actores..."
                    className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
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