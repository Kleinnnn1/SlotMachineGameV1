import { useState, useEffect } from 'react'
import { SYMBOLS } from '../../constants/slotConfig'

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]

const SlotReel = ({ symbol, isSpinning, isWin, delay = 0 }) => {
    const [displaySymbol, setDisplaySymbol] = useState(symbol)
    const [rolling, setRolling] = useState(false)

    useEffect(() => {
        if (!isSpinning) {
            // Land on final symbol after delay
            const landTimer = setTimeout(() => {
                setDisplaySymbol(symbol)
                setRolling(false)
            }, delay)
            return () => clearTimeout(landTimer)
        }

        // Start rolling
        setRolling(true)
        let interval
        const startTimer = setTimeout(() => {
            interval = setInterval(() => {
                setDisplaySymbol(getRandomSymbol())
            }, 80)
        }, delay)

        return () => {
            clearTimeout(startTimer)
            clearInterval(interval)
        }
    }, [isSpinning, symbol, delay])

    return (
        <div
            className={`
        reel-cell
        ${isWin && !rolling ? 'win' : ''}
        ${rolling ? 'reel-rolling' : 'reel-landed'}
      `}
        >
            <span
                role="img"
                aria-label={displaySymbol?.label}
                className={rolling ? 'reel-symbol-blur' : 'reel-symbol-clear'}
            >
                {displaySymbol?.emoji ?? '❓'}
            </span>
        </div>
    )
}

export default SlotReel