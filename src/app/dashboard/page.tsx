'use client'

import { Button } from '@/components/ui/button'
import { auth, db } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/data-table'

export default function Dashboard() {
  const router = useRouter()
  const [flags, setFlags] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const fetchItems = async () => {
    const data = await getDocs(collection(db, 'gymapp'))
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      name: doc.id,
    }))
    setFlags(filteredData)
  }

  useEffect(() => {
    // if (auth?.currentUser) {
    //   setIsUserLoggedIn(true)
    //   fetchItems()
    // } else {
    //   router.push('/')
    // }
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

  // if (!isUserLoggedIn) {
  //   return null
  // }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-extrabold'>
        {auth?.currentUser ? 'logged in' : 'no'}
      </h1>
      <div className='w-full max-w-6xl'>
        <DataTable data={flags} />
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
