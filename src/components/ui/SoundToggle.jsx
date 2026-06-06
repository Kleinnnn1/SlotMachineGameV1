const SoundToggle = ({ isMuted, onToggle }) => (
    <button
        onClick={onToggle}
        className="pixel-btn-ghost text-xs px-3 py-2"
        title={isMuted ? 'Unmute' : 'Mute'}
    >
        {isMuted ? '🔇 MUTE' : '🔊 SOUND'}
    </button>
)

export default SoundToggle