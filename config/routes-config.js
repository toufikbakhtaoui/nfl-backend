const teamsRoutes = require('../api/teams/teams-routes')
const gamesRoutes = require('../api/games/games-routes')

let allRoutes = [] 
allRoutes.push.apply(allRoutes, teamsRoutes)
allRoutes.push.apply(allRoutes, gamesRoutes)

const routes = async (fastify) => {
    await allRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}
module.exports = routes