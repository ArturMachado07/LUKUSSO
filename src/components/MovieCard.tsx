import { motion } from 'framer-motion'
import { Play, Plus, Star } from 'lucide-react'
import { Movie } from '@/types'

interface MovieCardProps {
  movie: Movie
  onPlay?: (id: string) => void
  onInfo?: (id: string) => void
  onToggleFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function MovieCard({
  movie,
  onPlay,
  onInfo,
  onToggleFavorite,
  isFavorite,
}: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card-hover cursor-pointer group relative"
      onClick={() => onInfo?.(movie.id)}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPlay?.(movie.id)
            }}
            className="w-16 h-16 rounded-full bg-lukusso-gold flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Play size={32} className="text-lukusso-black ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-lukusso-black/80 px-2 py-1 rounded text-xs text-lukusso-gold font-semibold flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          {movie.rating}
        </div>

        {/* Favorite */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(movie.id)
            }}
            className="absolute top-2 left-2 p-2 rounded-full bg-lukusso-black/80 hover:bg-lukusso-black transition-colors"
          >
            <Plus
              size={16}
              className={isFavorite ? 'text-lukusso-gold' : 'text-white'}
            />
          </button>
        )}
      </div>

      <div className="mt-2">
        <h3
          className="text-sm font-semibold text-white truncate"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {movie.year} • {movie.category}
        </p>
      </div>
    </motion.div>
  )
}