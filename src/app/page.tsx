'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Home() {
  const [flag, setFlag] = useState()

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'gymapp'))
      console.log(querySnapshot.docs)
    }

    fetchItems()
  })
  return (
    <div style={{ width: '25%', margin: '20px auto' }}>
      <Button>Click me</Button>
      <Input />

      <div className='flex items-center gap-2'>
        <Checkbox />
        <label>Accept the Terms and Conditions</label>
      </div>
    </div>
  )
}
