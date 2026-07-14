import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Film, Users, CreditCard, LogOut } from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/movies', label: 'Filmes', icon: Film },
    { path: '/admin/users', label: 'Utilizadores', icon: Users },
    { path: '/admin/payments', label: 'Pagamentos', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-lukusso-black flex">
      <aside className="w-64 bg-lukusso-gray border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-bold text-lukusso-gold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            LUKUSSO
          </Link>
          <p className="text-xs text-gray-500 mt-1">Painel Admin</p>
        </div>

        <nav className="flex-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-lukusso-gold text-lukusso-black'
                    : 'text-gray-400 hover:bg-lukusso-gray-light hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link to="/home" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} />
            <span style={{ fontFamily: 'Manrope, sans-serif' }}>Sair</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}