import Button from '../ui/Button'

const SpinButton = ({ onClick, disabled, isSpinning }) => (
    <Button
        variant="red"
        onClick={onClick}
        disabled={disabled}
        className="w-full text-sm py-4 animate-pulse-glow"
    >
        {isSpinning ? '⏳ Spinning...' : '🎰 SPIN'}
    </Button>
)

export default SpinButton