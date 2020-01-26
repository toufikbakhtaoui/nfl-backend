const teamsRoutes = require('../api/teams/teams-routes')
const gamesRoutes = require('../api/games/games-routes')
const seasonsRoutes = require('../api/seasons/seasons-routes')
const standingsRoutes = require('../api/standings/standings-routes')
const playoffsRoutes = require('../api/playoffs/playoffs-routes')

let allRoutes = []
allRoutes.push.apply(allRoutes, teamsRoutes)
allRoutes.push.apply(allRoutes, gamesRoutes)
allRoutes.push.apply(allRoutes, seasonsRoutes)
allRoutes.push.apply(allRoutes, standingsRoutes)
allRoutes.push.apply(allRoutes, playoffsRoutes)

const routes = async fastify => {
    await allRoutes.forEach((route, index) => {
        fastify.route(route)
    })
}
module.exports = routes
