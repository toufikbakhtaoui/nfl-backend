const teamsRoutes = require('../api/teams/teams-routes')

const initRoutes = async (fastify) => {
    await teamsRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}

module.exports = initRoutes