import { Request, Response } from 'express'
import prisma from '@/config/database'

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { price: 'asc' },
    })
    res.json(plans)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getMySubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true },
    })

    if (!subscription) {
      return res.status(404).json({ error: 'Subscrição não encontrada' })
    }

    res.json(subscription)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const changePlan = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { planId } = req.body

    const plan = await prisma.plan.findUnique({ where: { id: planId } })
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        planId,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId: userId!,
        planId,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })

    res.json({ message: 'Plano alterado com sucesso', subscription })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar plano' })
  }
}

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    await prisma.subscription.update({
      where: { userId },
      data: { status: 'cancelled', autoRenew: false },
    })
    res.json({ message: 'Subscrição cancelada' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar subscrição' })
  }
}

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    res.json(payments)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}