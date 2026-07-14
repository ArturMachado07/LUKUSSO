import { motion } from 'framer-motion'
import { Play, Trash2 } from 'lucide-react'
import Header from '@/components/Header'
import { useContentStore } from '@/store'
import { Movie, Series } from '@/types'

export default function MyList() {
  const { favorites, movies, series, toggleFavorite } = useContentStore()

  const favoriteItems = [...movies, ...series].filter(item => favorites.includes(item.id))

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(id)
  }

  if (favoriteItems.length === 0) {
    return (
      <div className="min-h-screen bg-lukusso-black">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Minha Lista
            </h1>
            <p className="text-gray-400 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ainda não adicionaste nenhum filme ou série à tua lista
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-4xl font-bold text-white mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Minha Lista
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteItems.map((item: Movie | Series) => (
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

                  {/* Remove Button */}
                  <button
                    onClick={(e) => handleRemove(item.id, e)}
                    className="absolute top-2 right-2 p-2 bg-lukusso-red/80 hover:bg-lukusso-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>

                  {/* Rating */}
                  <div className="absolute top-2 left-2 bg-lukusso-black/80 px-2 py-1 rounded text-xs text-lukusso-gold font-semibold">
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
        </motion.div>
      </div>
    </div>
  )
}