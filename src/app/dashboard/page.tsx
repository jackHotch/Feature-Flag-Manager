'use client'

import { Button } from '@/components/ui/button'
import { auth, db } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [flags, setFlags] = useState([])

  const fetchItems = async () => {
    const data = await getDocs(collection(db, 'gymapp'))
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setFlags(filteredData)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1 className='text-4xl font-extrabold'>
        {auth?.currentUser ? 'logged in' : 'no'}
      </h1>
      {flags.map((flag: any, key: number) => {
        return (
          <div key={key} className='flex gap-8'>
            <span>{flag.id}</span>
            <span>{flag.description}</span>
            <span>{flag.data.show ? 'true' : JSON.stringify(flag.data)}</span>
          </div>
        )
      })}
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
