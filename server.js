const express = require('express')

const server = express()

server.get('/', (x, y) => {
    console.log(x.method, x.url)
    y.send("أهلا وسهلا بك في سيرفري")
})

server.get('/users', () => {})

server.post('/', )

server.put('/')
server.listen(3000, () => {
    console.log("server is up and running on port 3000")
})