const ex = require('express')
const User = require('../models/User')
const Post = require('../models/Post')

const router = ex.Router()

//get all users
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: req.users
    })
})

//create new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        res.status(201).json({
            success: true,
            data: newUser
        })
    }catch(e) {
        res.status(500).json({
            success: false,
            message: e.message
        })  
    }
})

//get single user route
router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
})

//edit a single user route
router.put('/:id', async (req, res) => {
    try {
        await User.updateOne({_id: req.user._id}, req.query)
        res.status(200).json({
            success: true,
            data: User.findOne({_id: req.user._id})  
        })
    }catch(e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

//delete a sigle user route
router.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({_id: req.user._id})
        await Post.deleteMany({userId: req.user._id})
        res.status(200).json({
            success: true,
            message: `user ${req.user._id} and posts deleted successfuly`
        })
    }catch(e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

//get all posts of a user route
router.get('/:id/posts', async (req, res) => {
    try {
        const userPosts = await Post.find({userId: req.user._id})
        if(userPosts.length) {
            res.status(200).json({
                success: true,
                data: userPosts
            })
        }else {
            res.status(404).json({
                success: false,
                message: `User ${req.user.id} has no posts yet`
            })
        }
    }catch(e) {
        res.status(404).json({
            success: false,
            message: `user ${req.user.id} not found`
        })
    }
})

//add a post by a user
router.post('/:id/posts', (req, res) => {
    const newPost = new Post({...req.body, userId: req.user._id})
    try {
        newPost.save()
        res.status(201).json({
            success: true,
            data: newPost
        })
    }catch(e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


module.exports = router