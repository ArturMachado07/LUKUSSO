import { useContentStore } from '@/store'

export const useContent = () => {
  const {
    movies,
    series,
    featuredMovie,
    favorites,
    watchHistory,
    setMovies,
    setSeries,
    setFeaturedMovie,
    toggleFavorite,
    addToWatchHistory,
  } = useContentStore()

  return {
    movies,
    series,
    featuredMovie,
    favorites,
    watchHistory,
    setMovies,
    setSeries,
    setFeaturedMovie,
    toggleFavorite,
    addToWatchHistory,
    isFavorite: (id: string) => favorites.includes(id),
  }
}