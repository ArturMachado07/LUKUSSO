import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from '@/components/MovieCard'
import { Movie } from '@/types'

interface ContentCarouselProps {
  title: string
  movies: Movie[]
  onPlay?: (id: string) => void
  onInfo?: (id: string) => void
  onToggleFavorite?: (id: string) => void
  favorites?: string[]
}

export default function ContentCarousel({
  title,
  movies,
  onPlay,
  onInfo,
  onToggleFavorite,
  favorites = [],
}: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = 400
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount

    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {title}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-lukusso-gray-light hover:bg-lukusso-gold hover:text-lukusso-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-lukusso-gray-light hover:bg-lukusso-gold hover:text-lukusso-black transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-40 md:w-48"
            >
              <MovieCard
                movie={movie}
                onPlay={onPlay}
                onInfo={onInfo}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}