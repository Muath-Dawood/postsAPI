const express = require('express')
const { requestLogger, getUser, getPost } = require('./middleware/util')
const usersFilter  = require('./middleware/filters')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const mongoose = require('mongoose')

const PORT = 3000
const app = express()

mongoose.connect('mongodb+srv://muathdawood89:c123z456@cluster0.23ourtk.mongodb.net/postsDB?retryWrites=true&w=majority')

app.use(requestLogger)
app.use('/api/v1/users/:id', getUser)
app.use('/api/v1/posts/:id', getPost)
app.use(express.json())
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