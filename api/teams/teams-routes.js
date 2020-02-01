const teamController = require('./teams-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/teams',
        handler: teamController.getTeams,
    },
    {
        method: 'GET',
        url: '/api/teams/rankings/:season',
        handler: teamController.getTeamsByRanks,
    },
]

module.exports = routes
