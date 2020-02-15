const gameModel = require('../api/games/game')
const teamModel = require('../api/teams/team')
const commonScheduler = require('./common-scheduler')

const divisionalRoundWeek = 18
const championshipWeek = 19

const getDivisionalRoundWinners = async season => {
    const divisionalRoundGames = await gameModel.find({
        season: season,
        week: divisionalRoundWeek,
    })
    const winners = []
    const winnersIds = commonScheduler.getWinners(divisionalRoundGames)
    for (const winnerId of winnersIds) {
        const team = await teamModel.findOne({
            team: winnerId,
            'standings.season': season,
        })
        winners.push(team)
    }
    return winners
}

const generateMatchups = async (divisionalRoundWinners, season, conference) => {
    const winners = divisionalRoundWinners.filter(
        team => team.conference === conference
    )
    winners.sort(function(firstTeam, secondTeam) {
        return (
            secondTeam.standings[0].win - firstTeam.standings[0].win ||
            secondTeam.standings[0].draw - firstTeam.standings[0].draw ||
            secondTeam.standings[0].scored - firstTeam.standings[0].scored ||
            firstTeam.standings[0].conceded - secondTeam.standings[0].conceded
        )
    })
    game = new gameModel({
        season: season,
        week: championshipWeek,
        homeTeam: winners[0].standings[0].rank,
        homeTeamIdentifier: winners[0].team,
        homeTeamName: winners[0].name,
        awayTeam: winners[1].standings[0].rank,
        awayTeamIdentifier: winners[1].team,
        awayTeamName: winners[1].name,
    })
    await game.save()
}

exports.generateChampionship = async season => {
    const divisionalRoundWinners = await getDivisionalRoundWinners(season)
    await generateMatchups(divisionalRoundWinners, season, 'AFC')
    await generateMatchups(divisionalRoundWinners, season, 'NFC')
}
