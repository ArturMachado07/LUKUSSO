import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock, Save, ArrowLeft, Bell, Globe, Shield, CreditCard, Eye, Check } from 'lucide-react'
import Header from '@/components/Header'
import { useAuthStore, useContentStore } from '@/store'
import toast from 'react-hot-toast'

type Tab = 'profile' | 'notifications' | 'payments' | 'privacy' | 'language'

export default function Settings() {
  const { user, isAuthenticated, updateUser } = useAuthStore()
  const { preferences, updatePreferences } = useContentStore()
  const navigate = useNavigate()

  const [tab, setTab] = useState<Tab>('profile')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState(preferences.language)

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-lukusso-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2>
          <Link to="/login" className="btn-primary">Entrar</Link>
        </div>
      </div>
    )
  }

  const saveProfile = () => {
    if (!name.trim()) return toast.error('O nome é obrigatório')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Email inválido')
    updateUser({ name: name.trim(), email: email.trim(), phone, avatar })
    toast.success('Perfil atualizado com sucesso!')
  }

  const savePassword = () => {
    if (!currentPassword) return toast.error('Indica a senha atual')
    if (newPassword.length < 6) return toast.error('A nova senha deve ter pelo menos 6 caracteres')
    if (newPassword !== confirmPassword) return toast.error('As senhas não coincidem')
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    toast.success('Senha alterada com sucesso!')
  }

  const saveLanguage = () => {
    updatePreferences({ language })
    toast.success('Idioma atualizado!')
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'language', label: 'Idioma', icon: Globe },
  ]

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChange(!checked)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${checked ? 'bg-lukusso-gold' : 'bg-gray-600'}`}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-lukusso-gray hover:bg-lukusso-gray-light transition-colors">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Definições</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <nav className="bg-lukusso-gray rounded-xl p-2 space-y-1 sticky top-24">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setTab(id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${tab === id ? 'bg-lukusso-gold/20 text-lukusso-gold' : 'text-gray-300 hover:bg-lukusso-gray-light'}`}>
                    <Icon size={20} /><span style={{ fontFamily: 'Manrope, sans-serif' }}>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <section className="lg:col-span-3 space-y-6">
              {tab === 'profile' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Informações Pessoais</h2>
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full bg-lukusso-gold flex items-center justify-center overflow-hidden">
                      {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User size={36} className="text-lukusso-black" />}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>URL do Avatar</label>
                      <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="https://..." className="w-full bg-lukusso-gray-light text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Nome</label><div className="relative"><input value={name} onChange={e => setName(e.target.value)} className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><div className="relative"><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label><div className="relative"><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div></div>
                  </div>
                  <button onClick={saveProfile} className="btn-primary px-8 py-3 mt-6"><Save size={20} /> Guardar Perfil</button>
                </div>
              )}

              {tab === 'notifications' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Notificações</h2>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between"><div><h3 className="text-white font-semibold">Notificações por Email</h3><p className="text-gray-400 text-sm">Receber novidades e lançamentos por email</p></div><Toggle checked={preferences.emailNotifications} onChange={v => updatePreferences({ emailNotifications: v })} /></div>
                    <div className="flex items-center justify-between"><div><h3 className="text-white font-semibold">Notificações Push</h3><p className="text-gray-400 text-sm">Alertas no dispositivo sobre os teus conteúdos</p></div><Toggle checked={preferences.pushNotifications} onChange={v => updatePreferences({ pushNotifications: v })} /></div>
                    <div className="flex items-center justify-between"><div><h3 className="text-white font-semibold">Reprodução Automática</h3><p className="text-gray-400 text-sm">Iniciar o próximo episódio automaticamente</p></div><Toggle checked={preferences.autoplay} onChange={v => updatePreferences({ autoplay: v })} /></div>
                  </div>
                </div>
              )}

              {tab === 'payments' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pagamentos</h2>
                  <div className="rounded-lg bg-lukusso-gray-light p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-1">Plano Actual</p>
                    <p className="text-white font-semibold text-lg">{user.subscription?.plan?.name || 'Nenhum plano'}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Gerir métodos de pagamento e facturação na página de subscrição.</p>
                  <Link to="/subscription" className="btn-primary inline-flex"><CreditCard size={20} /> Gerir Subscrição</Link>
                </div>
              )}

              {tab === 'privacy' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Privacidade</h2>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between"><div><h3 className="text-white font-semibold">Perfil Público</h3><p className="text-gray-400 text-sm">Permitir que outros vejam o teu perfil</p></div><Toggle checked={preferences.profilePublic} onChange={v => updatePreferences({ profilePublic: v })} /></div>
                    <div className="flex items-center justify-between"><div><h3 className="text-white font-semibold">Atividade Visível</h3><p className="text-gray-400 text-sm">Mostrar o que assistes no teu perfil</p></div><Toggle checked={preferences.activityVisible} onChange={v => updatePreferences({ activityVisible: v })} /></div>
                  </div>
                </div>
              )}

              {tab === 'language' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Idioma</h2>
                  <div className="space-y-3">
                    {([['pt', 'Português'], ['en', 'English'], ['fr', 'Français']] as const).map(([value, label]) => (
                      <button key={value} onClick={() => setLanguage(value)} className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${language === value ? 'border-lukusso-gold bg-lukusso-gold/10 text-white' : 'border-gray-600 text-gray-300 hover:bg-lukusso-gray-light'}`}>
                        <span>{label}</span>
                        {language === value && <Check size={20} className="text-lukusso-gold" />}
                      </button>
                    ))}
                  </div>
                  <button onClick={saveLanguage} className="btn-primary px-8 py-3 mt-6"><Save size={20} /> Guardar Idioma</button>
                </div>
              )}

              {tab === 'profile' && (
                <div className="bg-lukusso-gray rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Alterar Senha</h2>
                  <div className="space-y-4">
                    <div className="relative"><input type={showPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Senha Actual" className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div>
                    <div className="relative"><input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nova Senha" className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div>
                    <div className="relative"><input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmar Nova Senha" className="w-full bg-lukusso-gray-light text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-lukusso-gold" /><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div>
                    <button onClick={() => setShowPassword(s => !s)} className="flex items-center gap-2 text-sm text-gray-400"><Eye size={16} /> {showPassword ? 'Ocultar' : 'Mostrar'} senhas</button>
                  </div>
                  <button onClick={savePassword} className="btn-primary px-8 py-3 mt-6"><Lock size={20} /> Alterar Senha</button>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}