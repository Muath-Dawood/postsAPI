const User = require('../models/User')

const usersFilter = async (req, res, next) => {
    try {
        const users = await User.find(req.query)
        if(users.length) {
            req.users = users
        }else {
            res.status(404).json({
                status: false,
                message: "Sorry, No users found!"
            })
        }
        next()
    }catch(e) {
        res.status(500).json({
            success: false,
            message: "Sorry, something went wrong!"
        })
    }
}
module.exports = usersFilter