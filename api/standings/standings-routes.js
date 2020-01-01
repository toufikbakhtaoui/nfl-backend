const standingController = require('./standings-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/standings/season/:season',
        handler: standingController.getStandings,
    },
    {
        method: 'GET',
        url: '/api/standings',
        handler: standingController.getAllStandings,
    },
    {
        method: 'GET',
        url: '/api/standings/:id',
        handler: standingController.getOneStanding,
    },
    {
        method: 'POST',
        url: '/api/standings',
        handler: standingController.addStanding,
    },
    {
        method: 'PUT',
        url: '/api/standings/:id',
        handler: standingController.updateStanding,
    },
    {
        method: 'DELETE',
        url: '/api/standings/:id',
        handler: standingController.deleteStanding,
    },
    {
        method: 'DELETE',
        url: '/api/standings',
        handler: standingController.deleteAllStanding,
    },
]

module.exports = routes
