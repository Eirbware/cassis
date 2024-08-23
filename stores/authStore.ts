import type { User } from '../utils/User'

interface State {
  token: string | null
  user: User | null
}

interface Token extends User {
  exp: number
  iss: string
}

export const useAuthStore = defineStore('authStore', {
  state: (): State => {
    return {
      token: null,
      user: null
    }
  },
  actions: {
    login(token: string, user: User) {
      this.token = token
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
      navigateTo('/')
    }
  },
  getters: {
    decodeJWT(): null | Token {
      if (this.token) {
        const base64Url = this.token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
        )
        return JSON.parse(jsonPayload)
      }
      return null
    },
    isAuthenticated(): boolean {
      if (this.token) {
        const decodedToken = this.decodeJWT
        if (decodedToken) {
          const expirationDate = new Date(decodedToken.exp * 1000).getTime()
          const now = new Date().getTime()
          if (expirationDate > now) {
            return true
          }
        }
      }
      return false
    }
  },
  persist: true
})
