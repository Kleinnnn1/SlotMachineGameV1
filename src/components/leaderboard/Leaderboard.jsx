import LeaderboardRow from './LeaderboardRow'

const Leaderboard = ({ entries }) => (
    <div className="pixel-panel w-full max-w-sm mx-auto">
        <div className="casino-sign text-center text-xs mb-0">🏆 TOP 10</div>
        <div className="p-2">
            {entries.length === 0 ? (
                <p className="font-pixel text-xs text-arcade-subtle text-center py-6">
                    No scores yet. Be first!
                </p>
            ) : (
                entries.map((entry, i) => (
                    <LeaderboardRow key={i} entry={entry} index={i} />
                ))
            )}
        </div>
    </div>
)

export default Leaderboard