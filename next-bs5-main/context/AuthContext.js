import react, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined)
  const [user, setUser] = useState(undefined)

  const router = useRouter()
  const loginRouter = '/member/login'

  const protectedRouter = ['/'] // 需要驗證的頁面

  useEffect(() => {
    if (!user) {
      //user是否存在
      if (protectedRouter.includes(router.pathname)) {
        //當前路徑是否受保護
        router.push(loginRouter) //導頁
      }
    } else {
      router.push('/')
    }
  }, [router.isReady, router.pathname, user])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
