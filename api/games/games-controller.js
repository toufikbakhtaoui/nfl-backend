const boom = require('@hapi/boom')
const score = require('../../cluster/score')
const seasonModel = require('../seasons/season')
const gameModel = require('./game')

exports.getAllGames = async (req, reply) => {
    try {
        const games = await gameModel.find()
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getGames = async (req, reply) => {
    try {
        const season = req.params.season
        const week = req.params.week
        const games = await gameModel.find({
            season: season,
            week: week,
        })
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getScores = async (req, reply) => {
    try {
        const season = req.params.season
        const week = req.params.week
        const weekToPlay = await seasonModel.find({ seasonId: season })
        const games = await gameModel.find({
            season: season,
            week: week,
        })
        if (weekToPlay !== week) {
            console.log('not the right week*****************************')
            return games
        }
        for (game of games) {
            game.homeTeamScore = score.getScore()
            game.awayTeamScore = score.getScore()
            await game.save()
        }
        score.updateStandings(games, season)
        await score.updateSeason(season)
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single Game by ID
exports.getOneGame = async (req, reply) => {
    try {
        const id = req.params.id
        const game = await gameModel.findById(id)
        return game
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new Game
exports.addGame = async (req, reply) => {
    try {
        const game = new gameModel(req.body)
        return game.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing Game
exports.updateGame = async (req, reply) => {
    try {
        const id = req.params.id
        const game = req.body
        const { ...updateData } = game
        const update = await gameModel.findByIdAndUpdate(id, updateData, {
            new: true,
        })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a Game
exports.deleteGame = async (req, reply) => {
    try {
        const id = req.params.id
        const game = await gameModel.findByIdAndRemove(id)
        return game
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete all Game
exports.deleteAllGame = async (req, reply) => {
    try {
        const game = await gameModel.deleteMany({})
        return
    } catch (err) {
        throw boom.boomify(err)
    }
}
