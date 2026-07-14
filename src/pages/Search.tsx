import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Play, X } from 'lucide-react'
import Header from '@/components/Header'
import { Movie, Series } from '@/types'
import { useContentStore } from '@/store'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<(Movie | Series)[]>([])
  const { movies, series } = useContentStore()

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.director.toLowerCase().includes(lowerQuery) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(lowerQuery))
    )

    const filteredSeries = series.filter(
      (series) =>
        series.title.toLowerCase().includes(lowerQuery) ||
        series.director.toLowerCase().includes(lowerQuery)
    )

    setResults([...filteredMovies, ...filteredSeries])
  }, [query, movies, series])

  const handleClear = () => {
    setQuery('')
    setResults([])
  }

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Search Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Pesquisar
            </h1>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar filmes, séries, actores, realizadores..."
                className="w-full bg-lukusso-gray text-white px-6 py-4 pl-14 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-lukusso-gold text-lg"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                autoFocus
              />
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {query && (
            <div>
              <p className="text-gray-400 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
              </p>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      className="card-hover cursor-pointer group relative"
                    >
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button className="w-16 h-16 rounded-full bg-lukusso-gold flex items-center justify-center hover:scale-110 transition-transform">
                            <Play size={32} className="text-lukusso-black ml-1" fill="currentColor" />
                          </button>
                        </div>

                        {/* Rating */}
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
              ) : (
                <div className="text-center py-20">
                  <SearchIcon size={64} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Nenhum resultado encontrado
                  </p>
                  <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Tenta pesquisar com outras palavras
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Initial State */}
          {!query && (
            <div className="text-center py-20">
              <SearchIcon size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Pesquisa por filmes, séries, actores ou realizadores
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}