const VARIANTS = {
    gold: 'pixel-btn-gold',
    red: 'pixel-btn-red',
    blue: 'pixel-btn-blue',
    ghost: 'pixel-btn-ghost',
}

const Button = ({ children, variant = 'gold', onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${VARIANTS[variant]} ${className}`}
    >
        {children}
    </button>
)

export default Button