import { Router } from 'express'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getWatchHistory,
  addWatchHistory,
  addReview,
  updateProfile,
} from '@/controllers/userController'
import { authenticate } from '@/middleware/auth'
import { validate, reviewSchema } from '@/middleware/validation'

const router = Router()

router.get('/favorites', authenticate, getFavorites)
router.post('/favorites', authenticate, addFavorite)
router.delete('/favorites/:id', authenticate, removeFavorite)

router.get('/history', authenticate, getWatchHistory)
router.post('/history', authenticate, addWatchHistory)

router.post('/reviews', authenticate, validate(reviewSchema), addReview)

router.put('/profile', authenticate, updateProfile)

export default router