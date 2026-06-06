import { useState, useCallback }  from 'react'
import { spinReels, evaluateSpin } from '../utils/slotLogic'
import { REEL_COUNT, TOTAL_SPINS, SPIN_DURATION } from '../constants/slotConfig'
import { useSound } from './useSound'

const initialReels = () => spinReels(REEL_COUNT)

export const useSlotMachine = () => {
  const [reels,       setReels]       = useState(initialReels)
  const [spinsLeft,   setSpinsLeft]   = useState(TOTAL_SPINS)
  const [totalScore,  setTotalScore]  = useState(0)
  const [lastResult,  setLastResult]  = useState(null)
  const [isSpinning,  setIsSpinning]  = useState(false)
  const [isGameOver,  setIsGameOver]  = useState(false)
  const [spinHistory, setSpinHistory] = useState([])

  const sound = useSound()

  const spin = useCallback(() => {
    if (isSpinning || spinsLeft <= 0) return

    setIsSpinning(true)
    sound.spinSound()

    setTimeout(() => sound.reelLand(0), 0)
    setTimeout(() => sound.reelLand(1), 150)
    setTimeout(() => sound.reelLand(2), 300)

    setTimeout(() => {
      const newReels  = spinReels(REEL_COUNT)
      const result    = evaluateSpin(newReels)
      const remaining = spinsLeft - 1

      setReels(newReels)
      setLastResult(result)
      setTotalScore(prev => prev + result.points)
      setSpinsLeft(remaining)
      setSpinHistory(prev => [...prev, { reels: newReels, result }])
      setIsSpinning(false)

      if (result.type === 'triple') sound.jackpot()
      else if (result.type === 'double') sound.doubleWin()
      else sound.noMatch()

      if (remaining === 0) {
        setTimeout(() => sound.gameOver(), 800)
        setIsGameOver(true)
      }
    }, SPIN_DURATION)
  }, [isSpinning, spinsLeft])

  const reset = useCallback(() => {
    setReels(initialReels())
    setSpinsLeft(TOTAL_SPINS)
    setTotalScore(0)
    setLastResult(null)
    setIsSpinning(false)
    setIsGameOver(false)
    setSpinHistory([])
  }, [])

  return {
    reels, spinsLeft, totalScore,
    lastResult, isSpinning, isGameOver,
    spinHistory, spin, reset, sound,
  }
}