import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Play, X, Film, User, Star, Tag } from 'lucide-react'
import Header from '@/components/Header'
import { Movie, Series } from '@/types'
import { useContentStore } from '@/store'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filterType, setFilterType] = useState<'q' | 'category' | 'director' | 'actor'>(
    searchParams.get('category') ? 'category' :
    searchParams.get('director') ? 'director' :
    searchParams.get('actor') ? 'actor' : 'q'
  )
  const [results, setResults] = useState<(Movie | Series)[]>([])
  const [filterLabel, setFilterLabel] = useState('')
  const { movies, series } = useContentStore()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const directorParam = searchParams.get('director')
    const actorParam = searchParams.get('actor')
    const qParam = searchParams.get('q')

    if (categoryParam) {
      setFilterType('category')
      setFilterLabel(categoryParam)
      setQuery('')
      const filtered = movies.filter(m => m.category === categoryParam)
      setResults(filtered)
    } else if (directorParam) {
      setFilterType('director')
      setFilterLabel(directorParam)
      setQuery('')
      const filtered = movies.filter(m =>
        m.director.toLowerCase() === directorParam.toLowerCase()
      )
      setResults(filtered)
    } else if (actorParam) {
      setFilterType('actor')
      setFilterLabel(actorParam)
      setQuery('')
      const filtered = movies.filter(m =>
        m.cast.some(a => a.toLowerCase() === actorParam.toLowerCase())
      )
      setResults(filtered)
    } else if (qParam) {
      setFilterType('q')
      setFilterLabel('')
      setQuery(qParam)
      performSearch(qParam)
    } else {
      setFilterType('q')
      setFilterLabel('')
      setQuery('')
      setResults([])
    }
  }, [searchParams, movies])

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.director.toLowerCase().includes(lowerQuery) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(lowerQuery)) ||
        movie.category.toLowerCase().includes(lowerQuery)
    )

    const filteredSeries = series.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerQuery) ||
        s.director.toLowerCase().includes(lowerQuery)
    )

    setResults([...filteredMovies, ...filteredSeries])
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      setSearchParams({ q: value })
      performSearch(value)
    } else {
      setSearchParams({})
      setResults([])
    }
  }

  const handleClear = () => {
    setQuery('')
    setSearchParams({})
    setResults([])
  }

  const handleRemoveFilter = () => {
    setSearchParams({})
    setQuery('')
    setResults([])
  }

  const getFilterIcon = () => {
    switch (filterType) {
      case 'category': return <Tag size={18} className="text-lukusso-gold" />
      case 'director': return <User size={18} className="text-lukusso-gold" />
      case 'actor': return <Star size={18} className="text-lukusso-gold" />
      default: return null
    }
  }

  const getFilterLabel = () => {
    switch (filterType) {
      case 'category': return 'Categoria'
      case 'director': return 'Realizador'
      case 'actor': return 'Actor'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
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

            {/* Filtro Ativo */}
            {filterType !== 'q' && (
              <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-lukusso-gray rounded-lg">
                {getFilterIcon()}
                <span className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  A mostrar {results.length} resultado(s) para <strong className="text-lukusso-gold">{getFilterLabel()}: {filterLabel}</strong>
                </span>
                <button
                  onClick={handleRemoveFilter}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
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
          {(query || filterType !== 'q') && (
            <div>
              {filterType === 'q' && query && (
                <p className="text-gray-400 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
                </p>
              )}

              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      to={`/filme/${('slug' in item ? item.slug : item.id) || item.id}`}
                      className="block"
                    >
                      <motion.div
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
                    </Link>
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
          {!query && filterType === 'q' && (
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