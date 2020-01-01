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
    {
        method: 'GET',
        url: '/api/games',
        handler: gameController.getAllGames,
    },
    {
        method: 'GET',
        url: '/api/games/:id',
        handler: gameController.getOneGame,
    },
    {
        method: 'POST',
        url: '/api/games',
        handler: gameController.addGame,
    },
    {
        method: 'PUT',
        url: '/api/games/:id',
        handler: gameController.updateGame,
    },
    {
        method: 'DELETE',
        url: '/api/games/:id',
        handler: gameController.deleteGame,
    },
    {
        method: 'DELETE',
        url: '/api/games',
        handler: gameController.deleteAllGame,
    },
]

module.exports = routes
