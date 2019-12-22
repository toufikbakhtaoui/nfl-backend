const teamsRoutes = require('../api/teams/teams-routes')

const routes = async (fastify) => {
    await teamsRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}

module.exports = routes