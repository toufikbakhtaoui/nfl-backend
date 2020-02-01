const boom = require('@hapi/boom')
const score = require('../../cluster/score')
const seasonModel = require('../seasons/season')
const gameModel = require('./game')

const regular_season_games = 16
const wild_card_week = 17

const wild_card = async season => {
    //TODO optimize
    let division_champions = []
    let others = []
    const team_per_division = 4
    for (let index = 1; index < 9; index++) {
        let teamsIds = [
            (index - 1) * team_per_division + 1,
            (index - 1) * team_per_division + 2,
            (index - 1) * team_per_division + 3,
            (index - 1) * team_per_division + 4,
        ]
        const division_teams = await teamModel
            .find({ 'standings.season': season })
            .where('standings.rank')
            .in(teamsIds)
            .sort('standings.win')
        division_champions.push(division_teams[0])
        others.push(division_teams[1])
        others.push(division_teams[2])
        others.push(division_teams[3])
        console.log('-------- division teams ------------ ', division_teams)
    }
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
        const season = req.params.season
        const week = req.params.week
        const weekToPlay = await seasonModel.find({ seasonId: season })
        const games = await gameModel.find({
            season: season,
            week: week,
        })
        if (weekToPlay !== week) {
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
