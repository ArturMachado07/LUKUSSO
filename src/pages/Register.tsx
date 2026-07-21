import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    try {
      await register(name, email, password)
      toast.success('Conta criada com sucesso!')
      navigate('/home')
    } catch (error) {
      toast.error('Erro ao criar conta')
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
              Cria a tua conta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Nome completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  placeholder="Teu nome"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

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

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Telefone (opcional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  placeholder="+244 923 456 789"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
                  placeholder="••••••••"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 rounded bg-lukusso-gray-light border-gray-600 text-lukusso-gold focus:ring-lukusso-gold"
              />
              <label className="text-sm text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Aceito os{' '}
                <Link to="/terms" className="text-lukusso-gold hover:underline">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link to="/privacy" className="text-lukusso-gold hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'A criar conta...' : 'Criar Conta'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Já tens conta?{' '}
            <Link to="/login" className="text-lukusso-gold hover:text-lukusso-gold/80 font-semibold">
              Entra
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}