const rankingController = require('./rankings-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/rankings/season/:season',
        handler: rankingController.getRankings,
    },
    {
        method: 'GET',
        url: '/api/rankings/season/:season/teams',
        handler: rankingController.getRankedTeams,
    },
]

module.exports = routes
