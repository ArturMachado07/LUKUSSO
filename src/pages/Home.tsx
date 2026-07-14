import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Info, Plus, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Movie, Series } from '@/types'
import { useContentStore, useAuthStore } from '@/store'

export default function Home() {
  const [featuredContent, setFeaturedContent] = useState<Movie | Series | null>(null)
  const [contentSections, setContentSections] = useState<any[]>([])
  const { setMovies, setSeries, setFeaturedMovie, toggleFavorite, favorites } = useContentStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Mock data - substituir por chamada API
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'Meu Semba',
        description: 'Uma sinfonia urbana vibrante, embalada pelos ritmos da poesia rap, revela histórias de resiliência e dignidade inabaláveis em meio à dura realidade do cotidiano dos trabalhadores de Luanda.',
        poster: '/Meu_Semba_cover.webp',
        banner: '/capa1_home.jpeg',
        trailer: 'https://www.youtube.com/watch?v=_DXmrUBhI7U',
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
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Filme 2',
        description: 'Descrição do filme 2.',
        poster: '/capa1.jpg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2024,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 90,
        category: 'Drama',
        rating: 4.2,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Filme 3',
        description: 'Descrição do filme 3.',
        poster: '/capa2.jpeg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2024,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 100,
        category: 'Drama',
        rating: 4.0,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Filme 4',
        description: 'Descrição do filme 4.',
        poster: '/capa3.jpg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2023,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 110,
        category: 'Documentário',
        rating: 4.3,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Filme 5',
        description: 'Descrição do filme 5.',
        poster: '/capa4.webp',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2023,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 85,
        category: 'Documentário',
        rating: 4.1,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Filme 6',
        description: 'Descrição do filme 6.',
        poster: '/capa5.jpg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2022,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 95,
        category: 'Drama',
        rating: 3.9,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'Filme 7',
        description: 'Descrição do filme 7.',
        poster: '/capa6.jpg',
        banner: '/capa1_home.jpeg',
        trailer: '',
        videoUrl: '',
        director: 'Realizador Angolano',
        cast: [],
        year: 2022,
        country: 'Angola',
        language: 'Português',
        subtitles: ['Português'],
        duration: 105,
        category: 'Drama',
        rating: 4.4,
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '8',
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
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '9',
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
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '10',
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
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '11',
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
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '12',
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
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '13',
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
    // Primeiro vai para detalhes, depois login, depois plano
    window.location.href = `/movie/${id}`
  }

  const handleMoreInfo = (id: string) => {
    window.location.href = `/movie/${id}`
  }

  return (
    <div className="min-h-screen bg-lukusso-black">
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
                      onClick={() => toggleFavorite(featuredContent.id)}
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