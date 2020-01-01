const teamController = require('./teams-controller')

const routes = [
    {
      method: 'GET',
      url: '/api/teams',
      handler: teamController.getTeams
    },
    {
      method: 'GET',
      url: '/api/teams/:id',
      handler: teamController.getOneTeam
    },
    {
      method: 'POST',
      url: '/api/teams',
      handler: teamController.addTeam,
    },
    {
      method: 'PUT',
      url: '/api/teams/:id',
      handler: teamController.updateTeam
    },
    {
      method: 'DELETE',
      url: '/api/teams/:id',
      handler: teamController.deleteTeam
    },
    {
      method: 'DELETE',
      url: '/api/teams',
      handler: teamController.deleteAllTeam
    }
  ]
  
  module.exports = routes