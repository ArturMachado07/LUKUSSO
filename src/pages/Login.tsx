import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast.success('Bem-vindo ao LUKUSSO!')
      navigate('/home')
    } catch (error) {
      toast.error('Credenciais inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-lukusso-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/tela-login.png)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-lukusso-black/80 to-lukusso-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-lukusso-black/80 to-lukusso-black/60" />

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-lukusso-gray/90 backdrop-blur-custom rounded-2xl p-8 shadow-2xl"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-lukusso-gold mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              LUKUSSO
            </h1>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              O cinema angolano na tua tela
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  placeholder="teu@email.com"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  placeholder="••••••••"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" className="rounded bg-lukusso-gray-light border-gray-600 text-lukusso-gold focus:ring-lukusso-gold" />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="text-lukusso-gold hover:text-lukusso-gold/80" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'A entrar...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-lukusso-gray text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ou entra com
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-lukusso-gray-light text-white py-3 rounded-lg hover:bg-opacity-80 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.03 2.53-2.16 3.31v2.77h3.49c2.04-1.88 3.24-4.64 3.24-7.89z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.49-2.77c-.98.66-2.23 1.06-3.79 1.06-2.91 0-5.37-1.96-6.25-4.63H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.75 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.72-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.64 0 3.11.56 4.27 1.67l3.2-3.2C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.57 2.84c.88-2.67 3.34-4.53 6.25-4.53z"/>
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>Google</span>
            </button>

            <button className="flex items-center justify-center gap-2 bg-lukusso-gray-light text-white py-3 rounded-lg hover:bg-opacity-80 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.56-.67.78-1.19 2.01-1.04 3.15 1.2.09 2.29-.6 3.03-1.6"/>
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>Apple</span>
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Ainda não tens conta?{' '}
            <Link to="/register" className="text-lukusso-gold hover:text-lukusso-gold/80 font-semibold">
              Regista-te
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}