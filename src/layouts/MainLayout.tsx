import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}