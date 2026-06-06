import { SYMBOLS, SCORE_MULTIPLIERS } from '../constants/slotConfig'

export const getRandomSymbol = () =>
  SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]

export const spinReels = (reelCount) =>
  Array.from({ length: reelCount }, getRandomSymbol)

export const evaluateSpin = (reels) => {
  const allMatch    = reels.every(r => r.id === reels[0].id)
  const anyDouble   = reels.some(
    (r, i) => reels.some((r2, j) => i !== j && r.id === r2.id)
  )

  if (allMatch) {
    return {
      type:       'triple',
      points:     reels[0].points * SCORE_MULTIPLIERS.triple,
      multiplier: SCORE_MULTIPLIERS.triple,
      isWin:      true,
    }
  }

  if (anyDouble) {
    const matched = reels.find(
      (r, i) => reels.some((r2, j) => i !== j && r.id === r2.id)
    )
    return {
      type:       'double',
      points:     matched.points * SCORE_MULTIPLIERS.double,
      multiplier: SCORE_MULTIPLIERS.double,
      isWin:      true,
    }
  }

  return {
    type:       'none',
    points:     0,
    multiplier: 0,
    isWin:      false,
  }
}