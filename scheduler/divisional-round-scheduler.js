const gameModel = require('../api/games/game')

exports.prepareDivisional = async (season, champions) => {
    const divisionalWeek = 18
    const firstSeed = champions[0]
    const secondSeed = champions[1]

    let game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: firstSeed.ranking,
        homeTeamIdentifier: firstSeed.team,
        homeTeamName: firstSeed.name,
    })

    await game.save()

    game = gameModel({
        season: season,
        week: divisionalWeek,
        homeTeam: secondSeed.ranking,
        homeTeamIdentifier: secondSeed.team,
        homeTeamName: secondSeed.name,
    })
    await game.save()
}