export const SYMBOLS = [
  { id: 'seven',   emoji: '7️⃣',  points: 100, label: 'Seven'   },
  { id: 'diamond', emoji: '💎',  points: 80,  label: 'Diamond' },
  { id: 'bell',    emoji: '🔔',  points: 60,  label: 'Bell'    },
  { id: 'cherry',  emoji: '🍒',  points: 40,  label: 'Cherry'  },
  { id: 'clover',  emoji: '🍀',  points: 30,  label: 'Clover'  },
  { id: 'lemon',   emoji: '🍋',  points: 20,  label: 'Lemon'   },
  { id: 'heart',   emoji: '❤️',  points: 10,  label: 'Heart'   },
  { id: 'coin',    emoji: '🪙',  points: 5,   label: 'Coin'    },
]

export const REEL_COUNT    = 3
export const TOTAL_SPINS   = 10
export const SPIN_DURATION = 1000  // ms

export const SCORE_MULTIPLIERS = {
  triple: 5,   // all 3 match  → points × 5
  double: 2,   // 2 match      → points × 2
  none:   0,   // no match     → 0 points
}