# 🎰 Slot Machine Game

A retro pixel-art slot machine game with a real-time leaderboard.

## Features

- **Pixel Art Design**: Retro arcade aesthetic with `Press Start 2P` font, pixel borders, and gold/red accents
- **Slot Machine Gameplay**: 3-reel slot machine with staggered spin animations and win detection
- **Scoring System**: Points based on symbol matches — double (2x) and triple jackpot (5x) multipliers
- **10 Spins Per Game**: Each session starts with 10 spins; final score submitted at the end
- **Real-Time Leaderboard**: Top 10 scores fetched live from Firebase Firestore, sorted highest to lowest
- **Username Uniqueness**: Debounced live check ensures no duplicate usernames on the leaderboard
- **Sound Effects**: Fully programmatic audio via Web Audio API — spin, land, win, jackpot, and game over sounds
- **Confetti Effects**: Burst animations on wins using `canvas-confetti`, targeted to the reel position
- **Light / Dark Theme**: Toggle between dark navy and light mode with CSS variables and Tailwind
- **Sound Toggle**: Mute/unmute button in the header for full audio control
- **Firestore Security Rules**: Server-side validation prevents score tampering and fake submissions

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Database**: Firebase Firestore
- **Confetti**: canvas-confetti
- **Audio**: Web Audio API (no library)
- **Fonts**: Press Start 2P via Google Fonts

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd slot-machine-game
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Set up Firebase Firestore in [console.firebase.google.com](https://console.firebase.google.com) and apply the security rules from `firestore.rules`.

## Development

To run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` with hot module reload (HMR) enabled.

## Build

To build for production:

```bash
npm run build
```

The optimized build output will be in the `dist/` directory.

## Preview

To preview the production build locally:

```bash
npm run preview
```

## Game Flow

1. User visits the site and enters a unique username
2. Live check confirms username availability before starting
3. User starts with 10 spins
4. Each spin generates points based on the result:
   - **Triple match** → symbol points × 5 (Jackpot!)
   - **Double match** → symbol points × 2
   - **No match** → 0 points
5. After all 10 spins are used, final score is shown
6. User submits score to the leaderboard
7. Leaderboard displays top 10 scores, sorted highest to lowest

## Symbol Points

| Symbol | Points |
|--------|--------|
| 7️⃣ Seven | 10 |
| 💎 Diamond | 80 |
| 🔔 Bell | 60 |
| 🍒 Cherry | 40 |
| 🍀 Clover | 30 |
| 🍋 Lemon | 20 |
| ❤️ Heart | 10 |
| 🪙 Coin | 5 |

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── PageWrapper.jsx
│   ├── slot/
│   │   ├── SlotMachine.jsx
│   │   ├── SlotReel.jsx
│   │   ├── SpinButton.jsx
│   │   └── WinEffect.jsx
│   ├── leaderboard/
│   │   ├── Leaderboard.jsx
│   │   └── LeaderboardRow.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       └── SoundToggle.jsx
├── hooks/
│   ├── useSlotMachine.js
│   ├── useLeaderboard.js
│   └── useSound.js
├── services/
│   ├── firebase.js
│   └── leaderboardService.js
├── utils/
│   ├── slotLogic.js
│   ├── scoreCalculator.js
│   └── soundEngine.js
├── constants/
│   └── slotConfig.js
├── styles/
│   ├── animations.css
│   └── components.css
├── App.jsx
├── main.jsx
└── index.css
```

## Security

- `.env` file keeps Firebase credentials off GitHub
- Firestore security rules validate all score submissions server-side
- Score range capped at maximum possible value (50,000)
- Username length enforced at 2–16 characters
- No update or delete operations permitted on leaderboard entries

## Author

**Kenneth Jhun N. Balino**

Full Stack Developer

Built with React, Vite, Tailwind CSS, and Firebase