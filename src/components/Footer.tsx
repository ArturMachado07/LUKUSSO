import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/utils/constants'
import { useState } from 'react'

export default function Footer() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const menuItems = [
    { name: 'Início', path: '/home' },
    { name: 'Filmes', path: '/home' },
    { name: 'Séries', path: '/home' },
    { name: 'Comunidade', path: '/comunidade' },
    { name: 'Planos', path: '/subscription' },
  ]

  return (
    <footer className="bg-lukusso-gray border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Menus */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-400 hover:text-lukusso-gold transition-colors text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {item.name}
              </Link>
            ))}

            {/* Dropdown Categorias */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-1 text-gray-400 hover:text-lukusso-gold transition-colors text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Categorias
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isCategoriesOpen && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-lukusso-gray rounded-lg shadow-xl py-2 min-w-[200px] z-50"
                  onMouseLeave={() => setIsCategoriesOpen(false)}
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
                </div>
              )}
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
            © 2024 LUKUSSO by Humuos Group. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}