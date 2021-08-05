const config = require('../config/config')
const bcrypt = require('bcrypt')

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user.model')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtLogin = new JwtStrategy(options, (jwt_payload, done) => {

    User.findOne({_id: jwt_payload.sub}, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            user = user.toObject()
            delete user.hashedPassword
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
})

const LocalLogin = new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({"profile.email":email}, (err, user) => {
        if (err) {return done(err)}
        if (!user) {return done(null, false)}
        if (!bcrypt.compareSync(password, user.hashedPassword)) {return done(null, false)}

        user = user.toObject()
        delete user.hashedPassword

        done(null, user)
    })
})



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})


passport.use(JwtLogin)
passport.use(LocalLogin)

module.exports = passport
