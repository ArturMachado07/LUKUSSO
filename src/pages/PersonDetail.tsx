import { useMemo, useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  User,
  Clapperboard,
  Star,
  MapPin,
  Calendar,
  Award,
  Mail,
  Phone,
  Globe,
  Building2,
  Film,
  ExternalLink,
  Edit,
  Heart,
  MessageSquare,
  Send,
  X,
} from 'lucide-react'
import Header from '@/components/Header'
import { useContentStore, useAuthStore } from '@/store'
import { Movie } from '@/types'
import { getPersonByName, getPersonBySlug, getInitials, slugify } from '@/services/people'
import toast from 'react-hot-toast'

// Dados mock completos para todos os filmes (mesmo do MovieDetail)
const mockMovies: Movie[] = [
  {
    id: '1',
    slug: 'meu-semba',
    title: 'Meu Semba',
    description: 'Uma sinfonia urbana vibrante, embalada pelos ritmos da poesia rap, revela histórias de resiliência e dignidade inabaláveis em meio à dura realidade do cotidiano dos trabalhadores de Luanda.',
    poster: '/Meu_Semba_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/meu-semba-trailer.mp4',
    videoUrl: '/meu-semba-trailer.mp4',
    director: 'Hugo Salvaterra',
    cast: ['Euclides Teixeira', 'Willi Ribeiro', 'Eliane da Silva', 'Clemente Chimuco'],
    year: 2026,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português', 'Inglês', 'Francês'],
    duration: 90,
    category: 'Drama',
    rating: 4.5,
    ageRating: '16+',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'a-ilha-dos-caes',
    title: 'A Ilha dos Cães',
    description: 'Numa ilha angolana, os trabalhadores que constroem um complexo hoteleiro começam a ser assassinados por cães.',
    poster: '/A_ilha_dos_cães_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/ilha-caes-trailer.mp4',
    videoUrl: '/ilha-caes-trailer.mp4',
    director: 'Jorge António',
    cast: ['Ângelo Torres', 'Miguel Hurst', 'Nicolau Breyner'],
    year: 2017,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 77,
    category: 'Horror',
    rating: 4.2,
    ageRating: '18+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'o-miradouro-da-lua',
    title: 'O Miradouro da Lua',
    description: 'Uma história emocionante passada nas paisagens deslumbrantes de Angola.',
    poster: '/O_Miradouro_da_Lua.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/o-miradouro-da-lua-trailer.mp4',
    videoUrl: '/o-miradouro-da-lua-trailer.mp4',
    director: 'Jorge António',
    cast: ['João Cabral', 'Aline Solange', 'Paulo Xisto'],
    year: 1993,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 85,
    category: 'Drama',
    rating: 4.0,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'njinga-rainha-de-angola',
    title: 'Njinga Rainha de Angola',
    description: 'No século XVII, uma mulher guerreira luta pela independência de Angola.',
    poster: '/Njinga_rainha_angola_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/njinga-trailer.mp4',
    videoUrl: '/njinga-trailer.mp4',
    director: 'Sérgio Graciano',
    cast: ['Lesliana Pereira', 'Ana Santos', 'Erica Chissapa'],
    year: 2013,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 109,
    category: 'Biografia',
    rating: 4.3,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'santana',
    title: 'Santana',
    description: 'Dois policiais, dois irmãos. Um busca justiça, o outro vingança.',
    poster: '/Santana_cover.webp',
    banner: '/capa1_home.jpeg',
    trailer: '/santana-trailer.mp4',
    videoUrl: '/santana-trailer.mp4',
    director: 'Maradona Dias dos Santos',
    cast: [],
    year: 2020,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 107,
    category: 'Ação',
    rating: 4.1,
    ageRating: '16+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'plano-b',
    title: 'Plano B',
    description: 'Thriller tenso e imprevisível.',
    poster: '/planob_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/planob-trailer.mp4',
    videoUrl: '/planob-trailer.mp4',
    director: 'Dorivaldo Fernandes',
    cast: ['Diana de Carvalho', 'Aureliano Quaresma', 'Hamilton Macosso', 'Gusmão Soeiro'],
    year: 2025,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 87,
    category: 'Ação',
    rating: 3.9,
    ageRating: '16+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    slug: 'quem-e-o-pai-do-miudo',
    title: 'Quem é o Pai do Miúdo?',
    description: 'Uma história de amizade e lealdade ambientada nos bairros de Luanda.',
    poster: '/paidomiudo_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Henrique Narciso Dito',
    cast: [],
    year: 2022,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 105,
    category: 'Drama',
    rating: 4.4,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

export default function PersonDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { movies, setMovies } = useContentStore()
  const { isAuthenticated, user } = useAuthStore()
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [showSuggestModal, setShowSuggestModal] = useState(false)
  const [contributeMessage, setContributeMessage] = useState('')
  const [suggestMessage, setSuggestMessage] = useState('')

  // Detecta se estamos na rota de realizador ou elenco
  const isDirectorRoute = location.pathname.startsWith('/realizador/')
  const isCastRoute = location.pathname.startsWith('/elenco/')

  // Garante que os filmes estão carregados na store
  useEffect(() => {
    if (movies.length === 0) {
      setMovies(mockMovies)
    }
  }, [movies.length, setMovies])

  // Usa os filmes da store ou mock
  const allMovies = movies.length > 0 ? movies : mockMovies

  const person = useMemo(() => {
    if (!slug) return null
    const bySlug = getPersonBySlug(slug)
    if (bySlug) return bySlug
    // Fallback: reconstruir nome a partir do slug
    const nameFromSlug = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    // Usa o role preferido baseado na rota atual
    const preferredRole = isDirectorRoute ? 'director' : 'actor'
    return getPersonByName(nameFromSlug, preferredRole)
  }, [slug, isDirectorRoute])

  const filmography = useMemo(() => {
    if (!person) return { asDirector: [] as Movie[], asActor: [] as Movie[] }

    const asDirector = allMovies.filter(
      (m) => m.director.toLowerCase() === person.name.toLowerCase()
    )
    const asActor = allMovies.filter((m) =>
      m.cast.some((a) => a.toLowerCase() === person.name.toLowerCase())
    )

    return { asDirector, asActor }
  }, [person, allMovies])

  if (!person) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Pessoa não encontrada</p>
          <Link to="/home" className="btn-primary px-6 py-3">
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  const roleLabel =
    person.role === 'director'
      ? 'Realizador'
      : person.role === 'both'
        ? 'Realizador & Actor'
        : 'Actor / Actriz'

  const totalCredits = filmography.asDirector.length + filmography.asActor.length

  // Handlers para modais
  const handleContribute = () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para contribuir')
      navigate('/login')
      return
    }
    setShowContributeModal(true)
  }

  const handleSuggest = () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para sugerir alterações')
      navigate('/login')
      return
    }
    setShowSuggestModal(true)
  }

  const handleContributeSubmit = () => {
    if (!contributeMessage.trim()) {
      toast.error('Escreve uma mensagem antes de enviar')
      return
    }
    // Simulação de envio - em produção seria uma API call
    toast.success('Contribuição enviada com sucesso! Obrigado pela tua ajuda.')
    setContributeMessage('')
    setShowContributeModal(false)
  }

  const handleSuggestSubmit = () => {
    if (!suggestMessage.trim()) {
      toast.error('Descreve a alteração que gostarias de sugerir')
      return
    }
    // Simulação de envio - em produção seria uma API call
    toast.success('Sugestão enviada com sucesso! A equipa irá analisar.')
    setSuggestMessage('')
    setShowSuggestModal(false)
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Manrope, sans-serif' }}>Voltar</span>
          </button>

          {/* Cabeçalho do perfil */}
          <div className="bg-lukusso-gray rounded-2xl p-6 md:p-10 mb-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-lukusso-gold/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative flex flex-col md:flex-row gap-8 items-start">
              {/* Foto / Avatar */}
              <div className="shrink-0">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-lukusso-gold/20 border-2 border-lukusso-gold/40 overflow-hidden flex items-center justify-center shadow-xl">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={isDirectorRoute ? '/foto-perfil_realizador.jpg' : '/foto-perfil_elenco.jpg'}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Info principal */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {person.name}
                  </h1>
                  <span className="bg-lukusso-gold/20 text-lukusso-gold text-xs px-3 py-1 rounded-full font-semibold border border-lukusso-gold/30">
                    {roleLabel}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-5">
                  {person.nationality && (
                    <span className="flex items-center gap-1.5">
                      <Globe size={15} className="text-lukusso-gold" />
                      {person.nationality}
                    </span>
                  )}
                  {person.birthPlace && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-lukusso-gold" />
                      {person.birthPlace}
                    </span>
                  )}
                  {person.birthYear && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} className="text-lukusso-gold" />
                      Nasc. {person.birthYear}
                    </span>
                  )}
                  {totalCredits > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Film size={15} className="text-lukusso-gold" />
                      {totalCredits} {totalCredits === 1 ? 'crédito' : 'créditos'}
                    </span>
                  )}
                </div>

                <p
                  className="text-gray-300 leading-relaxed text-base md:text-lg"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {person.bio}
                </p>

                {/* Conhecido por - Seção destacada */}
                {person.knownFor && person.knownFor.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Conhecido por
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {person.knownFor.map((title) => (
                        <span
                          key={title}
                          className="px-3 py-1 bg-lukusso-gold/20 text-lukusso-gold rounded-full text-sm font-medium border border-lukusso-gold/30"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botões de ação - Contribuir e Editar */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={handleContribute}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-lukusso-gold/10 text-lukusso-gold rounded-lg hover:bg-lukusso-gold/20 transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <Heart size={16} />
                    Contribuir
                  </button>
                  
                  <button
                    onClick={handleSuggest}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-lukusso-gray-light text-gray-300 rounded-lg hover:bg-lukusso-gray transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <MessageSquare size={16} />
                    Sugerir Alteração
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={() => toast('Funcionalidade de edição em desenvolvimento', { icon: '🛠️' })}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-lukusso-gray-light text-gray-300 rounded-lg hover:bg-lukusso-gray transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <Edit size={16} />
                      Editar Página
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal — filmografia */}
            <div className="lg:col-span-2 space-y-8">
              {filmography.asDirector.length > 0 && (
                <section>
                  <h2
                    className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Clapperboard size={22} className="text-lukusso-gold" />
                    Como Realizador
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filmography.asDirector.map((movie) => (
                      <FilmCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              )}

              {filmography.asActor.length > 0 && (
                <section>
                  <h2
                    className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Star size={22} className="text-lukusso-gold" />
                    Como Actor / Actriz
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filmography.asActor.map((movie) => (
                      <FilmCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              )}

              {totalCredits === 0 && (
                <section className="bg-lukusso-gray rounded-xl p-8 text-center">
                  <User size={40} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Ainda não há filmes associados a este perfil no catálogo.
                  </p>
                  <Link
                    to={`/search?${person.role === 'director' ? 'director' : 'actor'}=${encodeURIComponent(person.name)}`}
                    className="inline-block mt-4 text-lukusso-gold hover:underline text-sm"
                  >
                    Procurar no catálogo
                  </Link>
                </section>
              )}

              {/* Prémios */}
              {person.awards && person.awards.length > 0 && (
                <section className="bg-lukusso-gray rounded-xl p-6">
                  <h2
                    className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Award size={22} className="text-lukusso-gold" />
                    Prémios & Reconhecimentos
                  </h2>
                  <ul className="space-y-3">
                    {person.awards.map((award) => (
                      <li
                        key={award}
                        className="flex items-start gap-3 text-gray-300"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lukusso-gold shrink-0" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar — agente e redes */}
            <div className="space-y-6">
              {person.agent && (
                <section className="bg-lukusso-gray rounded-xl p-6 border border-lukusso-gold/20">
                  <h2
                    className="text-lg font-bold text-white mb-4 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Building2 size={20} className="text-lukusso-gold" />
                    Agente / Representação
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Agente</p>
                      <p className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {person.agent.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Agência</p>
                      <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {person.agent.agency}
                      </p>
                    </div>

                    {person.agent.location && (
                      <div className="flex items-start gap-2 text-gray-300 text-sm">
                        <MapPin size={16} className="text-lukusso-gold mt-0.5 shrink-0" />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>{person.agent.location}</span>
                      </div>
                    )}

                    {person.agent.email && (
                      <a
                        href={`mailto:${person.agent.email}`}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        <Mail size={16} className="text-lukusso-gold shrink-0" />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>{person.agent.email}</span>
                      </a>
                    )}

                    {person.agent.phone && (
                      <a
                        href={`tel:${person.agent.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        <Phone size={16} className="text-lukusso-gold shrink-0" />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>{person.agent.phone}</span>
                      </a>
                    )}

                    {person.agent.website && (
                      <a
                        href={person.agent.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        <ExternalLink size={16} className="text-lukusso-gold shrink-0" />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>Website da agência</span>
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* Sobre rápido */}
              <section className="bg-lukusso-gray rounded-xl p-6">
                <h2
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Informações
                </h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Função</dt>
                    <dd className="text-gray-200 text-right">{roleLabel}</dd>
                  </div>
                  {person.nationality && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Nacionalidade</dt>
                      <dd className="text-gray-200 text-right">{person.nationality}</dd>
                    </div>
                  )}
                  {person.birthPlace && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Naturalidade</dt>
                      <dd className="text-gray-200 text-right">{person.birthPlace}</dd>
                    </div>
                  )}
                  {person.birthYear && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Ano de nascimento</dt>
                      <dd className="text-gray-200 text-right">{person.birthYear}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {person.socials && Object.keys(person.socials).length > 0 && (
                <section className="bg-lukusso-gray rounded-xl p-6">
                  <h2
                    className="text-lg font-bold text-white mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Redes
                  </h2>
                  <div className="flex flex-col gap-2">
                    {person.socials.instagram && (
                      <a
                        href={person.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {person.socials.twitter && (
                      <a
                        href={person.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        Twitter / X
                      </a>
                    )}
                    {person.socials.imdb && (
                      <a
                        href={person.socials.imdb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-lukusso-gold transition-colors"
                      >
                        IMDb
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Contribuir */}
      <AnimatePresence>
        {showContributeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContributeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-lukusso-gray rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Contribuir para {person.name}
                </h3>
                <button
                  onClick={() => setShowContributeModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p
                className="text-gray-300 text-sm mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Partilha informações, fotos ou conteúdo adicional sobre esta pessoa para ajudar a enriquecer o perfil.
              </p>

              <textarea
                value={contributeMessage}
                onChange={(e) => setContributeMessage(e.target.value)}
                placeholder="Escreve aqui a tua contribuição..."
                className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold resize-none mb-4"
                rows={4}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowContributeModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleContributeSubmit}
                  className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                >
                  <Send size={16} />
                  Enviar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Sugerir Alteração */}
      <AnimatePresence>
        {showSuggestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuggestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-lukusso-gray rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Sugerir Alteração
                </h3>
                <button
                  onClick={() => setShowSuggestModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p
                className="text-gray-300 text-sm mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Encontraste informação incorrecta ou incompleta? Partilha a tua sugestão para melhorar este perfil.
              </p>

              <textarea
                value={suggestMessage}
                onChange={(e) => setSuggestMessage(e.target.value)}
                placeholder="Descreve a alteração que gostarias de sugerir..."
                className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold resize-none mb-4"
                rows={4}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSuggestModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSuggestSubmit}
                  className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                >
                  <Send size={16} />
                  Enviar Sugestão
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilmCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/filme/${movie.slug || slugify(movie.title)}`} className="group block">
      <motion.div whileHover={{ scale: 1.03 }} className="card-hover">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray-light">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute top-2 right-2 bg-lukusso-black/80 px-2 py-1 rounded text-xs text-lukusso-gold font-semibold">
            ★ {movie.rating}
          </div>
        </div>
        <h3
          className="text-sm font-semibold text-white mt-2 truncate group-hover:text-lukusso-gold transition-colors"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500">{movie.year}</p>
      </motion.div>
    </Link>
  )
}