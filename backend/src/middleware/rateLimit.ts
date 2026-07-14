import { Request, Response, NextFunction } from 'express'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export const rateLimit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown'
    const now = Date.now()

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      }
      return next()
    }

    if (store[key].count >= maxRequests) {
      return res.status(429).json({
        error: 'Muitas requisições. Tenta novamente mais tarde.',
      })
    }

    store[key].count++
    next()
  }
}

export const authRateLimit = rateLimit(5, 15 * 60 * 1000)
export const apiRateLimit = rateLimit(100, 15 * 60 * 1000)