const ex = require('express')
const crypto = require('crypto')
let { newUsers: users, newPosts: posts } = require('../data')

const router = ex.Router()

//get all users
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

//create new user
router.post('/', (req, res) => {
    const newUser = req.body
    newUser.id = crypto.randomUUID()
    users.push(newUser)
    res.status(201).json({
        success: true,
        data: newUser
    })
})

//get single user route
router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
})

//edit a single user route
router.put('/:id', (req, res) => {
    if(Object.keys(req.body).length) {
        for(let key in req.body) {
            req.user[key] = req.body[key]
        }
        res.status(200).json({
            success: true,
            message: `user ${req.user.id} updated successfuly`
        })
    }else {
        res.status(400).json({
            success: false,
            message: 'no data was provided'
        })
    }
})

//delete a sigle user route
router.delete('/:id', (req, res) => {
    users = users.filter(user => user.id !== req.user.id)
    posts = posts.filter(post => post.userId !== req.user.id)
    res.status(200).json({
        success: true,
        message: `user ${req.user.id} and posts deleted successfuly`
    })
})

//get all posts of a user route
router.get('/:id/posts', (req, res) => {
    const userPosts = posts.filter(post => post.userId === req.user.id)
    if(userPosts.length) {
        res.status(200).json({
            success: true,
            data: userPosts
        })
    }else {
        res.status(404).json({
            success: false,
            message: `user ${req.user.id} has no posts yet`
        })
    }
})

//add a post by a user
router.post('/:id/posts', (req, res) => {
    const newPost = req.body
    newPost.id = crypto.randomUUID()
    newPost.userId = req.user.id
    posts.push(newPost)

    res.status(201).json({
        success: true,
        message: `post ${newPost.id} added successfuly by user ${req.user.id}`
    })
})


module.exports = router