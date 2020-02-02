const teamModel = require('../api/teams/team')

const isDraw = (firstScore, secondScore) => {
    return firstScore === secondScore ? 1 : 0
}

const isWin = (firstScore, secondScore) => {
    return firstScore > secondScore ? 1 : 0
}

const updateOneStanding = async (season, team, w, l, d, s, c) => {
    await teamModel.findOneAndUpdate(
        { 'standings.rank': team, 'standings.season': season },
        {
            $inc: {
                'standings.$.win': w,
                'standings.$.scored': s,
                'standings.$.lost': l,
                'standings.$.draw': d,
                'standings.$.scored': s,
                'standings.$.conceded': c,
            },
        }
    )
}

exports.updateStandings = (games, season) => {
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