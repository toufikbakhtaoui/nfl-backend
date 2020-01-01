const boom = require('@hapi/boom')

const standingModel = require('./standing')

exports.getStandings = async (req, reply) => {
    try {
        const standings = await standingModel.find()
        return standings
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single Standing by ID
exports.getOneStanding = async (req, reply) => {
    try {
        const id = req.params.id
        const standing = await standingModel.findById(id)
        return standing
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new Standing
exports.addStanding = async (req, reply) => {
    try {
        const standing = new standingModel(req.body)
        return standing.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing Standing
exports.updateStanding = async (req, reply) => {
    try {
        const id = req.params.id
        const standing = req.body
        const { ...updateData } = standing
        const update = await standingModel.findByIdAndUpdate(id, updateData, {
            new: true,
        })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a Standing
exports.deleteStanding = async (req, reply) => {
    try {
        const id = req.params.id
        const standing = await standingModel.findByIdAndRemove(id)
        return standing
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete all Standing
exports.deleteAllStanding = async (req, reply) => {
    try {
        const standing = await standingModel.deleteMany({})
        return
    } catch (err) {
        throw boom.boomify(err)
    }
}
