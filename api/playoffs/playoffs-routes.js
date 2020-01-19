const playoffsController = require('./playoffs-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/wildcard',
        handler: playoffsController.getWildCard,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/wildcard/scores',
        handler: playoffsController.getWildCardScores,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/divisional',
        handler: playoffsController.getDivisional,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/divisional/scores',
        handler: playoffsController.getDivisionalScores,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/championship',
        handler: playoffsController.getChampionship,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/championship/scores',
        handler: playoffsController.getChampionshipScores,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/superbowl',
        handler: playoffsController.getSuperBowl,
    },
    {
        method: 'GET',
        url: '/api/playoffs/season/:season/superbowl/scores',
        handler: playoffsController.getSuperBowlScores,
    }
]

module.exports = routes
