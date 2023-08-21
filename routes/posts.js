const ex = require('express')
const crypto = require('crypto')
const commentsRouter = require('./comments')
let {newUsers: users, newPosts: posts, newComments: comments} = require('../data')

const router = ex.Router()

//get all posts
router.get('/', (req, res) => {
    res.status(200).json({success: true, data: posts})
})

//get a single post
router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        data: req.post
    })
})

//edit a single post
router.put('/:id', (req, res) => {
    if(keys.length) {
        for(let key in req.body) {
            req.post[key] = req.body[key]
        }
        res.status(200).json({
            success: true,
            message: `post ${req.post.id} updated successfuly`
        })
    }else {
        res.status(400).json({
            success: false,
            message: 'no data was provided'
        })
    }
})

//delete a sigle post route
router.delete('/:id', (req, res) => {
    posts = posts.filter(post => post.id !== req.post.id)
    comments = comments.filter(comment => comment.postId !== req.post.id)
    res.status(200).json({
        success: true,
        message: `post ${req.post.id} and comments deleted successfuly`
    })
})

//get the user of the post
router.get('/:id/user', (req, res) => {
    const user = users.find(user => user.id === req.post.userId)
    res.status(200).json({
        success: true,
        data: user
    })
})

router.use('/:id/comments', commentsRouter)

module.exports = router