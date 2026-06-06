import SoundToggle from '../ui/SoundToggle'

const Header = ({ onToggleTheme, isDark, isMuted, onToggleMute }) => (
    <header className="flex items-center justify-between px-6 py-4 border-b-4 border-arcade-border">
        <div className="font-pixel text-arcade-gold text-sm">
            🎰 SLOT MACHINE
        </div>
        <div className="flex items-center gap-2">
            <SoundToggle isMuted={isMuted} onToggle={onToggleMute} />
            <button
                onClick={onToggleTheme}
                className="pixel-btn-ghost text-xs px-3 py-2"
            >
                {isDark ? '☀️ LIGHT' : '🌙 DARK'}
            </button>
        </div>
    </header>
)

export default Header