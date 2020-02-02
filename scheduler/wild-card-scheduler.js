const gameModel = require('../api/games/game')
const standingTracker = require('../scheduler/standing-tracker')

const prepareDivisional = async (season, firstSeed, secondSeed) => {
    const divisionalWeek = 18
    let game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: firstSeed.ranking,
        homeTeamIdentifier: firstSeed.team,
        homeTeamName: firstSeed.name
    })

    await game.save()

    game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: secondSeed.ranking,
        homeTeamIdentifier: secondSeed.team,
        homeTeamName: secondSeed.name
    })
    await game.save()
}

const getWildCardMatchups = (season, standings, conference) => {
    const wildCardWeek = 17
    const conf = standings.filter(item => item._id.conference === conference)
    const champions = []
    const contenders = []
    let games = []
    let game = null
    conf.forEach(div => champions.push(div.teams[0]))
    conf.forEach(div =>
        Array.prototype.push.apply(contenders, div.teams.slice(1))
    )
    champions.sort(function(a, b) {
        return (
            b.win - a.win ||
            b.draw - a.draw ||
            b.scored - a.scored ||
            a.conceded - b.conceded
        )
    })
    contenders.sort(function(a, b) {
        return (
            b.win - a.win ||
            b.draw - a.draw ||
            b.scored - a.scored ||
            a.conceded - b.conceded
        )
    })

    game = gameModel({
        season: season,
        week: wildCardWeek,
        homeTeam: champions[2].ranking,
        awayTeam: contenders[1].ranking,
        homeTeamIdentifier: champions[2].team,
        awayTeamIdentifier: contenders[1].team,
        homeTeamName: champions[2].name,
        awayTeamName: contenders[1].name,
    })
    games.push(game)

    game = gameModel({
        season: season,
        week: wildCardWeek,
        homeTeam: champions[3].ranking,
        awayTeam: contenders[0].ranking,
        homeTeamIdentifier: champions[3].team,
        awayTeamIdentifier: contenders[0].team,
        homeTeamName: champions[2].name,
        awayTeamName: contenders[1].name,
    })
    games.push(game)
    prepareDivisional(season, champions[0], champions[1])
    return games
}

exports.generateWildCard = async season => {
    const standings = await standingTracker.getStandings(season)
    const afcMatchup = getWildCardMatchups(season, standings, 'AFC')
    const nfcMatchup = getWildCardMatchups(season, standings, 'NFC')
    const nflMatchups = []
    Array.prototype.push.apply(nflMatchups, afcMatchup)
    Array.prototype.push.apply(nflMatchups, nfcMatchup)
    await gameModel.insertMany(nflMatchups)
}