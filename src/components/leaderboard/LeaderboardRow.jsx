import { getRank, formatScore } from '../../utils/scoreCalculator'

const LeaderboardRow = ({ entry, index }) => (
    <div className={`leaderboard-row rank-${index + 1}`}>

        <span className="w-8 shrink-0 text-center">
            {getRank(index)}
        </span>

        <span className="flex-1 truncate px-1 min-w-0">
            {entry.username}
        </span>

        <span className="score-badge text-xs shrink-0">
            {formatScore(entry.score)}
        </span>
    </div>
)

export default LeaderboardRow