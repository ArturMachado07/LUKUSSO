import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-lukusso-black relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://via.placeholder.com/1920x1080/080808/D4AF37?text=LUKUSSO)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lukusso-black via-lukusso-black/80 to-lukusso-black/60" />

      <div className="relative z-10">{children}</div>
    </div>
  )
}