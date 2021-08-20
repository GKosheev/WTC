import passport from 'passport';
import bcrypt from 'bcrypt'
import {ExtractJwt, VerifyCallback} from 'passport-jwt'
import config from '../config/config'
import * as passportLocal from 'passport-local'
import * as passportStrategy from 'passport-jwt'
import User from '../models/user.model'

const JwtStrategy = passportStrategy.Strategy
const LocalStrategy = passportLocal.Strategy


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtLogin = new JwtStrategy(options, (jwt_payload, done) => {

  User.findOne({_id: jwt_payload.sub}, (err: VerifyCallback, user: any) => {
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
  User.findOne({"profile.email": email}, (err: any, user: any) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }
    if (!bcrypt.compareSync(password, user.hashedPassword)) {
      return done(null, false)
    }

    user = user.toObject()
    delete user.hashedPassword

    done(null, user)
  })
})


passport.serializeUser((user, done) => {
  done(null, user) // user._id
})

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user: any) => {
      done(null, user)
    })
    .catch((err: any) => done(err))
})


passport.use(JwtLogin)
passport.use(LocalLogin)

export default passport
