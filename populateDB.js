const { users, posts, comments } = require('./data')
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')
const Comment = require('./models/Comment')

async function main() {
    try {
        await mongoose.connect('mongodb+srv://muathdawood89:c123z456@cluster0.23ourtk.mongodb.net/postsDB?retryWrites=true&w=majority')
        console.log('Database connection successful ...')
    }catch(e) {
        console.error(e.message)
    }

    for(let i = 0; i < users.length; i++) {
        let userData = (({
            name, 
            username, 
            email, 
            address: {street, city}, 
            phone, 
            website, 
            company
        }) => ({
            name, 
            username, 
            email, 
            address: {street, city}, 
            phone, 
            website, 
            company
        }))(users[i])

        try {
            let newUser = new User(userData)
            await newUser.save()
            console.log(`User: ${newUser._id} created successfuly`)
            for(let j = i * 10; j < i*10 + 10; j++) {
                try {
                    let newPost = new Post({
                        userId: newUser._id,
                        title: posts[j].title, 
                        body: posts[j].body
                    })
                    await newPost.save()
                    console.log(`Post: ${newPost._id} created successfuly by User ${newUser._id}`)
                    
                    for(let k = j * 5; k < j*5 + 5; k++) {
                        try {
                            let newComment = new Comment({
                                postId: newPost._id,
                                email: comments[k].email,
                                name: comments[k].name,
                                body: comments[k].body
                            })
                            await newComment.save()
                            console.log(`Comment: ${newComment._id} was added to Post: ${newPost._id} successfuly`)
                        }catch(e) {
                            console.error(e.message)
                        }
                    }
                    
                }catch(e) {
                    console.error(e.message)
                }
            }
        }catch(e) {
            console.error(e.message)
        }
    }
}

main().then(() => {
    console.log("postsDB populated successfuly!")
}).catch(e => {
    console.log(e.message)
})