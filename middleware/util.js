const { newUsers: users, newPosts: posts } = require('../data')

const requestLogger = (req, res, next) => {
    console.log(req.method, req.url)
    next()
}

const getUser = (req, res, next) => {
    const userId = req.params.id
    const user = users.find(user => user.id === userId)
    if(user) {
        req.user = user
        console.log("user has been added to the request")
        next()
    }else {
        res.status(404).json({
            success: false,
            message: `user ${req.params.id} not found`
        })
    }
}

const getPost = (req, res, next) => {
    const postId = req.params.id
    const post = posts.find(post => post.id === postId)
    if(post) {
        req.post = post
        console.log("post has been added to the request")
        next()
    }else {
        res.status(404).json({
            success: false,
            message: `post ${postId} not found`
        })
    }
}

module.exports = {requestLogger, getUser, getPost}