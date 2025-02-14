'use client'

import { db } from '@/lib/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [flags, setFlags] = useState<any>([])

  const fetchItems = async () => {
    const data = await getDocs(collection(db, 'gymapp'))
    const filteredData: any = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setFlags(filteredData)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div>
      {flags.map((flag: any, key: number) => {
        return (
          <div key={key} className='flex gap-8'>
            <span>{flag.id}</span>
            <span>{flag.description}</span>
            <span>{flag.data.show ? 'true' : JSON.stringify(flag.data)}</span>
          </div>
        )
      })}
    </div>
  )
}
