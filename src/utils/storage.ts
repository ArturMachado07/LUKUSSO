export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Ignore
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore
    }
  },

  getJSON: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },

  setJSON: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore
    }
  },
}