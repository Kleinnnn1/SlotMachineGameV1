import { useState } from 'react'
import PageWrapper from './components/layout/PageWrapper'
import Header from './components/layout/Header'
import SlotMachine from './components/slot/SlotMachine'
import Leaderboard from './components/leaderboard/Leaderboard'
import Modal from './components/ui/Modal'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import { useSlotMachine } from './hooks/useSlotMachine'
import { useLeaderboard } from './hooks/useLeaderboard'
import { getScoreLabel } from './utils/scoreCalculator'

const App = () => {
  const [isDark, setIsDark] = useState(true)
  const [username, setUsername] = useState('')
  const [entered, setEntered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const slot = useSlotMachine()
  const leaderboard = useLeaderboard()

  const scoreInfo = getScoreLabel(slot.totalScore)

  const handleEnter = () => {
    if (username.trim().length < 2) return
    setEntered(true)
  }

  const handleSubmit = async () => {
    await leaderboard.submitScore(username, slot.totalScore)
    setShowModal(false)
  }

  const handlePlayAgain = () => {
    slot.reset()
    setUsername('')
    setEntered(false)
    leaderboard.isSubmitted && window.location.reload()
  }

  const toggleTheme = () => {
    setIsDark(prev => {
      document.documentElement.classList.toggle('dark', !prev)
      return !prev
    })
  }

  // Apply dark class on mount
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark)
  }

  return (
    <PageWrapper>
      <Header onToggleTheme={toggleTheme} isDark={isDark} />

      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6">

        {/* Left: Game */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">

          {!entered ? (
            /* Username Entry */
            <div className="pixel-panel p-6 w-full flex flex-col gap-4">
              <p className="font-pixel text-xs text-arcade-gold text-center">ENTER USERNAME</p>
              <Input
                value={username}
                onChange={setUsername}
                placeholder="YOUR NAME..."
                maxLength={16}
              />
              <Button onClick={handleEnter} disabled={username.trim().length < 2}>
                START GAME
              </Button>
            </div>
          ) : (
            /* Slot Machine */
            <>
              <p className="font-pixel text-xs text-arcade-subtle">
                👤 {username}
              </p>
              <SlotMachine
                reels={slot.reels}
                spinsLeft={slot.spinsLeft}
                totalScore={slot.totalScore}
                lastResult={slot.lastResult}
                isSpinning={slot.isSpinning}
                onSpin={slot.spin}
              />
              {slot.isGameOver && (
                <div className="pixel-panel p-4 w-full text-center flex flex-col gap-3 animate-bounce-in">
                  <p className={`font-pixel text-sm ${scoreInfo.color}`}>
                    {scoreInfo.label}
                  </p>
                  <Button
                    variant="blue"
                    onClick={() => setShowModal(true)}
                    disabled={leaderboard.isSubmitted}
                  >
                    {leaderboard.isSubmitted ? '✅ SUBMITTED' : '📤 SUBMIT SCORE'}
                  </Button>
                  <Button variant="ghost" onClick={handlePlayAgain}>
                    🔄 PLAY AGAIN
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Leaderboard */}
        <div className="w-full max-w-sm">
          <Leaderboard entries={leaderboard.entries} />
        </div>

      </main>

      {/* Game Over Modal */}
      <Modal isOpen={showModal}>
        <div className="flex flex-col gap-4 text-center">
          <p className="font-pixel text-arcade-gold text-sm">GAME OVER</p>
          <p className="font-pixel text-xs text-arcade-subtle">
            Final Score: {slot.totalScore}
          </p>
          <Button onClick={handleSubmit} disabled={leaderboard.isLoading}>
            {leaderboard.isLoading ? 'SAVING...' : 'CONFIRM SUBMIT'}
          </Button>
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            CANCEL
          </Button>
        </div>
      </Modal>

    </PageWrapper>
  )
}

export default App