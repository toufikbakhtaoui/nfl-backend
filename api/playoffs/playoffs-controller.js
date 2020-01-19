const boom = require('@hapi/boom')
const gameModel = require('../games/game')
const score = require('../../cluster/score')
const seasonModel = require('../seasons/season')

const wildCard_week = 17
const divisional_week = 18
const championship_week = 19
const superBowl_week = 20

const divisional = () => {

}

const championship = () => {
    
}

const superBowl = () => {
    
}


const simulatedGames = async (season, weekToSimulate) => {
    const weekToPlay = await seasonModel.find({ seasonId: season })
    const games = await gameModel.find({
        season: season,
        week: weekToSimulate,
    })

    if (weekToPlay !== weekToSimulate) {
        return games
    }

    for (game of games) {
        game.homeTeamScore = score.getScore()
        game.awayTeamScore = score.getScore()
        await game.save()
    }
    await score.updateSeason(season)
    return games
}

exports.getWildCard = async (req, reply) => {
    try {
        const season = req.params.season
        const games = await gameModel.find({
            season: season,
            week: wildCard,
        })
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}


exports.getWildCardScores = async (req, reply) => {
    try {
        const season = req.params.season
        
        const result = await simulatedGames(season, wildCard_week)
        divisional()
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}


exports.getDivisional = async (req, reply) => {
    try {
        const season = req.params.season
        const games = await gameModel.find({
            season: season,
            week: divisional,
        })
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getDivisionalScores = async (req, reply) => {
    try {
        const season = req.params.season
        const result = await simulatedGames(season, divisional_week)
        championship()
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getChampionship = async (req, reply) => {
    try {
        const season = req.params.season
        const games = await gameModel.find({
            season: season,
            week: championship,
        })
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getChampionshipScores = async (req, reply) => {
    try {
        const season = req.params.season
        const result = await simulatedGames(season, championship_week)
        superBowl()
        return result
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getSuperBowl = async (req, reply) => {
    try {
        const season = req.params.season
        const games = await gameModel.find({
            season: season,
            week: superBowl,
        })
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getSuperBowlScores = async (req, reply) => {
    try {
        const season = req.params.season
        return await simulatedGames(season, superBowl_week)
    } catch (err) {
        throw boom.boomify(err)
    }
}
