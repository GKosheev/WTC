const bcrypt = require('bcrypt')
const config = require('../config/config')
const jsonwebtoken = require('jsonwebtoken');

const Joi = require('joi')
const User = require('../models/user.model')


const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

async function insertUser(user) {
    console.log(JSON.stringify(user))
    user = await userSchema.validate(user)
    user.value.hashedPassword = bcrypt.hashSync(user.value.password, 10)
    user.value.test = 'test'
    delete user.value.password
    // TODO should we delete user.value.repeatPassword?

    console.log(JSON.stringify(user.value))
    return await new User(user.value).save()
}


function generateToken(user) {
    const _id = user._id

    const expiresIn = '1m'

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, config.jwtSecret, {expiresIn: expiresIn})

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.generateToken = generateToken
module.exports.insertUser = insertUser
