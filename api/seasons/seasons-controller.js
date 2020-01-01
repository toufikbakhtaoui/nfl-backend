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

// Add a new Season
exports.addSeason = async (req, reply) => {
    try {
        const season = new seasonModel(req.body)
        return season.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing Season
exports.updateSeason = async (req, reply) => {
    try {
        const id = req.params.id
        const season = req.body
        const { ...updateData } = season
        const update = await seasonModel.findByIdAndUpdate(id, updateData, {
            new: true,
        })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a Season
exports.deleteSeason = async (req, reply) => {
    try {
        const id = req.params.id
        const season = await seasonModel.findByIdAndRemove(id)
        return season
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete all Season
exports.deleteAllSeason = async (req, reply) => {
    try {
        const season = await seasonModel.deleteMany({})
        return
    } catch (err) {
        throw boom.boomify(err)
    }
}
