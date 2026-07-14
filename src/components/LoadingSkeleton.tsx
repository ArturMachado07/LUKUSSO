import { motion } from 'framer-motion'

export function MovieCardSkeleton() {
  return (
    <div className="card-hover">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-lukusso-gray">
        <div className="skeleton w-full h-full" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen bg-lukusso-gray">
      <div className="absolute inset-0 skeleton" />
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 space-y-4">
          <div className="skeleton h-16 w-2/3" />
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-20 w-1/2" />
          <div className="flex gap-4">
            <div className="skeleton h-12 w-40" />
            <div className="skeleton h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="mb-12">
      <div className="container mx-auto px-4">
        <div className="skeleton h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-lukusso-gold border-t-transparent rounded-full"
      />
    </div>
  )
}