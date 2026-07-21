import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Info, Plus, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Movie, Series } from '@/types'
import { useContentStore, useAuthStore } from '@/store'
import toast from 'react-hot-toast'

export default function Home() {
  const [featuredContent, setFeaturedContent] = useState<Movie | Series | null>(null)
  const [contentSections, setContentSections] = useState<any[]>([])
  const { setMovies, setSeries, setFeaturedMovie, toggleFavorite, favorites, movies } = useContentStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Mock data - substituir por chamada API
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
    videoUrl: '/paidomiudo-trailer.mp4',
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
  {
    id: '8',
    slug: 'filme-8',
    title: 'Filme 8',
    description: 'Descrição do filme 8.',
    poster: '/capa7.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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
    description: 'Descrição do filme 9.',
    poster: '/capa8.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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
    description: 'Descrição do filme 10.',
    poster: '/capa9.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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
    description: 'Descrição do filme 11.',
    poster: '/capa10.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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
    description: 'Descrição do filme 12.',
    poster: '/capa11.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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
    description: 'Descrição do filme 13.',
    poster: '/capa12.jpeg',
    banner: '/capa1_home.jpeg',
    trailer: '',
    videoUrl: '',
    director: 'Realizador Angolano',
    cast: [],
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

    const mockSeries: Series[] = [
      {
        id: 's1',
        title: 'Maianga',
        description: 'Série dramática sobre a vida no bairro da Maianga em Luanda.',
        poster: '/capa1.jpg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        director: 'Realizador Angolano',
        cast: ['Actor 1', 'Actor 2'],
        year: 2024,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        categories: ['Drama', 'Séries Angolanas'],
        rating: 4.7,
        seasons: [],
        featured: true,
        createdAt: new Date().toISOString(),
      },
    ]

    setMovies(mockMovies)
    setSeries(mockSeries)
    setFeaturedMovie(mockMovies[0])
    setFeaturedContent(mockMovies[0])

    // Limitar a 6 filmes por categoria
    setContentSections([
      { title: 'Em destaque', items: [...mockMovies, ...mockSeries].slice(0, 6) },
      { title: 'Cinema Angolano', items: mockMovies.slice(0, 6) },
      { title: 'Séries Originais', items: mockSeries.slice(0, 6) },
      { title: 'Documentários Africanos', items: mockMovies.filter(m => m.category === 'Documentário').slice(0, 6) },
    ])
  }, [setMovies, setSeries, setFeaturedMovie])

  const handlePlay = (id: string) => {
    const movie = movies.find(m => m.id === id)
    const slug = movie?.slug || id
    window.location.href = `/filme/${slug}`
  }

  const handleMoreInfo = (id: string) => {
    const movie = movies.find(m => m.id === id)
    const slug = movie?.slug || id
    window.location.href = `/filme/${slug}`
  }

  const handleToggleFavorite = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login para adicionar à lista')
      return
    }
    toggleFavorite(id)
    if (!favorites.includes(id)) {
      toast.success('Adicionado à tua lista')
    } else {
      toast.success('Removido da tua lista')
    }
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      {/* Hero Section */}
      {featuredContent && (
        <div className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredContent.banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lukusso-black via-lukusso-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex items-center h-full">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <h1
                  className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {featuredContent.title}
                </h1>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                  <span className="text-lukusso-gold font-semibold">★ {featuredContent.rating}</span>
                  <span>{featuredContent.year}</span>
                  <span>{'duration' in featuredContent ? featuredContent.duration + ' min' : ''}</span>
                  <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">HD</span>
                </div>

                <p className="text-lg text-gray-200 mb-8 line-clamp-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {featuredContent.description}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePlay(featuredContent.id)}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    <Play size={24} fill="currentColor" />
                    Ver
                  </button>

                  <button
                    onClick={() => handleMoreInfo(featuredContent.id)}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    <Info size={24} />
                    Mais Informações
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleFavorite(featuredContent.id)
                      }}
                      className="p-4 rounded-full border-2 border-gray-500 hover:border-lukusso-gold transition-colors"
                    >
                      {favorites.includes(featuredContent.id) ? (
                        <Check size={24} className="text-lukusso-gold" />
                      ) : (
                        <Plus size={24} className="text-white" />
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="relative z-20 -mt-20 pb-20">
        {contentSections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.2 }}
            className="mb-12"
          >
            <div className="container mx-auto px-4">
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {section.title}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {section.items.map((item: Movie | Series) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    className="card-hover cursor-pointer group relative"
                    onClick={() => handleMoreInfo(item.id)}
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay no hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlay(item.id)
                          }}
                          className="w-16 h-16 rounded-full bg-lukusso-gold flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Play size={32} className="text-lukusso-black ml-1" fill="currentColor" />
                        </button>
                      </div>

                      {/* Rating badge */}
                      <div className="absolute top-2 right-2 bg-lukusso-black/80 px-2 py-1 rounded text-xs text-lukusso-gold font-semibold">
                        ★ {item.rating}
                      </div>

                      {/* Favorite button */}
                      {isAuthenticated && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(item.id)
                          }}
                          className="absolute top-2 left-2 p-2 rounded-full bg-lukusso-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {favorites.includes(item.id) ? (
                            <Check size={16} className="text-lukusso-gold" />
                          ) : (
                            <Plus size={16} className="text-white" />
                          )}
                        </button>
                      )}
                    </div>

                    <div className="mt-2">
                      <h3
                        className="text-sm font-semibold text-white truncate"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.year} • {'category' in item ? item.category : item.categories?.[0]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <Footer />
    </div>
  )
}