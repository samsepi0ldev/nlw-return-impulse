import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as firebaseAuth from 'firebase/auth'
import { auth } from '../services/firebase'
import { NextOrObserver } from 'firebase/auth'

type User = {
  name: string
  photoURL: string
} | null

interface AuthContextProps {
  user: User
  signed: boolean
  isLoadingAuthentication: boolean
  signIn: (data: any) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider ({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(null)
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true)

  const authObserver = useCallback((data: any) => {
    if (data) {
      setUser({
        name: data.displayName,
        photoURL: data.photoURL
      })
      setIsLoadingAuthentication(false)
      return
    }
    setUser(null)
    setIsLoadingAuthentication(false)
  }, [])

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, authObserver)
    return unsubscribe
  }, [])

  async function signOut () {
    await firebaseAuth.signOut(auth)
    window.history.pushState({}, '', '/')
  }

  function signIn (data: User) {
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, isLoadingAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
