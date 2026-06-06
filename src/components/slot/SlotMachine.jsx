import SlotReel from './SlotReel'
import SpinButton from './SpinButton'
import { formatScore } from '../../utils/scoreCalculator'

const SlotMachine = ({ reels, spinsLeft, totalScore, lastResult, isSpinning, onSpin }) => {
    const isWin = lastResult?.isWin

    return (
        <div className="pixel-panel p-6 flex flex-col items-center gap-6 w-full max-w-sm mx-auto">

            {/* Casino Sign */}
            <div className="casino-sign text-sm">🎰 CASINO 🎰</div>

            {/* Score */}
            <div className="score-badge text-xs">
                SCORE: {formatScore(totalScore)}
            </div>

            {/* Reels */}
            <div className="flex gap-2">
                {reels.map((symbol, i) => (
                    <SlotReel
                        key={i}
                        symbol={symbol}
                        isSpinning={isSpinning}
                        isWin={isWin}
                    />
                ))}
            </div>

            {/* Result Message */}
            <div className="font-pixel text-xs h-6 text-center">
                {isWin && lastResult.type === 'triple' && (
                    <span className="text-arcade-gold animate-flash-win">
                        ⭐ JACKPOT! +{lastResult.points}
                    </span>
                )}
                {isWin && lastResult.type === 'double' && (
                    <span className="text-arcade-green">
                        ✨ MATCH! +{lastResult.points}
                    </span>
                )}
                {lastResult && !isWin && (
                    <span className="text-arcade-subtle">No match...</span>
                )}
            </div>

            {/* Spins Left */}
            <div className="font-pixel text-xs text-arcade-subtle">
                SPINS LEFT: {spinsLeft}
            </div>

            {/* Spin Button */}
            <SpinButton
                onClick={onSpin}
                disabled={isSpinning || spinsLeft === 0}
                isSpinning={isSpinning}
            />
        </div>
    )
}

export default SlotMachine