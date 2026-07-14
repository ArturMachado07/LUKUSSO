import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      navigate('/home')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-lukusso-black"
        >
          <div className="relative">
            {/* Efeito de brilho dourado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              className="absolute inset-0 -z-10 blur-3xl"
            >
              <div className="h-32 w-32 rounded-full bg-lukusso-gold/30" />
            </motion.div>

            {/* Logo LUKUSSO */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: 'easeOut',
              }}
              className="text-center"
            >
              <motion.img
                src="/logo-amarelo.svg"
                alt="LUKUSSO"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-20 w-auto mx-auto mb-4"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-4 text-sm text-gray-400"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                O cinema angolano na tua tela
              </motion.p>
            </motion.div>

            {/* Animação de loading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 flex justify-center"
            >
              <div className="h-1 w-32 overflow-hidden rounded-full bg-lukusso-gray">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="h-full w-1/2 bg-lukusso-gold"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}