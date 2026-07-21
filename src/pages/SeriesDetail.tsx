import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Plus, Check, Star, Clock, Calendar, Globe } from 'lucide-react'
import Header from '@/components/Header'
import { Series } from '@/types'
import { getPersonPath } from '@/services/people'

export default function SeriesDetail() {
  const { id } = useParams<{ id: string }>()
  const [series, setSeries] = useState<Series | null>(null)

  useEffect(() => {
    // Mock data
    setSeries({
      id: id || 's1',
      title: 'Maianga',
      description: 'Série dramática sobre a vida no bairro da Maianga em Luanda. Acompanhe as histórias de personagens que lutam diariamente por um futuro melhor.',
      poster: 'https://via.placeholder.com/300x450/171717/D4AF37?text=Série+1',
      banner: 'https://via.placeholder.com/1920x1080/080808/D4AF37?text=Banner+S1',
      trailer: '',
      director: 'Realizador Angolano',
      cast: ['Actor 1', 'Actor 2', 'Actor 3'],
      year: 2024,
      country: 'Angola',
      language: 'Português',
      subtitles: ['Português', 'Inglês'],
      categories: ['Drama', 'Séries Angolanas'],
      rating: 4.7,
      seasons: [
        {
          id: 'season-1',
          seriesId: id || 's1',
          seasonNumber: 1,
          episodes: [
            {
              id: 'ep-1',
              seasonId: 'season-1',
              episodeNumber: 1,
              title: 'O Início',
              description: 'Primeiro episódio da série',
              duration: 45,
              videoUrl: '',
              thumbnail: 'https://via.placeholder.com/300x170/171717/D4AF37?text=Ep+1',
            },
            {
              id: 'ep-2',
              seasonId: 'season-1',
              episodeNumber: 2,
              title: 'Novos Caminhos',
              description: 'Segundo episódio',
              duration: 42,
              videoUrl: '',
              thumbnail: 'https://via.placeholder.com/300x170/171717/D4AF37?text=Ep+2',
            },
          ],
        },
      ],
      featured: true,
      createdAt: new Date().toISOString(),
    })
  }, [id])

  if (!series) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lukusso-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">A carregar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      {/* Banner */}
      <div className="relative h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${series.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-lukusso-black via-lukusso-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-transparent to-transparent" />
        </div>

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
                  {series.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-300">
                  <span className="flex items-center gap-1 text-lukusso-gold font-semibold">
                    <Star size={16} fill="currentColor" />
                    {series.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {series.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={16} />
                    {series.country}
                  </span>
                  <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">HD</span>
                </div>

                <p className="text-lg text-gray-200 mb-8 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {series.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={`/watch/${series.seasons[0]?.episodes[0]?.id}`}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    <Play size={24} fill="currentColor" />
                    Assistir Agora
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons & Episodes */}
      <div className="container mx-auto px-4 py-12">
        {series.seasons.map((season) => (
          <div key={season.id} className="mb-12">
            <h2
              className="text-3xl font-bold text-white mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Temporada {season.seasonNumber}
            </h2>

            <div className="space-y-4">
              {season.episodes.map((episode) => (
                <motion.div
                  key={episode.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-lukusso-gray rounded-lg overflow-hidden flex flex-col md:flex-row cursor-pointer group"
                >
                  <div className="relative md:w-80 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play size={48} className="text-lukusso-gold" fill="currentColor" />
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className="text-xl font-bold text-white mb-2"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {episode.episodeNumber}. {episode.title}
                        </h3>
                        <p className="text-gray-400 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {episode.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {episode.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detalhes da Série */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Realizador
            </h3>
            <Link
              to={getPersonPath(series.director, 'director')}
              className="text-gray-300 hover:text-lukusso-gold transition-colors"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {series.director}
            </Link>
          </div>

          <div>
            <h3 className="text-lukusso-gold font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Elenco
            </h3>
            <div className="flex flex-wrap gap-2">
              {series.cast.map((actor, idx) => (
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
        </div>
      </div>
    </div>
  )
}
