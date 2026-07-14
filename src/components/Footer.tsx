import { Link } from 'react-router-dom'

export default function Footer() {
  const footerSections = [
    {
      title: 'Navegação',
      links: [
        { name: 'Início', path: '/home' },
        { name: 'Filmes', path: '/home' },
        { name: 'Séries', path: '/home' },
        { name: 'Documentários', path: '/home' },
      ],
    },
    {
      title: 'Conta',
      links: [
        { name: 'Entrar', path: '/login' },
        { name: 'Registar', path: '/register' },
        { name: 'Minha Lista', path: '/my-list' },
        { name: 'Perfil', path: '/profile' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Ajuda', path: '/help' },
        { name: 'Contacto', path: '/contact' },
        { name: 'Termos', path: '/terms' },
        { name: 'Privacidade', path: '/privacy' },
      ],
    },
  ]

  return (
    <footer className="bg-lukusso-gray border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Slogan */}
          <div className="md:col-span-1">
            <h2
              className="text-2xl font-bold text-lukusso-gold mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              LUKUSSO
            </h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              O cinema angolano na tua tela.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © 2024 LUKUSSO. Todos os direitos reservados.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-white font-semibold mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-lukusso-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Payment */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Pagamentos:</span>
            <span className="text-lukusso-gold text-xs font-semibold">MULTICAIXA</span>
            <span className="text-lukusso-gold text-xs font-semibold">PAYPAY</span>
            <span className="text-lukusso-gold text-xs font-semibold">VISA</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Siga-nos:</span>
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors text-sm">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors text-sm">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-lukusso-gold transition-colors text-sm">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}