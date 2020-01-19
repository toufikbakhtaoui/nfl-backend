const seasonController = require('./seasons-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/seasons',
        handler: seasonController.getSeasons,
    },
    {
        method: 'GET',
        url: '/api/seasons/:id',
        handler: seasonController.getOneSeason,
    }
]

module.exports = routes
