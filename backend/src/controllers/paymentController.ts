import { Request, Response } from 'express'
import crypto from 'crypto'
import prisma from '@/config/database'

// ===== MULTICAIXA EXPRESS =====

export const createMulticaixaPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { planId, amount } = req.body

    const reference = `MC-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const subscription = await prisma.subscription.findUnique({ where: { userId } })
    if (!subscription) {
      return res.status(404).json({ error: 'Subscrição não encontrada' })
    }

    const payment = await prisma.payment.create({
      data: {
        userId: userId!,
        subscriptionId: subscription.id,
        amount,
        method: 'multicaixa',
        reference,
        status: 'pending',
      },
    })

    // Integração com API Multicaixa Express
    // Em produção, fazer chamada real à API
    const multicaixaResponse = {
      reference,
      amount,
      merchantId: process.env.MULTICAIXA_MERCHANT_ID,
      paymentUrl: `https://multicaixa.co.ao/pay/${reference}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    }

    res.status(201).json({
      message: 'Pagamento Multicaixa Express criado',
      payment,
      multicaixa: multicaixaResponse,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pagamento' })
  }
}

export const confirmMulticaixaPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params

    const payment = await prisma.payment.findUnique({ where: { reference } })
    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    // Verificar estado na API Multicaixa
    // Em produção, consultar API real

    await prisma.payment.update({
      where: { reference },
      data: { status: 'completed', paidAt: new Date() },
    })

    // Activar subscrição
    await prisma.subscription.update({
      where: { id: payment.subscriptionId },
      data: {
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })

    res.json({ message: 'Pagamento confirmado e conta activada' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao confirmar pagamento' })
  }
}

export const checkMulticaixaStatus = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params
    const payment = await prisma.payment.findUnique({ where: { reference } })

    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    res.json({ status: payment.status, reference: payment.reference })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar estado' })
  }
}

// ===== PAYPAY AFRICA =====

export const createPayPayPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { planId, amount, phoneNumber } = req.body

    const reference = `PP-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const subscription = await prisma.subscription.findUnique({ where: { userId } })
    if (!subscription) {
      return res.status(404).json({ error: 'Subscrição não encontrada' })
    }

    const payment = await prisma.payment.create({
      data: {
        userId: userId!,
        subscriptionId: subscription.id,
        amount,
        method: 'paypay',
        reference,
        status: 'pending',
      },
    })

    // Integração com API PayPay Africa
    const paypayResponse = {
      reference,
      amount,
      phoneNumber,
      merchantId: process.env.PAYPAY_MERCHANT_ID,
      status: 'pending_confirmation',
      message: 'Confirmação enviada para o teu telemóvel',
    }

    res.status(201).json({
      message: 'Pagamento PayPay Africa criado',
      payment,
      paypay: paypayResponse,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pagamento' })
  }
}

export const confirmPayPayPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params

    const payment = await prisma.payment.findUnique({ where: { reference } })
    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    await prisma.payment.update({
      where: { reference },
      data: { status: 'completed', paidAt: new Date() },
    })

    await prisma.subscription.update({
      where: { id: payment.subscriptionId },
      data: {
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })

    res.json({ message: 'Pagamento PayPay confirmado' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao confirmar pagamento' })
  }
}

// ===== WEBHOOK =====

export const multicaixaWebhook = async (req: Request, res: Response) => {
  try {
    const { reference, status } = req.body

    const payment = await prisma.payment.findUnique({ where: { reference } })
    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    if (status === 'paid' || status === 'completed') {
      await prisma.payment.update({
        where: { reference },
        data: { status: 'completed', paidAt: new Date() },
      })

      await prisma.subscription.update({
        where: { id: payment.subscriptionId },
        data: {
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    }

    res.json({ received: true })
  } catch (error) {
    res.status(500).json({ error: 'Erro no webhook' })
  }
}