const boom = require('@hapi/boom')
const teamModel = require('../teams/team')
const rankingModel = require('./ranking')

exports.getRankedTeams = async (req, reply) => {
    try {
        const season = req.params.season - 1
        let rankings = await rankingModel.find({ season: season }).sort('ranking')
        return rankings
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getRankings = async (req, reply) => {
    try {
        const season = req.params.season - 1
        const rankings = await rankingModel.find({ season: season })
        return rankings
    } catch (err) {
        throw boom.boomify(err)
    }
}