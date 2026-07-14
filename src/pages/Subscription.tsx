import { motion } from 'framer-motion'
import { Check, Crown, Zap, Users } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'

export default function Subscription() {
  const { user, isAuthenticated } = useAuthStore()

  const plans = [
    {
      id: 'start',
      name: 'LUKUSSO START',
      price: 1500,
      popular: false,
      icon: Zap,
      features: ['Qualidade HD', '1 dispositivo', 'Catálogo básico', 'Sem anúncios'],
    },
    {
      id: 'premium',
      name: 'LUKUSSO PREMIUM',
      price: 3500,
      popular: true,
      icon: Crown,
      features: ['Full HD', '3 dispositivos', 'Conteúdos exclusivos', 'Sem anúncios', 'Download offline'],
    },
    {
      id: 'family',
      name: 'LUKUSSO FAMILY',
      price: 5500,
      popular: false,
      icon: Users,
      features: ['4K Ultra HD', '4 dispositivos', '4 perfis familiares', 'Conteúdos exclusivos', 'Download offline', 'Acesso antecipado'],
    },
  ]

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Escolhe o teu <span className="text-gradient">Plano</span>
            </h1>
            <p className="text-gray-400 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Desfruta do melhor do cinema angolano e africano
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const isCurrentPlan = user?.subscription?.plan?.id === plan.id

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-lukusso-gray rounded-2xl p-8 ${
                    plan.popular
                      ? 'border-2 border-lukusso-gold shadow-2xl shadow-lukusso-gold/20'
                      : 'border border-gray-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-lukusso-gold text-lukusso-black px-4 py-1 rounded-full text-sm font-bold">
                        MAIS POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lukusso-gold/10 mb-4">
                      <Icon className="text-lukusso-gold" size={32} />
                    </div>
                    <h3
                      className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-lukusso-gold">{plan.price}</span>
                      <span className="text-gray-400">Kz/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <Check size={20} className="text-lukusso-gold flex-shrink-0" />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      isCurrentPlan
                        ? 'bg-green-500/20 text-green-400 cursor-default'
                        : plan.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    {isCurrentPlan ? 'Plano Actual' : 'Assinar Agora'}
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Payment Methods */}
          <div className="mt-16 bg-lukusso-gray rounded-xl p-8">
            <h2
              className="text-2xl font-bold text-white mb-6 text-center"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Métodos de Pagamento
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-16 bg-lukusso-gray-light rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lukusso-gold font-bold text-sm">MULTICAIXA</span>
                </div>
                <p className="text-xs text-gray-400">Express</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-16 bg-lukusso-gray-light rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lukusso-gold font-bold text-sm">PAYPAY</span>
                </div>
                <p className="text-xs text-gray-400">Africa</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-16 bg-lukusso-gray-light rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lukusso-gold font-bold text-sm">VISA</span>
                </div>
                <p className="text-xs text-gray-400">Cartão</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-16 bg-lukusso-gray-light rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lukusso-gold font-bold text-sm">MBWAY</span>
                </div>
                <p className="text-xs text-gray-400">Mobile</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}