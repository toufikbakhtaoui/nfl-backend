const boom = require('@hapi/boom')

const Team = require('./team')

exports.getTeams = async (req, reply) => {
    try {
      const Teams = await Team.find()
      return Teams
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Get single Team by ID
  exports.getOneTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const Team = await Team.findById(id)
      return Team
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Add a new Team
  exports.addTeam = async (req, reply) => {
    try {
      const Team = new Team(req.body)
      return Team.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Update an existing Team
  exports.updateTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const Team = req.body
      const { ...updateData } = Team
      const update = await Team.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Delete a Team
  exports.deleteTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const Team = await Team.findByIdAndRemove(id)
      return Team
    } catch (err) {
      throw boom.boomify(err)
    }
  }

