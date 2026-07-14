import { Router } from 'express'
import {
  getPlans,
  getMySubscription,
  changePlan,
  cancelSubscription,
  getPaymentHistory,
} from '@/controllers/subscriptionController'
import { authenticate } from '@/middleware/auth'

const router = Router()

router.get('/plans', getPlans)
router.get('/my', authenticate, getMySubscription)
router.post('/change', authenticate, changePlan)
router.post('/cancel', authenticate, cancelSubscription)
router.get('/payments/history', authenticate, getPaymentHistory)

export default router