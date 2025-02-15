'use client'

import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { LoginForm } from '@/components/login-form'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center'>
      <div className='w-full max-w-sm'>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          login={login}
        />
      </div>
    </div>
  )
}
