import { useState, useEffect } from 'react'

// Firebase will be wired here later
// For now uses localStorage as placeholder

const STORAGE_KEY = 'slot_leaderboard'
const MAX_ENTRIES = 10

export const useLeaderboard = () => {
  const [entries,    setEntries]    = useState([])
  const [isLoading,  setIsLoading]  = useState(false)
  const [isSubmitted,setIsSubmitted]= useState(false)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setEntries(JSON.parse(stored))
  }, [])

  const submitScore = async (username, score) => {
    setIsLoading(true)
    setError(null)
    try {
      const newEntry  = { username, score, date: new Date().toISOString() }
      const updated   = [...entries, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_ENTRIES)

      setEntries(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to submit score.')
    } finally {
      setIsLoading(false)
    }
  }

  return { entries, isLoading, isSubmitted, error, submitScore }
}