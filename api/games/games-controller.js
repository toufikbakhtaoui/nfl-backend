const boom = require('@hapi/boom')
const score = require('../../cluster/score')
const seasonModel = require('../seasons/season')
const gameModel = require('./game')
const seasonTracker = require('../../scheduler/season-tracker')
const standingTracker = require('../../scheduler/standing-tracker')

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
        const gamesInRegularSeason = 16
        const season = Number(req.params.season)
        const week = Number(req.params.week)
        const currentSeason = await seasonModel.findOne({ seasonId: season })
        const games = await gameModel.find({
            season: season,
            week: week,
        })
        if (week !== currentSeason.weekToPlay) {
            return games
        }
        for (game of games) {
            game.homeTeamScore = score.getScore()
            game.awayTeamScore = score.getScore()
            await game.save()
        }
        standingTracker.updateStandings(games, season)
        seasonTracker.updateSeason(season)
        if (week >= gamesInRegularSeason) {
            playoffsScheduler(week, season)
        }
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}
