const gameModel = require('./game')
const generate_season = require('../../scheduler/regular-season-scheduler')
const initGames = async () => {
    const games = await gameModel.find()
    if (games && games.length === 256) {
        return
    }
    generate_season(1)
}

module.exports = initGames
