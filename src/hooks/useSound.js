import {
  playSpinSound,
  playReelLand,
  playDoubleWin,
  playJackpot,
  playNoMatch,
  playClick,
  playGameOver,
  resumeAudio,
} from '../utils/soundEngine'

export const useSound = () => {
  const trigger = (fn) => {
    resumeAudio()
    fn()
  }

  return {
    spinSound:    ()      => trigger(playSpinSound),
    reelLand:     (index) => trigger(() => playReelLand(index)),
    doubleWin:    ()      => trigger(playDoubleWin),
    jackpot:      ()      => trigger(playJackpot),
    noMatch:      ()      => trigger(playNoMatch),
    click:        ()      => trigger(playClick),
    gameOver:     ()      => trigger(playGameOver),
  }
}