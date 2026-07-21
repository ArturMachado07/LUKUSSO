import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const errors = error.details.map((detail) => detail.message)
      return res.status(400).json({ error: 'Dados inválidos', details: errors })
    }

    next()
  }
}

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('').optional(),
  password: Joi.string().min(6).max(100).required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  poster: Joi.string().required(),
  banner: Joi.string().required(),
  trailer: Joi.string().allow('').optional(),
  videoUrl: Joi.string().required(),
  director: Joi.string().required(),
  cast: Joi.array().items(Joi.string()).default([]),
  year: Joi.number().integer().min(1900).max(2030).required(),
  country: Joi.string().required(),
  language: Joi.string().required(),
  subtitles: Joi.array().items(Joi.string()).default([]),
  duration: Joi.number().integer().min(1).required(),
  category: Joi.string().required(),
  rating: Joi.number().min(0).max(5).default(0),
  ageRating: Joi.string().valid('3+', '12+', '16+', '18+').optional(),
  featured: Joi.boolean().default(false),
})

export const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(1).max(1000).required(),
})