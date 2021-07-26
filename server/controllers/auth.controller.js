// functions from config/utils
const insertUser = require('../config/utils').insertUser
const generateToken = require('../config/utils').generateToken


module.exports.register = async function (req, res, next) {
    let user = await insertUser(req.body)
    user = user.toObject()
    delete user.hashedPassword
    req.user = user
    next()
}

module.exports.login = function (req, res) {
    let user = req.user
    user = user.toObject()
    delete user.hashedPassword
    let token = generateToken(user)
    res.json({user, token})
}
