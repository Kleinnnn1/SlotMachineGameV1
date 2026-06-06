import { useState, useEffect } from 'react'
import {
  fetchLeaderboard,
  submitScore     as submitScoreService,
  isUsernameTaken,
} from '../services/leaderboardService'

export const useLeaderboard = () => {
  const [entries,      setEntries]      = useState([])
  const [isLoading,    setIsLoading]    = useState(false)
  const [isSubmitted,  setIsSubmitted]  = useState(false)
  const [error,        setError]        = useState(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true)
      const data = await fetchLeaderboard()
      setEntries(data)
    } catch (err) {
      setError('Failed to load leaderboard.')
    } finally {
      setIsLoading(false)
    }
  }

  const submitScore = async (username, score) => {
    setIsLoading(true)
    setError(null)
    try {
      await submitScoreService(username, score)
      setIsSubmitted(true)
      await loadLeaderboard()
    } catch (err) {
      if (err.message === 'USERNAME_TAKEN') {
        setError('Username already taken. Try a different name.')
      } else {
        setError('Failed to submit score. Try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const checkUsername = async (username) => {
    if (username.trim().length < 2) return false
    try {
      const taken = await isUsernameTaken(username)
      return !taken
    } catch {
      return false
    }
  }

  return {
    entries,
    isLoading,
    isSubmitted,
    error,
    submitScore,
    checkUsername,
    loadLeaderboard,
  }
}