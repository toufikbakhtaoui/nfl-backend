const wildCardScheduler = require('./wild-card-scheduler')

exports.playoffsScheduler = (week, season) => {
    switch (week) {
        case 17:
            wildCardScheduler.generateWildCard(season)
            break
        case 18:
            divisionalRoundScheduler.generateDivisionalRound(season)
        case 19:
            championshipScheduler.generateChampionship(season)
        case 19:
            SuperBowlScheduler.generateSuperBowl(season)
        default:
            break
    }
}
