'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Home() {
  // const [flag, setFlag] = useState()
  const flag = useFeatureFlag('login')
  // console.log(flag)

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const data = await getDocs(collection(db, 'gymapp'))
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))
  //     console.log(filteredData)
  //   }

  //   fetchItems()
  // })

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
