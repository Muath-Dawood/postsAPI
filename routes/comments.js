const express = require('express')
const crypto = require('crypto')
let { newComments: comments } = require('../data')

const router = express.Router()

//get all comments for a post
router.get('/', (req, res) => {
    const postComments = comments.filter(comment => comment.postId === req.post.id)
    if(postComments.length) {
        res.status(200).json({
            success: true,
            data: postComments
        })
    }else {
        res.status(200).json({
        success: true,
        message: "no comments for this post yet"
        })
    }
})

//add a comment to a post
router.post('/', (req, res) => {
    const newComment = req.body
    newComment.id = crypto.randomUUID()
    newComment.postId = req.post.id

    res.status(201).json({
        success: true,
        message: `comment: ${JSON.stringify(newComment)} has been created`
    })
})

module.exports = router