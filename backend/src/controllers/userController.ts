import { Request, Response } from 'express'
import prisma from '@/config/database'

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: true,
        series: true,
      },
    })
    res.json(favorites)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { movieId, seriesId } = req.body

    const favorite = await prisma.favorite.create({
      data: { userId: userId!, movieId, seriesId },
    })
    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar aos favoritos' })
  }
}

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { id } = req.params

    await prisma.favorite.deleteMany({
      where: { userId, OR: [{ movieId: id }, { seriesId: id }] },
    })
    res.json({ message: 'Removido dos favoritos' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover dos favoritos' })
  }
}

export const getWatchHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const history = await prisma.watchHistory.findMany({
      where: { userId },
      include: { movie: true, series: true, episode: true },
      orderBy: { watchedAt: 'desc' },
    })
    res.json(history)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const addWatchHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { movieId, seriesId, episodeId, progress, duration } = req.body

    const history = await prisma.watchHistory.create({
      data: { userId: userId!, movieId, seriesId, episodeId, progress, duration },
    })
    res.status(201).json(history)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao guardar histórico' })
  }
}

export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { movieId, seriesId, rating, comment } = req.body

    const review = await prisma.review.create({
      data: { userId: userId!, movieId, seriesId, rating, comment },
    })
    res.status(201).json(review)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar avaliação' })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { name, phone, avatar } = req.body

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, phone, avatar },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao actualizar perfil' })
  }
}