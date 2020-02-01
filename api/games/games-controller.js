const boom = require('@hapi/boom')
const score = require('../../cluster/score')
const seasonModel = require('../seasons/season')
const gameModel = require('./game')
const commons = require('../../cluster/commons')

const regular_season_games = 16
const wild_card_week = 17

const wild_card = async season => {
    const standings = await commons.getStandings(season)
    console.log(standings)
    //Sort division champions

    //order teams in each division
    //save games
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
        const season = Number(req.params.season)
        const week = Number(req.params.week)
        const currentSeason = await seasonModel.findOne({ seasonId: season })
        const games = await gameModel.find({
            season: season,
            week: week,
        })
        wild_card(season)
        if (currentSeason.weekToPlay !== week) {
            return games
        }
        for (game of games) {
            game.homeTeamScore = score.getScore()
            game.awayTeamScore = score.getScore()
            await game.save()
        }
        score.updateStandings(games, season)
        if (week === regular_season_games) {
            wild_card(season)
        }
        await score.updateSeason(season)
        return games
    } catch (err) {
        throw boom.boomify(err)
    }
}
