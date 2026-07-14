import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/config/database'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email já registado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    })

    // Criar subscrição START por padrão
    const startPlan = await prisma.plan.findFirst({ where: { name: { contains: 'START' } } })
    if (startPlan) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: startPlan.id,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    )

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any }
    )

    res.status(201).json({
      message: 'Conta criada com sucesso',
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    )

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any }
    )

    res.json({
      message: 'Login bem-sucedido',
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token não fornecido' })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

    if (!user) {
      return res.status(401).json({ error: 'Utilizador não encontrado' })
    }

    const newToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    )

    res.json({ token: newToken })
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido' })
  }
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: { include: { plan: true } },
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado' })
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      subscription: user.subscription,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}