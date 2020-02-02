const boom = require('@hapi/boom')
const teamModel = require('./team')
const standingTracker = require('../../scheduler/standing-tracker')

exports.getTeams = async (req, reply) => {
    try {
        const teams = await teamModel.find()
        return teams
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getTeamsByRanks = async (req, reply) => {
    try {
        const season = Number(req.params.season)
        return await standingTracker.getStandings(season)
    } catch (err) {
        throw boom.boomify(err)
    }
}
