import { getDocs, collection, setDoc, doc, writeBatch } from 'firebase/firestore'
import { auth, db } from './firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    console.error(err)
  }
}

export const getFlags = async (setFlags) => {
  const data = await getDocs(collection(db, 'gymapp'))
  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    name: doc.id,
  }))
  setFlags(filteredData)
}

export const createFlag = async (flag) => {
  const collectionRef = collection(db, 'gymapp')
  const { name, ...data } = flag
  const docRef = doc(collectionRef, name)
  try {
    await setDoc(docRef, data)
  } catch (err) {
    console.error(err)
  }
}

export const deleteFlags = async (flagNames: string[]) => {
  if (flagNames.length === 0) return

  try {
    const batch = writeBatch(db)

    flagNames.forEach((name) => {
      const docRef = doc(db, 'gymapp', name)
      batch.delete(docRef)
    })

    await batch.commit()
    location.reload()
  } catch (error) {
    console.error('Error deleting documents: ', error)
  }
}

export const updateFlag = async (flag) => {
  const collectionRef = collection(db, 'gymapp')
  const { name, ...data } = flag
  const docRef = doc(collectionRef, name)
  try {
    await setDoc(docRef, data)
  } catch (err) {
    console.error(err)
  }
}
