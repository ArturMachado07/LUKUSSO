export const COLORS = {
  black: '#080808',
  gold: '#D4AF37',
  red: '#CC092F',
  gray: '#171717',
  grayLight: '#2a2a2a',
}

export const CATEGORIES = [
  'Cinema Nacional',
  'Histórias de Angola',
  'Música Angolana',
  'Documentários',
  'Biografias',
  'Talentos Emergentes',
]

export const PLANS = [
  {
    id: 'start',
    name: 'LUKUSSO START',
    price: 1500,
    features: ['Qualidade HD', '1 dispositivo', 'Catálogo básico'],
    maxDevices: 1,
    maxQuality: '720p',
  },
  {
    id: 'premium',
    name: 'LUKUSSO PREMIUM',
    price: 3500,
    features: ['Full HD', '3 dispositivos', 'Conteúdos exclusivos'],
    maxDevices: 3,
    maxQuality: '1080p',
    popular: true,
  },
  {
    id: 'family',
    name: 'LUKUSSO FAMILY',
    price: 5500,
    features: ['4K Ultra HD', '4 dispositivos', 'Perfis familiares'],
    maxDevices: 4,
    maxQuality: '4K',
  },
]

export const PAYMENT_METHODS = [
  { id: 'multicaixa', name: 'Multicaixa Express', logo: 'MULTICAIXA' },
  { id: 'paypay', name: 'PayPay Africa', logo: 'PAYPAY' },
  { id: 'visa', name: 'Visa', logo: 'VISA' },
  { id: 'mbway', name: 'MBWay', logo: 'MBWAY' },
]

export const STREAMING_QUALITIES = ['Auto', '480p', '720p', '1080p', '4K']
export const PLAYBACK_SPEEDS = [0.5, 1, 1.5, 2]
export const SUBTITLE_LANGUAGES = ['Português', 'Inglês', 'Francês']