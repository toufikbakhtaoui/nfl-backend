const wildCardScheduler = require('./wild-card-scheduler')
const divisionalRoundScheduler = require('./divisional-round-scheduler')
const championshipScheduler = require('./championship-scheduler')
const SuperBowlScheduler = require('./superBowl-scheduler')

exports.generatePlayoffs = (week, season) => {
    switch (week) {
        case 16:
            wildCardScheduler.generateWildCard(season)
            break
        case 17:
            divisionalRoundScheduler.generateDivisionalRound(season)
            break
        case 18:
            championshipScheduler.generateChampionship(season)
            break
        case 19:
            SuperBowlScheduler.generateSuperBowl(season)
            break
        default:
            break
    }
}
