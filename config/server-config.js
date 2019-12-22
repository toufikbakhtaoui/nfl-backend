const server = async (fastify) => {    
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