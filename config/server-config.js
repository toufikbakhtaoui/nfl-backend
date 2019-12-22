const swagger = require('./swagger-config')
const routes = require('./server-routes-config')
const fastify = require('fastify')({
    logger: true
})

swagger(fastify)
routes(fastify)

fastify.get('/', async(request, reply) => {
    return 'Welcome to the nfl'
})

const server = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(err)
        process.exit(1)
    }
}

module.exports = server