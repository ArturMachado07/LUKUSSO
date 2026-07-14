import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const menuItems = [
    { name: 'Início', path: '/home' },
    { name: 'Filmes', path: '/home' },
    { name: 'Séries', path: '/home' },
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