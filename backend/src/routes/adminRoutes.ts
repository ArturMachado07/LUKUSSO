import { Router } from 'express'
import {
  getDashboardStats,
  getUsers,
  updateUserRole,
  getPayments,
  createPlan,
  updatePlan,
  deletePlan,
} from '@/controllers/adminController'
import { authenticate, authorize } from '@/middleware/auth'

const router = Router()

router.use(authenticate, authorize('admin'))

router.get('/stats', getDashboardStats)
router.get('/users', getUsers)
router.put('/users/:id/role', updateUserRole)
router.get('/payments', getPayments)
router.post('/plans', createPlan)
router.put('/plans/:id', updatePlan)
router.delete('/plans/:id', deletePlan)

export default router