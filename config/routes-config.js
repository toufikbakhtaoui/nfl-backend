const teamsRoutes = require('../src/api/teams/teams-routes')
const gamesRoutes = require('../src/api/games/games-routes')
const seasonsRoutes = require('../src/api/seasons/seasons-routes')
const playoffsRoutes = require('../src/api/playoffs/playoffs-routes')

let allRoutes = []
allRoutes.push.apply(allRoutes, teamsRoutes)
allRoutes.push.apply(allRoutes, gamesRoutes)
allRoutes.push.apply(allRoutes, seasonsRoutes)
allRoutes.push.apply(allRoutes, playoffsRoutes)

const routes = async fastify => {
    await allRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}
module.exports = routes
