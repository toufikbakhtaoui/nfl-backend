const standingModel = require('../api/standings/standing')

const getScore = () => {
    const min = 3
    const max = 45
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const isDraw = (firstScore, secondScore) => {
    return firstScore === secondScore ? 1 : 0
}

const isWin = (firstScore, secondScore) => {
    return firstScore > secondScore ? 1 : 0
}

const updateOneStanding = async (season, team, w, l, d, s, c) => {
    await standingModel.findOneAndUpdate(
        { team: team, season: season },
        {
            $inc: {
                win: w,
                scored: s,
                lost: l,
                draw: d,
                scored: s,
                conceded: c,
            },
        }
    )
}
const updateStandings = (games, season) => {
    games.forEach(game => {
        updateOneStanding(
            season,
            game.homeTeam,
            isWin(game.homeTeamScore, game.awayTeamScore),
            isWin(game.awayTeamScore, game.homeTeamScore),
            isDraw(game.homeTeamScore, game.awayTeamScore),
            game.homeTeamScore,
            game.awayTeamScore
        )
        updateOneStanding(
            season,
            game.awayTeam,
            isWin(game.awayTeamScore, game.homeTeamScore),
            isWin(game.homeTeamScore, game.awayTeamScore),
            isDraw(game.homeTeamScore, game.awayTeamScore),
            game.awayTeamScore,
            game.homeTeamScore
        )
    })
}

module.exports = { getScore, updateStandings }
