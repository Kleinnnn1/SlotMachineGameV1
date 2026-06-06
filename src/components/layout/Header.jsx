import SoundToggle from '../ui/SoundToggle'

const Header = ({ onToggleTheme, isDark, isMuted, onToggleMute }) => (
    <header className="flex flex-col sm:flex-row items-center justify-between 
                     px-4 py-3 border-b-4 border-arcade-border gap-2">

        <div className="font-pixel text-arcade-gold text-xs sm:text-sm">
            🎰 SLOT MACHINE
        </div>

        <div className="flex items-center gap-2">
            <SoundToggle isMuted={isMuted} onToggle={onToggleMute} />
            <button
                onClick={onToggleTheme}
                className="pixel-btn-ghost text-xs px-3 py-2"
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </div>
    </header>
)

export default Header