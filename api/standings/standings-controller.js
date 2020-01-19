const boom = require('@hapi/boom')

const standingModel = require('./standing')

exports.getStandings = async (req, reply) => {
    try {
        const season = req.params.season
        const standings = await standingModel.find({
            season: season,
        })
        return standings
    } catch (err) {
        throw boom.boomify(err)
    }
}
