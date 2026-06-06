export const formatScore = (score) =>
  score.toString().padStart(8, '0')

export const getRank = (index) => {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return `#${index + 1}`
}

export const getScoreLabel = (score) => {
  if (score >= 5000) return { label: 'JACKPOT!',   color: 'text-arcade-gold'  }
  if (score >= 3000) return { label: 'HIGH SCORE', color: 'text-arcade-green' }
  if (score >= 1000) return { label: 'NICE RUN',   color: 'text-arcade-blue'  }
  return               { label: 'TRY AGAIN',        color: 'text-arcade-subtle'}
}