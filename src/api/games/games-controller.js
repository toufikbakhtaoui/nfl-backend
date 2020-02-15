const boom = require('@hapi/boom')
const score = require('../../score')
const seasonModel = require('../seasons/season')
const gameModel = require('./game')
const seasonTracker = require('../../trackers/season-tracker')
const standingTracker = require('../../trackers/standing-tracker')
const playoffsScheduler = require('../../schedulers/playoffs-scheduler')

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
        for (let game of games) {
            game.homeTeamScore = score.getScore()
            game.awayTeamScore = score.getScore()
            await game.save()
        }
        if (week <= gamesInRegularSeason) {
            standingTracker.updateStandings(games, season)
        }
        seasonTracker.updateSeason(season)
        if (week >= gamesInRegularSeason) {
            playoffsScheduler.generatePlayoffs(week, season)
        }
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}
