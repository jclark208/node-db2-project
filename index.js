const server = require('./server')

const port = 5006;
server.listen(port, () => console.log({port}))