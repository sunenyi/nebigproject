import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
  const { setUser } = useContext(AuthContext)
  const { setToken } = useContext(AuthContext)

  // 提供給其他程式使用
  const login = async (email, password) => {
    let token, error
    const url = 'http://localhost:3005/api/users'
  }
  const logout = () => {}

  // 這樣可以用解構賦值
  return { login, logout }
}

export default useAuth
