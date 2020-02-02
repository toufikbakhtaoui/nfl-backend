const wildCardScheduler = require('./wild-card-scheduler')

exports.playoffsScheduler = (week, season) => {
    switch (week) {
        case 17:
            wildCardScheduler.generateWildCard(season)
            break;
    
        default:
            break;
    }
}
