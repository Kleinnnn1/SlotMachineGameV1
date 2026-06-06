import { getRank, formatScore } from '../../utils/scoreCalculator'

const LeaderboardRow = ({ entry, index }) => (
    <div className={`leaderboard-row rank-${index + 1}`}>
        <span className="w-8">{getRank(index)}</span>
        <span className="flex-1 truncate px-2">{entry.username}</span>
        <span className="score-badge text-xs">{formatScore(entry.score)}</span>
    </div>
)

export default LeaderboardRow