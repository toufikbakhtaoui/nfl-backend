const swagger = require('./config/swagger-config')
const routes = require('./config/routes-config')
const db = require('./config/db-config')
const start = require('./config/server-config')

const fastify = require('fastify')({
    logger: true
})

fastify.get('/', async(request, reply) => {
    return 'Welcome to the nfl'
})    

swagger(fastify)
routes(fastify)
db()
start(fastify)