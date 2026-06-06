import { useSound } from '../../hooks/useSound'

const VARIANTS = {
    gold: 'pixel-btn-gold',
    red: 'pixel-btn-red',
    blue: 'pixel-btn-blue',
    ghost: 'pixel-btn-ghost',
}

const Button = ({ children, variant = 'gold', onClick, disabled, className = '' }) => {
    const sound = useSound()

    const handleClick = () => {
        if (disabled) return
        sound.click()
        onClick?.()
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`${VARIANTS[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button