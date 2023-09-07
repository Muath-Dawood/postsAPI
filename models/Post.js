const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    body: String
})

module.exports = mongoose.model('Post', postSchema)