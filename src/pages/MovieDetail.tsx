import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Plus, Check, Star, Clock, Calendar, Share2, MessageCircle, ThumbsUp, ThumbsDown, Facebook, Twitter, Copy, CheckCheck } from 'lucide-react'
import Header from '@/components/Header'
import { Movie } from '@/types'
import { useContentStore, useAuthStore } from '@/store'
import { getPersonPath } from '@/services/people'
import toast from 'react-hot-toast'

// Dados mock completos para todos os 13 filmes
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
    description: 'Numa ilha angolana, os trabalhadores que constroem um complexo hoteleiro começam a ser assassinados por cães. Pedro Mbala, enviado para resolver o problema, descobrirá que a origem dos cães está no misterioso e sombrio passado da ilha.',
    poster: '/A_ilha_dos_cães_cover.jpg',
    banner: '/capa2_home.jpg',
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
    description: 'Uma história emocionante passada nas paisagens deslumbrantes de Angola, onde o amor e a tradição se entrelaçam. Um jovem casal enfrenta os desafios de manter viva a sua herança cultural enquanto navega pelas complexidades do mundo moderno.',
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
    description: 'No século XVII, uma mulher guerreira luta pela independência de Angola. Depois de testemunhar o assassinato de seu filho e ver seu povo ser humilhado pelos colonizadores portugueses, Njinga se tornará uma rainha e lutará por sua libertação, incorporando o lema: aqueles que ficam lutam para vencer.',
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
    description: 'Dois policiais, dois irmãos. Um busca justiça, o outro vingança, mas eles podem se matar antes de capturar os bandidos.',
    poster: '/Santana_cover.webp',
    banner: '/capa1_home.jpeg',
    trailer: '/santana-trailer.mp4',
    videoUrl: '/santana-trailer.mp4',
    director: 'Maradona Dias dos Santos',
    cast: ['Paulo Americano', 'Raul Rosario', 'Rapulana Seiphemo'],
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
    description: 'Thriller tenso e imprevisível, onde a dor de uma mãe e as decisões de um pai colidem com um submundo de crime, ambição e traições, numa história em que cada escolha pode ser fatal.',
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
    description: 'Uma história de amizade e lealdade ambientada nos bairros de Luanda. Dois amigos de infância veem os seus laços testados quando escolhas difíceis ameaçam separá-los, numa jornada emocionante sobre o verdadeiro significado da irmandade.',
    poster: '/paidomiudo_cover.jpg',
    banner: '/capa1_home.jpeg',
    trailer: '/paidomiudo-trailer.mp4',
    videoUrl: '/paidomiduo-trailer.mp4',
    director: 'Henrique Narciso Dito',
    cast: ['Actor Principal', 'Actriz Principal', 'Actor Coadjuvante', 'Actriz Coadjuvante'],
    year: 2022,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 105,
    category: 'Ação',
    rating: 4.4,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    slug: 'filme-8',
    title: 'Filme 8',
    description: 'Um documentário revelador que examina as transformações sociais e culturais de Angola nas últimas décadas. Através de arquivos históricos e testemunhos contemporâneos, este filme traça o retrato de uma nação em constante evolução.',
    poster: '/capa7.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal'],
    year: 2021,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 120,
    category: 'Documentário',
    rating: 4.6,
    ageRating: '3+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    slug: 'filme-9',
    title: 'Filme 9',
    description: 'Um drama comovente que explora as dinâmicas familiares na Angola contemporânea. Quando uma tragédia inesperada abala a estrutura familiar, cada membro é forçado a reavaliar as suas prioridades e encontrar força na união.',
    poster: '/capa8.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal', 'Actor Coadjuvante'],
    year: 2021,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 80,
    category: 'Drama',
    rating: 3.8,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    slug: 'filme-10',
    title: 'Filme 10',
    description: 'Uma viagem cinematográfica pelas tradições e modernidade de Angola. Este documentário celebra a riqueza cultural do país, desde a música e dança tradicionais até às expressões artísticas contemporâneas que definem a nova geração.',
    poster: '/capa9.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal', 'Actor Coadjuvante', 'Actriz Coadjuvante'],
    year: 2020,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 90,
    category: 'Documentário',
    rating: 4.2,
    ageRating: '3+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    slug: 'filme-11',
    title: 'Filme 11',
    description: 'Um thriller psicológico ambientado nas ruas de Luanda. Quando um detective investiga uma série de desaparecimentos misteriosos, ele descobre uma teia de segredos que liga a elite da cidade ao submundo do crime organizado.',
    poster: '/capa10.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal', 'Actor Coadjuvante'],
    year: 2020,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 110,
    category: 'Drama',
    rating: 4.0,
    ageRating: '16+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    slug: 'filme-12',
    title: 'Filme 12',
    description: 'Um documentário inspirador que acompanha a jornada de jovens angolanos que desafiam as probabilidades para perseguir os seus sonhos. Das ruas de Luanda aos palcos internacionais, esta é uma história de determinação e triunfo.',
    poster: '/capa11.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal'],
    year: 2019,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 100,
    category: 'Documentário',
    rating: 4.5,
    ageRating: '12+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    slug: 'filme-13',
    title: 'Filme 13',
    description: 'Um drama épico que retrata a luta pela identidade e pertença na Angola pós-independência. Através de gerações, uma família enfrenta os desafios de preservar as suas raízes enquanto abraça as oportunidades de um novo amanhã.',
    poster: '/capa12.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: ['Actor Principal', 'Actriz Principal', 'Actor Coadjuvante', 'Actriz Coadjuvante'],
    year: 2019,
    country: 'Angola',
    language: 'Português',
    subtitles: ['Português'],
    duration: 95,
    category: 'Drama',
    rating: 4.3,
    ageRating: '16+',
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

export default function MovieDetail() {
  const { id, slug } = useParams<{ id?: string; slug?: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [showRatingPrompt, setShowRatingPrompt] = useState(false)
  const [comment, setComment] = useState('')
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const { movies, toggleFavorite, favorites, setMovies, saveReview, reviews } = useContentStore()
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    // 1. Procurar na store (carregada pela Home)
    const foundMovie = movies.find(m => m.slug === slug || m.id === id)

    if (foundMovie) {
      setMovie(foundMovie)
      setLoading(false)
      return
    }

    // 2. Se não encontrou na store, procurar nos dados mock locais
    const foundMockMovie = mockMovies.find(m => m.slug === slug || m.id === id)

    if (foundMockMovie) {
      setMovie(foundMockMovie)
      setLoading(false)
      return
    }

    // 3. Se mesmo assim não encontrou, tentar carregar os mockMovies na store
    //    (caso o utilizador tenha acedido diretamente sem passar pela Home)
    if (movies.length === 0) {
      setMovies(mockMovies)
      const movieFromMock = mockMovies.find(m => m.slug === slug || m.id === id)
      if (movieFromMock) {
        setMovie(movieFromMock)
        setLoading(false)
        return
      }
    }

    setLoading(false)
  }, [id, slug, movies, setMovies])

  if (loading) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lukusso-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Filme não encontrado</p>
          <Link to="/home" className="btn-primary px-6 py-3">
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)

  const handleWatchClick = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/subscription')
    }
  }

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para adicionar à lista')
      navigate('/login')
      return
    }
    toggleFavorite(movie.id)
    if (!isFavorite) {
      toast.success('Adicionado à tua lista')
    } else {
      toast.success('Removido da tua lista')
    }
  }

  const handleRatingClick = (rating: number) => {
    if (!isAuthenticated) {
      setShowRatingPrompt(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      return
    }
    setUserRating(rating)
    setShowCommentBox(true)
  }

  const handleSaveReview = () => {
    if (!user) return
    const review = {
      id: Date.now().toString(),
      userId: user.id,
      user,
      movieId: movie.id,
      rating: userRating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    }
    saveReview(review)
    setShowCommentBox(false)
    setComment('')
    toast.success('Avaliação e comentário guardados com sucesso!')
  }

  const shareToSocial = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Assiste "${movie.title}" no LUKUSSO`)
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    }
    window.open(links[platform], '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('Link copiado para a área de transferência!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar o link')
    }
    setShowShareMenu(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Assiste "${movie.title}" no LUKUSSO`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  // Filmes semelhantes (mesma categoria)
  const allMovies = movies.length > 0 ? movies : mockMovies
  const similarMovies = allMovies.filter(m => m.category === movie.category && m.id !== movie.id).slice(0, 6)

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      {/* Banner com vídeo de fundo */}
      <div className="relative h-[100vh] overflow-hidden pt-28">
        {movie.videoUrl ? (
          <video
            src={movie.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={movie.banner}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.banner})` }}
          />
        )}

        {/* Gradientes para melhorar a leitura */}
        <div className="absolute inset-0 bg-gradient-to-r from-lukusso-black via-lukusso-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-transparent to-transparent" />

        <div className="relative z-10 flex items-end h-full pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1
                  className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-300">
                  <span className="flex items-center gap-1 text-lukusso-gold font-semibold">
                    <Star size={16} fill="currentColor" />
                    {movie.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {movie.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {movie.duration} min
                  </span>
                  <Link
                    to={`/search?category=${encodeURIComponent(movie.category)}`}
                    className="border border-lukusso-gold px-2 py-0.5 rounded text-xs text-lukusso-gold hover:bg-lukusso-gold hover:text-lukusso-black transition-colors"
                  >
                    {movie.category}
                  </Link>
                  <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">HD</span>
                  <span 
                    className="border border-lukusso-gold px-2 py-0.5 rounded text-xs text-lukusso-gold font-semibold relative group cursor-pointer"
                    title={movie.ageRating === '16+' || movie.ageRating === '18+' ? 'Não recomendada para os menores de 16 anos' : 'Recomendado para todos os públicos'}
                  >
                    {movie.ageRating}
                  </span>
                </div>

                <p className="text-lg text-gray-200 mb-8 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {movie.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleWatchClick}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    <Play size={24} fill="currentColor" />
                    Assistir Agora
                  </button>

                   <button
                     onClick={handleToggleFavorite}
                     className="p-4 rounded-full border-2 border-gray-500 hover:border-lukusso-gold transition-colors"
                   >
                     {isFavorite ? (
                       <Check size={24} className="text-lukusso-gold" />
                     ) : (
                       <Plus size={24} className="text-white" />
                     )}
                   </button>

                   <div className="relative">
                     <button
                       onClick={handleShare}
                       className="p-4 rounded-full border-2 border-gray-500 hover:border-lukusso-gold transition-colors"
                     >
                       <Share2 size={24} className="text-white" />
                     </button>

                     {showShareMenu && (
                       <div className="absolute bottom-full mb-2 right-0 bg-lukusso-gray rounded-lg shadow-xl p-2 min-w-[200px] z-50">
                         <button onClick={() => shareToSocial('facebook')} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-lukusso-gray-light rounded-lg transition-colors">
                           <Facebook size={18} className="text-blue-500" /> Facebook
                         </button>
                         <button onClick={() => shareToSocial('twitter')} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-lukusso-gray-light rounded-lg transition-colors">
                           <Twitter size={18} className="text-sky-400" /> Twitter
                         </button>
                         <button onClick={() => shareToSocial('whatsapp')} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-lukusso-gray-light rounded-lg transition-colors">
                           <MessageCircle size={18} className="text-green-500" /> WhatsApp
                         </button>
                         <button onClick={copyLink} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-lukusso-gray-light rounded-lg transition-colors">
                           {copied ? <CheckCheck size={18} className="text-lukusso-gold" /> : <Copy size={18} className="text-gray-400" />}
                           {copied ? 'Copiado!' : 'Copiar link'}
                         </button>
                       </div>
                     )}
                   </div>
                </div>

                {/* Sistema de Avaliação */}
                <div className="mt-8">
                  <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Avalia este filme
                  </h3>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={star <= userRating ? 'text-lukusso-gold' : 'text-gray-600'}
                          fill={star <= userRating ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                    {showRatingPrompt && (
                      <span className="text-lukusso-gold text-sm ml-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Inicia sessão para avaliar
                      </span>
                    )}
                  </div>

                  {showCommentBox && (
                    <div className="mt-4 bg-lukusso-gray rounded-lg p-4">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Escreve um comentário..."
                        className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold resize-none"
                        rows={3}
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      />
                      <div className="flex justify-end gap-3 mt-3">
                        <button
                          onClick={() => {
                            setShowCommentBox(false)
                            setComment('')
                          }}
                          className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveReview}
                          className="btn-primary px-6 py-2"
                        >
                          Guardar Avaliação
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Coluna Esquerda - Poster */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-24"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Coluna Direita - Informações */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Detalhes do Filme
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Realizador
                  </h3>
                  <Link
                    to={getPersonPath(movie.director, 'director')}
                    className="text-gray-300 hover:text-lukusso-gold transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {movie.director}
                  </Link>
                </div>

                <div>
                  <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Categoria
                  </h3>
                  <Link
                    to={`/search?category=${encodeURIComponent(movie.category)}`}
                    className="text-gray-300 hover:text-lukusso-gold transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {movie.category}
                  </Link>
                </div>

                <div>
                  <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    País
                  </h3>
                  <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {movie.country}
                  </p>
                </div>

                <div>
                  <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Idioma
                  </h3>
                  <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {movie.language}
                  </p>
                </div>

                <div>
                  <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Legendas
                  </h3>
                  <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {movie.subtitles.join(', ')}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lukusso-gold font-semibold mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Elenco
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, idx) => (
                    <Link
                      key={idx}
                      to={getPersonPath(actor, 'actor')}
                      className="px-3 py-1 bg-lukusso-gray rounded-full text-sm text-gray-300 hover:bg-lukusso-gray-light hover:text-lukusso-gold transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {actor}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Comentários */}
              <div className="mb-8">
                <h3 className="text-lukusso-gold font-semibold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Comentários
                </h3>
                <div className="space-y-4">
                  {reviews
                    .filter(review => review.movieId === movie.id)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((review) => (
                      <div key={review.id} className="bg-lukusso-gray rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-lukusso-gold rounded-full flex items-center justify-center">
                            <span className="text-lukusso-black font-bold text-sm">
                              {review.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {review.user.name}
                          </span>
                          <span className="text-lukusso-gold text-sm">
                            {'★'.repeat(review.rating)}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-300 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  {reviews.filter(review => review.movieId === movie.id).length === 0 && (
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Ainda não há comentários. Sê o primeiro a avaliar!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Itens Semelhantes */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 pb-16">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Itens Semelhantes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((similarMovie) => (
              <motion.div
                key={similarMovie.id}
                whileHover={{ scale: 1.05 }}
                className="card-hover cursor-pointer"
                onClick={() => window.location.href = `/filme/${similarMovie.slug}`}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray">
                  <img
                    src={similarMovie.poster}
                    alt={similarMovie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-lukusso-black/80 px-2 py-1 rounded text-xs text-lukusso-gold font-semibold">
                    ★ {similarMovie.rating}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mt-2 truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {similarMovie.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}