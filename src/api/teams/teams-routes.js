const teamController = require('./teams-controller')

const schema = {
    description: 'Get a car from the database using the name',
    summary: 'Get a car from the database',
    params: { season: { type: 'string' } },
}
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
        schema: schema
    },
]

module.exports = routes
