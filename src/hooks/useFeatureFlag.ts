import useSWR from 'swr'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const useFeatureFlag = (flagName: string) => {
  const getFlags = async () => {
    const flagsRef = collection(db, 'gymapp')
    const snapshot = await getDocs(flagsRef)

    const docList = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return docList
  }

  const { data: flags, error } = useSWR('featureFlags', getFlags, {
    revalidateOnFocus: false, // Don't refresh on window focus
    dedupingInterval: 60000, // Cache for 1 minute
  })

  if (error) return null // If there's an error, assume the flag is off

  return flags?.find((flag) => flag.id == flagName) // Return flag value or false by default
}
