const SlotReel = ({ symbol, isSpinning, isWin }) => (
    <div className={`reel-cell ${isWin ? 'win' : ''} ${isSpinning ? 'animate-spin-reel' : ''}`}>
        <span role="img" aria-label={symbol?.label}>
            {symbol?.emoji ?? '❓'}
        </span>
    </div>
)

export default SlotReel