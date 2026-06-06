/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        arcade: {
          bg:      'var(--arcade-bg)',
          panel:   'var(--arcade-panel)',
          border:  'var(--arcade-border)',
          text:    'var(--arcade-text)',
          subtle:  'var(--arcade-subtle)',
          gold:    '#f59e0b',
          red:     '#ef4444',
          blue:    '#3b82f6',
          green:   '#22c55e',
          purple:  '#a855f7',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        pixel:     '4px 4px 0px 0px rgba(0,0,0,0.5)',
        'pixel-lg':'6px 6px 0px 0px rgba(0,0,0,0.5)',
        glow:      '0 0 12px rgba(245,158,11,0.7)',
        'glow-red':'0 0 12px rgba(239,68,68,0.7)',
      },
      animation: {
        'spin-reel':  'spinReel 0.5s ease-out',
        'flash-win':  'flashWin 0.4s ease-in-out infinite alternate',
        'bounce-in':  'bounceIn 0.4s ease-out',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}