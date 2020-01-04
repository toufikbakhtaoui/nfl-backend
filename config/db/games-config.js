const gameModel = require('../../api/games/game')
const generate_season = require('../../cluster/regular-season-generator')
const initGames = async () => {
    const games = await gameModel.find()
    if (games && games.length === 256) {
        return
    }
    generate_season(1)
}

module.exports = initGames
