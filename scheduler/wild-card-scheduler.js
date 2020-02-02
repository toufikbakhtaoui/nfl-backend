const commons = require('../cluster/commons')
const gameModel = require('../api/games/game')

const prepareDivisional = async (season, firstSeed, secondSeed) => {
    const divisionalWeek = 18
    let game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: firstSeed.ranking,
        homeTeamIdentifier: firstSeed.team,
    })

    await game.save()

    game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: secondSeed.ranking,
        homeTeamIdentifier: secondSeed.team,
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
    })
    games.push(game)

    game = gameModel({
        season: season,
        week: wildCardWeek,
        homeTeam: champions[3].ranking,
        awayTeam: contenders[0].ranking,
        homeTeamIdentifier: champions[3].team,
        awayTeamIdentifier: contenders[0].team,
    })
    games.push(game)
    prepareDivisional(season, champions[0], champions[1])
    return games
}

exports.generateWildCard = async season => {
    const standings = await commons.getStandings(season)
    const afcMatchup = getWildCardMatchups(season, standings, 'AFC')
    const nfcMatchup = getWildCardMatchups(season, standings, 'NFC')
    const nflMatchups = []
    Array.prototype.push.apply(nflMatchups, afcMatchup)
    Array.prototype.push.apply(nflMatchups, nfcMatchup)
    await gameModel.insertMany(nflMatchups)
}