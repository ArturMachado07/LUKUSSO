import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1
          className="text-9xl font-bold text-lukusso-gold mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          404
        </h1>
        <p className="text-2xl text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Página não encontrada
        </p>
        <Link to="/home" className="btn-primary">
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  )
}