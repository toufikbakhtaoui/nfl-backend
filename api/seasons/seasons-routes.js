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
    },
    {
        method: 'POST',
        url: '/api/seasons',
        handler: seasonController.addSeason,
    },
    {
        method: 'PUT',
        url: '/api/seasons/:id',
        handler: seasonController.updateSeason,
    },
    {
        method: 'DELETE',
        url: '/api/seasons/:id',
        handler: seasonController.deleteSeason,
    },
    {
        method: 'DELETE',
        url: '/api/seasons',
        handler: seasonController.deleteAllSeason,
    },
]

module.exports = routes
