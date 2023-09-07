const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    name: String,
    email: String,
    body: String
})

module.exports = mongoose.model('Comment', commentSchema)