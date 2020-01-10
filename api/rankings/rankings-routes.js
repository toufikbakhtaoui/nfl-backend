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
    {
        method: 'GET',
        url: '/api/rankings/:id',
        handler: rankingController.getOneRanking,
    },
    {
        method: 'POST',
        url: '/api/rankings',
        handler: rankingController.addRanking,
    },
    {
        method: 'PUT',
        url: '/api/rankings/:id',
        handler: rankingController.updateRanking,
    },
    {
        method: 'DELETE',
        url: '/api/rankings/:id',
        handler: rankingController.deleteRanking,
    },
    {
        method: 'DELETE',
        url: '/api/rankings',
        handler: rankingController.deleteAllRanking,
    },
]

module.exports = routes
