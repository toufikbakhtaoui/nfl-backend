const boom = require('@hapi/boom')
const teamModel = require('./team')
const commons = require('../../cluster/commons')

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
        return await commons.getStandings(season)
    } catch (err) {
        throw boom.boomify(err)
    }
}
