const standingController = require('./standings-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/standings/season/:season',
        handler: standingController.getStandings,
    }
]

module.exports = routes
