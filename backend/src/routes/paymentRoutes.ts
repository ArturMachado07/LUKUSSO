import { Router } from 'express'
import {
  createMulticaixaPayment,
  confirmMulticaixaPayment,
  checkMulticaixaStatus,
  createPayPayPayment,
  confirmPayPayPayment,
  multicaixaWebhook,
} from '@/controllers/paymentController'
import { authenticate } from '@/middleware/auth'

const router = Router()

router.post('/multicaixa/create', authenticate, createMulticaixaPayment)
router.post('/multicaixa/confirm/:reference', authenticate, confirmMulticaixaPayment)
router.get('/multicaixa/status/:reference', authenticate, checkMulticaixaStatus)
router.post('/multicaixa/webhook', multicaixaWebhook)

router.post('/paypay/create', authenticate, createPayPayPayment)
router.post('/paypay/confirm/:reference', authenticate, confirmPayPayPayment)

export default router