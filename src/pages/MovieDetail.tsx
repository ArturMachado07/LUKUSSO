import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Plus, Check, Star, Clock, Calendar, Globe, User, Film } from 'lucide-react'
import Header from '@/components/Header'
import { Movie } from '@/types'
import { useContentStore, useAuthStore } from '@/store'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const { movies, toggleFavorite, favorites } = useContentStore()
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === id)
    if (foundMovie) {
      setMovie(foundMovie)
    } else {
      // Mock data se não encontrar
      setMovie({
        id: id || '1',
        title: 'Meu Semba',
        description: 'Uma sinfonia urbana vibrante, embalada pelos ritmos da poesia rap, revela histórias de resiliência e dignidade inabaláveis ​​em meio à dura realidade do cotidiano dos trabalhadores de Luanda.',
        poster: '/Meu_Semba_cover.webp',
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
        featured: true,
        createdAt: new Date().toISOString(),
      })
    }
  }, [id, movies])

  if (!movie) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lukusso-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">A carregar...</p>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)

  const handleWatchClick = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else if (!user?.subscription) {
      navigate('/subscription')
    } else {
      navigate(`/watch/${movie.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      {/* Banner com vídeo de fundo */}
      {/* Hero com trailer em background */}
<div className="relative h-[70vh] overflow-hidden pt-20">

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
                  <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">HD</span>
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

                  {isAuthenticated && (
                    <button
                      onClick={() => toggleFavorite(movie.id)}
                      className="p-4 rounded-full border-2 border-gray-500 hover:border-lukusso-gold transition-colors"
                    >
                      {isFavorite ? (
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
                  <p className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {movie.director}
                  </p>
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
                    <span
                      key={idx}
                      className="px-3 py-1 bg-lukusso-gray rounded-full text-sm text-gray-300"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Avaliações */}
              <div>
                <h3 className="text-lukusso-gold font-semibold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Avaliações
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={star <= Math.floor(movie.rating) ? 'text-lukusso-gold' : 'text-gray-600'}
                      fill={star <= Math.floor(movie.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="text-white ml-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {movie.rating}/5
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}