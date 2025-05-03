'use client'

import { LoginForm } from '@/components/login-form'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

export default function Login() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Try using these credentials',
      description: 'Email: test@gmail.com, Password: password',
      duration: 25000,
    })
  }, [])

  return (
    <div className='flex min-h-svh w-full items-center justify-center'>
      <LoginForm />
    </div>
  )
}
