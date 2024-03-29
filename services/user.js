const User = require('../models/index').getModel('user')

const user = {
    async login(userData) {
        let result = await User.findOne(userData)
        return result
    }
}

module.exports = user