// ─── Web Audio API Sound Engine ──────────────────────────────────────────────
// No libraries needed — all sounds generated programmatically

let audioCtx = null

const getCtx = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

// ─── Core tone player ────────────────────────────────────────────────────────
const playTone = (frequency, type, duration, volume = 0.3, startTime = 0) => {
  const ctx      = getCtx()
  const osc      = ctx.createOscillator()
  const gain     = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.type      = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)

  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration)

  osc.start(ctx.currentTime + startTime)
  osc.stop(ctx.currentTime  + startTime + duration)
}

// ─── Sounds ──────────────────────────────────────────────────────────────────

// Spin — fast ticking
export const playSpinSound = () => {
  [0, 0.05, 0.1, 0.15, 0.2, 0.25].forEach(t => {
    playTone(200 + Math.random() * 100, 'square', 0.04, 0.15, t)
  })
}

// Reel land — satisfying thud per reel
export const playReelLand = (reelIndex = 0) => {
  const delay = reelIndex * 0.15
  playTone(120 - reelIndex * 10, 'sine', 0.1, 0.4, delay)
  playTone(80,                   'sine', 0.08, 0.2, delay + 0.05)
}

// Double match — upbeat two-tone
export const playDoubleWin = () => {
  playTone(523, 'square', 0.1, 0.2, 0)     // C5
  playTone(659, 'square', 0.1, 0.2, 0.12)  // E5
  playTone(784, 'square', 0.15, 0.3, 0.24) // G5
}

// Jackpot — full fanfare
export const playJackpot = () => {
  const notes = [
    { f: 523, t: 0    }, // C5
    { f: 659, t: 0.1  }, // E5
    { f: 784, t: 0.2  }, // G5
    { f: 1047,t: 0.3  }, // C6
    { f: 1319,t: 0.45 }, // E6
    { f: 1568,t: 0.6  }, // G6
  ]
  notes.forEach(({ f, t }) => playTone(f, 'square', 0.18, 0.25, t))

  // Harmony layer
  const harmony = [
    { f: 392, t: 0   }, // G4
    { f: 494, t: 0.1 }, // B4
    { f: 587, t: 0.2 }, // D5
  ]
  harmony.forEach(({ f, t }) => playTone(f, 'triangle', 0.2, 0.15, t))
}

// No match — low buzz
export const playNoMatch = () => {
  playTone(150, 'sawtooth', 0.08, 0.15, 0)
  playTone(120, 'sawtooth', 0.06, 0.1,  0.1)
}

// Button click
export const playClick = () => {
  playTone(440, 'square', 0.03, 0.1, 0)
}

// Game over
export const playGameOver = () => {
  const notes = [
    { f: 392, t: 0    },
    { f: 349, t: 0.15 },
    { f: 330, t: 0.3  },
    { f: 294, t: 0.5  },
  ]
  notes.forEach(({ f, t }) => playTone(f, 'sawtooth', 0.2, 0.3, t))
}

// ─── Resume context (required by browsers after user gesture) ────────────────
export const resumeAudio = () => {
  if (audioCtx?.state === 'suspended') audioCtx.resume()
}