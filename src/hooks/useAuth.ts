import { useAuthStore } from '@/store'

export const useAuth = () => {
  const { user, token, isAuthenticated, login, register, logout } = useAuthStore()

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
  }
}