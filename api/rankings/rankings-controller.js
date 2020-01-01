const boom = require('@hapi/boom')

const rankingModel = require('./ranking')

exports.getRankings = async (req, reply) => {
    try {
      const rankings = await rankingModel.find()
      return rankings
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Get single Ranking by ID
  exports.getOneRanking = async (req, reply) => {
    try {
      const id = req.params.id
      const ranking = await rankingModel.findById(id)
      return ranking
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Add a new Ranking
  exports.addRanking = async (req, reply) => {
    try {
      const ranking = new rankingModel(req.body)
      return ranking.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Update an existing Ranking
  exports.updateRanking = async (req, reply) => {
    try {
      const id = req.params.id
      const ranking = req.body
      const { ...updateData } = ranking
      const update = await rankingModel.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Delete a Ranking
  exports.deleteRanking = async (req, reply) => {
    try {
      const id = req.params.id
      const ranking = await rankingModel.findByIdAndRemove(id)
      return ranking
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  // Delete all Ranking
  exports.deleteAllRanking = async (req, reply) => {
    try {
      const ranking = await rankingModel.deleteMany({})
      return
    } catch (err) {
      throw boom.boomify(err)
    }
  }

