import { Router } from 'express'
import { register, login, refreshToken, getProfile } from '@/controllers/authController'
import { authenticate, authRateLimit } from '@/middleware/auth'
import { validate, registerSchema, loginSchema } from '@/middleware/validation'

const router = Router()

router.post('/register', authRateLimit, validate(registerSchema), register)
router.post('/login', authRateLimit, validate(loginSchema), login)
router.post('/refresh', refreshToken)
router.get('/profile', authenticate, getProfile)

export default router