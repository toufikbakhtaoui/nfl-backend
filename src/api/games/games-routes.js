const gameController = require('./games-controller')

const routes = [
    {
        method: 'GET',
        url: '/api/games/season/:season/week/:week',
        handler: gameController.getGames,
    },
    {
        method: 'GET',
        url: '/api/games/season/:season/week/:week/scores',
        handler: gameController.getScores,
    },
]

module.exports = routes
