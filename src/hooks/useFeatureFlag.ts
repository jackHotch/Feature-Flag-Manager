import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { setEdgeConfig } from '@/lib/vercel'

export function useFeatureFlags() {
  const [flags, setFlags] = useState({})

  useEffect(() => {
    const flagsRef = collection(db, 'projects/yourProject/flags')

    // Listen for Firestore changes in real time
    const unsubscribe = onSnapshot(flagsRef, async (snapshot) => {
      const updatedFlags = {}
      snapshot.forEach((doc) => {
        updatedFlags[doc.id] = doc.data()
      })

      setFlags(updatedFlags)

      // Sync to Vercel Edge Config
      await setEdgeConfig(updatedFlags)
    })

    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  return flags
}
