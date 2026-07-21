import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Smartphone, CreditCard, Loader2 } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore } from '@/store'
import { paymentService } from '@/services/payments'
import { PLANS } from '@/utils/constants'
import toast from 'react-hot-toast'

export default function Payment() {
  const { planId } = useParams<{ planId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [method, setMethod] = useState<'multicaixa' | 'paypay'>('multicaixa')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const plan = PLANS.find((p) => p.id === planId) || PLANS[1]

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Precisas de fazer login primeiro')
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      if (method === 'multicaixa') {
        const response = await paymentService.createMulticaixa({
          planId: plan.id,
          amount: plan.price,
        })
        toast.success('Referência Multicaixa gerada!')
        console.log('Multicaixa:', response)
      } else {
        const response = await paymentService.createPayPay({
          planId: plan.id,
          amount: plan.price,
          phoneNumber: phone,
        })
        toast.success('Pagamento PayPay iniciado!')
        console.log('PayPay:', response)
      }
      navigate('/profile')
    } catch (error) {
      toast.error('Erro ao processar pagamento')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1
            className="text-4xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Finalizar Pagamento
          </h1>

          {/* Plano Selecionado */}
          <div className="bg-lukusso-gray rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-lukusso-gold">{plan.name}</h2>
                <p className="text-gray-400 mt-1">Plano seleccionado</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{plan.price} Kz</p>
                <p className="text-gray-400 text-sm">por mês</p>
              </div>
            </div>
          </div>

          {/* Método de Pagamento */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Método de Pagamento
            </h3>

            <button
              onClick={() => setMethod('multicaixa')}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                method === 'multicaixa'
                  ? 'border-lukusso-gold bg-lukusso-gold/10'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="w-12 h-12 bg-lukusso-gold/20 rounded-lg flex items-center justify-center">
                <CreditCard className="text-lukusso-gold" size={24} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Multicaixa Express</p>
                <p className="text-gray-400 text-sm">Paga no Multicaixa Express</p>
              </div>
              {method === 'multicaixa' && <Check className="ml-auto text-lukusso-gold" size={24} />}
            </button>

            <button
              onClick={() => setMethod('paypay')}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                method === 'paypay'
                  ? 'border-lukusso-gold bg-lukusso-gold/10'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="w-12 h-12 bg-lukusso-gold/20 rounded-lg flex items-center justify-center">
                <Smartphone className="text-lukusso-gold" size={24} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">PayPay Africa</p>
                <p className="text-gray-400 text-sm">Pagamento mobile</p>
              </div>
              {method === 'paypay' && <Check className="ml-auto text-lukusso-gold" size={24} />}
            </button>
          </div>

          {/* Phone para PayPay */}
          {method === 'paypay' && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Número de Telemóvel
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+244 923 456 789"
                className="w-full bg-lukusso-gray-light text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold"
              />
            </div>
          )}

          {/* Botão Pagar */}
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                A processar...
              </>
            ) : (
              `Pagar ${plan.price} Kz`
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Pagamento seguro e encriptado
          </p>
        </motion.div>
      </div>
    </div>
  )
}