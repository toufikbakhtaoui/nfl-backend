const boom = require('@hapi/boom')

const teamModel = require('./team')

exports.getTeams = async (req, reply) => {
    try {
        const teams = await teamModel.find()
        return teams
    } catch (err) {
        throw boom.boomify(err)
    }
}
