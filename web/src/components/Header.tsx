import { useCallback, useEffect, useState } from 'react'
import { SignOut, Sun } from 'phosphor-react'
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'

import { auth, provider } from '../services/firebase'
import { useAuth } from '../context/auth'
import googleImg from '../assets/google.svg'
import { Loading } from './Loading'
import { api } from '../services/api'

interface HeaderProps {
  feedbacksParamSetter: (data: any) => void
}

type ToPromise = (promise: Promise<any>) => Promise<any>

const to: ToPromise = (promise) => promise
  .then(result => [null, result])
  .catch(error => [error])

export function Header ({ feedbacksParamSetter }: HeaderProps) {
  const { signIn, signed, signOut, user, isLoadingAuthentication } = useAuth()
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  
  const loadFeedbacks = useCallback(async () => {
    const [_, result] = await to(api.get('/feedbacks'))
    feedbacksParamSetter(result.data)
  }, [])

  const signInOnGoogleProvider = useCallback(async () => {
    setIsLoadingLogin(true)
    const [error, result]: [any, UserCredential] = await to(signInWithPopup(auth, provider))
    if (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error(errorCode, errorMessage, email, credential)
      return
    }
    setIsLoadingLogin(false)
    signIn({
      name: result.user.displayName,
      photoURL: result.user.photoURL
    })
    loadFeedbacks()
  }, [])

  const toggleDarkMode = useCallback(() => {
    document.documentElement.classList.toggle('dark')
  }, [])

  useEffect(() => {
    if (signed) loadFeedbacks()
  }, [signed])

  return (
    <header className='bg-zinc-800 text-zinc-100 dark:text-zinc-800 dark:bg-zinc-100 w-full h-16 flex items-center justify-between px-6 md:px-40'>
      <div id='logo' className='hidden md:block w-40 h-10 bg-zinc-700 dark:bg-zinc-200 rounded-md'></div>
      <div id='links' className='hidden md:flex items-center gap-6'>
        <span className='w-[99px] h-4 rounded-full bg-zinc-700 dark:bg-zinc-200 block'></span>
        <span className='w-[99px] h-4 rounded-full bg-zinc-700 dark:bg-zinc-200 block'></span>
        <span className='w-[99px] h-4 rounded-full bg-zinc-700 dark:bg-zinc-200 block'></span>
        <span className='w-[99px] h-4 rounded-full bg-zinc-700 dark:bg-zinc-200 block'></span>
      </div>
      <div id='profile' className='flex items-center gap-4'>
        <button
          onClick={toggleDarkMode} 
          className='w-8 h-8 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center'>
          <Sun weight='bold' />
        </button>
        {signed ? (
          <>
            <button
              onClick={signOut}
              className='w-8 h-8 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center'>
              <SignOut weight='bold' />
            </button>
            <img src={user?.photoURL} alt={user?.name} className='w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-200' />
          </>
        ) : (
          <button
            onClick={signInOnGoogleProvider}
            className='flex flex-shrink-0 items-center gap-2 border-[1px] border-zinc-700 px-4 py-1 rounded-md'
          >
            { isLoadingLogin || isLoadingAuthentication ? <Loading /> : 
              (<>
                <img className='w-6' src={googleImg} alt='Logo do google' />
                Faça login com Google
              </>) }
          </button>
        )}
      </div>
    </header>
  )
}
