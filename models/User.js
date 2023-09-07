const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    address: {
        city: String,
        street: String
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
})

module.exports = model('User', userSchema)