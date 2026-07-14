import { Router } from 'express'
import {
  getMovies,
  getFeaturedMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getSeries,
  getSeriesById,
  getCategories,
} from '@/controllers/movieController'
import { authenticate, authorize, optionalAuth } from '@/middleware/auth'
import { validate, movieSchema } from '@/middleware/validation'

const router = Router()

router.get('/', optionalAuth, getMovies)
router.get('/featured', getFeaturedMovies)
router.get('/categories', getCategories)
router.get('/:id', optionalAuth, getMovieById)
router.post('/', authenticate, authorize('admin'), validate(movieSchema), createMovie)
router.put('/:id', authenticate, authorize('admin'), updateMovie)
router.delete('/:id', authenticate, authorize('admin'), deleteMovie)

router.get('/series/all', getSeries)
router.get('/series/:id', getSeriesById)

export default router