import { Request, Response } from 'express'
import prisma from '@/config/database'

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalMovies, totalSeries, totalSubscriptions, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.movie.count(),
      prisma.series.count(),
      prisma.subscription.count({ where: { status: 'active' } }),
      prisma.payment.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
      }),
    ])

    res.json({
      totalUsers,
      totalMovies,
      totalSeries,
      totalSubscriptions,
      totalRevenue: totalRevenue._sum.amount || 0,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        subscription: { include: { plan: true } },
      },
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { role } = req.body

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao actualizar utilizador' })
  }
}

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { user: true, subscription: { include: { plan: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(payments)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan = await prisma.plan.create({ data: req.body })
    res.status(201).json(plan)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar plano' })
  }
}

export const updatePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const plan = await prisma.plan.update({ where: { id }, data: req.body })
    res.json(plan)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao actualizar plano' })
  }
}

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.plan.delete({ where: { id } })
    res.json({ message: 'Plano eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao eliminar plano' })
  }
}