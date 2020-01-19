const teamController = require('./teams-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/teams',
        handler: teamController.getTeams,
    },
]

module.exports = routes
