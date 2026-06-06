import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const fireJackpot = (origin) => {
    // Left cannon
    confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: origin.x - 0.1, y: origin.y },
        colors: ['#f59e0b', '#ef4444', '#3b82f6', '#22c55e', '#ffffff'],
        scalar: 1.2,
    })

    // Right cannon
    confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: origin.x + 0.1, y: origin.y },
        colors: ['#f59e0b', '#ef4444', '#3b82f6', '#22c55e', '#ffffff'],
        scalar: 1.2,
    })

    // Center burst
    confetti({
        particleCount: 60,
        spread: 80,
        origin,
        colors: ['#f59e0b', '#fbbf24'],
        scalar: 1.5,
        gravity: 0.8,
    })
}

const fireDouble = (origin) => {
    confetti({
        particleCount: 40,
        spread: 50,
        origin,
        colors: ['#22c55e', '#ffffff', '#f59e0b'],
        scalar: 1,
    })
}

const WinEffect = ({ result, getOrigin }) => {
    useEffect(() => {
        if (!result?.isWin) return

        const timer = setTimeout(() => {
            const origin = getOrigin()
            if (result.type === 'triple') fireJackpot(origin)
            if (result.type === 'double') fireDouble(origin)
        }, 350)

        return () => clearTimeout(timer)
    }, [result])

    return null
}

export default WinEffect