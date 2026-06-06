import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,  // ← add this
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION  = 'leaderboard'
const MAX_ENTRIES = 10

export const isUsernameTaken = async (username) => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('usernameLower', '==', username.trim().toLowerCase())
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('isUsernameTaken error:', error)
    throw error
  }
}

export const submitScore = async (username, score) => {
  try {
    const taken = await isUsernameTaken(username)
    if (taken) throw new Error('USERNAME_TAKEN')

    await addDoc(collection(db, COLLECTION), {
      username:      username.trim(),
      usernameLower: username.trim().toLowerCase(),
      score,
      createdAt:     serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error('submitScore error:', error)
    throw error
  }
}

export const fetchLeaderboard = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy('score', 'desc'),
      limit(MAX_ENTRIES)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('fetchLeaderboard error:', error)
    throw error
  }
}