import { Request, Response } from 'express'
import prisma from '@/config/database'

export const getMovies = async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '20' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)

    const where: any = {}
    if (category) where.category = category
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { director: { contains: search as string, mode: 'insensitive' } },
        { cast: { has: search as string } },
      ]
    }

    const movies = await prisma.movie.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.movie.count({ where })

    res.json({
      movies,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getFeaturedMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { featured: true },
      take: 10,
    })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        reviews: { include: { user: true } },
      },
    })

    if (!movie) {
      return res.status(404).json({ error: 'Filme não encontrado' })
    }

    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = await prisma.movie.create({ data: req.body })
    res.status(201).json(movie)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar filme' })
  }
}

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const movie = await prisma.movie.update({
      where: { id },
      data: req.body,
    })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao actualizar filme' })
  }
}

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.movie.delete({ where: { id } })
    res.json({ message: 'Filme eliminado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao eliminar filme' })
  }
}

export const getSeries = async (req: Request, res: Response) => {
  try {
    const series = await prisma.series.findMany({
      include: { seasons: { include: { episodes: true } } },
    })
    res.json(series)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getSeriesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const series = await prisma.series.findUnique({
      where: { id },
      include: { seasons: { include: { episodes: true } } },
    })

    if (!series) {
      return res.status(404).json({ error: 'Série não encontrada' })
    }

    res.json(series)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}