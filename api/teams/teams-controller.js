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
  
  // Get single Team by ID
  exports.getOneTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const team = await teamModel.findById(id)
      return team
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Add a new Team
  exports.addTeam = async (req, reply) => {
    try {
      const team = new teamModel(req.body)
      return team.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Update an existing Team
  exports.updateTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const team = req.body
      const { ...updateData } = team
      const update = await teamModel.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  
  // Delete a Team
  exports.deleteTeam = async (req, reply) => {
    try {
      const id = req.params.id
      const team = await teamModel.findByIdAndRemove(id)
      return team
    } catch (err) {
      throw boom.boomify(err)
    }
  }

