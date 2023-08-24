const express = require('express')
const { requestLogger, getUser, getPost } = require('./middleware/util')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const { usersFilter } = require('./middleware/filters')

const PORT = 3000
const app = express()

app.use(requestLogger)
app.use('/api/v1/users/:id', getUser)
app.use('/api/v1/posts/:id', getPost)
app.use(express.json())
app.use((req, res, next) => {
    console.log("data has been extracted from request to body")
    next()
})
app.use('/api/v1/users', usersFilter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/posts', postsRouter)

app.listen(PORT, (err) => {
    if(err) {
        console.error(err)
    }else {
        console.log(`server is up and running on port ${PORT}`)
    }
})