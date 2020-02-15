const seasonController = require('./seasons-controller')

const schema = {
    description: 'Get a car from the database using the name',
    summary: 'Get a car from the database',
    params: { id: { type: 'string' } },
}

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
        schema: schema
    },
]

module.exports = routes
