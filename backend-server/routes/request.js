module.exports = async function (fastify, opts) {
    fastify.post("/request", async function (req, res) {
        // get javascript data (json)
        const data = req.body;
        const location = data.location;
        
    });
    fastify.get('/websocket', { websocket: true }, (connection, req) => {
        connection.socket.on('message', message => {
            connection.socket.send(`received your message: ${message}`)
        })
    })
}