const gameController = require('./games-controller')

const schema = {
    description: 'Get a car from the database using the name',
    summary: 'Get a car from the database',
    params: { season: { type: 'string' }, week: { type: 'string' } },
}

const routes = [
    {
        method: 'GET',
        url: '/api/games/season/:season/week/:week',
        handler: gameController.getGames,
        schema: schema
    },
    {
        method: 'GET',
        url: '/api/games/season/:season/week/:week/scores',
        handler: gameController.getScores,
        schema: schema,
    },
]

module.exports = routes
