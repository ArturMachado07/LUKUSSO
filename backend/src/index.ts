import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from '@/routes/authRoutes'
import movieRoutes from '@/routes/movieRoutes'
import subscriptionRoutes from '@/routes/subscriptionRoutes'
import paymentRoutes from '@/routes/paymentRoutes'
import userRoutes from '@/routes/userRoutes'
import adminRoutes from '@/routes/adminRoutes'
import { apiRateLimit } from '@/middleware/rateLimit'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(apiRateLimit)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

app.listen(PORT, () => {
  console.log(`🚀 LUKUSSO Backend rodando na porta ${PORT}`)
})