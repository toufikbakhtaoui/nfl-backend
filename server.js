const fastify = require('fastify')({
    logger: true
})

fastify.get('/', async(request, reply) => {
    return 'Welcome to the nfl'
})

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()