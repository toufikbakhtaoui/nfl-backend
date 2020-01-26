const swagger = require('./config/swagger-config')
const routes = require('./config/routes-config')
const db = require('./config/db/db-config')
const data = require('./config/db/data-config')
const start = require('./config/server-config')
const fastify = require('fastify')({
    logger: true,
})

fastify.register(require('fastify-cors'), {})

fastify.get('/', async (request, reply) => {
    return 'Welcome to the nfl'
})

swagger(fastify)
routes(fastify)
db()
data.initTeams().then(() => {
    data.initSeason().then(() => {
        data.initStandings().then(() => {
            data.initGames()
        })
    })
})

start(fastify)
