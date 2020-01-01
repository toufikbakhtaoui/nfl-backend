const teamsRoutes = require('../api/teams/teams-routes')
const gamesRoutes = require('../api/games/games-routes')
const rankingsRoutes = require('../api/rankings/rankings-routes')


let allRoutes = [] 
allRoutes.push.apply(allRoutes, teamsRoutes)
allRoutes.push.apply(allRoutes, gamesRoutes)
allRoutes.push.apply(allRoutes, rankingsRoutes)

const routes = async (fastify) => {
    await allRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}
module.exports = routes