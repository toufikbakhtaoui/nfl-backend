const boom = require('@hapi/boom')

const seasonModel = require('./season')

exports.getSeasons = async (req, reply) => {
    try {
        const seasons = await seasonModel.find()
        return seasons
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single Season by ID
exports.getOneSeason = async (req, reply) => {
    try {
        const id = req.params.id
        const season = await seasonModel.findById(id)
        return season
    } catch (err) {
        throw boom.boomify(err)
    }
}
