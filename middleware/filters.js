const {newUsers: users} = require('../data')

const usersFilter = (req, res, next) => {
    const filters = Object.keys(req.query)
    if(filters.length) {
        req.filteredUsers = [...users]
        for(let filter of filters) {
            req.filteredUsers = req.filteredUsers.filter(user => user[filter].toLowerCase().startsWith(req.query[filter].toLowerCase()))
        }
        next()
    }else {
        next()
    }
}

module.exports = {usersFilter}