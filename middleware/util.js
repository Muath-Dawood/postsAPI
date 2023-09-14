const User = require('../models/User')
const Post = require('../models/Post')

const requestLogger = (req, res, next) => {
    console.log(req.method, req.url)
    next()
}

const getUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        req.user = user
        next()
    }catch(e) {
        console.error(e.message)
        res.status(404).json({
            success: false,
            message: `user ${req.params.id} not found`
        })
    }
}

const getPost = async (req, res, next) => {
    const postId = req.params.id
    try {
        const post = await Post.find(postId)
        req.post = post
    }catch(e) {
        console.error(e.message)
        res.status(404).json({
            success: false,
            message: `post ${req.params.id} not found`
        })
    }
}

module.exports = {requestLogger, getUser, getPost}