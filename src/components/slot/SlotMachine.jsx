import { useRef } from 'react'
import SlotReel from './SlotReel'
import SpinButton from './SpinButton'
import WinEffect from './WinEffect'
import { formatScore } from '../../utils/scoreCalculator'

const REEL_DELAYS = [0, 150, 300]

const SlotMachine = ({ reels, spinsLeft, totalScore, lastResult, isSpinning, onSpin }) => {
    const isWin = lastResult?.isWin
    const reelRef = useRef(null)

    const getReelOrigin = () => {
        if (!reelRef.current) return { x: 0.5, y: 0.5 }
        const rect = reelRef.current.getBoundingClientRect()
        return {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
        }
    }

    return (
        <div className="pixel-panel p-6 flex flex-col items-center gap-6 w-full max-w-sm mx-auto">

            <WinEffect
                result={!isSpinning ? lastResult : null}
                getOrigin={getReelOrigin}
            />

            <div className="casino-sign text-sm">🎰 CASINO 🎰</div>

            <div className="score-badge text-xs">
                SCORE: {formatScore(totalScore)}
            </div>

            <div
                ref={reelRef}
                className="flex gap-2 p-3 bg-black/30 border-4 border-arcade-border"
            >
                {reels.map((symbol, i) => (
                    <SlotReel
                        key={i}
                        symbol={symbol}
                        isSpinning={isSpinning}
                        isWin={isWin}
                        delay={REEL_DELAYS[i]}
                    />
                ))}
            </div>

            <div className="font-pixel text-xs h-8 flex items-center justify-center text-center">
                {isSpinning && (
                    <span className="text-arcade-subtle animate-pulse">
                        🎰 Spinning...
                    </span>
                )}
                {!isSpinning && isWin && lastResult.type === 'triple' && (
                    <span className="text-arcade-gold animate-flash-win">
                        ⭐ JACKPOT! +{lastResult.points}
                    </span>
                )}
                {!isSpinning && isWin && lastResult.type === 'double' && (
                    <span className="text-arcade-green animate-bounce-in">
                        ✨ MATCH! +{lastResult.points}
                    </span>
                )}
                {!isSpinning && lastResult && !isWin && (
                    <span className="text-arcade-subtle animate-bounce-in">
                        No match...
                    </span>
                )}
            </div>

            <div className="font-pixel text-xs text-arcade-subtle">
                SPINS LEFT: <span className="text-arcade-text">{spinsLeft}</span>
            </div>

            <SpinButton
                onClick={onSpin}
                disabled={isSpinning || spinsLeft === 0}
                isSpinning={isSpinning}
            />

        </div>
    )
}

export default SlotMachine