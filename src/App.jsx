import { useState, useEffect } from 'react'
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
  const [usernameStatus, setUsernameStatus] = useState('idle')
  // idle | checking | available | taken

  const slot = useSlotMachine()
  const leaderboard = useLeaderboard()
  const scoreInfo = getScoreLabel(slot.totalScore)

  // ─── Theme on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // ─── Debounced username check ──────────────────────────────────────────────
  useEffect(() => {
    if (username.trim().length < 2) {
      setUsernameStatus('idle')
      return
    }

    setUsernameStatus('checking')
    const timer = setTimeout(async () => {
      const available = await leaderboard.checkUsername(username)
      setUsernameStatus(available ? 'available' : 'taken')
    }, 600)

    return () => clearTimeout(timer)
  }, [username])

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleEnter = () => {
    if (usernameStatus !== 'available') return
    setEntered(true)
  }

  const handleSubmit = async () => {
    await leaderboard.submitScore(username, slot.totalScore)
    if (!leaderboard.error) setShowModal(false)
  }

  const handlePlayAgain = () => {
    slot.reset()
    setUsername('')
    setEntered(false)
    setUsernameStatus('idle')
    leaderboard.isSubmitted && window.location.reload()
  }

  const toggleTheme = () => setIsDark(prev => !prev)

  // ─── Username status helpers ───────────────────────────────────────────────
  const statusConfig = {
    idle: { msg: '', color: '' },
    checking: { msg: '⏳ Checking...', color: 'text-arcade-subtle' },
    available: { msg: '✅ Username available!', color: 'text-arcade-green' },
    taken: { msg: '❌ Username already taken', color: 'text-arcade-red' },
  }

  const { msg, color } = statusConfig[usernameStatus]

  return (
    <PageWrapper>
      <Header onToggleTheme={toggleTheme} isDark={isDark} />

      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6">

        {/* ─── Left: Game ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">

          {!entered ? (
            /* Username Entry */
            <div className="pixel-panel p-6 w-full flex flex-col gap-4">
              <p className="font-pixel text-xs text-arcade-gold text-center">
                ENTER USERNAME
              </p>

              <Input
                value={username}
                onChange={setUsername}
                placeholder="YOUR NAME..."
                maxLength={16}
              />

              {/* Status message */}
              {msg && (
                <p className={`font-pixel text-xs ${color}`}>{msg}</p>
              )}

              <Button
                onClick={handleEnter}
                disabled={usernameStatus !== 'available'}
              >
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

              {/* Game Over Panel */}
              {slot.isGameOver && (
                <div className="pixel-panel p-4 w-full text-center flex flex-col gap-3 animate-bounce-in">
                  <p className={`font-pixel text-sm ${scoreInfo.color}`}>
                    {scoreInfo.label}
                  </p>

                  {leaderboard.error && (
                    <p className="font-pixel text-xs text-arcade-red">
                      {leaderboard.error}
                    </p>
                  )}

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

        {/* ─── Right: Leaderboard ─────────────────────────────────────────── */}
        <div className="w-full max-w-sm">
          <Leaderboard
            entries={leaderboard.entries}
            isLoading={leaderboard.isLoading}
          />
        </div>

      </main>

      {/* ─── Submit Modal ────────────────────────────────────────────────── */}
      <Modal isOpen={showModal}>
        <div className="flex flex-col gap-4 text-center">
          <p className="font-pixel text-arcade-gold text-sm">GAME OVER</p>

          <p className="font-pixel text-xs text-arcade-subtle">
            👤 {username}
          </p>

          <p className="font-pixel text-xs text-arcade-subtle">
            FINAL SCORE: <span className="text-arcade-gold">{slot.totalScore}</span>
          </p>

          {leaderboard.error && (
            <p className="font-pixel text-xs text-arcade-red">
              {leaderboard.error}
            </p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={leaderboard.isLoading}
          >
            {leaderboard.isLoading ? '⏳ SAVING...' : '✅ CONFIRM SUBMIT'}
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